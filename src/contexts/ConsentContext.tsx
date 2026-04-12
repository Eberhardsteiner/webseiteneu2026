import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ConsentState = {
  googleFonts: boolean | null;
};

type ConsentContextType = {
  consent: ConsentState;
  setConsent: (key: keyof ConsentState, value: boolean) => void;
  resetConsent: () => void;
  hasDecided: boolean;
};

const ConsentContext = createContext<ConsentContextType | null>(null);

const STORAGE_KEY = 'uvm_consent_v1';

function loadConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveConsent(state: ConsentState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<ConsentState>({ googleFonts: null });
  const [hasDecided, setHasDecided] = useState(false);

  useEffect(() => {
    const saved = loadConsent();
    if (saved !== null) {
      setConsentState(saved);
      setHasDecided(true);
    }
  }, []);

  function setConsent(key: keyof ConsentState, value: boolean) {
    const updated = { ...consent, [key]: value };
    setConsentState(updated);
    setHasDecided(true);
    saveConsent(updated);
  }

  function resetConsent() {
    const reset: ConsentState = { googleFonts: null };
    setConsentState(reset);
    setHasDecided(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  return (
    <ConsentContext.Provider value={{ consent, setConsent, resetConsent, hasDecided }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent must be used within ConsentProvider');
  return ctx;
}
