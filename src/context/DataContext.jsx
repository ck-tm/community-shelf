import { createContext, useContext, useState, useRef, useCallback, useEffect } from "react";
import {
  TITLES,
  TYPES,
  TYPE_COLORS,
  ORGANIZATIONS,
  MOCK_CURATED_LISTS,
  MOCK_INQUIRIES,
  MOCK_SITE_CONFIG,
} from "../data/mock";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [titles, setTitles] = useState(TITLES);
  const [types, setTypes] = useState(TYPES.filter((t) => t !== "All"));
  const [typeColors, setTypeColors] = useState(TYPE_COLORS);
  const [organizations] = useState(ORGANIZATIONS);
  const [curatedLists, setCuratedLists] = useState(MOCK_CURATED_LISTS);
  const [inquiries, setInquiries] = useState(MOCK_INQUIRIES);
  const [siteConfig, setSiteConfig] = useState(MOCK_SITE_CONFIG);

  const ids = useRef({ title: 13, copy: 1301, list: 4, section: 100, inquiry: 6 });
  const nextId = (key) => ids.current[key]++;

  // --- Types ---
  const addType = useCallback((name, color) => {
    setTypes((prev) => [...prev, name]);
    setTypeColors((prev) => ({ ...prev, [name]: color }));
  }, []);

  const updateType = useCallback((oldName, newName, color) => {
    setTypes((prev) => prev.map((t) => (t === oldName ? newName : t)));
    setTypeColors((prev) => {
      const next = { ...prev };
      if (oldName !== newName) delete next[oldName];
      next[newName] = color;
      return next;
    });
    if (oldName !== newName) {
      setTitles((prev) =>
        prev.map((t) => (t.type === oldName ? { ...t, type: newName } : t))
      );
    }
  }, []);

  const deleteType = useCallback((name) => {
    setTypes((prev) => prev.filter((t) => t !== name));
    setTypeColors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  // --- Titles ---
  const addTitle = useCallback(
    (title) => {
      const id = nextId("title");
      setTitles((prev) => [...prev, { ...title, id, copies: [] }]);
      return id;
    },
    []
  );

  const updateTitle = useCallback((id, updates) => {
    setTitles((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  }, []);

  const deleteTitle = useCallback((id) => {
    setTitles((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // --- Copies ---
  const addCopy = useCallback(
    (titleId, copy) => {
      const id = nextId("copy");
      setTitles((prev) =>
        prev.map((t) =>
          t.id === titleId
            ? { ...t, copies: [...t.copies, { ...copy, id }] }
            : t
        )
      );
      return id;
    },
    []
  );

  const updateCopy = useCallback((titleId, copyId, updates) => {
    setTitles((prev) =>
      prev.map((t) =>
        t.id === titleId
          ? {
              ...t,
              copies: t.copies.map((c) =>
                c.id === copyId ? { ...c, ...updates } : c
              ),
            }
          : t
      )
    );
  }, []);

  const deleteCopy = useCallback((titleId, copyId) => {
    setTitles((prev) =>
      prev.map((t) =>
        t.id === titleId
          ? { ...t, copies: t.copies.filter((c) => c.id !== copyId) }
          : t
      )
    );
  }, []);

  // --- Curated Lists ---
  const addList = useCallback(
    (list) => {
      const id = nextId("list");
      setCuratedLists((prev) => [
        ...prev,
        {
          ...list,
          id,
          createdAt: new Date().toISOString().slice(0, 10),
        },
      ]);
      return id;
    },
    []
  );

  const updateList = useCallback((id, updates) => {
    setCuratedLists((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...updates } : l))
    );
  }, []);

  const deleteList = useCallback((id) => {
    setCuratedLists((prev) => prev.filter((l) => l.id !== id));
  }, []);

  // --- Inquiries ---
  const updateInquiry = useCallback((id, updates) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, ...updates } : inq))
    );
  }, []);

  const deleteInquiry = useCallback((id) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
  }, []);

  // --- Site Config ---
  const updateSiteConfig = useCallback((updates) => {
    setSiteConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  // Apply theme colors as CSS custom properties
  useEffect(() => {
    if (!siteConfig.themeColors) return;
    const root = document.documentElement;
    Object.entries(siteConfig.themeColors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }, [siteConfig.themeColors]);

  const browseTypes = ["All", ...types];

  return (
    <DataContext.Provider
      value={{
        titles,
        types,
        typeColors,
        organizations,
        browseTypes,
        curatedLists,
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
        inquiries,
        updateInquiry,
        deleteInquiry,
        siteConfig,
        updateSiteConfig,
        nextSectionId: () => nextId("section"),
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
