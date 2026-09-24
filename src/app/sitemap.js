import { readCollection } from "@/lib/db";

export default async function sitemap() {
  const baseUrl = "https://marktech.ke";
  const projects = readCollection("projects", []);

  const staticRoutes = ["", "/about", "/projects", "/contact", "/privacy", "/terms"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${baseUrl}/project/${p.slug || p.id}`,
    lastModified: p.updated_at || new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
