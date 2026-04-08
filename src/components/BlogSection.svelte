<script lang="ts">
  import GradientButton from './ui/GradientButton.svelte';

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Web Development: What's Next in 2024",
      excerpt: 'Exploring emerging trends in web development, from WebAssembly to Edge Computing and the evolution of frontend frameworks.',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2074&auto=format&fit=crop',
      category: 'Web Development',
      readTime: '5 min read',
      date: 'Mar 15, 2026',
      tags: ['WebAssembly', 'Edge Computing', 'Frontend']
    },
    {
      id: 2,
      title: 'Building Scalable Applications with Microservices',
      excerpt: 'A comprehensive guide to microservices architecture, best practices, and real-world implementation strategies.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2074&auto=format&fit=crop',
      category: 'Architecture',
      readTime: '8 min read',
      date: 'Mar 12, 2026',
      tags: ['Microservices', 'DevOps', 'Cloud']
    },
    {
      id: 3,
      title: 'AI in Modern Web Applications: A Practical Guide',
      excerpt: 'How to integrate AI capabilities into your web applications using modern tools and frameworks.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
      category: 'AI & ML',
      readTime: '6 min read',
      date: 'Mar 10, 2026',
      tags: ['AI', 'Machine Learning', 'JavaScript']
    }
  ];

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
      <div class="preheading-code">blog.module.ts</div>
      <h2 class="heading-code">
        tech.<span class="text-indigo-400">insights</span>()
      </h2>
      <p class="subheading-code">
        // Latest updates from our tech universe
      </p>
    </div>

    <!-- Blog Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
      {#each blogPosts as post}
        <article class="glass-card group rounded-2xl overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02]">
          <!-- Image Container -->
          <div class="relative h-48 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] to-transparent opacity-50 z-10"></div>
            <img 
              src={post.image} 
              alt={post.title}
              loading="lazy"
              decoding="async"
              width="1200"
              height="800"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <!-- Category Badge -->
            <div class="absolute top-4 left-4 z-20">
              <span class="px-3 py-1 rounded-full text-sm font-mono bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 backdrop-blur-sm">
                {post.category}
              </span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6 space-y-4">
            <!-- Meta Info -->
            <div class="flex items-center gap-4 text-sm text-blue-100/60">
              <span class="flex items-center">
                <i class="ph ph-clock text-indigo-400 mr-1"></i>
                {post.readTime}
              </span>
              <span class="flex items-center">
                <i class="ph ph-calendar text-indigo-400 mr-1"></i>
                {post.date}
              </span>
            </div>

            <!-- Title -->
            <h3 class="text-xl font-bold leading-tight hover:text-indigo-400 transition-colors">
              <a href={`/blog/${post.id}`} class="block">
                {post.title}
              </a>
            </h3>

            <!-- Excerpt -->
            <p class="text-blue-100/70 line-clamp-2">
              {post.excerpt}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2">
              {#each post.tags as tag}
                <span class="tech-tag text-xs">
                  <i class="ph ph-hash text-indigo-400 mr-1"></i>
                  {tag}
                </span>
              {/each}
            </div>

            <!-- Read More Link -->
            <a 
              href={`/blog/${post.id}`}
              class="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors group/link"
            >
              <span class="mr-2">Read More</span>
              <i class="ph ph-arrow-right group-hover/link:translate-x-1 transition-transform"></i>
            </a>
          </div>
        </article>
      {/each}
    </div>

    <!-- View All Button -->
    <div class="text-center">
      <GradientButton href="/blog">
        viewAllPosts
        <i class="ph ph-article ml-2 group-hover:translate-x-1 transition-transform"></i>
      </GradientButton>
    </div>
  </div>
</section>

<style>
  .glass-card {
    background: rgba(15, 15, 26, 0.95);
    border: 1px solid rgba(79, 70, 229, 0.2);
    backdrop-filter: blur(12px);
    box-shadow: none;
  }

  .glass-card:hover {
    box-shadow: var(--glass-glow);
  }

  .tech-tag {
    @apply inline-flex items-center py-1 px-2 rounded-full;
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
</style>
