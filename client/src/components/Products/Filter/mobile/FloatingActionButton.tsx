import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

type FloatingActionButtonProps = {
  handleOpenFilters: () => void;
  className?: string;
};

const FloatingActionButton = ({
  handleOpenFilters,
  className,
}: FloatingActionButtonProps) => {
  return (
    <Button
      variant="default"
      size="icon"
      aria-label="Filter products"
      className={cn(
        'fixed bottom-4 right-4 md:hidden rounded-full w-14 h-14',
        'shadow-lg hover:shadow-xl transition-shadow',
        className
      )}
      onClick={handleOpenFilters}
    >
      <Filter className="h-6 w-6" />
    </Button>
  );
};

export default FloatingActionButton;
