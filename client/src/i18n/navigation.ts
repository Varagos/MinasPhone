import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Lightweight wrappers around Next.js' navigation
// APIs that consider the routing configuration
/**
 * To this usePathname does not return the locale prefix, while
 * default Next.js usePathname returns the locale prefix
 *
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
