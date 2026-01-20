import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://wsnsam.my.id";
  const today = new Date().toISOString().split("T")[0];

  return [
    {
      url: baseUrl,
      lastModified: today,
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: today,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
