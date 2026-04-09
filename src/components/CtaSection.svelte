<script lang="ts">
  import { onMount } from 'svelte';
  import GradientButton from './ui/GradientButton.svelte';

  type CodeElement = { node: HTMLElement; x: number; y: number; };

  let container: HTMLElement;
  let codeElements: CodeElement[] = [];
  let frameId: number | null = null;
  let pointerX = 0;
  let pointerY = 0;
  let prefersReducedMotion = false;
  let sectionEl: HTMLElement;
  let visible = false;

  const codeSnippets = [
    '{ code }', '<dev/>', 'npm run', 'git push', 'async()',
    '.then()', 'useState', '[...arr]', '${var}', '=> func',
  ];

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
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { visible = true; obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(sectionEl);

    // Place exactly 10 snippets in a 5×2 grid — one per zone, no overlaps
    const cols = 5;
    const rows = 2;
    const cellW = container.offsetWidth / cols;
    const cellH = container.offsetHeight / rows;

    codeSnippets.forEach((snippet, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const x = col * cellW + cellW * 0.2 + Math.random() * cellW * 0.6;
      const y = row * cellH + cellH * 0.2 + Math.random() * cellH * 0.6;
      const el = createCodeElement(x, y, snippet);
      container.appendChild(el.node);
      codeElements.push(el);
    });

    if (!prefersReducedMotion) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      obs.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  });
</script>

<section class="cta-section py-24 relative overflow-hidden" bind:this={sectionEl} id="contact">
  <!-- Particle/star field (CSS only) -->
  <div class="star-field absolute inset-0 pointer-events-none"></div>

  <!-- Interactive code elements -->
  <div
    bind:this={container}
    class="absolute inset-0 overflow-hidden"
  ></div>

  <div class="relative z-10 container mx-auto px-4">
    <div class="max-w-4xl mx-auto">

      <!-- Terminal card -->
      <div class="terminal-card reveal" class:visible>
        <!-- Title bar -->
        <div class="terminal-bar">
          <div class="flex items-center gap-2">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
          </div>
          <span class="terminal-title text-xs font-mono text-white/50 ml-3">new-project.sh</span>
        </div>

        <!-- Content -->
        <div class="p-8 md:p-14 text-center">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-mono mb-8 badge-aurora">
            <span style="color: #a855f7">$</span>
            <span class="text-blue-200/80">./start-collaboration.sh</span>
          </div>

          <!-- Heading with kinetic gradient -->
          <h2 class="cta-heading text-4xl md:text-5xl font-bold mb-6 tracking-tight reveal" class:visible style="transition-delay: 100ms">
            Ready to Build Something Amazing?
          </h2>

          <p class="text-lg text-blue-100/65 mb-12 max-w-2xl mx-auto reveal" class:visible style="transition-delay: 200ms">
            Let's transform your ideas into reality. Our team of expert developers is ready to bring your vision to life.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center reveal" class:visible style="transition-delay: 300ms">
            <GradientButton href="/contact">
              dropUsALine
              <i class="ph ph-paper-plane-right ml-2 group-hover:translate-x-1 transition-transform"></i>
            </GradientButton>
            <GradientButton href="/services" variant="secondary">
              exploreServices
              <i class="ph ph-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
            </GradientButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .cta-section {
    background: var(--dark-1);
  }

  /* CSS-only star field */
  .star-field {
    background-image:
      radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.3) 0%, transparent 100%),
      radial-gradient(1px 1px at 30% 60%, rgba(255,255,255,0.2) 0%, transparent 100%),
      radial-gradient(1px 1px at 50% 10%, rgba(255,255,255,0.3) 0%, transparent 100%),
      radial-gradient(1px 1px at 70% 40%, rgba(255,255,255,0.2) 0%, transparent 100%),
      radial-gradient(1px 1px at 90% 80%, rgba(255,255,255,0.25) 0%, transparent 100%),
      radial-gradient(1px 1px at 20% 90%, rgba(255,255,255,0.15) 0%, transparent 100%),
      radial-gradient(1px 1px at 80% 15%, rgba(255,255,255,0.2) 0%, transparent 100%),
      radial-gradient(1px 1px at 45% 75%, rgba(255,255,255,0.15) 0%, transparent 100%),
      radial-gradient(1px 1px at 60% 55%, rgba(255,255,255,0.2) 0%, transparent 100%);
  }

  .terminal-card {
    background: rgba(8, 8, 16, 0.75);
    backdrop-filter: blur(24px) saturate(200%);
    border: 1px solid rgba(124,58,237,0.3);
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 0 32px rgba(124,58,237,0.12), 0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05);
  }

  .terminal-bar {
    background: rgba(20, 20, 35, 0.9);
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(124,58,237,0.2);
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  .dot-red    { background: #ff5f56; }
  .dot-yellow { background: #ffbd2e; }
  .dot-green  { background: #27c93f; }

  .badge-aurora {
    background: rgba(124,58,237,0.12);
    border: 1px solid rgba(124,58,237,0.3);
    backdrop-filter: blur(8px);
  }

  .cta-heading {
    background: linear-gradient(135deg, #fff 0%, #c4b5fd 50%, #93c5fd 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }

  .code-element {
    color: rgba(124, 58, 237, 0.2);
    padding: 0.4rem 0.8rem;
    border-radius: 0.5rem;
    background: rgba(124, 58, 237, 0.05);
    border: 1px solid rgba(124, 58, 237, 0.1);
    cursor: default;
    user-select: none;
  }

@media (prefers-reduced-motion: reduce) {
    .terminal-card { transition: none; }
  }
</style>
