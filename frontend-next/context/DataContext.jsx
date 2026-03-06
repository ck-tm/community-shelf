"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { publicApi, adminApi, userApi } from "@/lib/endpoints";
import { useAuth } from "./AuthContext";

const DataContext = createContext(null);

/**
 * DataProvider — accepts optional `initialData` from server-side fetch.
 * If initialData is provided, skips the client-side useEffect fetch.
 */
export function DataProvider({ initialData, children }) {
  const { isAuthenticated, isAdmin } = useAuth();

  // ── Public data ─────────────────────────────────────────────────
  const [titles, setTitles] = useState(initialData?.titles || []);
  const [types, setTypes] = useState(initialData?.types || []);
  const [curatedLists, setCuratedLists] = useState(initialData?.curatedLists || []);
  const [siteConfig, setSiteConfig] = useState(
    initialData?.siteConfig || { logo: "", title: "", description: "", themeColors: {} }
  );
  const [descriptionPage, setDescriptionPage] = useState(initialData?.descriptionPage || null);

  // ── Auth-dependent data ─────────────────────────────────────────
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState(null);

  // ── Loading ─────────────────────────────────────────────────────
  const [loading, setLoading] = useState(!initialData);

  // Client-side fetch only if no initialData was provided
  useEffect(() => {
    if (initialData) return;
    (async () => {
      try {
        const [titlesRes, typesRes, listsRes, configRes, descPageRes] =
          await Promise.all([
            publicApi.getTitles(),
            publicApi.getTypes(),
            publicApi.getLists(),
            publicApi.getSiteConfig(),
            publicApi.getDescriptionPage(),
          ]);
        setTitles(titlesRes.results || titlesRes);
        setTypes(typesRes.results || typesRes);
        setCuratedLists(listsRes.results || listsRes);
        setSiteConfig(configRes);
        setDescriptionPage(descPageRes);
      } catch (err) {
        console.error("Failed to load public data:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [initialData]);

  // Fetch user inquiries when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      userApi
        .getInquiries()
        .then((res) => setInquiries(res.results || res))
        .catch(() => {});
    } else {
      setInquiries([]);
    }
  }, [isAuthenticated]);

  // ── Derived values ──────────────────────────────────────────────
  const typeColors = useMemo(() => {
    const map = {};
    types.forEach((t) => {
      map[t.name] = t.color;
    });
    return map;
  }, [types]);

  const browseTypes = useMemo(
    () => ["All", ...types.map((t) => t.name)],
    [types]
  );

  // ── Types CRUD ──────────────────────────────────────────────────
  const addType = useCallback(async (data) => {
    const created = await adminApi.createType(data);
    setTypes((prev) => [...prev, created]);
  }, []);

  const updateType = useCallback(async (id, data) => {
    const updated = await adminApi.updateType(id, data);
    setTypes((prev) => prev.map((t) => (t.id === id ? updated : t)));
    publicApi
      .getTitles()
      .then((res) => setTitles(res.results || res))
      .catch(() => {});
  }, []);

  const deleteType = useCallback(async (id) => {
    await adminApi.deleteType(id);
    setTypes((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ── Titles CRUD ─────────────────────────────────────────────────
  const addTitle = useCallback(async (data) => {
    const created = await adminApi.createTitle(data);
    const full = await publicApi.getTitle(created.id);
    setTitles((prev) => [...prev, full]);
    return created.id;
  }, []);

  const updateTitle = useCallback(async (id, data) => {
    await adminApi.updateTitle(id, data);
    const full = await publicApi.getTitle(id);
    setTitles((prev) => prev.map((t) => (t.id === id ? full : t)));
  }, []);

  const deleteTitle = useCallback(async (id) => {
    await adminApi.deleteTitle(id);
    setTitles((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ── Copies CRUD ─────────────────────────────────────────────────
  const addCopy = useCallback(async (titleId, data) => {
    await adminApi.createCopy(titleId, data);
    const full = await publicApi.getTitle(titleId);
    setTitles((prev) => prev.map((t) => (t.id === titleId ? full : t)));
  }, []);

  const updateCopy = useCallback(async (titleId, copyId, data) => {
    await adminApi.updateCopy(titleId, copyId, data);
    const full = await publicApi.getTitle(titleId);
    setTitles((prev) => prev.map((t) => (t.id === titleId ? full : t)));
  }, []);

  const deleteCopy = useCallback(async (titleId, copyId) => {
    await adminApi.deleteCopy(titleId, copyId);
    const full = await publicApi.getTitle(titleId);
    setTitles((prev) => prev.map((t) => (t.id === titleId ? full : t)));
  }, []);

  // ── Curated Lists CRUD ──────────────────────────────────────────
  const addList = useCallback(async (data) => {
    const created = await adminApi.createList(data);
    const full = await publicApi.getList(created.id);
    setCuratedLists((prev) => [...prev, full]);
    return created.id;
  }, []);

  const updateList = useCallback(async (id, data) => {
    await adminApi.updateList(id, data);
    const full = await publicApi.getList(id);
    setCuratedLists((prev) => prev.map((l) => (l.id === id ? full : l)));
  }, []);

  const deleteList = useCallback(async (id) => {
    await adminApi.deleteList(id);
    setCuratedLists((prev) => prev.filter((l) => l.id !== id));
  }, []);

  // ── User Inquiries ──────────────────────────────────────────────
  const createInquiry = useCallback(async (data) => {
    const created = await userApi.createInquiry(data);
    setInquiries((prev) => [...prev, created]);
    return created;
  }, []);

  const cancelInquiry = useCallback(async (id) => {
    await userApi.cancelInquiry(id);
    setInquiries((prev) => prev.filter((i) => i.id !== id));
  }, []);

  // ── Admin Inquiries ─────────────────────────────────────────────
  const fetchAdminInquiries = useCallback(async () => {
    const res = await adminApi.getInquiries();
    const data = res.results || res;
    setInquiries(data);
    return data;
  }, []);

  const acceptInquiry = useCallback(async (id, data) => {
    const updated = await adminApi.acceptInquiry(id, data);
    setInquiries((prev) => prev.map((i) => (i.id === id ? updated : i)));
  }, []);

  const returnInquiry = useCallback(async (id) => {
    const updated = await adminApi.returnInquiry(id);
    setInquiries((prev) => prev.map((i) => (i.id === id ? updated : i)));
  }, []);

  const extendInquiry = useCallback(async (id, data) => {
    const updated = await adminApi.extendInquiry(id, data);
    setInquiries((prev) => prev.map((i) => (i.id === id ? updated : i)));
  }, []);

  // ── Site Config ─────────────────────────────────────────────────
  const updateSiteConfig = useCallback(async (data) => {
    const updated = await adminApi.updateSiteConfig(data);
    setSiteConfig(updated);
  }, []);

  // ── Description Page ──────────────────────────────────────────
  const updateDescriptionPage = useCallback(async (data) => {
    const updated = await adminApi.updateDescriptionPage(data);
    setDescriptionPage(updated);
  }, []);

  // ── Stats ───────────────────────────────────────────────────────
  const fetchStats = useCallback(async () => {
    const data = await adminApi.getStats();
    setStats(data);
    return data;
  }, []);

  // Apply theme colors as CSS custom properties
  useEffect(() => {
    if (!siteConfig.themeColors) return;
    const root = document.documentElement;
    Object.entries(siteConfig.themeColors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }, [siteConfig.themeColors]);

  return (
    <DataContext.Provider
      value={{
        titles,
        types,
        typeColors,
        browseTypes,
        curatedLists,
        inquiries,
        siteConfig,
        descriptionPage,
        stats,
        loading,
        addType,
        updateType,
        deleteType,
        addTitle,
        updateTitle,
        deleteTitle,
        addCopy,
        updateCopy,
        deleteCopy,
        addList,
        updateList,
        deleteList,
        createInquiry,
        cancelInquiry,
        fetchAdminInquiries,
        acceptInquiry,
        returnInquiry,
        extendInquiry,
        updateSiteConfig,
        updateDescriptionPage,
        fetchStats,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
