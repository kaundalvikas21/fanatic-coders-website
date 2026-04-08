<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import GradientButton from './ui/GradientButton.svelte';
  
  let isScrolled = false;
  let isMobileMenuOpen = false;
  let isServicesOpen = false;
  let activeSubmenu = '';
  let navElement: HTMLElement;

  const menuCategories = [
    {
      id: 'solutions',
      title: 'Solutions',
      icon: 'ph ph-code ph-bold',
      description: 'Explore our comprehensive range of digital solutions',
      items: [
        {
          name: 'Web Development',
          description: 'Modern, scalable web applications',
          icon: 'ph ph-globe ph-bold',
          href: '/services/web-development',
          tags: ['React', 'Vue', 'Node.js']
        },
        {
          name: 'E-Commerce',
          description: 'Custom online store solutions',
          icon: 'ph ph-shopping-cart ph-bold',
          href: '/services/ecommerce',
          tags: ['Shopify', 'WooCommerce', 'Custom']
        },
        {
          name: 'Mobile Apps',
          description: 'Native & cross-platform apps',
          icon: 'ph ph-device-mobile ph-bold',
          href: '/services/mobile-apps',
          tags: ['iOS', 'Android', 'React Native']
        },
        {
          name: 'Cloud Solutions',
          description: 'Scalable cloud infrastructure',
          icon: 'ph ph-cloud ph-bold',
          href: '/services/cloud',
          tags: ['AWS', 'Azure', 'GCP']
        }
      ]
    },
    {
      id: 'services',
      title: 'Services',
      icon: 'ph ph-gear ph-bold',
      description: 'Professional services to grow your business',
      items: [
        {
          name: 'UI/UX Design',
          description: 'User-centered design solutions',
          icon: 'ph ph-paint-brush ph-bold',
          href: '/services/design',
          tags: ['Figma', 'Adobe XD', 'Prototyping']
        },
        {
          name: 'Digital Marketing',
          description: 'Growth-focused marketing',
          icon: 'ph ph-chart-line-up ph-bold',
          href: '/services/marketing',
          tags: ['SEO', 'PPC', 'Social']
        },
        {
          name: 'DevOps',
          description: 'Streamlined development operations',
          icon: 'ph ph-git-branch ph-bold',
          href: '/services/devops',
          tags: ['CI/CD', 'Docker', 'Kubernetes']
        },
        {
          name: 'Consulting',
          description: 'Expert technical guidance',
          icon: 'ph ph-lightbulb ph-bold',
          href: '/services/consulting',
          tags: ['Strategy', 'Architecture', 'Security']
        }
      ]
    }
  ];

  const menuItems = [
    { 
      label: 'Portfolio', 
      href: '/portfolio', 
      icon: 'ph ph-rocket ph-bold',
      description: 'Explore our successful projects'
    },
    { 
      label: 'About', 
      href: '/about', 
      icon: 'ph ph-users ph-bold',
      description: 'Learn about our team and mission'
    },
    { 
      label: 'Blog', 
      href: '/blog', 
      icon: 'ph ph-newspaper ph-bold',
      description: 'Insights and tech articles'
    }
  ];

  let menuTimeout: ReturnType<typeof setTimeout> | undefined;

  function openSubmenu(categoryId: string) {
    isServicesOpen = true;
    activeSubmenu = categoryId;
  }

  function closeSubmenu() {
    isServicesOpen = false;
    activeSubmenu = '';
  }

  function toggleSubmenu(categoryId: string) {
    if (isServicesOpen && activeSubmenu === categoryId) {
      closeSubmenu();
      return;
    }
    openSubmenu(categoryId);
  }

  function handleMouseEnter(categoryId: string) {
    if (menuTimeout) {
      clearTimeout(menuTimeout);
    }
    openSubmenu(categoryId);
  }

  function handleMouseLeave() {
    menuTimeout = setTimeout(() => {
      closeSubmenu();
    }, 200);
  }

  function handleTriggerFocusOut(event: FocusEvent) {
    const currentTarget = event.currentTarget as HTMLElement;
    const nextTarget = event.relatedTarget as Node | null;
    if (!nextTarget || !currentTarget.contains(nextTarget)) {
      closeSubmenu();
    }
  }

  function handleSubmenuKeydown(event: KeyboardEvent, categoryId: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleSubmenu(categoryId);
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      openSubmenu(categoryId);
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      closeSubmenu();
    }
  }

  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 20;
    };

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (navElement && !navElement.contains(target)) {
        closeSubmenu();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSubmenu();
        isMobileMenuOpen = false;
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleDocumentClick);
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleDocumentClick);
      window.removeEventListener('keydown', handleEscape);
    };
  });
</script>

<header 
  class="fixed w-full z-50 transition-all duration-300" 
  class:scrolled={isScrolled}
>
  <div class="container mx-auto px-4">
    <nav class="navbar glass-nav rounded-2xl my-4" bind:this={navElement}>
      <!-- Logo -->
      <div class="navbar-start">
        <a 
          href="/" 
          class="text-xl font-bold hover:opacity-80 transition-opacity"
        >
          <span class="text-white">{`{`}</span>
          <span class="animated-gradient-text">fanaticCoders</span>
          <span class="text-white">{`}`}</span>
        </a>
      </div>

      <!-- Desktop Menu -->
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1 gap-2">
          {#each menuCategories as category}
            <li>
              <div
                class="mega-menu-trigger"
                on:mouseenter={() => handleMouseEnter(category.id)}
                on:mouseleave={handleMouseLeave}
                on:focusout={handleTriggerFocusOut}
              >
                <button
                  type="button"
                  class="menu-item flex items-center gap-2"
                  aria-haspopup="true"
                  aria-expanded={isServicesOpen && activeSubmenu === category.id}
                  aria-controls={`mega-menu-${category.id}`}
                  on:click={() => toggleSubmenu(category.id)}
                  on:keydown={(event) => handleSubmenuKeydown(event, category.id)}
                >
                  <i class={category.icon}></i>
                  <span>{category.title}</span>
                  <i class="ph ph-caret-down transition-transform duration-300" class:rotate-180={isServicesOpen && activeSubmenu === category.id}></i>
                </button>

                {#if isServicesOpen && activeSubmenu === category.id}
                  <div 
                    id={`mega-menu-${category.id}`}
                    class="mega-menu"
                    transition:fade={{ duration: 200 }}
                    on:keydown={(event) => event.key === 'Escape' && closeSubmenu()}
                  >
                    <div class="mega-menu-content">
                      <!-- Header -->
                      <div class="mb-6 pb-4 border-b border-indigo-500/20">
                        <h3 class="text-lg font-semibold flex items-center gap-2">
                          <i class={category.icon}></i>
                          {category.title}
                        </h3>
                        <p class="text-sm text-blue-100/60">{category.description}</p>
                      </div>

                      <!-- Grid -->
                      <div class="grid grid-cols-2 gap-4">
                        {#each category.items as item}
                          <a 
                            href={item.href}
                            class="menu-item flex items-start p-4 rounded-lg hover:bg-indigo-500/10 transition-all duration-300 group"
                            on:click={closeSubmenu}
                          >
                            <div class="service-icon mr-4">
                              <i class={item.icon}></i>
                            </div>
                            <div class="flex-1">
                              <div class="font-medium mb-1 group-hover:text-indigo-400 transition-colors">
                                {item.name}
                              </div>
                              <div class="text-sm text-blue-100/60 mb-2">
                                {item.description}
                              </div>
                              <div class="flex flex-wrap gap-2">
                                {#each item.tags as tag}
                                  <span class="tech-tag text-xs">
                                    <i class="ph ph-hash text-indigo-400 mr-1"></i>
                                    {tag}
                                  </span>
                                {/each}
                              </div>
                            </div>
                            <i class="ph ph-arrow-right text-indigo-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"></i>
                          </a>
                        {/each}
                      </div>
                    </div>
                  </div>
                {/if}
              </div>
            </li>
          {/each}

          {#each menuItems as item}
            <li>
              <a 
                href={item.href}
                class="menu-item flex items-center gap-2 group"
              >
                <i class={item.icon}></i>
                <span>{item.label}</span>
                <div class="menu-tooltip" aria-hidden="true">
                  {item.description}
                </div>
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- CTA & Mobile Menu -->
      <div class="navbar-end gap-4">
        <GradientButton href="/contact" class="hidden sm:flex">
          startProject
          <i class="ph ph-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
        </GradientButton>
        
        <button 
          type="button"
          class="lg:hidden btn btn-ghost btn-circle"
          aria-label="Toggle mobile navigation menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          on:click={() => isMobileMenuOpen = !isMobileMenuOpen}
        >
          <div class="hamburger" class:active={isMobileMenuOpen}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    {#if isMobileMenuOpen}
      <div 
        id="mobile-navigation"
        class="lg:hidden fixed inset-x-0 top-[5rem] p-4"
        transition:fade={{ duration: 200 }}
      >
        <div class="glass-nav rounded-xl p-4 shadow-lg max-h-[calc(100vh-8rem)] overflow-y-auto">
          <div class="space-y-6">
            {#each menuCategories as category}
              <div class="space-y-2">
                <div class="px-4 flex items-center gap-2 text-lg font-semibold">
                  <i class={category.icon}></i>
                  {category.title}
                </div>
                <div class="grid gap-2">
                  {#each category.items as item}
                    <a 
                      href={item.href}
                      class="flex items-center p-4 hover:bg-indigo-500/10 rounded-lg transition-colors group"
                      on:click={() => isMobileMenuOpen = false}
                    >
                      <div class="service-icon mr-4">
                        <i class={item.icon}></i>
                      </div>
                      <div>
                        <div class="font-medium group-hover:text-indigo-400 transition-colors">
                          {item.name}
                        </div>
                        <div class="text-sm text-blue-100/60">
                          {item.description}
                        </div>
                      </div>
                    </a>
                  {/each}
                </div>
              </div>
            {/each}
            
            {#each menuItems as item}
              <a 
                href={item.href}
                class="flex items-center p-4 hover:bg-indigo-500/10 rounded-lg transition-colors group"
                on:click={() => isMobileMenuOpen = false}
              >
                <i class={`${item.icon} text-xl text-indigo-400 mr-3`}></i>
                <span>{item.label}</span>
              </a>
            {/each}
            
            <GradientButton href="/contact" class="w-full justify-center">
              startProject
              <i class="ph ph-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
            </GradientButton>
          </div>
        </div>
      </div>
    {/if}
  </div>
</header>

<style>
  .scrolled {
    background: rgba(8, 8, 16, 0.95);
    backdrop-filter: blur(24px) saturate(200%);
  }

  /* Fix DaisyUI navbar centering — start/end default to width:50% which off-centers nav links */
  nav.glass-nav :global(.navbar-start),
  nav.glass-nav :global(.navbar-end) {
    flex: 0 0 auto;
    width: auto;
  }

  nav.glass-nav :global(.navbar-center) {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .glass-nav {
    background: rgba(8, 8, 16, 0.7);
    box-shadow: 0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04);
    border: 1px solid rgba(124, 58, 237, 0.2);
    backdrop-filter: blur(24px) saturate(200%);
    @apply px-6 py-4;
  }

  .animated-gradient-text {
    background: linear-gradient(135deg, #7c3aed, #2563eb, #06b6d4, #7c3aed);
    background-size: 300% 300%;
    animation: gradient 5s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @keyframes gradient {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* 1. Kill DaisyUI's hover/focus/active on ALL menu children — prevents double-bg and outline glitch */
  :global(.navbar-center .menu li > *),
  :global(.navbar-center .menu li > *:hover),
  :global(.navbar-center .menu li > *:focus),
  :global(.navbar-center .menu li > *:active) {
    background: transparent !important;
    outline: none !important;
    box-shadow: none !important;
  }

  /* 2. Single unified hover for both dropdown triggers and plain links */
  .menu-item {
    @apply px-4 py-2 rounded-lg transition-all duration-200;
    background: transparent;
    color: rgba(255, 255, 255, 0.7);
    outline: none;
    border: none;
  }

  .menu-item:hover,
  .menu-item:focus-visible {
    background: rgba(124, 58, 237, 0.1);
    color: rgba(255, 255, 255, 1);
    outline: none;
  }

  /* Bottom border on hover — mega menu inner links only */
  :global(.mega-menu-content) .menu-item {
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s ease, background 0.3s ease, color 0.3s ease;
  }

  :global(.mega-menu-content) .menu-item:hover {
    border-bottom-color: rgba(124, 58, 237, 0.45);
  }

  /* Icon rotate on hover */
  :global(.mega-menu-content) .service-icon {
    transition: transform 0.25s cubic-bezier(.16,1,.3,1);
  }

  :global(.mega-menu-content) .menu-item:hover .service-icon {
    transform: rotate(12deg);
  }

  /* Normalize li height so div-wrapped and a-wrapped items align identically */
  :global(.navbar-center .menu li) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mega-menu-trigger {
    display: flex;
    align-items: center;
    position: relative;
  }

  .mega-menu {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 50%;
    transform: translateX(-50%);
    width: max-content;
    min-width: 600px;
    z-index: 50;
  }

  .mega-menu-content {
    background: rgba(8, 8, 16, 0.97);
    border: 1px solid rgba(124, 58, 237, 0.25);
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 20px 60px -12px rgba(0,0,0,0.6), 0 0 40px rgba(124,58,237,0.1), inset 0 1px 0 rgba(255,255,255,0.04);
    backdrop-filter: blur(28px) saturate(200%);
  }

  .menu-tooltip {
    @apply absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 rounded-lg text-sm;
    background: rgba(8, 8, 16, 0.98);
    border: 1px solid rgba(124, 58, 237, 0.2);
    backdrop-filter: blur(12px);
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px) translateX(-50%);
    transition: all 0.2s ease;
  }

  .menu-item:hover .menu-tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateY(0) translateX(-50%);
  }

  .service-icon {
    @apply w-10 h-10 rounded-lg flex items-center justify-center text-xl;
    background: rgba(124, 58, 237, 0.1);
    border: 1px solid rgba(124, 58, 237, 0.2);
    color: #a855f7;
    transition: all 0.2s ease;
  }

  .tech-tag {
    @apply inline-flex items-center py-1 px-2 rounded-full text-xs;
    background: rgba(124, 58, 237, 0.08);
    border: 1px solid rgba(124, 58, 237, 0.2);
  }

  /* Hamburger */
  .hamburger { @apply w-6 h-6 relative; }

  .hamburger span {
    @apply absolute left-0 w-full h-0.5 bg-current transition-all duration-300;
  }

  .hamburger span:nth-child(1) { top: 25%; }
  .hamburger span:nth-child(2) { top: 50%; transform: translateY(-50%); }
  .hamburger span:nth-child(3) { bottom: 25%; }

  .hamburger.active span:nth-child(1) { top: 50%; transform: translateY(-50%) rotate(45deg); }
  .hamburger.active span:nth-child(2) { opacity: 0; }
  .hamburger.active span:nth-child(3) { bottom: 50%; transform: translateY(50%) rotate(-45deg); }
</style>
