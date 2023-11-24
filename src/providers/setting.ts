export interface SettingProvider {
  lang: string
  changeLang(lang: string): void

  isDarkMode: boolean
  changeDarkMode(isDarkMode: boolean): void
}

export const settingProvider: SettingProvider = {
  lang: localStorage.getItem('lang') ?? 'en',
  changeLang(lang: string) {
    settingProvider.lang = lang
    localStorage.setItem('lang', lang)
  },

  isDarkMode: localStorage.getItem('isDarkMode') === 'true',
  changeDarkMode(isDarkMode: boolean) {
    settingProvider.isDarkMode = isDarkMode
    localStorage.setItem('isDarkMode', isDarkMode.toString())
  },
}
