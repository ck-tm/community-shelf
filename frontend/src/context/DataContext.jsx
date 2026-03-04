import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { publicApi, adminApi, userApi } from "../api/endpoints";
import { useAuth } from "./AuthContext";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();

  // ── Public data (fetched on mount) ──────────────────────────────
  const [titles, setTitles] = useState([]);
  const [types, setTypes] = useState([]); // [{id, name, color}]
  const [curatedLists, setCuratedLists] = useState([]);
  const [siteConfig, setSiteConfig] = useState({
    logo: "",
    title: "",
    description: "",
    themeColors: {},
  });

  // ── Auth-dependent data ─────────────────────────────────────────
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState(null);

  // ── Loading / error ─────────────────────────────────────────────
  const [loading, setLoading] = useState(true);

  // Fetch public data on mount
  useEffect(() => {
    (async () => {
      try {
        const [titlesRes, typesRes, listsRes, configRes] =
          await Promise.all([
            publicApi.getTitles(),
            publicApi.getTypes(),
            publicApi.getLists(),
            publicApi.getSiteConfig(),
          ]);
        setTitles(titlesRes.results || titlesRes);
        setTypes(typesRes.results || typesRes);
        setCuratedLists(listsRes.results || listsRes);
        setSiteConfig(configRes);
      } catch (err) {
        console.error("Failed to load public data:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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

  // ── Derived values (backward-compatible) ────────────────────────
  const typeColors = useMemo(() => {
    const map = {};
    types.forEach((t) => {
      map[t.name] = t.color;
    });
    return map;
  }, [types]);

  const browseTypes = useMemo(
    () => ["All", ...types.map((t) => t.name)],
    [types],
  );

  // ── Types CRUD ──────────────────────────────────────────────────
  const addType = useCallback(async (name, color) => {
    const created = await adminApi.createType({ name, color });
    setTypes((prev) => [...prev, created]);
  }, []);

  const updateType = useCallback(async (id, data) => {
    const updated = await adminApi.updateType(id, data);
    setTypes((prev) => prev.map((t) => (t.id === id ? updated : t)));
    // Re-fetch titles since type name might have changed
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
        // Data
        titles,
        types,
        typeColors,
        browseTypes,
        curatedLists,
        inquiries,
        siteConfig,
        stats,
        loading,
        // Types CRUD
        addType,
        updateType,
        deleteType,
        // Titles CRUD
        addTitle,
        updateTitle,
        deleteTitle,
        // Copies CRUD
        addCopy,
        updateCopy,
        deleteCopy,
        // Lists CRUD
        addList,
        updateList,
        deleteList,
        // User inquiries
        createInquiry,
        cancelInquiry,
        // Admin inquiries
        fetchAdminInquiries,
        acceptInquiry,
        returnInquiry,
        extendInquiry,
        // SiteConfig
        updateSiteConfig,
        // Stats
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
