import { useEffect, useState } from 'react'
import { Card, Select, SelectItem, Switch, Title } from '@tremor/react'

import i18n from '@/configs/i18n'
import { Container } from '@/components/layout'
import { settingProvider } from '@/providers/setting'

export const SettingPage = () => {
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

  return (
    <Container title="Settings">
      <div className="p-6">
        <Card className="space-y-6">
          <div className="flex max-w-lg items-center justify-between">
            <Title>Language</Title>
            <Select
              className="max-w-xs"
              placeholder="Select language"
              value={lang}
              onValueChange={setLang}
              enableClear={false}
            >
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="id">Indonesia</SelectItem>
            </Select>
          </div>
          <div className="flex max-w-lg items-center justify-between">
            <Title>Dark Theme</Title>
            <Switch
              id="dark"
              name="dark"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
          </div>
        </Card>
      </div>
    </Container>
  )
}
