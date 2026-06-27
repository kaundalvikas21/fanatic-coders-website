import {
  siNextdotjs,
  siTypescript,
  siStripe,
  siPostgresql,
  siVercel,
  siReact,
  siClickhouse,
  siNodedotjs,
  siExpo,
  siSqlite,
  siGraphql,
  siFigma,
  siCss,
  siStorybook,
  siMapbox,
  siApachekafka,
  siGo,
  siKubernetes,
  siTrpc,
  type SimpleIcon,
} from 'simple-icons';

/**
 * Maps a portfolio tech name to its simple-icons logo. Names with no brand icon
 * (AWS, WebSocket, Auth, Tokens Studio) are intentionally absent; the consumer
 * falls back to a neutral glyph. Logos render monochrome via currentColor, so a
 * brand's hex (Next.js / Vercel are #000) never matters here.
 */
export const techIcons: Record<string, SimpleIcon> = {
  'Next.js': siNextdotjs,
  TypeScript: siTypescript,
  Stripe: siStripe,
  PostgreSQL: siPostgresql,
  Vercel: siVercel,
  React: siReact,
  'React Native': siReact,
  ClickHouse: siClickhouse,
  'Node.js': siNodedotjs,
  Expo: siExpo,
  SQLite: siSqlite,
  GraphQL: siGraphql,
  Figma: siFigma,
  CSS: siCss,
  Storybook: siStorybook,
  Mapbox: siMapbox,
  Kafka: siApachekafka,
  Go: siGo,
  Kubernetes: siKubernetes,
  tRPC: siTrpc,
};
