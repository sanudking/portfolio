import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import usePageMeta from "../hooks/usePageMeta";

/**
 * Scrolls to the top on route change and keeps page metadata in sync.
 * Rendered once inside BrowserRouter so every page benefits.
 */
export default function RouteEffects() {
  const { pathname, hash } = useLocation();

  usePageMeta(pathname);

  useEffect(() => {
    // Hash links (e.g. /#skills) handle their own scrolling.
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}
