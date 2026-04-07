<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import GradientButton from './ui/GradientButton.svelte';

  const projects = [
    {
      id: 'fintech-app',
      title: 'FinTech Revolution',
      description: 'A comprehensive financial technology platform that revolutionizes how users manage their investments and track market trends.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
      tags: ['React', 'Node.js', 'MongoDB', 'WebSocket', 'AWS'],
      category: 'Full Stack Development',
      stats: {
        users: '50K+',
        transactions: '$2M+',
        uptime: '99.9%'
      },
      link: '/case-study/fintech-app'
    },
    {
      id: 'ecommerce-platform',
      title: 'Global Commerce Hub',
      description: 'Multi-vendor e-commerce platform with real-time inventory management and AI-powered recommendations.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2069&auto=format&fit=crop',
      tags: ['Vue.js', 'Laravel', 'PostgreSQL', 'ElasticSearch', 'Docker'],
      category: 'E-Commerce',
      stats: {
        vendors: '1000+',
        products: '100K+',
        orders: '500K+'
      },
      link: '/case-study/ecommerce-platform'
    },
    {
      id: 'health-platform',
      title: 'HealthTech Connect',
      description: 'Telemedicine platform connecting patients with healthcare providers through secure video consultations.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
      tags: ['Next.js', 'GraphQL', 'WebRTC', 'Azure', 'TypeScript'],
      category: 'Healthcare',
      stats: {
        doctors: '5K+',
        patients: '100K+',
        consultations: '250K+'
      },
      link: '/case-study/health-platform'
    },
    {
      id: 'smart-city',
      title: 'Smart City Dashboard',
      description: 'IoT-powered city management system with real-time monitoring and predictive analytics.',
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2069&auto=format&fit=crop',
      tags: ['Angular', 'Python', 'TensorFlow', 'IoT', 'Kubernetes'],
      category: 'IoT & Analytics',
      stats: {
        sensors: '10K+',
        dataPoints: '1M+',
        cities: '5+'
      },
      link: '/case-study/smart-city'
    }
  ];

  const tags = [
    'React', 'Node.js', 'TypeScript', 'MongoDB', 'WebSocket', 'AWS',
    'Vue.js', 'Laravel', 'PostgreSQL', 'ElasticSearch', 'Docker',
    'Next.js', 'GraphQL', 'WebRTC', 'Azure', 'Python',
    'Angular', 'TensorFlow', 'IoT', 'Kubernetes', 'Svelte'
  ];
  
  let currentIndex = 0;
  let currentProject = projects[currentIndex];
  let visible = false;
  let autoplayInterval: NodeJS.Timeout;
  let scrollContainer: HTMLElement;
  let autoScrollInterval: NodeJS.Timeout;
  let scrollWidth = 0;
  let containerWidth = 0;
  let isAutoplayPaused = false;
  let isInteractionPaused = false;
  let isTagScrollPaused = false;
  let prefersReducedMotion = false;
  
  function nextProject() {
    currentIndex = (currentIndex + 1) % projects.length;
    currentProject = projects[currentIndex];
  }

  function previousProject() {
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    currentProject = projects[currentIndex];
  }

  function setProject(index: number) {
    currentIndex = index;
    currentProject = projects[currentIndex];
    if (!isAutoplayPaused) {
      resetAutoplay();
    }
  }

  function resetAutoplay() {
    if (prefersReducedMotion) return;
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }
    autoplayInterval = setInterval(() => {
      if (isAutoplayPaused || isInteractionPaused || prefersReducedMotion) return;
      nextProject();
    }, 5000);
  }

  function toggleProjectAutoplay() {
    isAutoplayPaused = !isAutoplayPaused;
    if (isAutoplayPaused) {
      clearInterval(autoplayInterval);
      return;
    }
    resetAutoplay();
  }

  function handleShowcaseFocusOut(event: FocusEvent) {
    const currentTarget = event.currentTarget as HTMLElement;
    const nextTarget = event.relatedTarget as Node | null;
    if (nextTarget && currentTarget.contains(nextTarget)) return;

    if (!prefersReducedMotion) {
      isInteractionPaused = false;
      resetAutoplay();
    }
  }

  function setupCarousel() {
    if (!scrollContainer) return;
    
    const tagElements = scrollContainer.querySelectorAll('.tech-tag');
    scrollWidth = Array.from(tagElements).reduce((total, el) => {
      const style = window.getComputedStyle(el);
      const margin = parseFloat(style.marginRight) + parseFloat(style.marginLeft);
      return total + el.offsetWidth + margin;
    }, 0);

    containerWidth = scrollContainer.offsetWidth;
    
    let scrollPos = 0;
    
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
    }

    autoScrollInterval = setInterval(() => {
      if (prefersReducedMotion || isTagScrollPaused) return;
      if (!scrollContainer) return;
      
      scrollPos = (scrollPos + 1) % scrollWidth;
      scrollContainer.scrollLeft = scrollPos;
      
      if (scrollPos >= scrollWidth - containerWidth) {
        scrollPos = 0;
        scrollContainer.scrollLeft = 0;
      }
    }, 20);
  }

  onMount(() => {
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    visible = true;
    if (!prefersReducedMotion) {
      resetAutoplay();
      setTimeout(setupCarousel, 100);
    }
    
    const handleResize = () => {
      if (scrollContainer) {
        containerWidth = scrollContainer.offsetWidth;
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<section class="min-h-screen pb-24 relative overflow-hidden section-bg" id="portfolio">
  <!-- Spotlights -->
  <div class="spotlight spotlight-1"></div>
  <div class="spotlight spotlight-2"></div>
  <div class="spotlight spotlight-3"></div>

  <!-- Animated Background -->
  <div class="absolute inset-0 -z-10">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.05),transparent_50%)]"></div>
    <div class="absolute inset-0 bg-grid opacity-20"></div>
    <div class="absolute inset-0 bg-spotlight"></div>
  </div>

  <div class="container mx-auto px-4">
    <!-- Section Header -->
    {#if visible}
      <div 
        class="text-center mb-16"
        in:fly={{ y: 20, duration: 600, delay: 100 }}
      >
        <div class="preheading-code">portfolio.showcase</div>
        <h2 class="heading-code">
          case_studies.<span class="text-indigo-400">featured</span>()
        </h2>
        <p class="subheading-code">
          // Transforming challenges into digital success stories
        </p>
        <button
          type="button"
          class="mt-6 inline-flex items-center rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-blue-100/80 transition-colors hover:bg-indigo-500/20"
          on:click={toggleProjectAutoplay}
          aria-pressed={isAutoplayPaused}
        >
          {isAutoplayPaused ? 'Resume project carousel' : 'Pause project carousel'}
        </button>
      </div>
    {/if}

    <!-- Project Showcase -->
    <div class="max-w-6xl mx-auto">
      {#if visible && currentProject}
        <div
          class="grid md:grid-cols-2 gap-8 items-center"
          on:mouseenter={() => isInteractionPaused = true}
          on:mouseleave={() => {
            if (!prefersReducedMotion) {
              isInteractionPaused = false;
              resetAutoplay();
            }
          }}
          on:focusin={() => isInteractionPaused = true}
          on:focusout={handleShowcaseFocusOut}
        >
          <!-- Project Navigation Buttons -->
          <button 
            type="button"
            class="absolute left-4 top-1/2 -translate-y-1/2 z-10 min-h-11 min-w-11 rounded-full bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors"
            aria-label="Previous featured project"
            on:click={previousProject}
          >
            <i class="ph ph-arrow-left text-2xl"></i>
          </button>
          
          <button 
            type="button"
            class="absolute right-4 top-1/2 -translate-y-1/2 z-10 min-h-11 min-w-11 rounded-full bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors"
            aria-label="Next featured project"
            on:click={nextProject}
          >
            <i class="ph ph-arrow-right text-2xl"></i>
          </button>

          <!-- Project Image -->
          <div class="relative overflow-hidden rounded-2xl group h-[500px]">
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent z-10"></div>
            {#key currentProject.id}
              <img
                src={currentProject.image}
                alt={currentProject.title}
                class="w-full h-full object-cover transform transition-all duration-1000"
                in:fade={{ duration: 800 }}
                loading="lazy"
                decoding="async"
                width="2070"
                height="1380"
              />
            {/key}
          </div>

          <!-- Project Info -->
          <div class="glass-card p-8 rounded-2xl">
            {#key currentProject.id}
              <div 
                in:fly={{ x: 50, duration: 800 }}
                class="space-y-6"
              >
                <div class="flex items-center gap-3">
                  <span class="px-3 py-1 rounded-full text-sm font-mono bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                    {currentProject.category}
                  </span>
                </div>
                <h3 class="text-3xl font-bold bg-gradient-text">{currentProject.title}</h3>
                <p class="text-blue-100/70 leading-relaxed">{currentProject.description}</p>

                <!-- Project Stats -->
                <div class="grid grid-cols-3 gap-4">
                  {#each Object.entries(currentProject.stats) as [key, value]}
                    <div class="stat-card">
                      <div class="text-xl font-bold text-indigo-400">{value}</div>
                      <div class="text-sm text-blue-100/60 capitalize">{key}</div>
                    </div>
                  {/each}
                </div>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2">
                  {#each currentProject.tags as tag}
                    <span class="tech-tag">
                      <i class="ph ph-code ph-bold text-indigo-400 mr-1"></i>
                      {tag}
                    </span>
                  {/each}
                </div>

                <!-- CTA Button -->
                <GradientButton 
                  href={currentProject.link}
                  class="w-full sm:w-auto"
                >
                  viewCaseStudy
                  <i class="ph ph-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                </GradientButton>
              </div>
            {/key}
          </div>
        </div>

        <!-- Progress Indicator -->
        <div class="mt-12 flex justify-center items-center gap-4">
          {#each projects as project, i}
            <button
              type="button"
              class="relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300"
              class:active={currentIndex === i}
              aria-label={`Go to featured project ${i + 1}`}
              on:click={() => setProject(i)}
            >
              <span class="absolute h-1 w-5 rounded-full bg-indigo-500/20"></span>
              <span 
                class="absolute h-1 w-5 rounded-full bg-indigo-500 transition-transform duration-300"
                style="transform: scaleX({currentIndex === i ? '1' : '0'}); transform-origin: left;"
              ></span>
            </button>
          {/each}
        </div>

        <!-- Integrated Tag Carousel -->
        <div class="mt-12 relative">
          <!-- View All Projects Button -->
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <GradientButton href="/portfolio" variant="secondary" class="glass-effect">
              viewAllProjects
              <i class="ph ph-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
            </GradientButton>
          </div>

          <!-- Gradient Overlays -->
          <div class="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#080810] to-transparent z-10"></div>
          <div class="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#080810] to-transparent z-10"></div>

          <!-- Tag Carousel -->
          <div 
            bind:this={scrollContainer}
            class="tag-carousel overflow-hidden select-none relative opacity-20"
            on:mouseenter={() => isTagScrollPaused = true}
            on:mouseleave={() => isTagScrollPaused = false}
            on:focusin={() => isTagScrollPaused = true}
            on:focusout={() => isTagScrollPaused = false}
          >
            <div class="flex gap-6 py-4 items-center">
              {#each [...tags, ...tags] as tag}
                <div class="tech-tag flex-none">
                  <i class="ph ph-code ph-bold text-indigo-400 mr-2"></i>
                  <span class="whitespace-nowrap">{tag}</span>
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  .glass-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(124,58,237,0.2);
    backdrop-filter: blur(20px) saturate(180%);
    box-shadow: 0 0 40px rgba(124,58,237,0.1), inset 0 1px 0 rgba(255,255,255,0.05);
  }

  .tech-tag {
    @apply inline-flex items-center text-sm py-1 px-3 rounded-full;
    background: rgba(124,58,237,0.1);
    border: 1px solid rgba(124,58,237,0.2);
    color: #a855f7;
  }

  .stat-card {
    @apply p-4 rounded-xl text-center;
    background: rgba(124,58,237,0.08);
    border: 1px solid rgba(124,58,237,0.2);
  }

  .bg-grid {
    background-image:
      linear-gradient(to right, rgba(124, 58, 237, 0.06) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(124, 58, 237, 0.06) 1px, transparent 1px);
    background-size: 24px 24px;
  }

  .bg-spotlight {
    background: radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.08) 0%, transparent 60%);
  }

  .bg-gradient-text {
    background: linear-gradient(135deg, #fff 0%, #c4b5fd 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .glass-effect {
    backdrop-filter: blur(12px);
    background: rgba(8, 8, 16, 0.9);
    border: 1px solid rgba(124,58,237,0.25);
  }

  /* Hover overlay on portfolio images */
  :global(.portfolio-img-wrap:hover img) {
    transform: scale(1.05);
    transition: transform 1s ease;
  }

  /* Hide scrollbar */
  .tag-carousel::-webkit-scrollbar { display: none; }
  .tag-carousel { -ms-overflow-style: none; scrollbar-width: none; }
</style>
