'use client';

import { useEffect, useRef } from 'react';

const codeSnippets = [
  'export *',
  'import',
  'const',
  'class',
  'function',
  'return',
  'await',
  'async',
  'let',
  '=>',
];

export default function FooterBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const gridSize = 10;
    const spacing = container.offsetWidth / gridSize;
    const elements: HTMLElement[] = [];
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (Math.random() > 0.85) {
          const el = document.createElement('div');
          el.className = 'absolute text-sm font-mono';
          el.style.left = `${i * spacing + Math.random() * 20}px`;
          el.style.top = `${j * spacing + Math.random() * 20}px`;
          el.style.color = 'rgba(124,58,237,0.2)';
          el.style.padding = '0.4rem 0.8rem';
          el.style.borderRadius = '0.5rem';
          el.style.background = 'rgba(124,58,237,0.04)';
          el.style.border = '1px solid rgba(124,58,237,0.1)';
          el.style.cursor = 'default';
          el.style.userSelect = 'none';
          el.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
          container.appendChild(el);
          elements.push(el);
        }
      }
    }
    return () => elements.forEach((el) => el.remove());
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden opacity-[0.08]"
    />
  );
}
