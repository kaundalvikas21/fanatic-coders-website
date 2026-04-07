<script lang="ts">
  import { onMount } from 'svelte';

  const partners = [
    { name: 'TechCorp', logo: '/logos/tech-corp.svg' },
    { name: 'CodeLabs', logo: '/logos/code-labs.svg' },
    { name: 'DevForce', logo: '/logos/dev-force.svg' },
    { name: 'ByteWorks', logo: '/logos/byte-works.svg' },
    { name: 'CloudScale', logo: '/logos/cloud-scale.svg' },
    { name: 'DataFlow', logo: '/logos/data-flow.svg' },
    // Duplicate for infinite scroll effect
    { name: 'TechCorp', logo: '/logos/tech-corp.svg' },
    { name: 'CodeLabs', logo: '/logos/code-labs.svg' },
    { name: 'DevForce', logo: '/logos/dev-force.svg' },
    { name: 'ByteWorks', logo: '/logos/byte-works.svg' },
    { name: 'CloudScale', logo: '/logos/cloud-scale.svg' },
    { name: 'DataFlow', logo: '/logos/data-flow.svg' }
  ];

  let scrollContainer: HTMLDivElement;
  let isUserPaused = false;
  let isHoverPaused = false;
  let prefersReducedMotion = false;

  const isScrollPaused = () => prefersReducedMotion || isUserPaused || isHoverPaused;

  function handleCarouselFocusOut(event: FocusEvent) {
    const currentTarget = event.currentTarget as HTMLElement;
    const nextTarget = event.relatedTarget as Node | null;
    if (nextTarget && currentTarget.contains(nextTarget)) return;
    isHoverPaused = false;
  }

  onMount(() => {
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scroll = () => {
      if (isScrollPaused()) return;
      if (scrollContainer) {
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += 1;
        }
      }
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  });
</script>

<section class="py-24 relative overflow-hidden section-bg">
  <!-- Spotlights -->
  <div class="spotlight spotlight-1"></div>
  <div class="spotlight spotlight-2"></div>
  <div class="spotlight spotlight-3"></div>

  <div class="container mx-auto px-4">
    <div class="text-center mb-16">
      <div class="preheading-code">
        trusted.partners
      </div>
      <h2 class="heading-code">
        <span class="function">collaborate</span>(<span class="params">industry.leaders</span>)
      </h2>
      <p class="subheading-code">
        // Building the future of digital experiences together
      </p>
      <button
        type="button"
        class="mt-6 inline-flex items-center rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-blue-100/80 transition-colors hover:bg-indigo-500/20"
        on:click={() => isUserPaused = !isUserPaused}
        aria-pressed={isUserPaused}
      >
        {isUserPaused ? 'Resume logo movement' : 'Pause logo movement'}
      </button>
    </div>

    <div class="relative">
      <!-- Gradient Overlays -->
      <div class="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0f0f1a] to-transparent z-10"></div>
      <div class="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0f0f1a] to-transparent z-10"></div>

      <!-- Logo Carousel -->
      <div 
        class="overflow-hidden mx-auto max-w-6xl"
        bind:this={scrollContainer}
        role="region"
        aria-label="Trusted partners logo carousel"
        on:mouseenter={() => isHoverPaused = true}
        on:mouseleave={() => isHoverPaused = false}
        on:focusin={() => isHoverPaused = true}
        on:focusout={handleCarouselFocusOut}
      >
        <div class="flex gap-16 items-center py-8">
          {#each partners as partner}
            <div class="flex-none transform hover:scale-110 transition-transform duration-300">
              <img 
                src={partner.logo} 
                alt={partner.name}
                loading="lazy"
                decoding="async"
                width="160"
                height="48"
                class="h-12 w-auto opacity-50 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
              />
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Background Elements -->
  <div class="absolute inset-0 -z-10">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.05),transparent_50%)]"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl"></div>
  </div>
</section>
