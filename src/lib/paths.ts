/**
 * Utility to prefix asset paths with the base path when deployed to GitHub Pages.
 * Works with Vite's BASE_URL.
 */
export function getAssetPath(path: string): string {
  const baseUrl = import.meta.env.BASE_URL || "/";
  
  // If the path is already an absolute URL or doesn't start with a slash, return as is
  if (!path.startsWith("/") || path.startsWith("//")) {
    return path;
  }

  // Ensure we don't double up on slashes if baseUrl is "/" or ends with "/"
  const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  
  return `${cleanBaseUrl}${path}`;
}
