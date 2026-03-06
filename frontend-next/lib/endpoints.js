"use client";

import { api } from "./api-client";

// ── Public (no auth required) ────────────────────────────────────

export const publicApi = {
  getTitles: (params) => {
    const qs = params ? "?" + new URLSearchParams(params) : "";
    return api.get(`/titles/${qs}`);
  },
  getTitle: (id) => api.get(`/titles/${id}/`),
  getAuthors: () => api.get("/titles/authors/"),
  getTypes: () => api.get("/types/"),
  getOrganizations: () => api.get("/organizations/"),
  getLists: () => api.get("/lists/"),
  getList: (id) => api.get(`/lists/${id}/`),
  getSiteConfig: () => api.get("/site-config/"),
  getDescriptionPage: () => api.get("/description-page/"),
  submitTenantContact: (data) => api.post("/contact/", data),
};

// ── Auth ─────────────────────────────────────────────────────────

export const authApi = {
  login: (email, password) => api.post("/auth/login/", { email, password }),
  register: (email, password1, password2) =>
    api.post("/auth/registration/", { email, password1, password2 }),
  logout: () => api.post("/auth/logout/"),
  getUser: () => api.get("/auth/user/"),
  updateUser: (data) => api.put("/auth/user/", data),
};

// ── User (requires auth + membership) ────────────────────────────

export const userApi = {
  getInquiries: () => api.get("/my/inquiries/"),
  createInquiry: (data) => api.post("/my/inquiries/", data),
  cancelInquiry: (id) => api.delete(`/my/inquiries/${id}/`),
  getProfile: () => api.get("/my/profile/"),
};

// ── Admin (requires admin role) ──────────────────────────────────

export const adminApi = {
  // Stats
  getStats: () => api.get("/admin/stats/"),

  // Types
  getTypes: () => api.get("/admin/types/"),
  createType: (data) => api.post("/admin/types/", data),
  updateType: (id, data) => api.put(`/admin/types/${id}/`, data),
  deleteType: (id) => api.delete(`/admin/types/${id}/`),

  // Titles
  getTitles: (params) => {
    const qs = params ? "?" + new URLSearchParams(params) : "";
    return api.get(`/admin/titles/${qs}`);
  },
  getTitle: (id) => api.get(`/admin/titles/${id}/`),
  createTitle: (data) => api.post("/admin/titles/", data),
  updateTitle: (id, data) => api.put(`/admin/titles/${id}/`, data),
  deleteTitle: (id) => api.delete(`/admin/titles/${id}/`),

  // Copies
  getCopies: (titleId) => api.get(`/admin/titles/${titleId}/copies/`),
  createCopy: (titleId, data) =>
    api.post(`/admin/titles/${titleId}/copies/`, data),
  updateCopy: (titleId, copyId, data) =>
    api.put(`/admin/titles/${titleId}/copies/${copyId}/`, data),
  deleteCopy: (titleId, copyId) =>
    api.delete(`/admin/titles/${titleId}/copies/${copyId}/`),

  // Organizations
  getOrganizations: () => api.get("/admin/organizations/"),
  createOrganization: (data) => api.post("/admin/organizations/", data),
  updateOrganization: (id, data) =>
    api.put(`/admin/organizations/${id}/`, data),
  deleteOrganization: (id) => api.delete(`/admin/organizations/${id}/`),

  // Curated Lists
  getLists: () => api.get("/admin/lists/"),
  getList: (id) => api.get(`/admin/lists/${id}/`),
  createList: (data) => api.post("/admin/lists/", data),
  updateList: (id, data) => api.put(`/admin/lists/${id}/`, data),
  deleteList: (id) => api.delete(`/admin/lists/${id}/`),

  // Inquiries
  getInquiries: () => api.get("/admin/inquiries/"),
  updateInquiry: (id, data) => api.put(`/admin/inquiries/${id}/`, data),
  acceptInquiry: (id, data) =>
    api.post(`/admin/inquiries/${id}/accept/`, data),
  returnInquiry: (id) => api.post(`/admin/inquiries/${id}/return/`),
  extendInquiry: (id, data) =>
    api.post(`/admin/inquiries/${id}/extend/`, data),

  // Site Config
  getSiteConfig: () => api.get("/admin/site-config/"),
  updateSiteConfig: (data) => api.put("/admin/site-config/", data),

  // Description Page
  getDescriptionPage: () => api.get("/admin/description-page/"),
  updateDescriptionPage: (data) => api.put("/admin/description-page/", data),
};

// ── Platform (public schema) ──────────────────────────────────

export const platformApi = {
  getTenants: () => api.get("/platform/tenants/"),
  getLibraryRequests: () => api.get("/platform/library-requests/"),
  createLibraryRequest: (data) => api.post("/platform/library-requests/", data),
  submitContact: (data) => api.post("/platform/contact/", data),
};
