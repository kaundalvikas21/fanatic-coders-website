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
  let frameId: number | null = null;
  let pointerX = 0;
  let pointerY = 0;
  let prefersReducedMotion = false;
  
  const codeSnippets = [
    'async connect()',
    'import future',
    'export success',
    'await response',
    'new Project()',
    'git commit',
    'deploy()',
    'function init()',
    'const future =',
    '=> success',
    'class Dream',
    'build()',
    'render()',
    'start()',
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
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const gridSize = 15;
    const spacing = container.offsetWidth / gridSize;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (Math.random() > 0.85) {
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
    }

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  });
</script>

<section class="py-24 relative overflow-hidden">
  <!-- Interactive Background -->
  <div 
    bind:this={container}
    class="absolute inset-0 overflow-hidden opacity-30"
  >
  </div>

  <!-- Gradient Overlays -->
  <div class="absolute inset-0 bg-gradient-radial"></div>
  <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.05),transparent_50%)]"></div>

  <div class="container mx-auto px-4 relative z-10">
    <div class="max-w-4xl mx-auto">
      <!-- Terminal-style Card -->
      <div class="terminal-card">
        <!-- Title Bar -->
        <div class="terminal-title-bar">
          <div class="window-controls">
            <span class="control close"></span>
            <span class="control minimize"></span>
            <span class="control maximize"></span>
          </div>
          <div class="terminal-title">new-project.sh</div>
        </div>

        <!-- Content -->
        <div class="p-8 md:p-12 text-center">
          <div class="inline-flex items-center justify-center px-4 py-1 rounded-full text-sm font-mono mb-6 gradient-border">
            <span class="text-indigo-400 mr-2">$</span>
            <span class="text-blue-300">./start-collaboration.sh</span>
          </div>

          <h2 class="text-4xl md:text-5xl font-bold mb-6 bg-gradient-text">
            Ready to Build Something Amazing?
          </h2>

          <p class="text-xl text-blue-100/70 mb-12 max-w-2xl mx-auto">
            Let's transform your ideas into reality. Our team of expert developers is ready to bring your vision to life.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
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
  .terminal-card {
    background: rgba(15, 15, 26, 0.95);
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(79, 70, 229, 0.2);
    backdrop-filter: blur(12px);
  }

  .terminal-title-bar {
    background: rgba(35, 35, 45, 0.95);
    padding: 0.75rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(79, 70, 229, 0.2);
  }

  .window-controls {
    display: flex;
    gap: 0.5rem;
    margin-right: 1rem;
  }

  .control {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .close {
    background: #ff5f56;
  }

  .minimize {
    background: #ffbd2e;
  }

  .maximize {
    background: #27c93f;
  }

  .terminal-title {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.875rem;
    font-family: monospace;
  }

  .gradient-border {
    background: rgba(79, 70, 229, 0.1);
    border: 1px solid rgba(79, 70, 229, 0.3);
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

  .bg-gradient-text {
    background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .bg-gradient-radial {
    background: radial-gradient(
      circle at center,
      transparent 0%,
      rgba(15, 15, 26, 0.8) 100%
    );
  }
</style>
