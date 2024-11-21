// https://bobbyhadz.com/blog/typescript-make-types-global

declare global {
  type API_Response<T = unknown> = Promise<{
    data: T
    message: string
    success: boolean
    errors?: Record<string, string> | null
  }>

  type Roles = 'user' | 'manager' | 'admin'

  // Used by Colors below.
  export interface Shades {
    '50': string
    '100': string
    '200': string
    '300': string
    '400': string
    '500': string
    '600': string
    '700': string
    '800': string
    '900': string
    '950': string
  }

  // Used by styles/theme.ts
  export interface Colors {
    inherit: 'inherit'
    current: 'currentColor'
    transparent: 'transparent'
    black: '#000'
    white: '#fff'
    slate: Shades
    gray: Shades
    zinc: Shades
    neutral: Shades
    stone: Shades
    red: Shades
    orange: Shades
    amber: Shades
    yellow: Shades
    lime: Shades
    green: Shades
    emerald: Shades
    teal: Shades
    cyan: Shades
    sky: Shades
    blue: Shades
    indigo: Shades
    violet: Shades
    purple: Shades
    fuchsia: Shades
    pink: Shades
    rose: Shades
    olive: Shades // Custom
    brown: Shades // Custom
    light: string // Custom
    dark: string // Custom
  }

  export type Color = keyof Colors
  export type Shade = keyof Shades

  // ColorDictionary is a mapped type derived from the global Colors interface.
  // Colors is hardcoded, but ensures us some type safety as the single source of truth.
  type ColorDictionary = {
    [K in keyof Colors]: string
  }
}

export {}
