import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Card, Select, SelectItem, Switch, Text } from '@tremor/react'

import i18n from '@/configs/i18n'
import { Container } from '@/components/layout'
import { settingProvider } from '@/providers/setting'

export const SettingPage = () => {
  const defaultLang = 'en'
  const defaultIsDarkMode = false
  const { t } = useTranslation()
  const [lang, setLang] = useState(settingProvider.lang)
  const [isDarkMode, setIsDarkMode] = useState(settingProvider.isDarkMode)

  useEffect(() => {
    settingProvider.changeLang(lang)
    i18n.changeLanguage(lang)
  }, [lang])

  useEffect(() => {
    settingProvider.changeDarkMode(isDarkMode)

    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev)
  }

  const handleReset = () => {
    setLang(defaultLang)
    setIsDarkMode(defaultIsDarkMode)
  }

  return (
    <Container title="Settings">
      <div className="p-6">
        <Card className="max-w-lg space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <Text>{t('setting.language')}</Text>
            <Select
              className="min-w-fit max-w-xs"
              placeholder="Select language"
              value={lang}
              onValueChange={setLang}
              enableClear={false}
            >
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="id">Indonesia</SelectItem>
            </Select>
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Text>{t('setting.theme')}</Text>
            <Switch
              id="dark"
              name="dark"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
          </div>
          <Button
            className="w-full"
            onClick={handleReset}
            disabled={defaultLang === lang && defaultIsDarkMode === isDarkMode}
          >
            {t('setting.reset')}
          </Button>
        </Card>
      </div>
    </Container>
  )
}
