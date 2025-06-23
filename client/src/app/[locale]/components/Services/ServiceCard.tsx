import { StaticImageData } from 'next/image';
import React from 'react';
import Image from 'next/image';

type ServiceCardProps = {
  title: string;
  imageUrl: StaticImageData;
  icon: React.JSX.Element;
  description: string;
  backgroundColor: string;
};

const ServiceCard = (props: ServiceCardProps) => {
  const { imageUrl, title, icon, description, backgroundColor } = props;
  return (
    <div className="flex flex-col items-center justify-between h-full p-4">
      <div
        className="relative w-4/5 mb-4 rounded-lg overflow-hidden"
        style={{
          backgroundColor,
          paddingBottom: '56.25%', // 16:9 aspect ratio
        }}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-contain rounded-lg"
        />
      </div>

      <div className="flex items-start w-full mb-2 justify-center">
        <div className="mr-2 text-primary">{icon}</div>
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <p className="text-center text-muted-foreground">{description}</p>
    </div>
  );
};

export default ServiceCard;
