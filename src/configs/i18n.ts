import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationEn from '@/_locales/en/translation.json'
import translationId from '@/_locales/id/translation.json'

i18n.use(initReactI18next).init({
  lng: 'en',
  debug: process.env.NODE_ENV === 'development',
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources: {
    en: { translation: translationEn },
    id: { translation: translationId },
  },
  // if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
  // set returnNull to false (and also in the i18next.d.ts options)
  // returnNull: false,
})

export default i18n
