<script lang="ts">
  import { onMount } from 'svelte';
  import GradientButton from './ui/GradientButton.svelte';

  const services = [
    {
      id: 'digital-branding',
      title: 'Digital Branding & Marketing',
      description: 'Strategic digital presence development with data-driven marketing campaigns that elevate your brand. We create comprehensive digital strategies that connect with your audience and drive measurable results.',
      icon: 'ph ph-trend-up ph-bold',
      features: ['Brand Strategy', 'Social Media', 'Content Marketing', 'Analytics'],
      image: '/services/digital-branding.svg'
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce Development',
      description: 'Custom e-commerce solutions that drive sales with seamless user experience. From small shops to large marketplaces, we build scalable platforms that grow with your business.',
      icon: 'ph ph-shopping-cart ph-bold',
      features: ['Custom Stores', 'Payment Systems', 'Inventory', 'Analytics'],
      image: '/services/ecommerce.svg'
    },
    {
      id: 'open-source',
      title: 'Open Source Customization',
      description: 'Tailored open-source solutions with full control over your technology. We help you leverage the power of open-source while maintaining security and performance.',
      icon: 'ph ph-code ph-bold',
      features: ['Custom Plugins', 'API Integration', 'Performance', 'Security'],
      image: '/services/open-source.svg'
    },
    {
      id: 'seo-ppc',
      title: 'SEO & PPC',
      description: 'Data-driven search optimization and paid advertising strategies that increase your visibility and drive qualified traffic to your website.',
      icon: 'ph ph-chart-line-up ph-bold',
      features: ['Technical SEO', 'Content SEO', 'Ad Campaigns', 'Analytics'],
      image: '/services/seo-ppc.svg'
    },
    {
      id: 'web-design',
      title: 'Web Design and Development',
      description: 'Modern, responsive websites with powerful functionality. We create beautiful, user-friendly websites that work seamlessly across all devices.',
      icon: 'ph ph-layout ph-bold',
      features: ['UI Design', 'Responsive', 'Performance', 'SEO Ready'],
      image: '/services/web-design.svg'
    },
    {
      id: 'full-stack',
      title: 'Full Stack Development',
      description: 'End-to-end development solutions with modern tech stack. From frontend to backend, we build complete solutions that power your digital presence.',
      icon: 'ph ph-stack ph-bold',
      features: ['Frontend', 'Backend', 'APIs', 'Cloud'],
      image: '/services/full-stack.svg'
    }
  ];

  let activeService = services[0];
  let mounted = false;

  onMount(() => {
    mounted = true;
    return () => {
      mounted = false;
    };
  });

  function setActiveService(service: typeof services[0]) {
    activeService = service;
  }
</script>

<section class="py-24 relative overflow-hidden section-bg" id="services">
  <!-- Spotlights -->
  <div class="spotlight spotlight-1"></div>
  <div class="spotlight spotlight-2"></div>
  <div class="spotlight spotlight-3"></div>

  <div class="absolute inset-0 -z-10">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.05),transparent_50%)]"></div>
    <div class="code-grid"></div>
  </div>

  <div class="container mx-auto px-4">
    <div class="text-center mb-16">
      <div class="preheading-code">services.module.ts</div>
      <h2 class="heading-code">
        export class <span class="text-indigo-400">DigitalServices</span>
      </h2>
      <p class="subheading-code">
        // Transforming ideas into digital reality
      </p>
    </div>

    <div class="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
      <!-- Services List (Left Side) -->
      <div class="space-y-2" role="tablist" aria-label="Service categories">
        {#each services as service}
          <button
            type="button"
            class="service-item group w-full text-left p-4 rounded-lg transition-all duration-300"
            class:active={service === activeService}
            role="tab"
            aria-selected={service === activeService}
            aria-controls={`service-panel-${service.id}`}
            on:click={() => setActiveService(service)}
          >
            <div class="flex items-center gap-4">
              <div class="service-icon">
                <i class={`${service.icon} text-xl`}></i>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold group-hover:text-indigo-400 transition-colors">
                  {service.title}
                </h3>
              </div>
              <i class={`ph ph-arrow-right text-xl text-indigo-400 transform transition-transform duration-300 ${service === activeService ? 'translate-x-1' : ''} opacity-0 group-hover:opacity-100`}></i>
            </div>
          </button>
        {/each}
      </div>

      <!-- Service Details (Right Side) -->
      {#if mounted && activeService}
        <div
          id={`service-panel-${activeService.id}`}
          class="service-details glass-card p-8 rounded-2xl"
          role="tabpanel"
        >
          <div class="flex items-start gap-6">
            <div class="service-icon-large">
              <i class={`${activeService.icon} text-3xl`}></i>
            </div>
            <div class="flex-1">
              <h3 class="text-2xl font-bold mb-4 text-white">
                {activeService.title}
              </h3>
              <p class="text-blue-100/70 mb-6 leading-relaxed">
                {activeService.description}
              </p>
              <div class="grid grid-cols-2 gap-3 mb-6">
                {#each activeService.features as feature}
                  <div class="feature-tag">
                    <i class="ph ph-check text-indigo-400 mr-2"></i>
                    <span>{feature}</span>
                  </div>
                {/each}
              </div>
              <GradientButton href={`/services/${activeService.id}`} variant="secondary">
                viewDetails
                <i class="ph ph-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </GradientButton>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  .glass-card {
    background: rgba(15, 15, 26, 0.8);
    border: 1px solid rgba(79, 70, 229, 0.2);
    backdrop-filter: blur(12px);
  }

  .service-item {
    background: rgba(15, 15, 26, 0.8);
    border: 1px solid rgba(79, 70, 229, 0.2);
    backdrop-filter: blur(12px);
  }

  .service-item:hover,
  .service-item.active {
    background: rgba(79, 70, 229, 0.1);
    border-color: rgba(79, 70, 229, 0.4);
  }

  .service-icon {
    @apply flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400;
    transition: all 0.3s ease;
  }

  .service-icon-large {
    @apply flex items-center justify-center w-16 h-16 rounded-xl bg-indigo-500/20 text-indigo-400;
    transition: all 0.3s ease;
  }

  .service-item:hover .service-icon,
  .service-item.active .service-icon {
    @apply bg-indigo-500 text-white;
    transform: scale(1.1);
  }

  .feature-tag {
    @apply flex items-center text-sm py-2 px-3 rounded-lg;
    background: rgba(79, 70, 229, 0.1);
    border: 1px solid rgba(79, 70, 229, 0.2);
  }

  :global(.preheading-code) {
    @apply inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full text-sm font-mono;
    background: linear-gradient(135deg, rgb(99, 102, 241), rgb(79, 70, 229));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    border: 1px solid rgba(79, 70, 229, 0.3);
  }

  :global(.heading-code) {
    @apply text-4xl md:text-5xl font-bold mb-4 font-mono;
  }

  :global(.subheading-code) {
    @apply text-xl text-blue-100/60 max-w-2xl mx-auto font-mono;
  }
</style>
