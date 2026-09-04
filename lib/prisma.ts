import { PrismaClient } from '@prisma/client';
import { PrismaNeonHTTP } from '@prisma/adapter-neon';

/**
 * Driver HTTP de Neon plutôt qu'une connexion TCP persistante : chaque requête
 * est un appel HTTPS indépendant, ce qui évite les erreurs "Connection closed"
 * qu'on obtenait avec le driver TCP classique quand le compute Neon se met en
 * veille après une période d'inactivité (cas fréquent en serverless).
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient() {
  const adapter = new PrismaNeonHTTP(process.env.DATABASE_URL!, {
    arrayMode: false,
    fullResults: true
  });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
