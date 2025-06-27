'use client';
import React, { useState } from 'react';
import Link from 'next/link';

import svgLogo from '../../../public/logo.svg';
import AppDrawer from './AppDrawer/AppDrawer';

import { Phone, ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { IconLinkButton } from '../common/IconLinkButton';
import { ClickAwayListener } from '../common/ClickAwayListener';
import SimpleMenu from './SimpleMenu/SimpleMenu';
import { SearchInputField, SearchPromptIcon } from './Search';
import LanguageSelector from './LanguageSelector';
import MobileSearch from './Search/MobileSearch';
import { usePathname } from '@/i18n/navigation';
import { useCart } from '@/hooks/useCart';
import { useLocale, useTranslations } from 'next-intl';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const FEATURED_CATEGORIES = [
  {
    href: '/categories/smartphones',
    title: 'ΚΙΝΗΤΑ',
  },
  {
    href: '/categories/accessories',
    title: 'ΑΞΕΣΟΥΑΡ',
  },
  {
    href: '/categories/used-smartphones',
    title: 'ΜΕΤΑΧΕΙΡΙΣΜΕΝΑ',
  },
] as const;

const NewNavbar = () => {
  const currentPath = usePathname();
  const locale = useLocale();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [searchActive, setSearchActive] = useState(false);

  const t = useTranslations('common');

  const handleSearchToggle = () => {
    setSearchActive((prev) => !prev);
  };

  const handleCloseSearch = () => {
    setSearchActive(false);
  };

  // TODO fix
  const { cart } = useCart();

  const toggleDrawer =
    (open: boolean) => (event?: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        'key' in event &&
        (event.key === 'Tab' || event.key === 'Shift')
      ) {
        return;
      }
      setIsDrawerOpen(open);
    };

  function isActive(path: string): boolean {
    const basePathWithOutQuery = currentPath.split('?')[0];
    return basePathWithOutQuery === path;
  }

  return (
    <nav className="bg-white">
      {/* Top Bar */}
      <div className="border-b border-gray-200 bg-secondary px-12 mx-auto w-full flex h-12 items-center justify-between">
        <div className="flex items-center">
          <Phone className="h-5 w-5 " />
          <div className="ml-2">
            <span className="text-lg font-bold">{t('PHONE_NUMBER')}</span>
          </div>
        </div>
        <LanguageSelector />
      </div>

      {/* Main Navbar */}
      <div className="border-b border-gray-200 bg-primary px-9">
        <div className="mx-auto w-full">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="block">
                <Image
                  src={svgLogo}
                  alt="MinasPhone"
                  className="h-14 w-auto"
                  priority
                />
              </Link>
            </div>
            
            <div className="flex flex-1 items-center justify-end">
              {/* Navigation Menu */}
              {!searchActive && (
                <div className="hidden md:block">
                  <NavigationMenu>
                    <NavigationMenuList className="gap-1">
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/"
                            className={cn(
                              'inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
                              isActive('/')
                                ? 'border-b-2 border-primary font-bold text-primary hover:bg-transparent'
                                : 'hover:bg-secondary/50 hover:text-foreground text-white'
                            )}
                          >
                            {t('HOME').toUpperCase()}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>

                      {FEATURED_CATEGORIES.map((category) => (
                        <NavigationMenuItem key={category.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={category.href}
                              className={cn(
                                'inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
                                isActive(category.href)
                                  ? 'border-b-2 border-primary font-bold text-primary hover:bg-transparent'
                                  : 'hover:bg-secondary/50 hover:text-foreground text-white'
                              )}
                            >
                              {category.title}
                            </Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      ))}

                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/products"
                            className={cn(
                              'inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors',
                              isActive('/products')
                                ? 'border-b-2 border-primary font-bold text-primary hover:bg-transparent'
                                : 'hover:bg-secondary/50 hover:text-foreground text-white'
                            )}
                          >
                            {t('ALL_PRODUCTS')}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>
              )}
              
              {/* Search and Cart */}
              <div className="ml-4 flex items-center space-x-2">
                {searchActive ? (
                  <ClickAwayListener onClickAway={handleCloseSearch}>
                    <div className="w-64">
                      <SearchInputField />
                    </div>
                  </ClickAwayListener>
                ) : (
                  <SearchPromptIcon handleSearchToggle={handleSearchToggle} />
                )}

                <SimpleMenu />

                {currentPath !== '/cart' && (
                  <div className="relative">
                    <IconLinkButton
                      href="/cart"
                      aria-label="Show cart items"
                      className="relative"
                    >
                      {cart?.totalItems ? (
                        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
                          {cart.totalItems}
                        </span>
                      ) : null}
                      <ShoppingCart className="h-6 w-6 text-white" />
                    </IconLinkButton>
                  </div>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={toggleDrawer(true)}
                >
                  <Menu className="h-6 w-6 text-white" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AppDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
      <MobileSearch />
    </nav>
  );
};

export default NewNavbar;
