import repairs from '@/../public/services-repair.webp';
import upgrades from '@/../public/services-upgrade.webp';
import screen from '@/../public/services-screen.webp';
import accessories from '@/../public/services-accessories.webp';
import moneygram from '@/../public/services-moneygram.webp';
import ria from '@/../public/services-ria.webp';

import { Smartphone, RefreshCw, SmartphoneCharging, Headphones, RefreshCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';

/**
 * Currently the images have different aspect rations, so in order to have consistency, objecfit contain is used. but
 * a background color is added to the image container to make it look like the image is filling the container.
 *
 * Another approach, in case this is not wanted, is to use objectFit: 'cover' and set a fixed height for the image container.
 * but then some images will be cropped.
 *
 * The best would be to resize the images to have the same aspect ratio. (in this case e.g. 16:9 in an image editor)
 *
 */

export const useServicesSection = () => {
  const t = useTranslations('landing');

  const services = [
    {
      title: t('SERVICES.SMARTPHONE_REPAIRS.TITLE'),
      imageUrl: repairs,
      icon: <Smartphone className="w-6 h-6" />,
      description: t('SERVICES.SMARTPHONE_REPAIRS.DESCRIPTION'),
      backgroundColor: 'rgba(218,219,210,255)',
    },
    {
      title: t('SERVICES.MONEYGRAM_SERVICES.TITLE'),
      imageUrl: moneygram,
      icon: <RefreshCw className="w-6 h-6" />,
      description: t('SERVICES.MONEYGRAM_SERVICES.DESCRIPTION'),
      backgroundColor: 'rgba(255,255,255,255)',
    },
    {
      title: t('SERVICES.RIA_MONEY_TRANSFER.TITLE'),
      imageUrl: ria,
      icon: <RefreshCw className="w-6 h-6" />,
      description: t('SERVICES.RIA_MONEY_TRANSFER.DESCRIPTION'),
      backgroundColor: 'rgba(255,255,255,255)',
    },
    {
      title: t('SERVICES.DEVICE_UPGRADES.TITLE'),
      imageUrl: upgrades,
      icon: <RefreshCw className="w-6 h-6" />,
      description: t('SERVICES.DEVICE_UPGRADES.DESCRIPTION'),
      backgroundColor: 'rgba(15,31,48,255)',
    },
    {
      title: t('SERVICES.SCREEN_REPLACEMENTS.TITLE'),
      imageUrl: screen,
      icon: <SmartphoneCharging className="w-6 h-6" />,
      description: t('SERVICES.SCREEN_REPLACEMENTS.DESCRIPTION'),
      backgroundColor: 'rgba(239,239,239,255)',
    },
    // {
    //   title: t('SERVICES.BATTERY_REPLACEMENTS.TITLE'),
    //   imageUrl: battery.src,
    //   icon: <BatteryCharging className="w-6 h-6" />,
    //   description: t('SERVICES.BATTERY_REPLACEMENTS.DESCRIPTION'),
    // },
    {
      title: t('SERVICES.ACCESSORIES.TITLE'),
      imageUrl: accessories,
      icon: <Headphones className="w-6 h-6" />,
      description: t('SERVICES.ACCESSORIES.DESCRIPTION'),
      backgroundColor: 'rgba(112,178,206,255)',
    },
    // {
    //   title: t('SERVICES.TRADE_INS.TITLE'),
    //   imageUrl: tradeins.src,
    //   icon: <SwapHorizIcon />,
    //   description: t('SERVICES.TRADE_INS.DESCRIPTION'),
    // },
  ];

  return { services };
};
