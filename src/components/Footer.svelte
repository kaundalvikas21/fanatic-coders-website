<script lang="ts">
  import { onMount } from 'svelte';
  import GradientButton from './ui/GradientButton.svelte';

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Web Development', href: '/services/web-development' },
      { name: 'E-Commerce', href: '/services/ecommerce' },
      { name: 'Mobile Apps', href: '/services/mobile-apps' },
      { name: 'UI/UX Design', href: '/services/ui-ux' },
      { name: 'Cloud Solutions', href: '/services/cloud' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' }
    ],
    resources: [
      { name: 'Documentation', href: '/docs' },
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Open Source', href: '/open-source' },
      { name: 'Privacy Policy', href: '/privacy' }
    ],
    social: [
      { name: 'GitHub', icon: 'ph ph-github-logo', href: 'https://github.com' },
      { name: 'Twitter', icon: 'ph ph-twitter-logo', href: 'https://twitter.com' },
      { name: 'LinkedIn', icon: 'ph ph-linkedin-logo', href: 'https://linkedin.com' },
      { name: 'Instagram', icon: 'ph ph-instagram-logo', href: 'https://instagram.com' }
    ]
  };

  let container: HTMLElement;
  let codeElements: HTMLElement[] = [];
  
  const codeSnippets = [
    'export *',
    'import',
    'const',
    'class',
    'function',
    'return',
    'await',
    'async',
    'let',
    '=>',
  ];

  function createCodeElement(x: number, y: number, snippet: string) {
    const element = document.createElement('div');
    element.className = 'code-element absolute text-sm font-mono transition-all duration-300';
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    element.textContent = snippet;
    return element;
  }

  onMount(() => {
    const gridSize = 10;
    const spacing = container.offsetWidth / gridSize;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (Math.random() > 0.85) {
          const element = createCodeElement(
            i * spacing + Math.random() * 20,
            j * spacing + Math.random() * 20,
            codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
          );
          container.appendChild(element);
          codeElements.push(element);
        }
      }
    }
  });
</script>

<footer class="footer-root relative overflow-hidden pt-24 pb-12">
  <!-- OLED black base + aurora top fade -->
  <div class="aurora-top-fade absolute top-0 left-0 right-0 h-32 pointer-events-none"></div>

  <!-- Code Background -->
  <div
    bind:this={container}
    class="absolute inset-0 overflow-hidden opacity-[0.08]"
  >
  </div>

  <div class="container mx-auto px-4 relative">
    <!-- Footer Top Section -->
    <div class="glass-card rounded-2xl p-8 md:p-12 mb-12">
      <div class="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 class="text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
          <p class="text-blue-100/70 mb-6">Let's create something extraordinary together. Our team is ready to bring your vision to life.</p>
          <GradientButton href="/contact">
            startConversation
            <i class="ph ph-chat-circle-dots ml-2"></i>
          </GradientButton>
        </div>
        <div class="relative">
          <div class="code-decoration font-mono text-sm space-y-2 text-blue-100/40">
            <div><span class="text-pink-400">const</span> <span class="text-indigo-400">project</span> = {`{`}</div>
            <div class="pl-4">status: <span class="text-green-400">'ready'</span>,</div>
            <div class="pl-4">team: <span class="text-blue-400">'assembled'</span>,</div>
            <div class="pl-4">innovation: <span class="text-yellow-400">'unlimited'</span></div>
            <div>{`}`};</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Links Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
      <!-- Brand Column -->
      <div class="space-y-6">
        <a href="/" class="text-xl font-bold inline-flex items-center">
          <span class="text-white">{`{`}</span>
          <span class="animated-gradient-text">fanaticCoders</span>
          <span class="text-white">{`}`}</span>
        </a>
        <p class="text-blue-100/70">
          Crafting exceptional digital experiences with cutting-edge technology and innovative solutions.
        </p>
        <!-- Social Links -->
        <div class="flex gap-4">
          {#each footerLinks.social as link}
            <a 
              href={link.href}
              class="w-10 h-10 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 flex items-center justify-center text-indigo-400 hover:text-indigo-300 transition-all duration-300 border border-indigo-500/20 hover:border-indigo-500/30"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit us on ${link.name}`}
              title={link.name}
            >
              <i class={`${link.icon} text-xl`}></i>
            </a>
          {/each}
        </div>
      </div>

      <!-- Services Links -->
      <div>
        <h4 class="text-lg font-semibold mb-6">Services</h4>
        <ul class="space-y-4">
          {#each footerLinks.services as link}
            <li>
              <a 
                href={link.href}
                class="text-blue-100/70 hover:text-white transition-colors flex items-center group"
              >
                <i class="ph ph-caret-right text-indigo-400 mr-2 opacity-0 group-hover:opacity-100 transition-all"></i>
                {link.name}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Company Links -->
      <div>
        <h4 class="text-lg font-semibold mb-6">Company</h4>
        <ul class="space-y-4">
          {#each footerLinks.company as link}
            <li>
              <a 
                href={link.href}
                class="text-blue-100/70 hover:text-white transition-colors flex items-center group"
              >
                <i class="ph ph-caret-right text-indigo-400 mr-2 opacity-0 group-hover:opacity-100 transition-all"></i>
                {link.name}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Resources Links -->
      <div>
        <h4 class="text-lg font-semibold mb-6">Resources</h4>
        <ul class="space-y-4">
          {#each footerLinks.resources as link}
            <li>
              <a 
                href={link.href}
                class="text-blue-100/70 hover:text-white transition-colors flex items-center group"
              >
                <i class="ph ph-caret-right text-indigo-400 mr-2 opacity-0 group-hover:opacity-100 transition-all"></i>
                {link.name}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="border-t border-indigo-500/20 pt-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="text-blue-100/60 text-sm">
          © {currentYear} fanaticCoders. All rights reserved.
        </div>
        <div class="flex gap-6 text-sm">
          <a href="/terms" class="text-blue-100/60 hover:text-white transition-colors">Terms of Service</a>
          <a href="/privacy" class="text-blue-100/60 hover:text-white transition-colors">Privacy Policy</a>
          <a href="/cookies" class="text-blue-100/60 hover:text-white transition-colors">Cookie Policy</a>
        </div>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer-root {
    background: #000000;
  }

  .aurora-top-fade {
    background: linear-gradient(
      to bottom,
      rgba(79, 70, 229, 0.18) 0%,
      rgba(124, 58, 237, 0.08) 50%,
      transparent 100%
    );
  }

  .glass-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(124,58,237,0.2);
    backdrop-filter: blur(20px) saturate(180%);
    box-shadow: 0 0 40px rgba(124,58,237,0.1), inset 0 1px 0 rgba(255,255,255,0.05);
  }

  .code-element {
    color: rgba(124, 58, 237, 0.2);
    padding: 0.4rem 0.8rem;
    border-radius: 0.5rem;
    background: rgba(124, 58, 237, 0.04);
    border: 1px solid rgba(124, 58, 237, 0.1);
    cursor: default;
    user-select: none;
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
</style>
