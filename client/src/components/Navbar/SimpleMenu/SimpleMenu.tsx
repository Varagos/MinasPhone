'use client';

import { useRouter } from 'next/navigation';
import { User, Truck, Settings, LogIn } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const SimpleMenu = () => {
  const router = useRouter();

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  // {authStatus === 'signedIn' && <LogoutButton />}

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <User className="h-5 w-5 text-white" />
          <span className="sr-only">User menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => handleNavigate('/order-tracking')}>
          <Truck className="mr-2 h-4 w-4" />
          <span>Order Tracking</span>
        </DropdownMenuItem>
        {/* <DropdownMenuItem onClick={() => handleNavigate('/auth')}>
          <LogIn className="mr-2 h-4 w-4" />
          <span>Login/Register</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigate('/another-route')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Another Option</span>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SimpleMenu;
