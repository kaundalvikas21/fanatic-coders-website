<script lang="ts">
  import { onMount } from 'svelte';
  import GradientButton from './ui/GradientButton.svelte';

  type CodeElement = {
    node: HTMLElement;
    x: number;
    y: number;
  };

  let container: HTMLElement;
  let codeElements: CodeElement[] = [];
  let currentTextIndex = 0;
  let terminalText = '';
  let isMounted = false;
  let activeCycleToken = 0;
  let prefersReducedMotion = false;
  let frameId: number | null = null;
  let pointerX = 0;
  let pointerY = 0;
  let headingVisible = false;

  const impactfulTexts = [
    'npm create digital-excellence',
    'npm create impactful-solutions',
    'npm create awesome-experiences',
    'npm create digital-innovation'
  ];

  const stats = [
    { number: '150+', label: 'Projects Completed', icon: 'ph ph-chart-bar ph-bold' },
    { number: '98%',  label: 'Client Satisfaction', icon: 'ph ph-target ph-bold' },
    { number: '10+',  label: 'Years Experience',    icon: 'ph ph-lightning ph-bold' },
    { number: '24/7', label: 'Support Available',   icon: 'ph ph-wrench ph-bold' }
  ];

  const codeSnippets = [
    '{ code }', '<dev/>', 'npm run', 'git push', '=> func',
    'export *', 'import', 'async()', 'props:{}', '.then()',
    'useState', 'useEffect', '[...arr]', '&&', '=>', '||', '??',
    '${var}', '#!/bin', 'sudo',
  ];

  // Kinetic heading words
  const headingWords = ['We', 'Create', 'Digital', 'Experiences', 'That', 'Matter'];

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function typeText(text: string, cycleToken: number) {
    terminalText = '';
    for (let i = 0; i < text.length; i++) {
      if (!isMounted || cycleToken !== activeCycleToken) return;
      terminalText += text[i];
      await delay(50);
    }
    await delay(2000);
    for (let i = text.length; i >= 0; i--) {
      if (!isMounted || cycleToken !== activeCycleToken) return;
      terminalText = text.substring(0, i);
      await delay(30);
    }
  }

  async function cycleText(cycleToken: number) {
    while (isMounted && cycleToken === activeCycleToken) {
      await typeText(impactfulTexts[currentTextIndex], cycleToken);
      if (!isMounted || cycleToken !== activeCycleToken) return;
      currentTextIndex = (currentTextIndex + 1) % impactfulTexts.length;
    }
  }

  function createCodeElement(x: number, y: number, snippet: string) {
    const node = document.createElement('div');
    node.className = 'code-element absolute text-sm font-mono transition-all duration-300';
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    node.textContent = snippet;
    return { node, x, y };
  }

  function updateCodeElements() {
    frameId = null;
    codeElements.forEach(({ node, x, y }) => {
      const deltaX = pointerX - x;
      const deltaY = pointerY - y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 300;
      if (distance < maxDistance) {
        const scale = 1 - (distance / maxDistance);
        const angle = Math.atan2(deltaY, deltaX);
        const push = 40 * scale;
        node.style.transform = `translate(${-Math.cos(angle) * push}px, ${-Math.sin(angle) * push}px) scale(${1 + scale * 0.2})`;
        node.style.opacity = (0.2 + scale * 0.5).toString();
      } else {
        node.style.transform = 'translate(0, 0) scale(1)';
        node.style.opacity = '0.15';
      }
    });
  }

  function handleMouseMove(e: MouseEvent) {
    const rect = container.getBoundingClientRect();
    pointerX = e.clientX - rect.left;
    pointerY = e.clientY - rect.top;
    if (frameId === null) {
      frameId = requestAnimationFrame(updateCodeElements);
    }
  }

  onMount(() => {
    isMounted = true;
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      terminalText = impactfulTexts[0];
      headingVisible = true;
    } else {
      // Trigger heading animation after a short delay
      setTimeout(() => { headingVisible = true; }, 100);
    }

    const gridSize = 20;
    const spacing = container.offsetWidth / gridSize;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (Math.random() > 0.8) {
          const codeElement = createCodeElement(
            i * spacing + Math.random() * 20,
            j * spacing + Math.random() * 20,
            codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
          );
          container.appendChild(codeElement.node);
          codeElements.push(codeElement);
        }
      }
    }

    if (!prefersReducedMotion) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
      const cycleToken = ++activeCycleToken;
      cycleText(cycleToken);
    }

    return () => {
      isMounted = false;
      activeCycleToken += 1;
      container.removeEventListener('mousemove', handleMouseMove);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  });
</script>

<div class="hero-root relative min-h-screen overflow-hidden">
  <!-- Aurora mesh background (animated) -->
  <div class="aurora-mesh-bg absolute inset-0"></div>

  <!-- Noise texture overlay -->
  <svg class="absolute inset-0 w-full h-full opacity-[0.025] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)"/>
  </svg>

  <!-- AI-native dot grid -->
  <div class="absolute inset-0 dot-grid pointer-events-none opacity-50"
       style="mask-image: radial-gradient(circle at 50% 40%, black, transparent 70%);">
  </div>

  <!-- Code elements layer -->
  <div
    bind:this={container}
    class="absolute inset-0 overflow-hidden"
    style="mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);"
  ></div>

  <!-- Main content -->
  <div class="relative z-10 container mx-auto px-4 pt-32 pb-24">
    <div class="max-w-4xl mx-auto text-center">

      <!-- Terminal badge -->
      <div class="mb-8 terminal-float">
        <div class="terminal-window inline-flex items-center px-6 py-3 rounded-lg">
          <span class="text-aurora-cyan mr-2 font-mono">$</span>
          <span class="text-blue-300 font-mono text-sm">{terminalText}</span>
          <span class="cursor">|</span>
        </div>
      </div>

      <!-- Kinetic heading -->
      <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
        {#each headingWords as word, i}
          <span
            class="word-reveal inline-block mr-[0.25em]"
            class:visible={headingVisible}
            style="animation-delay: {i * 80}ms"
          >
            {#if word === 'Digital' || word === 'Experiences'}
              <span class="text-aurora-sweep">{word}</span>
            {:else}
              {word}
            {/if}
          </span>
        {/each}
      </h1>

      <p
        class="text-xl md:text-2xl text-blue-100/70 mb-12 max-w-2xl mx-auto subheading-reveal"
        class:visible={headingVisible}
      >
        Expert web design, development, and digital marketing solutions that drive growth and deliver exceptional results.
      </p>

      <!-- CTAs -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24">
        <a href="/contact" class="btn-aurora-solid group">
          <span>startProject</span>
          <i class="ph ph-arrow-right group-hover:translate-x-1 transition-transform"></i>
        </a>
        <a href="#services" class="btn-aurora group">
          <span>exploreServices</span>
          <i class="ph ph-arrow-right group-hover:translate-x-1 transition-transform"></i>
        </a>
      </div>

      <!-- Stats bento -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        {#each stats as stat, i}
          <div
            class="stats-card glass-card card-lift rounded-xl p-6 text-center"
            style="--stagger: {i}"
            class:visible={headingVisible}
          >
            <i class="{stat.icon} text-3xl mb-3 text-aurora-violet block"></i>
            <div class="text-3xl font-bold mb-1 text-aurora-sweep">{stat.number}</div>
            <div class="text-blue-100/55 text-sm">{stat.label}</div>
          </div>
        {/each}
      </div>

    </div>
  </div>
</div>

<style>
  .hero-root {
    background: #000000;
  }

  .aurora-mesh-bg {
    background:
      radial-gradient(ellipse 100% 70% at 12% 12%, rgba(124,58,237,0.5) 0%, transparent 55%),
      radial-gradient(ellipse 80% 60% at 88% 88%, rgba(6,182,212,0.35) 0%, transparent 55%);
    background-size: 200% 200%;
    animation: auroraShift 20s ease-in-out infinite alternate;
  }

  @keyframes auroraShift {
    0%   { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }

  .code-element {
    color: rgba(124, 58, 237, 0.25);
    padding: 0.4rem 0.8rem;
    border-radius: 0.5rem;
    background: rgba(124, 58, 237, 0.05);
    border: 1px solid rgba(124, 58, 237, 0.1);
    cursor: default;
    user-select: none;
  }

  .terminal-window {
    background: rgba(8, 8, 16, 0.85);
    backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(124, 58, 237, 0.25);
    box-shadow: 0 0 30px rgba(124,58,237,0.15), inset 0 1px 0 rgba(255,255,255,0.05);
  }

  .terminal-float {
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-12px); }
  }

  /* Kinetic word reveal */
  .word-reveal {
    opacity: 0;
    transform: translateY(32px);
  }

  .word-reveal.visible {
    animation: wordEnter 0.6s cubic-bezier(.16,1,.3,1) forwards;
  }

  @keyframes wordEnter {
    to { opacity: 1; transform: translateY(0); }
  }

  /* Subheading sweep */
  .subheading-reveal {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.7s cubic-bezier(.16,1,.3,1) 0.55s,
                transform 0.7s cubic-bezier(.16,1,.3,1) 0.55s;
  }

  .subheading-reveal.visible {
    opacity: 0.7;
    transform: translateY(0);
  }

  /* Stats card stagger */
  .stats-card {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s cubic-bezier(.16,1,.3,1),
                transform 0.5s cubic-bezier(.16,1,.3,1);
  }

  .stats-card.visible {
    opacity: 1;
    transform: translateY(0);
    transition-delay: calc(var(--stagger) * 80ms + 700ms);
  }

  /* aurora gradient text */
  .text-aurora-sweep {
    background: linear-gradient(135deg, #7c3aed, #2563eb, #06b6d4, #7c3aed);
    background-size: 300% 300%;
    animation: gradientSweep 5s ease infinite;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }

  @keyframes gradientSweep {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .text-aurora-cyan { color: #22d3ee; }
  .text-aurora-violet { color: #a855f7; }

  /* Cursor */
  .cursor {
    display: inline-block;
    width: 2px;
    height: 1.1em;
    background: #7c3aed;
    margin-left: 3px;
    vertical-align: text-bottom;
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }

  /* Button styles — re-declared here for scoping */
  .btn-aurora-solid {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 32px;
    border-radius: 8px;
    font-weight: 700;
    font-size: 0.9375rem;
    letter-spacing: -0.01em;
    background: linear-gradient(135deg, #7c3aed, #2563eb);
    color: #fff;
    box-shadow: 0 8px 32px rgba(124,58,237,0.4);
    transition: filter 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
    text-decoration: none;
  }

  .btn-aurora-solid:hover {
    filter: brightness(1.15);
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(124,58,237,0.55);
  }

  .btn-aurora {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 28px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.9375rem;
    letter-spacing: -0.01em;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(124,58,237,0.3);
    color: #fff;
    backdrop-filter: blur(12px);
    box-shadow: 0 0 30px rgba(124,58,237,0.1), inset 0 1px 0 rgba(255,255,255,0.06);
    text-decoration: none;
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
  }

  .btn-aurora:hover {
    border-color: rgba(124,58,237,0.6);
    box-shadow: 0 0 40px rgba(124,58,237,0.25), inset 0 1px 0 rgba(255,255,255,0.08);
    transform: translateY(-2px);
  }

  @media (prefers-reduced-motion: reduce) {
    .word-reveal, .subheading-reveal, .stats-card {
      opacity: 1 !important;
      transform: none !important;
      animation: none !important;
      transition: none !important;
    }
    .aurora-mesh-bg, .terminal-float, .text-aurora-sweep, .cursor {
      animation: none !important;
    }
  }
</style>
