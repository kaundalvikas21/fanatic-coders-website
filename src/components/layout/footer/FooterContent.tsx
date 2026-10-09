'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import FooterSocialLinks from './FooterSocialLinks';
import { useSiteSetting } from '@/providers/SiteSettingsProvider';

const footerLinks = {
  services: [
    { name: 'Web Development', href: '/services/web-development' },
    { name: 'E-Commerce', href: '/services/ecommerce' },
    { name: 'Mobile Apps', href: '/services/mobile-apps' },
    { name: 'UI/UX Design', href: '/services/design' },
    { name: 'Cloud Solutions', href: '/services/cloud' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Case Studies', href: '/portfolio#portfolio-grid' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
};

const navColumns = [
  { label: 'Services', links: footerLinks.services },
  { label: 'Company', links: footerLinks.company },
  { label: 'Resources', links: footerLinks.resources },
];

export default function FooterContent() {
  const setting = useSiteSetting();
  const contactEmail = setting?.contactEmail ?? siteConfig.contactEmail;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_2.6fr] lg:gap-16 mb-12">
      {/* Brand */}
      <div className="space-y-6">
        <Link
          href="/"
          className="text-xl font-bold inline-flex items-center no-underline"
        >
          <span className="text-white">{'{'}</span>
          <span className="animated-gradient-text">fanaticCoders</span>
          <span className="text-white">{'}'}</span>
        </Link>
        <p className="text-blue-100/70">
          We design and build digital products with modern technology.
        </p>
        <div className="flex flex-col gap-1 text-sm text-blue-100/70">
          <a
            href={`mailto:${contactEmail}`}
            className="w-fit hover:text-white"
          >
            {contactEmail}
          </a>
          {setting?.phone && (
            <a
              href={`tel:${setting.phone.replace(/[^\d+]/g, '')}`}
              className="w-fit hover:text-white"
            >
              {setting.phone}
            </a>
          )}
        </div>
        <FooterSocialLinks />
      </div>

      {/* Nav columns: 2x2 on mobile, 3-across from sm up */}
      <nav
        aria-label="Footer"
        className="grid grid-cols-2 sm:grid-cols-3 gap-8"
      >
        {navColumns.map((col) => (
          <div key={col.label}>
            <h4 className="text-sm font-mono font-semibold uppercase tracking-wider text-blue-100/70 mb-5">
              {col.label}
            </h4>
            <ul className="space-y-4 list-none m-0 p-0">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative text-blue-100/70 hover:text-white transition-colors inline-flex items-center group no-underline py-1"
                  >
                    <ChevronRight
                      size={14}
                      className="absolute -left-5 text-indigo-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                      aria-hidden
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}
