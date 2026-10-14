import { useState, ReactNode, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { ROUTES } from '../constants/paths';
import { Info, X } from 'lucide-react';
import { quadrants } from '../data/leistungen';

const colorClasses = {
  teal: {
    bg: 'bg-[rgba(78,145,136,0.05)]',
    border: 'border-[rgba(78,145,136,0.42)]',
    text: 'text-[#233238]',
    accent: 'text-[#4E9188]',
  },
  cyan: {
    bg: 'bg-[rgba(78,145,136,0.05)]',
    border: 'border-[rgba(78,145,136,0.42)]',
    text: 'text-[#233238]',
    accent: 'text-[#4E9188]',
  },
  amber: {
    bg: 'bg-[rgba(78,145,136,0.05)]',
    border: 'border-[rgba(78,145,136,0.42)]',
    text: 'text-[#233238]',
    accent: 'text-[#4E9188]',
  },
  rose: {
    bg: 'bg-[rgba(78,145,136,0.05)]',
    border: 'border-[rgba(78,145,136,0.42)]',
    text: 'text-[#233238]',
    accent: 'text-[#4E9188]',
  },
};

export default function ProductsSection() {
  const [modalContent, setModalContent] = useState<{
    title: string;
    description: string | Array<string | ReactNode>;
    /** Leistungsseite des Quadranten, zu dem das Produkt gehört */
    slug: string;
  } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const { scrollProgress } = useScrollProgress({
    elementRef: sectionRef,
    startTrigger: 0.8,
    endTrigger: 0.2,
  });

  const openModal = (title: string, description: string | Array<string | ReactNode>, slug: string) => {
    setModalContent({ title, description, slug });
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const goToLeadershipDetails = () => {
    closeModal();
    navigate(ROUTES.FUEHRUNGSKRAEFTEQUALIFIZIERUNG);
  };

  const getQuadrantTransform = (index: number) => {
    const maxDistance = 100;
    const distance = maxDistance * (1 - scrollProgress);
    
    // Left side (index 0, 2) slides from left, right side (index 1, 3) slides from right
    const isLeftSide = index % 2 === 0;
    const x = isLeftSide ? -distance : distance;
    
    return `translateX(${x}px)`;
  };

  return (
    <section ref={sectionRef} id="leistungen" className="pt-28 pb-20 md:pt-40 md:pb-32 bg-white relative overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative max-w-6xl mx-auto">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-96 h-96 rounded-full transition-opacity duration-700"
              style={{
                background: 'conic-gradient(from 0deg, rgba(78,145,136,0.12), rgba(78,145,136,0.22), rgba(78,145,136,0.10), rgba(78,145,136,0.18), rgba(78,145,136,0.15), rgba(78,145,136,0.12))',
                maskImage: 'radial-gradient(circle, transparent 168px, black 168px)',
                WebkitMaskImage: 'radial-gradient(circle, transparent 168px, black 168px)',
                opacity: scrollProgress * 0.75,
              }}
            ></div>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
            {quadrants.map((quadrant, index) => {
              const colors = colorClasses[quadrant.color as keyof typeof colorClasses];
              return (
                <div
                  key={quadrant.title}
                  className={`${colors.bg} rounded-2xl p-8 border-2 ${colors.border} relative z-10 hover:shadow-xl transition-all duration-700`}
                  style={{
                    transform: getQuadrantTransform(index),
                    opacity: scrollProgress,
                  }}
                >
                  <h3
                    className={`text-3xl font-bold mb-6 border-b ${colors.border} pb-4 transition-transform duration-300 ${colors.text}`}
                  >
                    <Link to={quadrant.slug} className="hover:underline">
                      {quadrant.title}
                    </Link>
                  </h3>
                  <div className="space-y-4">
                    {quadrant.products.map((product) => (
                      <div
                        key={product.name}
                        className="rounded-lg p-4 hover:scale-[1.02] transition-all duration-300 group border border-[rgba(78,145,136,0.24)] bg-[rgba(78,145,136,0.07)] hover:bg-[rgba(78,145,136,0.11)] hover:border-[rgba(78,145,136,0.35)]"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300 bg-[rgba(78,145,136,0.12)]">
                              <product.icon
                                size={20}
                                className="text-[#4E9188]"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-bold font-sans text-[#233238]">
                                {product.name}
                              </h4>
                            </div>
                          </div>
                          <button
                            onClick={() => openModal(product.name, product.description, quadrant.slug)}
                            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 hover:scale-110 transition-transform bg-[rgba(78,145,136,0.14)] hover:bg-[rgba(78,145,136,0.24)] text-[#4E9188]"
                            aria-label="Mehr Informationen"
                          >
                            <Info size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {modalContent && (
        <div
          className="fixed inset-0 bg-[#101420] bg-opacity-90 flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl relative animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              aria-label="Schließen"
            >
              <X size={18} className="text-gray-600" />
            </button>

            <div className="mb-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{modalContent.title}</h3>
            </div>

            <div className="text-base text-gray-700 leading-relaxed space-y-4">
              {Array.isArray(modalContent.description) ? (
                modalContent.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                <p>{modalContent.description}</p>
              )}
              {modalContent.title === 'Führungskräftequalifizierung' && (
                <p className="text-sm text-gray-600">
                  Für eine strukturierte Übersicht der Module (Kommunikation, Leadership, Fit-für-Führung, Healthy
                  Leadership etc.) klicken Sie auf <span className="font-medium">Details</span>.
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
              <Link
                to={modalContent.slug}
                onClick={closeModal}
                className="px-6 py-2 rounded-lg text-base font-medium text-center transition-colors border border-primary-600 text-primary-700 hover:bg-primary-50"
              >
                Zur Leistungsseite
              </Link>
              {modalContent.title === 'Führungskräftequalifizierung' && (
                <button
                  onClick={goToLeadershipDetails}
                  className="px-6 py-2 rounded-lg text-base font-medium transition-colors border border-primary-600 text-primary-700 hover:bg-primary-50"
                >
                  Details
                </button>
              )}

              <button
                onClick={closeModal}
                className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
