"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const RouterLogger = () => {
  const prevPath = useRef<string | null>(null);
  const startTime = useRef<number>(0);

  const pathname = usePathname();

  useEffect(() => {
    // On route change start
    if (prevPath.current !== pathname) {
      if (prevPath.current !== null) {
        const duration = performance.now() - startTime.current;
        // Log the previous route and the time it took to load the new route
        // (from when the pathname changed to when the component rendered)
        // You can adjust this logic as needed for your use case
        // For more accurate timings, consider using Next.js route events in the client
        // but with App Router, this is a simple approach
        // eslint-disable-next-line no-console
        console.log(
          `[RouterLogger] Route "${prevPath.current}" -> "${pathname}" loaded in ${duration.toFixed(2)} ms`
        );
      }
      startTime.current = performance.now();
      prevPath.current = pathname;
    }
  }, [pathname]);

  return null;
};

export default RouterLogger;