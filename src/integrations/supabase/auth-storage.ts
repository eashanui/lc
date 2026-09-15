// Lightweight storage wrapper that keeps the app working without editor-specific preview logic.
export function brokeredPreviewStorage() {
  if (typeof window === "undefined") return undefined;

  const hasParentWindow = window.parent && window.parent !== window;
  if (!hasParentWindow) return localStorage;

  return {
    getItem: (key: string) => localStorage.getItem(key),
    setItem: (key: string, value: string) => {
      localStorage.setItem(key, value);
      return undefined;
    },
    removeItem: (key: string) => {
      localStorage.removeItem(key);
      return undefined;
    },
  };
}
