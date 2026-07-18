import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  imageSrc?: string;
  /** Optionale WebP-Variante; das JPG unter imageSrc bleibt Fallback */
  imageWebpSrc?: string;
  imageAlt?: string;
}

export default function AccordionItem({ title, subtitle, children, defaultOpen = false, imageSrc, imageWebpSrc, imageAlt }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 sm:px-8 py-6 flex items-center justify-between text-left transition-colors hover:bg-gray-50"
      >
        <div className="flex-1 min-w-0 flex items-center gap-5">
          {imageSrc && (
            <picture className="flex-shrink-0">
              {imageWebpSrc && <source srcSet={imageWebpSrc} type="image/webp" />}
              <img
                src={imageSrc}
                alt={imageAlt ?? title}
                width={512}
                height={512}
                loading="lazy"
                className="w-24 sm:w-32 h-auto rounded-lg object-cover"
              />
            </picture>
          )}
          <div className="min-w-0">
            <h3 className="text-2xl font-bold text-gray-900 mb-1 break-words">{title}</h3>
            <p className="text-base text-primary-600 font-medium">{subtitle}</p>
          </div>
        </div>
        <ChevronDown
          size={28}
          className={`text-primary-600 transition-transform duration-300 flex-shrink-0 ml-2 sm:ml-4 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="px-5 sm:px-8 pb-8 pt-2">
          {children}
        </div>
      </div>
    </div>
  );
}
