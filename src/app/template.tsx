"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * template.tsx re-monta a cada navegação (ao contrário de layout.tsx),
 * então a animação de entrada dispara em toda troca de página.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
