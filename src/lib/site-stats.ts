/**
 * Single source of truth for the headline credibility numbers shown across the site
 * (home hero, header mega-menu, About, Portfolio). Edit here only, never inline a stat
 * literal in a component, so the numbers can never drift apart again.
 *
 * NOTE: `projectsDelivered` and `teamMembers` are provisional. Confirm the real figures
 * before launch. `yearsShipping` is derived from the 2018 founding (see the About story
 * timeline) and must stay consistent with it.
 */
export const SITE_STATS = {
  yearsShipping: '8+', // founded 2018
  projectsDelivered: '150+', // TODO confirm (was 150+ / 500 / 120+ across the site)
  teamMembers: '40+', // TODO confirm (was 40+ / 50)
  clientRetention: '98%',
  // Portfolio-only impact figures.
  usersReached: '2.4M+',
  avgConversionLift: '+41%',
} as const;
