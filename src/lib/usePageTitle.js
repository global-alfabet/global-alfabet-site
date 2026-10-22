import { useEffect } from "react";

export function usePageTitle(title, description) {
  useEffect(() => {
    document.title = title ? `${title} · Global Alfabet` : "Global Alfabet · Providing access";
    if (description) document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [title, description]);
}
