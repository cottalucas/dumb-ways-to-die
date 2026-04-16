import { createContext, useContext, useState, ReactNode } from 'react'
import { Lang, translations, Translations } from '../i18n/translations'

interface LanguageContextType {
  lang: Lang
  t: Translations
  setLang: (l: Lang) => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'de',
  t: translations.de,
  setLang: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('de')
  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
