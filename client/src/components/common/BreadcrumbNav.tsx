'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link as NavigationLink } from '@/i18n/navigation';
import { ChevronRight } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbNavProps = {
  items: BreadcrumbItem[];
};

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ items }) => {
  const t = useTranslations('common');

  return (
    <Breadcrumb>
      <BreadcrumbList className="mb-2">
        {/* Home Link */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <NavigationLink
              href="/"
              className="text-muted-foreground hover:text-foreground"
            >
              {t('HOME')}
            </NavigationLink>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4" />
        </BreadcrumbSeparator>

        {/* Dynamic Items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={item.label}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <NavigationLink
                      href={item.href || '#'}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {item.label}
                    </NavigationLink>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && (
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbNav;
