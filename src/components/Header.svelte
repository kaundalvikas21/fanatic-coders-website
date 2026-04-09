<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import GradientButton from './ui/GradientButton.svelte';

  let isScrolled = false;
  let isMobileMenuOpen = false;
  let isMegaMenuOpen = false;
  let mobileServicesOpen = false;
  let navElement: HTMLElement;
  let menuTimeout: ReturnType<typeof setTimeout> | undefined;

  // ── Data ────────────────────────────────────────────────────────────────────
  const megaMenu = {
    title: 'Services',
    icon:  'ph ph-squares-four ph-bold',
    columns: [
      {
        heading: 'Build',
        icon: 'ph ph-code ph-bold',
        items: [
          { name: 'Web Development', description: 'Scalable web apps',    icon: 'ph ph-globe ph-bold',           href: '/services/web-development' },
          { name: 'Mobile Apps',     description: 'iOS & Android native', icon: 'ph ph-device-mobile ph-bold',   href: '/services/mobile-apps'     },
          { name: 'E-Commerce',      description: 'Custom online stores', icon: 'ph ph-shopping-cart ph-bold',   href: '/services/ecommerce'       },
          { name: 'Cloud Solutions', description: 'AWS, Azure & GCP',     icon: 'ph ph-cloud ph-bold',           href: '/services/cloud'           },
        ],
      },
      {
        heading: 'Design',
        icon: 'ph ph-paint-brush ph-bold',
        items: [
          { name: 'UI/UX Design',   description: 'User-first interfaces', icon: 'ph ph-pen-nib ph-bold',    href: '/services/design'  },
          { name: 'Brand Identity', description: 'Logos & guidelines',    icon: 'ph ph-seal-check ph-bold', href: '/services/brand'   },
          { name: 'Motion Design',  description: 'Motion & animations',   icon: 'ph ph-film-strip ph-bold', href: '/services/motion'  },
        ],
      },
      {
        heading: 'Grow',
        icon: 'ph ph-chart-line-up ph-bold',
        items: [
          { name: 'Digital Marketing',   description: 'Growth campaigns',   icon: 'ph ph-megaphone ph-bold',        href: '/services/marketing' },
          { name: 'SEO & Content',       description: 'SEO & content',      icon: 'ph ph-magnifying-glass ph-bold', href: '/services/seo'       },
          { name: 'DevOps & Consulting', description: 'CI/CD & strategy',   icon: 'ph ph-git-branch ph-bold',       href: '/services/devops'    },
        ],
      },
    ],
    featured: {
      href:        '/contact',
      cta:         'startProject',
      description: "Tell us your vision — we'll respond within 24 hours.",
      stats: [
        { number: '150+', label: 'Projects'     },
        { number: '98%',  label: 'Satisfaction' },
        { number: '10+',  label: 'Years Exp.'   },
      ],
    },
  };

  const navLinks = [
    { label: 'Portfolio', href: '/portfolio', icon: 'ph ph-briefcase ph-bold' },
    { label: 'About',     href: '/about',     icon: 'ph ph-users ph-bold'     },
    { label: 'Blog',      href: '/blog',      icon: 'ph ph-newspaper ph-bold' },
  ];

  // ── Handlers ─────────────────────────────────────────────────────────────────
  function openMegaMenu() {
    if (menuTimeout) clearTimeout(menuTimeout);
    isMegaMenuOpen = true;
  }

  function closeMegaMenu() {
    menuTimeout = setTimeout(() => { isMegaMenuOpen = false; }, 150);
  }

  function cancelClose() {
    if (menuTimeout) clearTimeout(menuTimeout);
  }

  function closeMobileMenu() {
    isMobileMenuOpen = false;
    mobileServicesOpen = false;
  }

  onMount(() => {
    const onScroll  = () => { isScrolled = window.scrollY > 20; };
    const onClick   = (e: MouseEvent) => {
      if (navElement && !navElement.contains(e.target as Node)) {
        isMegaMenuOpen   = false;
        isMobileMenuOpen = false;
      }
    };
    const onEscape  = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { isMegaMenuOpen = false; isMobileMenuOpen = false; }
    };

    window.addEventListener('scroll',  onScroll);
    document.addEventListener('click', onClick);
    window.addEventListener('keydown', onEscape);

    return () => {
      window.removeEventListener('scroll',  onScroll);
      document.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onEscape);
    };
  });
</script>

<!-- ═══════════════════════════════════════════════════════════════════════════ -->
<header class="fixed w-full z-50 transition-all duration-300" class:scrolled={isScrolled}>
  <div class="container mx-auto px-4">

    <nav
      bind:this={navElement}
      class="glass-nav rounded-2xl my-4 relative flex items-center justify-between px-6 py-4"
    >

      <!-- ── Logo ───────────────────────────────── -->
      <a href="/" class="logo shrink-0">
        <span class="text-white">{`{`}</span>
        <span class="logo-gradient">fanaticCoders</span>
        <span class="text-white">{`}`}</span>
      </a>

      <!-- ── Desktop Nav ───────────────────────── -->
      <ul class="hidden lg:flex items-center gap-1">

        <!-- Services trigger -->
        <li class="relative">
          <button
            type="button"
            class="nav-link"
            class:nav-link--active={isMegaMenuOpen}
            aria-haspopup="true"
            aria-expanded={isMegaMenuOpen}
            on:mouseenter={openMegaMenu}
            on:mouseleave={closeMegaMenu}
            on:click={() => isMegaMenuOpen = !isMegaMenuOpen}
          >
            <i class={megaMenu.icon}></i>
            <span>{megaMenu.title}</span>
            <i class="ph ph-caret-down caret" class:caret--open={isMegaMenuOpen}></i>
          </button>
        </li>

        <!-- Plain links -->
        {#each navLinks as link}
          <li>
            <a href={link.href} class="nav-link">
              <i class={link.icon}></i>
              <span>{link.label}</span>
            </a>
          </li>
        {/each}
      </ul>

      <!-- ── CTA + Hamburger ───────────────────── -->
      <div class="flex items-center gap-3 shrink-0">
        <div class="hidden sm:block">
          <GradientButton href="/contact">
            startProject
            <i class="ph ph-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
          </GradientButton>
        </div>

        <button
          type="button"
          class="lg:hidden btn btn-ghost btn-circle"
          aria-label="Toggle mobile navigation"
          aria-expanded={isMobileMenuOpen}
          on:click={() => isMobileMenuOpen = !isMobileMenuOpen}
        >
          <div class="hamburger" class:active={isMobileMenuOpen}>
            <span></span><span></span><span></span>
          </div>
        </button>
      </div>

      <!-- ── Mega Menu Panel ────────────────────── -->
      {#if isMegaMenuOpen}
        <div
          class="mega-panel"
          role="dialog"
          aria-label="Services menu"
          transition:fly={{ y: -10, duration: 220, opacity: 0 }}
          on:mouseenter={cancelClose}
          on:mouseleave={closeMegaMenu}
        >
          <div class="mega-inner">

            <!-- 3 service columns -->
            <div class="mega-columns">
              {#each megaMenu.columns as col}
                <div class="mega-col">
                  <!-- Column heading -->
                  <div class="col-head">
                    <i class={col.icon}></i>
                    {col.heading}
                  </div>

                  <!-- Items -->
                  <ul class="space-y-1">
                    {#each col.items as item}
                      <li>
                        <a
                          href={item.href}
                          class="mega-item"
                          on:click={() => isMegaMenuOpen = false}
                        >
                          <span class="item-icon">
                            <i class={item.icon}></i>
                          </span>
                          <span class="item-body">
                            <span class="item-name">{item.name}</span>
                            <span class="item-desc">{item.description}</span>
                          </span>
                          <i class="ph ph-arrow-right item-arrow"></i>
                        </a>
                      </li>
                    {/each}
                  </ul>
                </div>
              {/each}
            </div>

            <!-- Vertical divider -->
            <div class="v-divider" aria-hidden="true"></div>

            <!-- Featured / CTA panel -->
            <div class="mega-featured">
              <p class="featured-eyebrow">Work with us</p>
              <h3 class="featured-heading">Ready to Build?</h3>
              <p class="featured-body">{megaMenu.featured.description}</p>

              <div class="featured-stats">
                {#each megaMenu.featured.stats as s}
                  <div class="stat-item">
                    <span class="stat-num">{s.number}</span>
                    <span class="stat-label">{s.label}</span>
                  </div>
                {/each}
              </div>

              <div class="mt-auto">
                <GradientButton href={megaMenu.featured.href}>
                  {megaMenu.featured.cta}
                  <i class="ph ph-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                </GradientButton>
              </div>
            </div>

          </div><!-- /.mega-inner -->
        </div><!-- /.mega-panel -->
      {/if}

    </nav><!-- /nav -->

    <!-- ── Mobile Menu ─────────────────────────── -->
    {#if isMobileMenuOpen}
      <div
        class="lg:hidden fixed inset-x-0 top-[5rem] p-4"
        transition:fade={{ duration: 200 }}
      >
        <div class="glass-nav rounded-xl p-4 shadow-lg max-h-[calc(100vh-8rem)] overflow-y-auto">
          <div class="space-y-1">

            <!-- Services accordion -->
            <button
              type="button"
              class="mobile-row w-full justify-between"
              on:click={() => mobileServicesOpen = !mobileServicesOpen}
            >
              <span class="flex items-center gap-2.5 font-semibold">
                <i class="{megaMenu.icon} text-violet-400"></i>
                {megaMenu.title}
              </span>
              <i class="ph ph-caret-down transition-transform duration-300" class:rotate-180={mobileServicesOpen}></i>
            </button>

            {#if mobileServicesOpen}
              <div class="pl-3 space-y-4 pb-2" transition:fade={{ duration: 150 }}>
                {#each megaMenu.columns as col}
                  <div>
                    <p class="mobile-col-head">{col.heading}</p>
                    {#each col.items as item}
                      <a href={item.href} class="mobile-item" on:click={closeMobileMenu}>
                        <i class="{item.icon} text-violet-400 text-base shrink-0"></i>
                        <span>{item.name}</span>
                      </a>
                    {/each}
                  </div>
                {/each}
              </div>
            {/if}

            <!-- Plain links -->
            {#each navLinks as link}
              <a href={link.href} class="mobile-row" on:click={closeMobileMenu}>
                <span class="flex items-center gap-2.5">
                  <i class="{link.icon} text-violet-400 text-lg"></i>
                  {link.label}
                </span>
              </a>
            {/each}

            <div class="pt-2">
              <GradientButton href="/contact" class="w-full justify-center">
                startProject
                <i class="ph ph-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </GradientButton>
            </div>

          </div>
        </div>
      </div>
    {/if}

  </div><!-- /container -->
</header>

<!-- ═══════════════════════════════════════════════════════════════════════════ -->
<style>
  /* ── Header ─────────────────────────────────────── */
  .scrolled {
    background: rgba(8, 8, 16, 0.95);
    backdrop-filter: blur(24px) saturate(200%);
  }

  .glass-nav {
    background: rgba(8, 8, 16, 0.7);
    border: 1px solid rgba(124, 58, 237, 0.2);
    box-shadow: 0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04);
    backdrop-filter: blur(24px) saturate(200%);
  }

  /* ── Logo ────────────────────────────────────────── */
  .logo {
    font-size: 1.2rem;
    font-weight: 700;
    text-decoration: none;
    transition: opacity 0.2s;
  }
  .logo:hover { opacity: 0.82; }

  .logo-gradient {
    background: linear-gradient(135deg, #7c3aed, #2563eb, #06b6d4, #7c3aed);
    background-size: 300% 300%;
    animation: gradShift 5s ease infinite;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @keyframes gradShift {
    0%,100% { background-position: 0% 50%; }
    50%      { background-position: 100% 50%; }
  }

  /* ── Nav links ───────────────────────────────────── */
  .nav-link {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.4rem 0.85rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: rgba(255,255,255,0.62);
    background: transparent;
    border: none;
    cursor: pointer;
    transition: color 0.18s ease, background 0.18s ease;
    text-decoration: none;
  }
  .nav-link:hover,
  .nav-link--active {
    color: #fff;
    background: rgba(124, 58, 237, 0.1);
  }

  .caret {
    font-size: 0.7rem;
    transition: transform 0.25s ease;
    color: rgba(255,255,255,0.4);
  }
  .caret--open { transform: rotate(180deg); }

  /* ── Mega Panel ──────────────────────────────────── */
  .mega-panel {
    position: absolute;
    top: calc(100% + 0.625rem);
    left: 50%;
    transform: translateX(-50%);
    width: 1180px;
    z-index: 60;
    /* Prevent clipping outside the nav's overflow */
    pointer-events: auto;
  }

  /* Top arrow notch */
  .mega-panel::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 12px;
    background: rgba(8, 8, 16, 0.97);
    border-left: 1px solid rgba(124, 58, 237, 0.2);
    border-top: 1px solid rgba(124, 58, 237, 0.2);
    rotate: 45deg;
  }

  .mega-inner {
    display: flex;
    background: rgba(8, 8, 16, 0.97);
    border: 1px solid rgba(124, 58, 237, 0.2);
    border-radius: 1rem;
    box-shadow:
      0 28px 72px -12px rgba(0,0,0,0.75),
      0 0 60px rgba(124, 58, 237, 0.07),
      inset 0 1px 0 rgba(255,255,255,0.05);
    backdrop-filter: blur(32px) saturate(200%);
    overflow: hidden;
  }

  /* ── Service columns ─────────────────────────────── */
  .mega-columns {
    display: flex;
    flex: 1;
    padding: 2rem;
    gap: 0;
  }

  .mega-col {
    flex: 1;
    min-width: 210px;
    padding: 0 1.375rem;
  }
  .mega-col + .mega-col {
    border-left: 1px solid rgba(124, 58, 237, 0.1);
  }

  .col-head {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: #a855f7;
    padding-bottom: 0.75rem;
    margin-bottom: 0.75rem;
    border-bottom: 1px solid rgba(124, 58, 237, 0.12);
  }

  /* ── Mega item ───────────────────────────────────── */
  .mega-item {
    position: relative;          /* anchor the ::before bar   */
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.625rem 0.875rem 0.625rem 1rem;
    border-radius: 0.5rem;
    text-decoration: none;
    overflow: hidden;
    transition: background 0.2s ease;
  }

  /* ① Left accent bar — scaleY from center */
  .mega-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 12%;
    height: 76%;
    width: 2px;
    border-radius: 0 2px 2px 0;
    background: linear-gradient(to bottom, #7c3aed, #06b6d4);
    transform: scaleY(0);
    transform-origin: center;
    transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .mega-item:hover::before { transform: scaleY(1); }

  /* ② Background — gradient fade left → right */
  .mega-item:hover {
    background: linear-gradient(
      90deg,
      rgba(124, 58, 237, 0.12) 0%,
      rgba(124, 58, 237, 0.04) 60%,
      transparent 100%
    );
  }

  /* ③ Icon — rotate + scale + glow */
  .item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 0.45rem;
    background: rgba(124, 58, 237, 0.1);
    border: 1px solid rgba(124, 58, 237, 0.18);
    color: #a855f7;
    font-size: 1.1rem;
    flex-shrink: 0;
    transition:
      background  0.2s ease,
      color       0.2s ease,
      transform   0.25s cubic-bezier(0.16, 1, 0.3, 1),
      box-shadow  0.2s ease,
      border-color 0.2s ease;
  }
  .mega-item:hover .item-icon {
    background:   rgba(124, 58, 237, 0.22);
    color:        #c084fc;
    border-color: rgba(168, 85, 247, 0.4);
    transform:    rotate(12deg) scale(1.1);
    box-shadow:   0 4px 14px rgba(124, 58, 237, 0.35);
  }

  /* Inner icon glyph counter-rotates slightly for a "spring" feel */
  .item-icon i {
    display: inline-block;
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .mega-item:hover .item-icon i { transform: rotate(-4deg); }

  /* ④ Body — slides right as a unit */
  .item-body {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    flex: 1;
    min-width: 0;
    transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .mega-item:hover .item-body { transform: translateX(3px); }

  .item-name {
    font-size: 0.82rem;
    font-weight: 500;
    color: rgba(255,255,255,0.82);
    line-height: 1.2;
    transition: color 0.18s ease;
  }
  .mega-item:hover .item-name { color: #fff; }

  .item-desc {
    font-size: 0.72rem;
    color: rgba(255,255,255,0.38);
    line-height: 1.2;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color 0.18s ease;
  }
  .mega-item:hover .item-desc { color: rgba(255,255,255,0.55); }

  /* Arrow — slides in on hover */
  .item-arrow {
    font-size: 0.78rem;
    color: #a855f7;
    opacity: 0;
    transform: translateX(-5px);
    flex-shrink: 0;
    transition:
      opacity   0.18s ease 0.06s,
      transform 0.22s cubic-bezier(0.16, 1, 0.3, 1) 0.06s;
  }
  .mega-item:hover .item-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  /* ── Vertical divider ────────────────────────────── */
  .v-divider {
    width: 1px;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(124, 58, 237, 0.18) 15%,
      rgba(124, 58, 237, 0.18) 85%,
      transparent 100%
    );
    flex-shrink: 0;
  }

  /* ── Featured panel ──────────────────────────────── */
  .mega-featured {
    width: 250px;
    flex-shrink: 0;
    padding: 2rem 1.625rem;
    display: flex;
    flex-direction: column;
    background: linear-gradient(
      155deg,
      rgba(124, 58, 237, 0.07) 0%,
      rgba(6, 182, 212, 0.03) 100%
    );
  }

  .featured-eyebrow {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #06b6d4;
    margin-bottom: 0.3rem;
  }

  .featured-heading {
    font-size: 1.1rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }

  .featured-body {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.42);
    line-height: 1.55;
    margin-bottom: 1.25rem;
  }

  .featured-stats {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .stat-item {
    display: flex;
    align-items: baseline;
    gap: 0.45rem;
  }

  .stat-num {
    font-size: 1.25rem;
    font-weight: 800;
    background: linear-gradient(135deg, #a855f7 0%, #06b6d4 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    line-height: 1;
  }

  .stat-label {
    font-size: 0.68rem;
    color: rgba(255,255,255,0.42);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  /* ── Mobile menu rows ────────────────────────────── */
  .mobile-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    color: rgba(255,255,255,0.8);
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 0.9rem;
    text-decoration: none;
    transition: background 0.15s, color 0.15s;
  }
  .mobile-row:hover {
    background: rgba(124, 58, 237, 0.1);
    color: #fff;
  }

  .mobile-col-head {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: #a855f7;
    padding: 0.5rem 0.75rem 0.375rem;
  }

  .mobile-item {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.85rem;
    color: rgba(255,255,255,0.7);
    text-decoration: none;
    transition: background 0.15s, color 0.15s;
  }
  .mobile-item:hover {
    background: rgba(124, 58, 237, 0.08);
    color: #fff;
  }

  /* ── Hamburger ───────────────────────────────────── */
  .hamburger { @apply w-6 h-6 relative; }
  .hamburger span {
    @apply absolute left-0 w-full h-0.5 bg-current transition-all duration-300;
  }
  .hamburger span:nth-child(1) { top: 25%; }
  .hamburger span:nth-child(2) { top: 50%; transform: translateY(-50%); }
  .hamburger span:nth-child(3) { bottom: 25%; }

  .hamburger.active span:nth-child(1) { top: 50%;    transform: translateY(-50%) rotate(45deg);  }
  .hamburger.active span:nth-child(2) { opacity: 0; }
  .hamburger.active span:nth-child(3) { bottom: 50%; transform: translateY(50%)  rotate(-45deg); }

  /* ── Reduced motion ──────────────────────────────── */
  @media (prefers-reduced-motion: reduce) {
    .logo-gradient { animation: none; }
    .caret         { transition: none; }
  }
</style>
