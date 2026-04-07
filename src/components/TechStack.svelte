<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  const categories = [
    {
      id: 'frontend',
      name: 'Frontend',
      icon: 'ph ph-code ph-bold',
      technologies: [
        { name: 'React', icon: 'ph ph-circles-three-plus' },
        { name: 'Vue.js', icon: 'ph ph-hexagon' },
        { name: 'Angular', icon: 'ph ph-shield' },
        { name: 'Svelte', icon: 'ph ph-infinity' },
        { name: 'Next.js', icon: 'ph ph-arrow-fat-right' },
        { name: 'TypeScript', icon: 'ph ph-brackets-curly' },
        { name: 'Tailwind CSS', icon: 'ph ph-wind' },
        { name: 'SASS', icon: 'ph ph-paint-brush' }
      ]
    },
    {
      id: 'backend',
      name: 'Backend',
      icon: 'ph ph-database ph-bold',
      technologies: [
        { name: 'Node.js', icon: 'ph ph-gear' },
        { name: 'Python', icon: 'ph ph-file-py' },
        { name: 'Django', icon: 'ph ph-leaf' },
        { name: 'Laravel', icon: 'ph ph-fire' },
        { name: 'PostgreSQL', icon: 'ph ph-database' },
        { name: 'MongoDB', icon: 'ph-fill ph-leaf' },
        { name: 'GraphQL', icon: 'ph ph-graph' },
        { name: 'Redis', icon: 'ph ph-lightning' }
      ]
    },
    {
      id: 'ai-ml',
      name: 'AI & ML',
      icon: 'ph ph-brain ph-bold',
      technologies: [
        { name: 'TensorFlow', icon: 'ph ph-flow-arrow' },
        { name: 'PyTorch', icon: 'ph ph-flame' },
        { name: 'Scikit-learn', icon: 'ph ph-chart-scatter' },
        { name: 'OpenAI', icon: 'ph ph-robot' },
        { name: 'Keras', icon: 'ph ph-brain' },
        { name: 'Pandas', icon: 'ph ph-table' },
        { name: 'NumPy', icon: 'ph ph-function' },
        { name: 'Jupyter', icon: 'ph ph-notebook' }
      ]
    },
    {
      id: 'digital',
      name: 'Digital Marketing',
      icon: 'ph ph-chart-line-up ph-bold',
      technologies: [
        { name: 'Google Ads', icon: 'ph ph-target' },
        { name: 'Google Analytics', icon: 'ph ph-chart-bar' },
        { name: 'Meta Ads', icon: 'ph ph-share-network' },
        { name: 'Mailchimp', icon: 'ph ph-envelope' },
        { name: 'HubSpot', icon: 'ph ph-funnel' },
        { name: 'Semrush', icon: 'ph ph-magnifying-glass' },
        { name: 'Ahrefs', icon: 'ph ph-link' },
        { name: 'Moz', icon: 'ph ph-chart-line' }
      ]
    }
  ];

  let activeCategory = categories[0];
  let visible = false;

  function setActiveCategory(category: typeof categories[0]) {
    activeCategory = category;
  }

  onMount(() => {
    visible = true;
  });
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
    {#if visible}
      <div 
        class="text-center mb-16"
        in:fly={{ y: 20, duration: 600, delay: 100 }}
      >
        <div class="preheading-code">tech.stack</div>
        <h2 class="heading-code">
          our.<span class="text-indigo-400">technologies</span>()
        </h2>
        <p class="subheading-code">
          // Tools and technologies we use to build amazing solutions
        </p>
      </div>
    {/if}

    <!-- Category Tabs -->
    <div class="flex flex-wrap justify-center gap-4 mb-12" role="tablist" aria-label="Technology categories">
      {#each categories as category}
        <button
          type="button"
          class="category-tab group"
          class:active={category === activeCategory}
          role="tab"
          aria-selected={category === activeCategory}
          aria-controls={`tech-category-${category.id}`}
          on:click={() => setActiveCategory(category)}
        >
          <i class={`${category.icon} mr-2`}></i>
          {category.name}
        </button>
      {/each}
    </div>

    <!-- Technologies Grid -->
    {#key activeCategory.id}
      <div 
        id={`tech-category-${activeCategory.id}`}
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
        role="tabpanel"
        in:fade={{ duration: 200 }}
      >
        {#each activeCategory.technologies as tech}
          <div class="tech-card group">
            <div class="relative h-20 flex items-center justify-center">
              <div class="tech-icon">
                <i class={`${tech.icon} text-4xl`}></i>
              </div>
            </div>
            <div class="text-center mt-2">
              <span class="text-sm text-blue-100/60 group-hover:text-blue-100 transition-colors">
                {tech.name}
              </span>
            </div>
          </div>
        {/each}
      </div>
    {/key}

    <!-- Code Decoration -->
    <div class="mt-12 text-center font-mono text-sm space-y-1 text-blue-100/40">
      <div>
        <span class="text-pink-400">export default</span>
        <span class="text-indigo-400"> function</span>
        <span> buildAmazing() {`{`}</span>
      </div>
      <div class="pl-4">
        tools: <span class="text-green-400">'cutting-edge'</span>,
      </div>
      <div class="pl-4">
        results: <span class="text-blue-400">'exceptional'</span>
      </div>
      <div>{`}`}</div>
    </div>
  </div>
</section>

<style>
  .category-tab {
    @apply px-6 py-3 rounded-lg transition-all duration-300 flex items-center;
    background: rgba(79, 70, 229, 0.1);
    border: 1px solid rgba(79, 70, 229, 0.2);
    color: rgba(255, 255, 255, 0.7);
  }

  .category-tab:hover {
    @apply text-white;
    background: rgba(79, 70, 229, 0.2);
    border-color: rgba(79, 70, 229, 0.3);
  }

  .category-tab.active {
    @apply text-white;
    background: rgba(79, 70, 229, 0.2);
    border-color: rgba(79, 70, 229, 0.4);
    box-shadow: 0 0 20px rgba(79, 70, 229, 0.2);
  }

  .tech-card {
    @apply p-4 rounded-xl transition-all duration-300;
    background: rgba(15, 15, 26, 0.95);
    border: 1px solid rgba(79, 70, 229, 0.2);
    backdrop-filter: blur(12px);
  }

  .tech-card:hover {
    background: rgba(79, 70, 229, 0.1);
    border-color: rgba(79, 70, 229, 0.3);
    transform: translateY(-2px);
  }

  .tech-icon {
    @apply w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300;
    background: rgba(79, 70, 229, 0.1);
    border: 1px solid rgba(79, 70, 229, 0.2);
    color: rgba(79, 70, 229, 0.8);
  }

  .tech-card:hover .tech-icon {
    background: rgba(79, 70, 229, 0.2);
    border-color: rgba(79, 70, 229, 0.4);
    color: rgba(79, 70, 229, 1);
    transform: scale(1.1);
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
</style>
