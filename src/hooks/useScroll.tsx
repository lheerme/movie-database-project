import { useEffect, useState } from "react";

export function useScroll(threshold: number) {
  const [isScroll, setIsScroll] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsScroll(window.scrollY > threshold);
    }

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScroll
}