import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Filter from '../Filter';
import { useTranslations } from 'next-intl';

type FilterModalProps = {
  open: boolean;
  onClose: () => void;
};

const FilterModal: React.FC<FilterModalProps> = ({ open, onClose }) => {
  // Re-use the same logic and components as your desktop filter here
  const t = useTranslations('common');

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="h-full w-full max-w-none sm:max-w-none md:max-w-none lg:max-w-none flex flex-col p-0">
        <DialogHeader className="border-b p-4">
          <DialogTitle className="text-lg font-semibold">
            {t('FILTERS')}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <Filter />
        </div>

        {/* Uncomment and update if you want to add an apply button */}
        {/* <div className="border-t p-4">
          <Button className="w-full" onClick={onClose}>
            {t('APPLY_FILTERS')}
          </Button>
        </div> */}
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;
