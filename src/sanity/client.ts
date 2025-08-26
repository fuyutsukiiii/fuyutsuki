import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "8g6njlab",
  dataset: "production",
  apiVersion: "2025-06-06",
  useCdn: false,
});