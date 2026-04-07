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
      quote: 'Their expertise in modern web technologies transformed our digital presence. The team\'s attention to detail and innovative solutions exceeded our expectations.',
      tags: ['Web Development', 'UI/UX', 'Performance'],
      metrics: {
        improvement: '+150%',
        metric: 'Performance'
      }
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'Founder, EcoTech',
      company: 'EcoTech Solutions',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop',
      quote: 'Working with them was a game-changer for our e-commerce platform. The results were immediate: faster load times, better conversion rates, and happier customers.',
      tags: ['E-commerce', 'Optimization', 'SEO'],
      metrics: {
        improvement: '+85%',
        metric: 'Conversion'
      }
    },
    {
      id: 3,
      name: 'Emily Watson',
      role: 'Product Lead, HealthTech',
      company: 'HealthTech Global',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop',
      quote: 'Their team brought our healthcare application to life with cutting-edge technology while maintaining strict security standards. Truly exceptional work!',
      tags: ['Healthcare', 'Security', 'Mobile Apps'],
      metrics: {
        improvement: '100%',
        metric: 'Security'
      }
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'CEO, FinanceFlow',
      company: 'FinanceFlow',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&h=200&auto=format&fit=crop',
      quote: 'The team\'s deep understanding of fintech requirements and ability to deliver secure, scalable solutions made them the perfect partner for our project.',
      tags: ['Fintech', 'Security', 'Cloud'],
      metrics: {
        improvement: '10x',
        metric: 'Scalability'
      }
    }
  ];

  let swiperContainer: HTMLElement;
  let swiper: Swiper;
  let activeIndex = 0;
  let isAutoplayPaused = false;
  let prefersReducedMotion = false;

  function handleSlideChange() {
    if (swiper) {
      activeIndex = swiper.activeIndex;
    }
  }

  onMount(() => {
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    swiper = new Swiper(swiperContainer, {
      modules: [Autoplay, EffectFade],
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      speed: 1000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      on: {
        slideChange: handleSlideChange
      }
    });

    if (prefersReducedMotion) {
      swiper.autoplay.stop();
      isAutoplayPaused = true;
    }

    return () => {
      if (swiper) {
        swiper.destroy();
      }
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

<section class="py-24 relative overflow-hidden">
  <!-- Spotlights -->
  <div class="spotlight spotlight-1"></div>
  <div class="spotlight spotlight-2"></div>
  <div class="spotlight spotlight-3"></div>

  <!-- Background Elements -->
  <div class="absolute inset-0 -z-10">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.05),transparent_50%)]"></div>
    <div class="code-grid"></div>
  </div>

  <div class="container mx-auto px-4">
    <!-- Section Header -->
    <div class="text-center mb-16">
      <div class="preheading-code">reviews.module.ts</div>
      <h2 class="heading-code">
        client.<span class="text-indigo-400">testimonials</span>()
      </h2>
      <p class="subheading-code">
        // Real stories from our valued clients
      </p>
      <button
        type="button"
        class="mt-6 inline-flex items-center rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-blue-100/80 transition-colors hover:bg-indigo-500/20"
        on:click={toggleAutoplay}
        aria-pressed={isAutoplayPaused}
      >
        {isAutoplayPaused ? 'Resume testimonials' : 'Pause testimonials'}
      </button>
    </div>

    <!-- Testimonials Carousel -->
    <div class="max-w-6xl mx-auto">
      <div class="glass-card p-8 md:p-12 rounded-2xl relative">
        <!-- Code Decorations -->
        <div class="absolute -top-3 left-8 px-4 py-1 rounded-full text-sm font-mono bg-indigo-500/20 border border-indigo-500/30">
          <span class="text-indigo-400">const</span>
          <span class="text-pink-400">success</span>
          <span class="text-white">= reviews.map(</span>
          <span class="text-blue-400">client</span>
          <span class="text-white">=> client.story);</span>
        </div>

        <div class="swiper" bind:this={swiperContainer}>
          <div class="swiper-wrapper">
            {#each testimonials as testimonial (testimonial.id)}
              <div class="swiper-slide">
                <div class="grid lg:grid-cols-2 gap-12 items-center">
                  <!-- Left Column: Client Info & Quote -->
                  <div class="space-y-8">
                    <!-- Client Info -->
                    <div class="flex items-center gap-6">
                      <div class="relative">
                        <div class="w-20 h-20 rounded-2xl overflow-hidden border-2 border-indigo-500/30 transform rotate-3">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            loading="lazy"
                            decoding="async"
                            width="200"
                            height="200"
                            class="w-full h-full object-cover"
                          />
                        </div>
                        <div class="absolute -inset-2 bg-indigo-500/20 rounded-2xl blur-md -z-10 rotate-3"></div>
                      </div>
                      <div>
                        <h3 class="text-xl font-bold text-white mb-1">{testimonial.name}</h3>
                        <p class="text-blue-100/70 mb-2">{testimonial.role}</p>
                        <div class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-500/20 border border-indigo-500/30">
                          <i class="ph ph-buildings text-indigo-400 mr-2"></i>
                          {testimonial.company}
                        </div>
                      </div>
                    </div>

                    <!-- Quote -->
                    <div class="relative">
                      <div class="absolute -left-4 -top-4 text-6xl text-indigo-500/20 font-serif">"</div>
                      <blockquote class="text-xl text-blue-100/90 leading-relaxed pl-8">
                        {testimonial.quote}
                      </blockquote>
                      <div class="absolute -right-4 bottom-0 text-6xl text-indigo-500/20 font-serif">"</div>
                    </div>

                    <!-- Tags -->
                    <div class="flex flex-wrap gap-2">
                      {#each testimonial.tags as tag}
                        <span class="tech-tag">
                          <i class="ph ph-hash text-indigo-400 mr-1"></i>
                          {tag}
                        </span>
                      {/each}
                    </div>
                  </div>

                  <!-- Right Column: Success Metrics -->
                  <div class="relative">
                    <!-- Code-like Decoration -->
                    <div class="absolute -top-6 left-0 font-mono text-sm text-blue-100/60">
                      <span class="text-pink-400">function</span>
                      <span class="text-indigo-400">calculateSuccess</span>
                      <span>() {`{`}</span>
                    </div>

                    <!-- Metrics Card -->
                    <div class="metrics-card p-8 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
                      <div class="text-center">
                        <div class="text-6xl font-bold bg-gradient-text mb-4">
                          {testimonial.metrics.improvement}
                        </div>
                        <div class="text-xl text-blue-100/70">
                          {testimonial.metrics.metric} Improvement
                        </div>
                      </div>

                      <!-- Decorative Code Lines -->
                      <div class="mt-8 font-mono text-sm space-y-2 text-blue-100/40">
                        <div>return {`{`}</div>
                        <div class="pl-4">
                          success: <span class="text-indigo-400">true</span>,
                        </div>
                        <div class="pl-4">
                          impact: <span class="text-green-400">'significant'</span>
                        </div>
                        <div>{`}`};</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>

          <!-- Navigation -->
          <div class="flex justify-center items-center gap-4 mt-12">
            {#each testimonials as _, i}
              <button
                type="button"
                class="relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300"
                class:active={activeIndex === i}
                aria-label={`Go to testimonial ${i + 1}`}
                on:click={() => swiper?.slideTo(i)}
              >
                <span class="absolute h-1 w-5 rounded-full bg-indigo-500/20"></span>
                <span 
                  class="absolute h-1 w-5 rounded-full bg-indigo-500 transition-transform duration-300"
                  style="transform: scaleX({activeIndex === i ? '1' : '0'}); transform-origin: left;"
                ></span>
              </button>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .glass-card {
    background: rgba(15, 15, 26, 0.95);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(79, 70, 229, 0.2);
    backdrop-filter: blur(12px);
  }

  .tech-tag {
    @apply inline-flex items-center text-sm py-1 px-3 rounded-full;
    background: rgba(79, 70, 229, 0.1);
    border: 1px solid rgba(79, 70, 229, 0.2);
  }

  .code-grid {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(to right, rgba(79, 70, 229, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(79, 70, 229, 0.05) 1px, transparent 1px);
    background-size: 24px 24px;
    mask-image: radial-gradient(circle at 50% 50%, black, transparent 70%);
  }

  .bg-gradient-text {
    background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  :global(.swiper) {
    width: 100%;
    height: 100%;
  }

  :global(.swiper-slide) {
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  :global(.swiper-slide-active) {
    opacity: 1;
  }

  /* Fade effect overrides */
  :global(.swiper-fade .swiper-slide) {
    pointer-events: none;
    transition-property: opacity;
  }

  :global(.swiper-fade .swiper-slide-active) {
    pointer-events: auto;
  }
</style>
