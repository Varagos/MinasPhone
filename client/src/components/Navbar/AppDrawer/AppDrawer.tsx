'use client';
import React from 'react';
import {
  X,
  Home,
  Smartphone,
  Headset,
  Store,
  Search,
  Truck,
  Lock,
  UserPlus,
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import LanguageSelector from '../LanguageSelector';

const drawerItems = [
  { text: 'ΑΧΙΚΉ', href: '/', icon: Home },
  { text: 'ΚΙΝΗΤΑ', href: '/categories/smartphones', icon: Smartphone },
  { text: 'ACCESSORIES', href: '/categories/accessories', icon: Headset },
  {
    text: 'ΜΕΤΑΧΕΙΡΙΣΜΕΝΑ',
    href: '/categories/used-smartphones',
    icon: Smartphone,
  },
  { text: 'ALL PRODUCTS', href: '/products', icon: Store },
];

const drawerUtilities = [
  { text: 'ΑΝΑΖΗΤΗΣΗ', href: '/search', icon: Search },
  { text: 'ORDER TRACKING', href: '/order-tracking', icon: Truck },
  { text: 'ΣΥΝΔΕΣΗ', href: '/login', icon: Lock },
  { text: 'ΕΓΓΡΑΦΗ', href: '/signup', icon: UserPlus },
];

interface AppDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AppDrawer = ({ open, onOpenChange }: AppDrawerProps) => {
  const pathname = usePathname();

  const NavItem = ({ item }: { item: (typeof drawerItems)[0] }) => {
    const isActive = pathname === item.href;
    const Icon = item.icon;

    return (
      <Link href={item.href} className="w-full">
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start gap-3 text-base h-14 px-4',
            isActive && 'bg-accent text-accent-foreground'
          )}
          onClick={() => onOpenChange(false)}
        >
          <Icon className="h-5 w-5" />
          {item.text}
        </Button>
      </Link>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md h-full flex flex-col p-0 max-h-screen">
        <DialogHeader className="border-b p-4">
          <DialogTitle className="text-lg font-semibold">
            <VisuallyHidden>Navigation Menu</VisuallyHidden>
            <span aria-hidden>Menu</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <nav className="space-y-1 p-2">
            {drawerItems.map((item, index) => (
              <NavItem key={item.href} item={item} />
            ))}
          </nav>

          <Separator className="my-2" />

          <nav className="space-y-1 p-2">
            {drawerUtilities.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </nav>

          <div className="p-4">
            <LanguageSelector />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppDrawer;
