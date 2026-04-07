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
  
  const impactfulTexts = [
    'npm create digital-excellence',
    'npm create impactful-solutions',
    'npm create awesome-experiences',
    'npm create digital-innovation'
  ];

  const stats = [
    { 
      number: '150+', 
      label: 'Projects Completed', 
      icon: 'ph ph-chart-bar ph-bold text-4xl'
    },
    { 
      number: '98%', 
      label: 'Client Satisfaction', 
      icon: 'ph ph-target ph-bold text-4xl'
    },
    { 
      number: '10+', 
      label: 'Years Experience', 
      icon: 'ph ph-lightning ph-bold text-4xl'
    },
    { 
      number: '24/7', 
      label: 'Support Available', 
      icon: 'ph ph-wrench ph-bold text-4xl'
    }
  ];
  
  const codeSnippets = [
    '{ code }',
    '<dev/>',
    'npm run',
    'git push',
    '=> func',
    'export *',
    'import',
    'async()',
    'props:{}',
    '.then()',
    'useState',
    'useEffect',
    '[...arr]',
    '&&',
    '=>',
    '||',
    '??',
    '${var}',
    '#!/bin',
    'sudo',
  ];

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
        
        node.style.transform = `
          translate(
            ${-Math.cos(angle) * push}px,
            ${-Math.sin(angle) * push}px
          )
          scale(${1 + scale * 0.2})
        `;
        node.style.opacity = (0.3 + scale * 0.7).toString();
      } else {
        node.style.transform = 'translate(0, 0) scale(1)';
        node.style.opacity = '0.3';
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
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  });
</script>

<div class="relative min-h-screen overflow-hidden bg-gradient">
  <!-- Code Background -->
  <div 
    bind:this={container}
    class="absolute inset-0 overflow-hidden opacity-30"
    style="mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);"
  >
  </div>

  <!-- Gradient Overlays -->
  <div class="absolute inset-0 bg-gradient-radial"></div>

  <!-- Main Content -->
  <div class="relative z-10 container mx-auto px-4 pt-32 pb-24">
    <div class="max-w-4xl mx-auto text-center">
      <div class="mb-8 floating">
        <div class="terminal-window inline-flex items-center px-6 py-3 rounded-lg bg-opacity-20 backdrop-blur-sm border border-indigo-500/20">
          <span class="text-indigo-400 mr-2">$</span>
          <span class="text-blue-300 font-mono">{terminalText}</span>
          <span class="cursor">|</span>
        </div>
      </div>
      
      <h1 class="text-5xl md:text-7xl font-bold mb-6 text-white">
        We Create
        <span class="animated-gradient-text">Digital Experiences</span>
        <br />That Matter
      </h1>
      
      <p class="text-xl md:text-2xl text-blue-100/80 mb-12 max-w-2xl mx-auto">
        Expert web design, development, and digital marketing solutions that drive growth and deliver exceptional results.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <GradientButton href="/contact">
          startProject
          <i class="ph ph-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
        </GradientButton>
        
        <GradientButton href="#services" variant="secondary">
          exploreServices
          <i class="ph ph-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
        </GradientButton>
      </div>

      <div class="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
        {#each stats as stat}
          <div class="stats-card glass p-6 rounded-xl hover:scale-105 transform transition-all duration-300 ease-out">
            <i class="{stat.icon} mb-2 text-indigo-400"></i>
            <div class="text-3xl font-bold mb-1 animated-gradient-text">{stat.number}</div>
            <div class="text-blue-100/60 text-sm">{stat.label}</div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .bg-gradient {
    background: linear-gradient(
      135deg,
      #0f0f1a 0%,
      #1a1a2e 25%,
      #1f1f3a 50%,
      #2a2a4a 75%,
      #1a1a2e 100%
    );
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
  }

  .bg-gradient-radial {
    background: radial-gradient(
      circle at 50% 50%,
      transparent 0%,
      rgba(15, 15, 26, 0.8) 100%
    );
  }

  .code-element {
    color: rgba(79, 70, 229, 0.3);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background: rgba(79, 70, 229, 0.05);
    border: 1px solid rgba(79, 70, 229, 0.1);
    cursor: default;
    user-select: none;
  }

  .animated-gradient-text {
    background: linear-gradient(
      45deg,
      #4f46e5,
      #7c3aed,
      #2563eb,
      #4f46e5
    );
    background-size: 300% 300%;
    animation: gradient 5s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .terminal-window {
    background: rgba(15, 15, 26, 0.8);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  }

  .cursor {
    display: inline-block;
    width: 2px;
    height: 1.2em;
    background-color: #4f46e5;
    margin-left: 2px;
    animation: blink 1s step-end infinite;
  }

  .stats-card {
    background: rgba(15, 15, 26, 0.8);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    border: 1px solid rgba(79, 70, 229, 0.2);
  }

  .glass {
    backdrop-filter: blur(4px);
  }

  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .floating {
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }
</style>
