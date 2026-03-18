import { useEffect, useState } from "react";

export function useSidebarWidth () {
  
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
  const sidebar = document.querySelector('[data-sidebar]');
  if (!sidebar) return;

  const observer = new ResizeObserver(([entry]) => {
    setWidth(entry.contentRect.width);
  });

  observer.observe(sidebar);

  return () => observer.disconnect();
}, []);

  return { width };
}