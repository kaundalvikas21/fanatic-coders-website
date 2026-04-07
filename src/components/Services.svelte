<script lang="ts">
  import { onMount } from 'svelte';

  const services = [
    {
      id: 'full-stack',
      title: 'Full Stack Development',
      description: 'End-to-end development solutions with modern tech stack. From frontend to backend, we build complete solutions that power your digital presence.',
      icon: 'ph ph-stack ph-bold',
      features: ['Frontend', 'Backend', 'APIs', 'Cloud'],
      accent: 'violet',
      size: 'featured',
    },
    {
      id: 'web-design',
      title: 'Web Design & Development',
      description: 'Modern, responsive websites that work seamlessly across all devices.',
      icon: 'ph ph-layout ph-bold',
      features: ['UI Design', 'Responsive', 'Performance', 'SEO Ready'],
      accent: 'blue',
      size: 'normal',
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce',
      description: 'Custom stores that drive sales with seamless user experience.',
      icon: 'ph ph-shopping-cart ph-bold',
      features: ['Custom Stores', 'Payments', 'Inventory', 'Analytics'],
      accent: 'cyan',
      size: 'normal',
    },
    {
      id: 'digital-branding',
      title: 'Digital Branding & Marketing',
      description: 'Strategic digital presence with data-driven marketing that elevates your brand.',
      icon: 'ph ph-trend-up ph-bold',
      features: ['Brand Strategy', 'Social Media', 'Content', 'Analytics'],
      accent: 'green',
      size: 'wide',
    },
    {
      id: 'seo-ppc',
      title: 'SEO & PPC',
      description: 'Search optimization and paid advertising that drives qualified traffic.',
      icon: 'ph ph-chart-line-up ph-bold',
      features: ['Technical SEO', 'Content SEO', 'Ad Campaigns', 'Analytics'],
      accent: 'violet',
      size: 'normal',
    },
    {
      id: 'open-source',
      title: 'Open Source',
      description: 'Tailored open-source solutions with full control over your tech.',
      icon: 'ph ph-code ph-bold',
      features: ['Custom Plugins', 'API Integration', 'Performance', 'Security'],
      accent: 'blue',
      size: 'normal',
    },
  ];

  const accentMap: Record<string, { border: string; icon: string; glow: string; tag: string }> = {
    violet: {
      border: 'rgba(124,58,237,0.3)',
      icon: 'rgba(124,58,237,0.15)',
      glow: '0 0 40px rgba(124,58,237,0.15), inset 0 1px 0 rgba(255,255,255,0.06)',
      tag: 'rgba(124,58,237,0.12)',
    },
    blue: {
      border: 'rgba(37,99,235,0.3)',
      icon: 'rgba(37,99,235,0.15)',
      glow: '0 0 40px rgba(37,99,235,0.15), inset 0 1px 0 rgba(255,255,255,0.06)',
      tag: 'rgba(37,99,235,0.12)',
    },
    cyan: {
      border: 'rgba(6,182,212,0.3)',
      icon: 'rgba(6,182,212,0.15)',
      glow: '0 0 40px rgba(6,182,212,0.15), inset 0 1px 0 rgba(255,255,255,0.06)',
      tag: 'rgba(6,182,212,0.12)',
    },
    green: {
      border: 'rgba(16,185,129,0.3)',
      icon: 'rgba(16,185,129,0.15)',
      glow: '0 0 40px rgba(16,185,129,0.15), inset 0 1px 0 rgba(255,255,255,0.06)',
      tag: 'rgba(16,185,129,0.12)',
    },
  };

  const iconColorMap: Record<string, string> = {
    violet: '#a855f7',
    blue: '#60a5fa',
    cyan: '#22d3ee',
    green: '#34d399',
  };

  let sectionEl: HTMLElement;
  let visible = false;

  onMount(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { visible = true; obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(sectionEl);
    return () => obs.disconnect();
  });
</script>

<section class="services-section py-28 relative overflow-hidden section-bg" id="services" bind:this={sectionEl}>
  <!-- Aurora mesh (subtle, static) -->
  <div class="aurora-bg-section absolute inset-0 pointer-events-none"></div>
  <div class="dot-grid absolute inset-0 pointer-events-none opacity-40"
       style="mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent 70%);">
  </div>

  <div class="container mx-auto px-4">
    <!-- Header -->
    <div class="text-center mb-16 reveal" class:visible>
      <div class="preheading-code">services.module.ts</div>
      <h2 class="heading-code mt-2">
        export class <span class="text-aurora-violet-light">DigitalServices</span>
      </h2>
      <p class="subheading-code mt-3">// Transforming ideas into digital reality</p>
    </div>

    <!-- Bento grid -->
    <div class="services-bento max-w-7xl mx-auto">
      {#each services as service, i}
        {@const accent = accentMap[service.accent]}
        {@const iconColor = iconColorMap[service.accent]}
        <div
          class="bento-card rounded-2xl p-7 card-lift reveal reveal-stagger"
          class:visible
          class:bento-featured={service.size === 'featured'}
          class:bento-wide={service.size === 'wide'}
          style="
            --accent-border: {accent.border};
            --accent-icon: {accent.icon};
            --accent-glow: {accent.glow};
            --accent-tag: {accent.tag};
            --icon-color: {iconColor};
            transition-delay: {i * 60}ms;
          "
        >
          <!-- Icon -->
          <div class="icon-box w-12 h-12 rounded-xl flex items-center justify-center mb-5">
            <i class="{service.icon} text-xl" style="color: {iconColor}"></i>
          </div>

          <!-- Title -->
          <h3 class="text-xl font-bold mb-3 text-white" class:text-2xl={service.size === 'featured'}>
            {service.title}
          </h3>

          <!-- Description -->
          <p class="text-blue-100/60 text-sm leading-relaxed mb-5">
            {service.description}
          </p>

          <!-- Feature tags -->
          <div class="flex flex-wrap gap-2">
            {#each service.features as feature}
              <span class="feature-tag text-xs px-3 py-1 rounded-full font-mono" style="color: {iconColor}">
                {feature}
              </span>
            {/each}
          </div>

          <!-- Arrow (featured card) -->
          {#if service.size === 'featured'}
            <a
              href="/services/{service.id}"
              class="view-link mt-6 inline-flex items-center gap-2 text-sm font-semibold"
              style="color: {iconColor}"
            >
              viewDetails <i class="ph ph-arrow-right"></i>
            </a>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .services-section {
    background: var(--dark-2);
  }

  .services-bento {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: auto;
    gap: 12px;
  }

  .bento-card {
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid var(--accent-border);
    box-shadow: var(--accent-glow);
    position: relative;
    overflow: hidden;
  }

  /* AI-native subtle texture on each card */
  .bento-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle 1px, rgba(255,255,255,0.05) 1px, transparent 0);
    background-size: 20px 20px;
    pointer-events: none;
    border-radius: inherit;
  }

  .bento-featured {
    grid-column: span 2;
    grid-row: span 2;
  }

  .bento-wide {
    grid-column: span 2;
  }

  .icon-box {
    background: var(--accent-icon);
    border: 1px solid var(--accent-border);
  }

  .feature-tag {
    background: var(--accent-tag);
    border: 1px solid var(--accent-border);
  }

  .view-link {
    text-decoration: none;
    transition: gap 0.2s ease, opacity 0.2s ease;
    opacity: 0.8;
  }

  .view-link:hover {
    gap: 8px;
    opacity: 1;
  }

  /* Aurora accent colors */
  .text-aurora-violet-light { color: #a855f7; }

  @media (max-width: 1024px) {
    .services-bento {
      grid-template-columns: repeat(2, 1fr);
    }
    .bento-featured {
      grid-column: span 2;
      grid-row: span 1;
    }
  }

  @media (max-width: 640px) {
    .services-bento {
      grid-template-columns: 1fr;
    }
    .bento-featured, .bento-wide {
      grid-column: span 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bento-card { transition: none !important; }
  }
</style>
