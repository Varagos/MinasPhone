import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';

interface CategoryItemProps {
  src: StaticImageData;
  heading: string;
  dest: string;
  alt: string;
}

const CategoryItem = ({ src, heading, dest, alt }: CategoryItemProps) => {
  return (
    <div className="flex flex-col w-full h-full">
      <Link
        href={dest}
        className="h-full no-underline hover:no-underline"
        style={{
          textDecoration: 'none',
          height: '100%',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <div 
          className="relative h-full flex flex-col border border-gray-300 bg-white hover:border-[#ffce2a] hover:-translate-y-2.5 transition-all duration-300 ease-in-out"
          style={{
            transform: 'translateY(0)',
            willChange: 'transform, border-color'
          }}
        >
          <div className="relative w-full" style={{ height: '250px' }}>
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={alt}
                placeholder="blur"
                quality={100}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%',
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
              />
            </div>
          </div>
          <div
            className="mx-auto text-center py-2.5 px-0 mt-auto"
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              left: '0%',
              right: '0%',
              paddingBottom: '10px',
              marginTop: 'auto',
            }}
          >
            <h3
              className="text-lg font-medium text-black m-0 p-0"
              style={{
                fontSize: '1rem',
                fontWeight: 500,
                lineHeight: 1.5,
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                letterSpacing: '0.00938em',
              }}
            >
              {heading}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
