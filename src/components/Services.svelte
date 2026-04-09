<script lang="ts">
  import { onMount } from 'svelte';

  const services = [
    {
      id: 'full-stack',
      title: 'Full Stack Development',
      description: 'End-to-end solutions from frontend to backend. We architect, build, and deploy complete digital products using modern tech stacks.',
      icon: 'ph ph-stack ph-bold',
      features: ['Frontend', 'Backend', 'APIs', 'Cloud'],
      accent: 'violet',
      size: 'featured',
      codeSnippet: [
        { kw: 'const', rest: ' stack = {', kwColor: '#a855f7', val: '', valColor: '' },
        { kw: '',  rest: '  frontend:', kwColor: '', val: " 'React'",   valColor: '#34d399' },
        { kw: '',  rest: '  backend:', kwColor: '',  val: " 'Node.js'", valColor: '#60a5fa' },
        { kw: '',  rest: '  deploy:', kwColor: '',   val: " 'Cloud'",   valColor: '#f97316' },
        { kw: '', rest: '};', kwColor: '', val: '', valColor: '' },
      ],
    },
    {
      id: 'web-design',
      title: 'Web Design & Development',
      description: 'Modern, responsive websites that perform beautifully on every device.',
      icon: 'ph ph-layout ph-bold',
      features: ['UI Design', 'Responsive', 'Performance', 'SEO'],
      accent: 'blue',
      size: 'normal',
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce',
      description: 'Custom stores built to convert — from product listing to checkout.',
      icon: 'ph ph-shopping-cart ph-bold',
      features: ['Custom Stores', 'Payments', 'Inventory', 'Analytics'],
      accent: 'cyan',
      size: 'normal',
    },
    {
      id: 'digital-branding',
      title: 'Digital Branding & Marketing',
      description: 'Data-driven brand strategy and campaigns that connect and convert.',
      icon: 'ph ph-trend-up ph-bold',
      features: ['Brand Strategy', 'Social Media', 'Content', 'Analytics'],
      accent: 'green',
      size: 'normal',
    },
    {
      id: 'seo-ppc',
      title: 'SEO & PPC',
      description: 'Organic and paid strategies that drive the right traffic to your site.',
      icon: 'ph ph-chart-line-up ph-bold',
      features: ['Technical SEO', 'Content SEO', 'Ad Campaigns', 'Analytics'],
      accent: 'violet',
      size: 'normal',
    },
    {
      id: 'open-source',
      title: 'Open Source',
      description: 'Leverage open-source power with custom plugins, integrations, and security.',
      icon: 'ph ph-code ph-bold',
      features: ['Custom Plugins', 'API Integration', 'Performance', 'Security'],
      accent: 'blue',
      size: 'normal',
    },
  ];

  type AccentKey = 'violet' | 'blue' | 'cyan' | 'green';

  const accentMap: Record<AccentKey, { border: string; icon: string; glow: string; tag: string }> = {
    violet: {
      border: 'rgba(124,58,237,0.22)',
      icon: 'rgba(124,58,237,0.10)',
      glow: '0 0 18px rgba(124,58,237,0.09), inset 0 1px 0 rgba(255,255,255,0.05)',
      tag: 'rgba(124,58,237,0.08)',
    },
    blue: {
      border: 'rgba(37,99,235,0.22)',
      icon: 'rgba(37,99,235,0.10)',
      glow: '0 0 18px rgba(37,99,235,0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
      tag: 'rgba(37,99,235,0.08)',
    },
    cyan: {
      border: 'rgba(6,182,212,0.22)',
      icon: 'rgba(6,182,212,0.10)',
      glow: '0 0 18px rgba(6,182,212,0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
      tag: 'rgba(6,182,212,0.08)',
    },
    green: {
      border: 'rgba(16,185,129,0.22)',
      icon: 'rgba(16,185,129,0.10)',
      glow: '0 0 18px rgba(16,185,129,0.09), inset 0 1px 0 rgba(255,255,255,0.05)',
      tag: 'rgba(16,185,129,0.08)',
    },
  };

  const iconColorMap: Record<AccentKey, string> = {
    violet: '#a855f7',
    blue:   '#60a5fa',
    cyan:   '#22d3ee',
    green:  '#34d399',
  };

  let sectionEl: HTMLElement;
  let visible = false;


  function getAccent(name: string) {
    return accentMap[name as AccentKey] ?? accentMap.violet;
  }
  function getIconColor(name: string) {
    return iconColorMap[name as AccentKey] ?? iconColorMap.violet;
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

<section class="services-section py-24 relative overflow-hidden section-bg" id="services" bind:this={sectionEl}>
  <div class="aurora-bg-section absolute inset-0 pointer-events-none"></div>
  <div class="dot-grid absolute inset-0 pointer-events-none opacity-40"
       style="mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent 70%);">
  </div>

  <div class="container mx-auto px-4">
    <div class="text-center mb-14 reveal" class:visible>
      <div class="preheading-code">services.module.ts</div>
      <h2 class="heading-code mt-2">
        export class <span class="text-aurora-violet-light">DigitalServices</span>
      </h2>
      <p class="subheading-code mt-3">// Transforming ideas into digital reality</p>
    </div>

    <!-- Bento: 4 cols, 2 rows, NO row-span anywhere -->
    <div class="services-bento max-w-7xl mx-auto">
      {#each services as service, i}
        {@const accent = getAccent(service.accent)}
        {@const iconColor = getIconColor(service.accent)}
        <div
          class="bento-card rounded-2xl reveal"
          class:visible
          class:card-featured={service.size === 'featured'}
          style="
            --accent-border: {accent.border};
            --accent-icon:   {accent.icon};
            --accent-glow:   {accent.glow};
            --accent-tag:    {accent.tag};
            --icon-color:    {iconColor};
            transition-delay: {i * 55}ms;
          "
        >
          {#if service.size === 'featured'}
            <!-- Featured card: horizontal split — content left, code right -->
            <div class="featured-inner">
              <div class="featured-content">
                <div class="flex items-center gap-3 mb-5">
                  <div class="icon-box w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i class="{service.icon} text-lg" style="color: {iconColor}"></i>
                  </div>
                  <span class="featured-badge text-[11px] font-mono px-2.5 py-1 rounded-full"
                        style="color: {iconColor}; border-color: {accent.border}; background: {accent.tag}">
                    featured
                  </span>
                </div>
                <h3 class="text-xl font-bold text-white mb-2.5 leading-tight">{service.title}</h3>
                <p class="text-blue-100/60 text-sm leading-relaxed mb-5">{service.description}</p>
                <div class="flex flex-wrap gap-2 mb-5">
                  {#each service.features as feature}
                    <span class="feature-tag text-xs px-3 py-1 rounded-full font-mono" style="color: {iconColor}">
                      {feature}
                    </span>
                  {/each}
                </div>
                <a href="/services/{service.id}"
                   class="view-link text-sm font-semibold inline-flex items-center gap-2"
                   style="color: {iconColor}">
                  viewDetails <i class="ph ph-arrow-right"></i>
                </a>
              </div>

              <!-- Code decoration panel -->
              <div class="featured-code-panel" aria-hidden="true">
                <div class="code-window">
                  <div class="code-titlebar">
                    <span class="dot dot-r"></span>
                    <span class="dot dot-y"></span>
                    <span class="dot dot-g"></span>
                    <span class="code-filename ml-2 text-white/30 text-[10px] font-mono">stack.config.ts</span>
                  </div>
                  <div class="code-body font-mono text-xs leading-relaxed">
                    {#if service.codeSnippet}
                      {#each service.codeSnippet as line}
                        <div>
                          {#if line.kw}<span style="color: {line.kwColor}">{line.kw}</span>{/if}
                          <span class="text-blue-100/45">{line.rest}</span>
                          {#if line.val}<span style="color: {line.valColor}">{line.val}</span><span class="text-blue-100/35">,</span>{/if}
                        </div>
                      {/each}
                    {/if}
                  </div>
                </div>
              </div>
            </div>

          {:else}
            <!-- Normal card: stacked -->
            <div class="normal-inner">
              <div class="icon-box w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                <i class="{service.icon} text-base" style="color: {iconColor}"></i>
              </div>
              <h3 class="text-[15px] font-bold text-white mb-2 leading-snug">{service.title}</h3>
              <p class="text-blue-100/55 text-xs leading-relaxed mb-4 flex-1">{service.description}</p>
              <div class="flex flex-wrap gap-1.5">
                {#each service.features as feature}
                  <span class="feature-tag text-[11px] px-2.5 py-0.5 rounded-full font-mono"
                        style="color: {iconColor}">
                    {feature}
                  </span>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .services-section { background: var(--dark-1); }

  /* 4 cols, 2 rows, NO row-span */
  .services-bento {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto auto;
    gap: 10px;
  }

  /* Explicit placement: featured spans cols 1-2, row 1 */
  .bento-card.card-featured    { grid-column: 1 / 3; grid-row: 1; }
  .bento-card:nth-child(2)     { grid-column: 3;     grid-row: 1; }
  .bento-card:nth-child(3)     { grid-column: 4;     grid-row: 1; }
  .bento-card:nth-child(4)     { grid-column: 1;     grid-row: 2; }
  .bento-card:nth-child(5)     { grid-column: 2;     grid-row: 2; }
  .bento-card:nth-child(6)     { grid-column: 3 / 5; grid-row: 2; }

  /* Card base */
  .bento-card {
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid var(--accent-border);
    box-shadow: none;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .bento-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle 1px, rgba(255,255,255,0.04) 1px, transparent 0);
    background-size: 18px 18px;
    pointer-events: none;
    border-radius: inherit;
  }

  .bento-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--accent-glow);
  }

  /* Featured card: horizontal two-panel layout */
  .featured-inner {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 26px;
    height: 100%;
  }

  .featured-content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  .featured-code-panel {
    width: 190px;
    flex-shrink: 0;
  }

  .featured-badge {
    border: 1px solid;
    letter-spacing: 0.06em;
    text-transform: lowercase;
  }

  /* Mini code window */
  .code-window {
    background: rgba(0,0,0,0.45);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 8px;
    overflow: hidden;
  }

  .code-titlebar {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 7px 10px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    background: rgba(255,255,255,0.02);
  }

  .dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
  .dot-r { background: #ff5f56; }
  .dot-y { background: #ffbd2e; }
  .dot-g { background: #27c93f; }

  .code-body {
    padding: 12px 14px;
    color: rgba(255,255,255,0.4);
    line-height: 1.8;
  }

  /* Normal card */
  .normal-inner {
    padding: 22px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  /* Shared */
  .icon-box {
    background: var(--accent-icon);
    border: 1px solid var(--accent-border);
    flex-shrink: 0;
  }

  .feature-tag {
    background: var(--accent-tag);
    border: 1px solid var(--accent-border);
  }

  .view-link {
    text-decoration: none;
    opacity: 0.75;
    transition: gap 0.2s ease, opacity 0.2s ease;
    margin-top: auto;
  }

  .view-link:hover { gap: 8px; opacity: 1; }

  .text-aurora-violet-light { color: #a855f7; }

  /* Tablet */
  @media (max-width: 1024px) {
    .services-bento { grid-template-columns: repeat(2, 1fr); }

    .bento-card.card-featured { grid-column: 1 / 3; grid-row: 1; }
    .bento-card:nth-child(2)  { grid-column: 1;     grid-row: 2; }
    .bento-card:nth-child(3)  { grid-column: 2;     grid-row: 2; }
    .bento-card:nth-child(4)  { grid-column: 1;     grid-row: 3; }
    .bento-card:nth-child(5)  { grid-column: 2;     grid-row: 3; }
    .bento-card:nth-child(6)  { grid-column: 1 / 3; grid-row: 4; }

    .featured-code-panel { width: 150px; }
  }

  /* Mobile */
  @media (max-width: 640px) {
    .services-bento { grid-template-columns: 1fr; }

    .bento-card,
    .bento-card.card-featured,
    .bento-card:nth-child(n) {
      grid-column: 1 !important;
      grid-row: auto !important;
    }

    .featured-inner { flex-direction: column; gap: 14px; }
    .featured-code-panel { width: 100%; }
  }

  @media (prefers-reduced-motion: reduce) {
    .bento-card { transition: none !important; }
  }
</style>
