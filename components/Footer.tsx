"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full py-6 text-center text-sm tracking-tighter text-neutral-400 dark:text-neutral-600 font-mono mt-auto mb-20 lg:mb-24">
      <p>&copy; {currentYear} samuel onasis</p>
    </footer>
  );
}
