<script lang="ts">
  import { onMount } from 'svelte';
  import GradientButton from './ui/GradientButton.svelte';

  const tags = [
    'React', 'Node.js', 'TypeScript', 'MongoDB', 'WebSocket', 'AWS',
    'Vue.js', 'Laravel', 'PostgreSQL', 'ElasticSearch', 'Docker',
    'Next.js', 'GraphQL', 'WebRTC', 'Azure', 'Python',
    'Angular', 'TensorFlow', 'IoT', 'Kubernetes', 'Svelte'
  ];

  let scrollContainer: HTMLElement;
  let autoScrollInterval: NodeJS.Timeout;
  let scrollWidth = 0;
  let containerWidth = 0;

  function setupCarousel() {
    if (!scrollContainer) return;
    
    // Calculate total width of all tags
    const tagElements = scrollContainer.querySelectorAll('.tech-tag');
    scrollWidth = Array.from(tagElements).reduce((total, el) => {
      const style = window.getComputedStyle(el);
      const margin = parseFloat(style.marginRight) + parseFloat(style.marginLeft);
      return total + el.offsetWidth + margin;
    }, 0);

    containerWidth = scrollContainer.offsetWidth;
    
    // Start the scroll animation
    let scrollPos = 0;
    
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
    }

    autoScrollInterval = setInterval(() => {
      if (!scrollContainer) return;
      
      scrollPos = (scrollPos + 1) % scrollWidth;
      scrollContainer.scrollLeft = scrollPos;
      
      // When we reach the end, quickly reset to start
      if (scrollPos >= scrollWidth - containerWidth) {
        scrollPos = 0;
        scrollContainer.scrollLeft = 0;
      }
    }, 20);
  }

  onMount(() => {
    // Small delay to ensure DOM is ready
    setTimeout(setupCarousel, 100);
    
    // Handle window resize
    const handleResize = () => {
      if (scrollContainer) {
        containerWidth = scrollContainer.offsetWidth;
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<section class="py-12 relative overflow-hidden">
  <!-- Background Elements -->
  <div class="absolute inset-0 -z-10">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.05),transparent_50%)]"></div>
    <div class="code-grid"></div>
  </div>

  <!-- View All Projects Button -->
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
    <GradientButton href="/portfolio" variant="secondary" class="glass-effect">
      viewAllProjects
      <i class="ph ph-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
    </GradientButton>
  </div>

  <!-- Gradient Overlays -->
  <div class="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0f0f1a] to-transparent z-10"></div>
  <div class="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0f0f1a] to-transparent z-10"></div>

  <!-- Tag Carousel -->
  <div 
    bind:this={scrollContainer}
    class="overflow-hidden select-none relative opacity-20"
  >
    <div class="flex gap-6 py-8 items-center">
      {#each [...tags, ...tags] as tag}
        <div class="tech-tag flex-none">
          <i class="ph ph-code ph-bold text-indigo-400 mr-2"></i>
          <span class="whitespace-nowrap">{tag}</span>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .code-grid {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(to right, rgba(79, 70, 229, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(79, 70, 229, 0.05) 1px, transparent 1px);
    background-size: 24px 24px;
    mask-image: radial-gradient(circle at 50% 50%, black, transparent 70%);
  }

  .tech-tag {
    @apply px-6 py-3 rounded-lg transition-all duration-300;
    background: rgba(79, 70, 229, 0.15);
    border: 1px solid rgba(79, 70, 229, 0.3);
    color: rgba(255, 255, 255, 0.8);
  }

  .glass-effect {
    backdrop-filter: blur(8px);
    background: rgba(15, 15, 26, 0.9);
    border: 1px solid rgba(79, 70, 229, 0.3);
  }

  /* Hide scrollbar */
  :global(.overflow-hidden::-webkit-scrollbar) {
    display: none;
  }
  
  :global(.overflow-hidden) {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
