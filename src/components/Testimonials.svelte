<script lang="ts">
  import { onMount } from 'svelte';
  import Swiper from 'swiper';
  import { Autoplay, EffectFade } from 'swiper/modules';
  import 'swiper/css';
  import 'swiper/css/effect-fade';

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'CTO, TechVision Inc.',
      company: 'TechVision',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop',
      quote: "Their expertise in modern web technologies transformed our digital presence. The team's attention to detail and innovative solutions exceeded our expectations.",
      tags: ['Web Development', 'UI/UX', 'Performance'],
      metrics: { improvement: '+150%', metric: 'Performance' },
      accentColor: '#7c3aed',
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'Founder, EcoTech',
      company: 'EcoTech Solutions',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop',
      quote: 'Working with them was a game-changer for our e-commerce platform. The results were immediate: faster load times, better conversion rates, and happier customers.',
      tags: ['E-commerce', 'Optimization', 'SEO'],
      metrics: { improvement: '+85%', metric: 'Conversion' },
      accentColor: '#06b6d4',
    },
    {
      id: 3,
      name: 'Emily Watson',
      role: 'Product Lead, HealthTech',
      company: 'HealthTech Global',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop',
      quote: 'Their team brought our healthcare application to life with cutting-edge technology while maintaining strict security standards. Truly exceptional work!',
      tags: ['Healthcare', 'Security', 'Mobile Apps'],
      metrics: { improvement: '100%', metric: 'Security' },
      accentColor: '#10b981',
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'CEO, FinanceFlow',
      company: 'FinanceFlow',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&h=200&auto=format&fit=crop',
      quote: "The team's deep understanding of fintech requirements and ability to deliver secure, scalable solutions made them the perfect partner for our project.",
      tags: ['Fintech', 'Security', 'Cloud'],
      metrics: { improvement: '10x', metric: 'Scalability' },
      accentColor: '#a855f7',
    }
  ];

  let swiperContainer: HTMLElement;
  let swiper: Swiper;
  let activeIndex = 0;
  let isAutoplayPaused = false;
  let prefersReducedMotion = false;
  let sectionEl: HTMLElement;
  let sectionVisible = false;

  function handleSlideChange() {
    if (swiper) activeIndex = swiper.activeIndex;
  }

  onMount(() => {
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { sectionVisible = true; obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(sectionEl);

    swiper = new Swiper(swiperContainer, {
      modules: [Autoplay, EffectFade],
      effect: 'fade',
      fadeEffect: { crossFade: true },
      speed: 1000,
      autoplay: { delay: 5000, disableOnInteraction: false },
      on: { slideChange: handleSlideChange }
    });

    if (prefersReducedMotion) {
      swiper.autoplay.stop();
      isAutoplayPaused = true;
    }

    return () => {
      obs.disconnect();
      if (swiper) swiper.destroy();
    };
  });

  function toggleAutoplay() {
    if (!swiper?.autoplay) return;
    isAutoplayPaused = !isAutoplayPaused;
    if (isAutoplayPaused) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
  }
</script>

<section class="testimonials-section py-24 relative overflow-hidden" bind:this={sectionEl} id="testimonials">
  <!-- Aurora mesh (parallax-ish, subtle) -->
  <div class="aurora-parallax absolute inset-0 pointer-events-none"></div>
  <div class="dot-grid absolute inset-0 pointer-events-none opacity-30"
       style="mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent 70%);">
  </div>

  <div class="container mx-auto px-4">
    <!-- Header -->
    <div class="text-center mb-16 reveal" class:visible={sectionVisible}>
      <div class="preheading-code">reviews.module.ts</div>
      <h2 class="heading-code mt-2">
        client.<span class="text-aurora-violet-light">testimonials</span>()
      </h2>
      <p class="subheading-code mt-3">// Real stories from our valued clients</p>
      <button
        type="button"
        class="mt-6 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-all duration-200"
        style="border-color: rgba(124,58,237,0.3); background: rgba(124,58,237,0.08); color: rgba(255,255,255,0.7);"
        on:click={toggleAutoplay}
        aria-pressed={isAutoplayPaused}
      >
        <i class="ph {isAutoplayPaused ? 'ph-play' : 'ph-pause'}"></i>
        {isAutoplayPaused ? 'Resume testimonials' : 'Pause testimonials'}
      </button>
    </div>

    <!-- Carousel card -->
    <div class="max-w-6xl mx-auto reveal" class:visible={sectionVisible} style="transition-delay: 100ms">
      <div class="testimonial-card relative rounded-2xl p-8 md:p-12">
        <!-- Code decoration top -->
        <div class="code-badge absolute -top-4 left-8 px-4 py-1.5 rounded-full text-xs font-mono">
          <span style="color: #a855f7">const</span>
          <span style="color: #60a5fa"> success</span>
          <span class="text-white/70"> = reviews.map(</span>
          <span style="color: #22d3ee">client</span>
          <span class="text-white/70"> => client.story);</span>
        </div>

        <div class="swiper" bind:this={swiperContainer}>
          <div class="swiper-wrapper">
            {#each testimonials as testimonial (testimonial.id)}
              <div class="swiper-slide">
                <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <!-- Left: Client + Quote -->
                  <div class="space-y-8">
                    <!-- Client info -->
                    <div class="flex items-center gap-6">
                      <!-- Aurora ring avatar -->
                      <div class="avatar-wrap flex-shrink-0" style="--avatar-accent: {testimonial.accentColor}">
                        <div class="aurora-ring-avatar">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            loading="lazy"
                            decoding="async"
                            width="80" height="80"
                            class="w-full h-full object-cover rounded-full"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 class="text-base sm:text-lg md:text-xl font-bold text-white mb-1">{testimonial.name}</h3>
                        <p class="text-blue-100/60 text-sm mb-2">{testimonial.role}</p>
                        <span class="company-badge text-xs font-mono px-3 py-1 rounded-full"
                              style="color: {testimonial.accentColor}; border-color: {testimonial.accentColor}40; background: {testimonial.accentColor}12">
                          <i class="ph ph-buildings mr-1"></i>{testimonial.company}
                        </span>
                      </div>
                    </div>

                    <!-- Quote -->
                    <div class="relative">
                      <div class="quote-mark absolute -left-2 -top-4 text-7xl font-serif leading-none"
                           style="color: {testimonial.accentColor}18">"</div>
                      <blockquote class="text-sm sm:text-base md:text-lg text-blue-100/85 leading-relaxed pl-6 border-l-2"
                                  style="border-color: {testimonial.accentColor}40">
                        {testimonial.quote}
                      </blockquote>
                    </div>

                    <!-- Tags -->
                    <div class="flex flex-wrap gap-2">
                      {#each testimonial.tags as tag}
                        <span class="text-xs py-1 px-3 rounded-full font-mono"
                              style="background: {testimonial.accentColor}12; border: 1px solid {testimonial.accentColor}30; color: {testimonial.accentColor}">
                          #{tag}
                        </span>
                      {/each}
                    </div>
                  </div>

                  <!-- Right: Metrics -->
                  <div class="relative pt-6">
                    <div class="absolute -top-1 left-0 font-mono text-sm text-blue-100/40">
                      <span style="color: #f472b6">function</span>
                      <span style="color: #818cf8"> calculateSuccess</span>
                      <span>() {`{`}</span>
                    </div>
                    <div class="metrics-card rounded-xl p-8 text-center"
                         style="background: {testimonial.accentColor}0a; border: 1px solid {testimonial.accentColor}22; box-shadow: 0 0 16px {testimonial.accentColor}0d">
                      <div class="text-4xl lg:text-6xl font-bold mb-3"
                           style="background: linear-gradient(135deg, #fff, {testimonial.accentColor}); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent">
                        {testimonial.metrics.improvement}
                      </div>
                      <div class="text-blue-100/60">{testimonial.metrics.metric} Improvement</div>
                      <div class="mt-6 font-mono text-xs space-y-1 text-blue-100/35 text-left">
                        <div>return {`{`}</div>
                        <div class="pl-3">success: <span style="color: {testimonial.accentColor}">true</span>,</div>
                        <div class="pl-3">impact: <span style="color: #34d399">'significant'</span></div>
                        <div>{`}`};</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>

          <!-- Navigation dots -->
          <div class="flex justify-center items-center gap-4 mt-12">
            {#each testimonials as t, i}
              <button
                type="button"
                class="dot-btn relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300"
                aria-label={`Go to testimonial ${i + 1}`}
                on:click={() => swiper?.slideTo(i)}
              >
                <span class="absolute h-1 w-5 rounded-full"
                      style="background: rgba(124,58,237,0.2)"></span>
                <span class="absolute h-1 w-5 rounded-full transition-transform duration-300"
                      style="background: #7c3aed; transform: scaleX({activeIndex === i ? '1' : '0'}); transform-origin: left;"></span>
              </button>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .testimonials-section {
    background: var(--dark-1);
  }

  .aurora-parallax {
    background:
      radial-gradient(ellipse 80% 60% at 15% 20%, rgba(124,58,237,0.08) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 85% 80%, rgba(6,182,212,0.06) 0%, transparent 60%);
  }

  .testimonial-card {
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(24px) saturate(180%);
    border: 1px solid rgba(124,58,237,0.18);
    box-shadow: 0 0 24px rgba(124,58,237,0.07), 0 20px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04);
  }

  .code-badge {
    background: rgba(8, 8, 16, 0.95);
    border: 1px solid rgba(124,58,237,0.25);
    backdrop-filter: blur(12px);
  }

  /* Aurora ring for avatar */
  .aurora-ring-avatar {
    width: 80px;
    height: 80px;
    padding: 2px;
    border-radius: 50%;
    background: conic-gradient(
      from var(--border-angle, 0deg),
      var(--avatar-accent),
      rgba(6,182,212,0.8),
      var(--avatar-accent)
    );
    animation: borderSpin 4s linear infinite;
  }

  @property --border-angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }

  @keyframes borderSpin {
    to { --border-angle: 360deg; }
  }

  .company-badge {
    display: inline-flex;
    align-items: center;
    border: 1px solid;
  }

  .text-aurora-violet-light { color: #a855f7; }

  :global(.swiper) { width: 100%; }
  :global(.swiper-slide) { opacity: 0; transition: opacity 0.5s ease; }
  :global(.swiper-slide-active) { opacity: 1; }
  :global(.swiper-fade .swiper-slide) { pointer-events: none; transition-property: opacity; }
  :global(.swiper-fade .swiper-slide-active) { pointer-events: auto; }

  @media (prefers-reduced-motion: reduce) {
    .aurora-ring-avatar { animation: none; }
  }
</style>
