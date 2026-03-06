import { headers } from "next/headers";
import { serverApi } from "@/lib/api";
import LandingClient from "./LandingClient";

export const metadata = {
  title: "Community Shelf — Discover Community Libraries",
  description: "Discover and borrow books from community libraries near you. Start your own library in minutes.",
};

export default async function LandingPage() {
  let tenants = [];
  try {
    const res = await serverApi.get("/platform/tenants/");
    tenants = res.results || res;
  } catch {
    // API might be unavailable
  }

  // Read the actual host so tenant URLs match between server & client (no hydration mismatch)
  const h = await headers();
  const host = h.get("host") || "localhost:3000";
  const protocol = host.startsWith("localhost") || host.includes("localhost:") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  return <LandingClient tenants={tenants} baseUrl={baseUrl} />;
}
