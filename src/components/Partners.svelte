<script lang="ts">
  const partners = [
    { name: 'TechCorp',  logo: '/logos/tech-corp.svg'   },
    { name: 'CodeLabs',  logo: '/logos/code-labs.svg'   },
    { name: 'DevForce',  logo: '/logos/dev-force.svg'   },
    { name: 'ByteWorks', logo: '/logos/byte-works.svg'  },
    { name: 'CloudScale',logo: '/logos/cloud-scale.svg' },
    { name: 'DataFlow',  logo: '/logos/data-flow.svg'   },
  ];
</script>

<section class="py-16 md:py-24 relative overflow-hidden" style="background: var(--dark-1)" id="partners">
  <!-- Subtle centre glow -->
  <div class="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(79,70,229,0.05),transparent_60%)]"></div>

  <div class="container mx-auto px-4">
    <div class="text-center mb-10 md:mb-16">
      <div class="preheading-code">trusted.partners</div>
      <h2 class="heading-code">
        <span class="function">collaborate</span>(<span class="params">industry.leaders</span>)
      </h2>
      <p class="subheading-code">// Building the future of digital experiences together</p>
    </div>

    <!-- Marquee — CSS-only, 3 sets so strip always overflows viewport at any scroll position -->
    <div class="marquee-viewport" role="region" aria-label="Trusted partners">
    <div class="marquee-inner">
      <!-- Set 1: visible to screen readers -->
      {#each partners as partner}
        <div class="partner-card">
          <img
            src={partner.logo}
            alt={partner.name}
            loading="eager"
            decoding="sync"
            width="160"
            height="48"
            class="partner-logo"
          />
        </div>
      {/each}
      <!-- Set 2 + 3: aria-hidden duplicates for seamless loop -->
      {#each [1, 2] as _}
        {#each partners as partner}
          <div class="partner-card" aria-hidden="true">
            <img
              src={partner.logo}
              alt=""
              loading="eager"
              decoding="sync"
              width="160"
              height="48"
              class="partner-logo"
            />
          </div>
        {/each}
      {/each}
    </div><!-- /marquee-inner -->
    </div><!-- /marquee-viewport -->
  </div><!-- /container -->
</section>

<style>
  /* Clip overflow, fade edges via mask — no color-specific gradient divs */
  .marquee-viewport {
    overflow: hidden;
    mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 6%,
      black 94%,
      transparent 100%
    );
    -webkit-mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 6%,
      black 94%,
      transparent 100%
    );
  }

  /* Single flex row — 3 sets, animate calc(-100%/3) = exactly one set width */
  .marquee-inner {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
    width: max-content;
    will-change: transform;
    backface-visibility: hidden;
    animation: marquee-scroll 32s linear infinite;
  }

  .marquee-viewport:hover .marquee-inner {
    animation-play-state: paused;
  }

  @keyframes marquee-scroll {
    from { transform: translate3d(0, 0, 0); }
    to   { transform: translate3d(calc(-100% / 3), 0, 0); }
  }

  .partner-card {
    flex-shrink: 0;
    width: 14rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.25rem 1.5rem;
    margin-right: 1.5rem;
    border-radius: 0.75rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(124, 58, 237, 0.12);
    transition: border-color 0.25s ease, background 0.25s ease;
  }

  .partner-card:hover {
    background: rgba(124, 58, 237, 0.07);
    border-color: rgba(124, 58, 237, 0.28);
  }

  .partner-logo {
    height: 2.5rem;
    width: 9rem;
    object-fit: contain;
    opacity: 0.45;
    filter: grayscale(100%) brightness(1.4);
    transition: opacity 0.25s ease, filter 0.25s ease;
    pointer-events: none;
    user-select: none;
  }

  .partner-card:hover .partner-logo {
    opacity: 0.9;
    filter: grayscale(0%) brightness(1);
  }

  /* Reduced motion: stop animation, show static wrapped grid */
  @media (prefers-reduced-motion: reduce) {
    .marquee-inner {
      animation: none;
      flex-wrap: wrap;
      justify-content: center;
      width: auto;
      gap: 1rem;
    }
    .marquee-viewport {
      mask-image: none;
      -webkit-mask-image: none;
    }
    .partner-card {
      margin-right: 0;
    }
  }
</style>
