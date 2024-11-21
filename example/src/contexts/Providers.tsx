import { PropsWithChildren } from 'react'
import { AppProvider, ThemeProvider } from 'contexts'

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AppProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AppProvider>
  )
}
