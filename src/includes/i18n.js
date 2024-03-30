import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import fr from '@/locales/fr.json'
export default createI18n({
  locale: 'en',
  fallbackLocale: 'en', // this will be used if the user selects a locale that does not exist,
  messages: {
    en, // same as en:{}
    fr // for french
  } // this contains a list of translations for our app
})
