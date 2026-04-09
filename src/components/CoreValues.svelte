<script lang="ts">
  import { onMount } from 'svelte';

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

  const values = [
    {
      id: 'build',
      label: 'build()',
      title: 'Build',
      icon: 'ph ph-circles-three-plus ph-bold',
      gradient: 'from-[#f97316] to-[#ec4899]',
      borderColor: 'rgba(249,115,22,0.3)',
      glowColor: 'rgba(249,115,22,0.07)',
      tagColor: 'rgba(249,115,22,0.12)',
      iconColor: '#fb923c',
      description: 'With a dedicated team, we build exceptional projects focusing on quality, transparency, efficiency, and innovation to ensure complete client satisfaction.',
      code: [
        { keyword: 'const', text: ' approach = {', color: '#fb923c' },
        { keyword: '', text: '  quality: ', color: '#a3e635', value: "'exceptional'" },
        { keyword: '', text: '  focus: ', color: '#60a5fa', value: "'innovation'" },
        { keyword: '', text: '};', color: '' },
      ],
      size: 'wide',
    },
    {
      id: 'maintain',
      label: 'maintain()',
      title: 'Maintain',
      icon: 'ph ph-lightbulb ph-bold',
      gradient: 'from-[#7c3aed] to-[#a855f7]',
      borderColor: 'rgba(124,58,237,0.35)',
      glowColor: 'rgba(124,58,237,0.09)',
      tagColor: 'rgba(124,58,237,0.12)',
      iconColor: '#a855f7',
      description: 'We maintain websites and apps with commitment to quality, reliability, and proactive management — ensuring they run smoothly and meet ongoing client needs.',
      code: [
        { keyword: 'function', text: ' optimize() {', color: '#818cf8' },
        { keyword: '', text: '  reliability: ', color: '#a3e635', value: "'99.9%'" },
        { keyword: '', text: '  support: ', color: '#60a5fa', value: "'24/7'" },
        { keyword: '', text: '};', color: '' },
      ],
      size: 'tall',
    },
    {
      id: 'grow',
      label: 'grow()',
      title: 'Grow',
      icon: 'ph ph-chart-line-up ph-bold',
      gradient: 'from-[#10b981] to-[#06b6d4]',
      borderColor: 'rgba(16,185,129,0.3)',
      glowColor: 'rgba(16,185,129,0.07)',
      tagColor: 'rgba(16,185,129,0.12)',
      iconColor: '#34d399',
      description: 'We help businesses grow by enhancing their digital presence, optimizing performance, and driving engagement and long-term success.',
      code: [
        { keyword: 'async', text: ' function scale() {', color: '#34d399' },
        { keyword: '', text: '  growth: ', color: '#a3e635', value: "'exponential'" },
        { keyword: '', text: '  success: ', color: '#60a5fa', value: "'guaranteed'" },
        { keyword: '', text: '};', color: '' },
      ],
      size: 'wide',
    },
  ];
</script>

<section class="py-24 relative overflow-hidden" bind:this={sectionEl} id="values">
  <!-- Aurora section background -->
  <div class="absolute inset-0" style="background: var(--dark-3);"></div>
  <div class="aurora-bg-section absolute inset-0 pointer-events-none"></div>
  <div class="dot-grid absolute inset-0 pointer-events-none opacity-30"
       style="mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent 70%);">
  </div>

  <div class="relative z-10 container mx-auto px-4">
    <!-- Header -->
    <div class="text-center mb-16 reveal" class:visible>
      <div class="preheading-code">core.values</div>
      <h2 class="heading-code mt-2">
        how.<span style="color: #a855f7">weWork</span>()
      </h2>
      <p class="subheading-code mt-3">// Our approach to delivering exceptional results</p>
    </div>

    <!-- Asymmetric bento grid -->
    <div class="values-bento max-w-6xl mx-auto">
      {#each values as val, i}
        <div
          class="value-card rounded-2xl p-8 reveal"
          class:visible
          class:cell-wide={val.size === 'wide'}
          class:cell-tall={val.size === 'tall'}
          style="
            --accent-border: {val.borderColor};
            --accent-glow: 0 0 20px {val.glowColor}, inset 0 1px 0 rgba(255,255,255,0.05);
            --accent-tag: {val.tagColor};
            --icon-color: {val.iconColor};
            transition-delay: {i * 100}ms;
          "
        >
          <!-- AI dot grid texture -->
          <div class="absolute inset-0 rounded-2xl pointer-events-none"
               style="background-image: radial-gradient(circle 1px, rgba(255,255,255,0.06) 1px, transparent 0); background-size: 20px 20px;">
          </div>

          <!-- Header row -->
          <div class="relative flex items-start justify-between mb-6">
            <div class="icon-wrap w-14 h-14 rounded-xl flex items-center justify-center"
                 style="background: {val.tagColor}; border: 1px solid {val.borderColor}">
              <i class="{val.icon} text-2xl" style="color: {val.iconColor}"></i>
            </div>
            <span class="label-badge text-xs font-mono px-3 py-1 rounded-full"
                  style="background: {val.tagColor}; border: 1px solid {val.borderColor}; color: {val.iconColor}">
              {val.label}
            </span>
          </div>

          <!-- Title -->
          <h3 class="relative text-2xl font-bold mb-3"
              style="background: linear-gradient(135deg, {val.iconColor}, white 80%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent;">
            {val.title}
          </h3>

          <!-- Description -->
          <p class="relative text-blue-100/65 text-sm leading-relaxed mb-6">
            {val.description}
          </p>

          <!-- Code decoration -->
          <div class="relative font-mono text-xs space-y-1 text-blue-100/35">
            {#each val.code as line}
              {#if line.keyword}
                <div>
                  <span style="color: {val.iconColor}">{line.keyword}</span>
                  <span>{line.text}</span>
                </div>
              {:else if line.value}
                <div class="pl-4">
                  <span style="color: {line.color}">{line.text}</span>
                  <span style="color: #a3e635">{line.value}</span>
                  <span>,</span>
                </div>
              {:else}
                <div><span>{line.text}</span></div>
              {/if}
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .values-bento {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto auto;
    gap: 12px;
  }

  .value-card {
    position: relative;
    overflow: hidden;
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid var(--accent-border);
    box-shadow: none;
    transition: box-shadow 0.25s ease, transform 0.25s ease;
  }

  .value-card:hover {
    box-shadow: var(--accent-glow);
    transform: translateY(-2px);
  }

  /* Grid sizing */
  /* Build — col 1-2, row 1 */
  .values-bento > .value-card:nth-child(1) {
    grid-column: 1 / 3;
  }

  /* Maintain — col 3, row 1-2 (tall) */
  .values-bento > .value-card:nth-child(2) {
    grid-column: 3 / 4;
    grid-row: 1 / 3;
  }

  /* Grow — col 1-2, row 2 */
  .values-bento > .value-card:nth-child(3) {
    grid-column: 1 / 3;
  }

  @media (max-width: 768px) {
    .values-bento {
      grid-template-columns: 1fr;
    }
    .values-bento > .value-card:nth-child(1),
    .values-bento > .value-card:nth-child(2),
    .values-bento > .value-card:nth-child(3) {
      grid-column: 1;
      grid-row: auto;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .value-card { transition: none !important; }
  }
</style>
