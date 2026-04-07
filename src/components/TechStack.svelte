<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  const categories = [
    {
      id: 'frontend',
      name: 'Frontend',
      icon: 'ph ph-code ph-bold',
      accent: '#7c3aed',
      technologies: [
        { name: 'React',       icon: 'ph ph-circles-three-plus' },
        { name: 'Vue.js',      icon: 'ph ph-hexagon' },
        { name: 'Angular',     icon: 'ph ph-shield' },
        { name: 'Svelte',      icon: 'ph ph-infinity' },
        { name: 'Next.js',     icon: 'ph ph-arrow-fat-right' },
        { name: 'TypeScript',  icon: 'ph ph-brackets-curly' },
        { name: 'Tailwind CSS',icon: 'ph ph-wind' },
        { name: 'SASS',        icon: 'ph ph-paint-brush' }
      ]
    },
    {
      id: 'backend',
      name: 'Backend',
      icon: 'ph ph-database ph-bold',
      accent: '#2563eb',
      technologies: [
        { name: 'Node.js',     icon: 'ph ph-gear' },
        { name: 'Python',      icon: 'ph ph-file-py' },
        { name: 'Django',      icon: 'ph ph-leaf' },
        { name: 'Laravel',     icon: 'ph ph-fire' },
        { name: 'PostgreSQL',  icon: 'ph ph-database' },
        { name: 'MongoDB',     icon: 'ph-fill ph-leaf' },
        { name: 'GraphQL',     icon: 'ph ph-graph' },
        { name: 'Redis',       icon: 'ph ph-lightning' }
      ]
    },
    {
      id: 'ai-ml',
      name: 'AI & ML',
      icon: 'ph ph-brain ph-bold',
      accent: '#06b6d4',
      technologies: [
        { name: 'TensorFlow',  icon: 'ph ph-flow-arrow' },
        { name: 'PyTorch',     icon: 'ph ph-flame' },
        { name: 'Scikit-learn',icon: 'ph ph-chart-scatter' },
        { name: 'OpenAI',      icon: 'ph ph-robot' },
        { name: 'Keras',       icon: 'ph ph-brain' },
        { name: 'Pandas',      icon: 'ph ph-table' },
        { name: 'NumPy',       icon: 'ph ph-function' },
        { name: 'Jupyter',     icon: 'ph ph-notebook' }
      ]
    },
    {
      id: 'digital',
      name: 'Digital Marketing',
      icon: 'ph ph-chart-line-up ph-bold',
      accent: '#10b981',
      technologies: [
        { name: 'Google Ads',      icon: 'ph ph-target' },
        { name: 'Google Analytics',icon: 'ph ph-chart-bar' },
        { name: 'Meta Ads',        icon: 'ph ph-share-network' },
        { name: 'Mailchimp',       icon: 'ph ph-envelope' },
        { name: 'HubSpot',         icon: 'ph ph-funnel' },
        { name: 'Semrush',         icon: 'ph ph-magnifying-glass' },
        { name: 'Ahrefs',          icon: 'ph ph-link' },
        { name: 'Moz',             icon: 'ph ph-chart-line' }
      ]
    }
  ];

  let activeCategory = categories[0];
  let sectionEl: HTMLElement;
  let visible = false;

  function setActiveCategory(category: typeof categories[0]) {
    activeCategory = category;
  }

  onMount(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { visible = true; obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(sectionEl);
    return () => obs.disconnect();
  });
</script>

<section class="techstack-section py-28 relative overflow-hidden" bind:this={sectionEl} id="tech-stack">
  <!-- Background -->
  <div class="absolute inset-0" style="background: var(--dark-2);"></div>
  <div class="aurora-bg-section absolute inset-0 pointer-events-none"></div>
  <div class="dot-grid absolute inset-0 pointer-events-none opacity-35"
       style="mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent 70%);">
  </div>

  <div class="relative z-10 container mx-auto px-4">
    <!-- Header -->
    <div class="text-center mb-16 reveal" class:visible>
      <div class="preheading-code">tech.stack</div>
      <h2 class="heading-code mt-2">
        our.<span style="color: #a855f7">technologies</span>()
      </h2>
      <p class="subheading-code mt-3">
        // Tools and technologies we use to build amazing solutions
      </p>
    </div>

    <!-- Category tabs -->
    <div class="flex flex-wrap justify-center gap-3 mb-12 reveal reveal-stagger" class:visible role="tablist" aria-label="Technology categories">
      {#each categories as category}
        <button
          type="button"
          class="cat-tab flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
          class:cat-active={category === activeCategory}
          style="--cat-accent: {category.accent}"
          role="tab"
          aria-selected={category === activeCategory}
          aria-controls={`tech-category-${category.id}`}
          on:click={() => setActiveCategory(category)}
        >
          <i class="{category.icon} text-base"></i>
          {category.name}
        </button>
      {/each}
    </div>

    <!-- Tech grid -->
    {#key activeCategory.id}
      <div
        id={`tech-category-${activeCategory.id}`}
        class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        role="tabpanel"
        in:fade={{ duration: 200 }}
      >
        {#each activeCategory.technologies as tech, i}
          <div
            class="tech-card group rounded-xl p-5 card-lift-cyan"
            style="--tech-accent: {activeCategory.accent}; transition-delay: {i * 30}ms"
          >
            <div class="flex flex-col items-center gap-3">
              <div class="tech-icon w-14 h-14 rounded-xl flex items-center justify-center">
                <i class="{tech.icon} text-3xl" style="color: {activeCategory.accent}"></i>
              </div>
              <span class="text-sm text-blue-100/60 group-hover:text-white transition-colors text-center font-mono">
                {tech.name}
              </span>
            </div>
          </div>
        {/each}
      </div>
    {/key}

    <!-- Code decoration -->
    <div class="mt-14 text-center font-mono text-xs space-y-1 text-blue-100/30">
      <div>
        <span style="color: #f472b6">export default</span>
        <span style="color: #818cf8"> function</span>
        <span> buildAmazing() {`{`}</span>
      </div>
      <div class="pl-4">tools: <span style="color: #34d399">'cutting-edge'</span>,</div>
      <div class="pl-4">results: <span style="color: #60a5fa">'exceptional'</span></div>
      <div>{`}`}</div>
    </div>
  </div>
</section>

<style>
  .cat-tab {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.6);
  }

  .cat-tab:hover {
    background: rgba(255,255,255,0.07);
    color: white;
    border-color: var(--cat-accent, rgba(124,58,237,0.4));
  }

  .cat-active {
    background: color-mix(in srgb, var(--cat-accent) 15%, transparent) !important;
    border-color: color-mix(in srgb, var(--cat-accent) 50%, transparent) !important;
    color: white !important;
    box-shadow: 0 0 20px color-mix(in srgb, var(--cat-accent) 25%, transparent);
  }

  .tech-card {
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(12px) saturate(180%);
    border: 1px solid rgba(255,255,255,0.07);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  }

  .tech-card:hover {
    background: color-mix(in srgb, var(--tech-accent) 10%, rgba(255,255,255,0.04));
    border-color: color-mix(in srgb, var(--tech-accent) 40%, transparent);
    transform: translateY(-4px);
    box-shadow: 0 12px 30px color-mix(in srgb, var(--tech-accent) 20%, transparent),
                inset 0 1px 0 rgba(255,255,255,0.08);
  }

  .tech-icon {
    background: color-mix(in srgb, var(--tech-accent) 12%, transparent);
    border: 1px solid color-mix(in srgb, var(--tech-accent) 30%, transparent);
    transition: all 0.2s ease;
  }

  .tech-card:hover .tech-icon {
    background: color-mix(in srgb, var(--tech-accent) 22%, transparent);
    transform: scale(1.08);
  }

  @media (prefers-reduced-motion: reduce) {
    .tech-card { transition: none !important; }
  }
</style>
