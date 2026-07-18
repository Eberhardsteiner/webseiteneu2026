import Header from '../components/Header';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import UnternehmenMainContent from '../components/UnternehmenMainContent';

export default function UnternehmenPage() {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="Unternehmen – UVM Consulting Group & UVM-Institut"
        description="Das UVM-Institut verbindet Ökonomie und Psychologie: Strategie, Change, Führungskräfteentwicklung und Coaching – geführt von Prof. Landes und Prof. Steiner."
      />
      <Header />
      <main id="main-content" className="pt-16 md:pt-20">
        <UnternehmenMainContent />
      </main>
      <Footer />
    </div>
  );
}
