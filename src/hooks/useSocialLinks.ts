'use client';

import { useMemo } from 'react';
import { siFacebook, siX, siInstagram, siGithub, type SimpleIcon } from 'simple-icons';
import { useSiteSetting } from '@/providers/SiteSettingsProvider';

export interface SocialLinkData {
  label: string;
  href: string;
  icon: SimpleIcon | null;
}

export function useSocialLinks(): SocialLinkData[] {
  const setting = useSiteSetting();
  const facebookUrl = setting?.facebookUrl;
  const twitterUrl = setting?.twitterUrl;
  const instagramUrl = setting?.instagramUrl;
  const linkedinUrl = setting?.linkedinUrl;
  const githubUrl = setting?.githubUrl;

  return useMemo(
    () =>
      [
        { label: 'Facebook', href: facebookUrl, icon: siFacebook },
        { label: 'X / Twitter', href: twitterUrl, icon: siX },
        { label: 'Instagram', href: instagramUrl, icon: siInstagram },
        { label: 'LinkedIn', href: linkedinUrl, icon: null },
        { label: 'GitHub', href: githubUrl, icon: siGithub },
      ].filter((link): link is SocialLinkData => Boolean(link.href)),
    [facebookUrl, twitterUrl, instagramUrl, linkedinUrl, githubUrl],
  );
}
