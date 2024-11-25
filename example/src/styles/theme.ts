import resolveConfig from 'tailwindcss/resolveConfig'
import config from '../../tailwind.config'

// config as any used to tell Typescript that the config is okay.
// Otherwise, it complains about type string not being compatible with
// Partial<DarkModeConfig>. However, it's just Typescript being confused.
export const tailwindConfig = resolveConfig(config as any) as any

/* ======================
        theme
====================== */

export const theme: any = tailwindConfig?.theme || {}

/* ======================
        colors
====================== */
///////////////////////////////////////////////////////////////////////////
//
// The only issue with programatically generating colors at runtime is that
// Typescript has no way of knowing what the colors are. The only solution
// I know of is to just hardcode the typings. Rather than doing this locally and
// exporting them, they have been defined in global.d.ts.
//
///////////////////////////////////////////////////////////////////////////

export const colors: Colors = tailwindConfig?.theme?.colors || {}

/* ======================
      getColor()
====================== */
// While one could import colors directly into a component file
// and use it like: backgroundColor: colors.sky[300],
// it's often easier to just do this:
// backgroundColor: getColor('sky', '300')

export const getColor = (color: Color, shade: Shade = '500') => {
  const foundColor = colors?.[color] as Color

  if (typeof foundColor === 'string') {
    return foundColor
  }

  if (typeof foundColor !== 'object') {
    throw new Error(
      "The foundColor was not of type 'string' and not of type 'object'."
    )
  }

  const foundShade = foundColor[shade]
  return foundShade
}

/* ======================
    convertToRGB()
====================== */
//# Move this to utils...

// This function is based loosely off of:
// https://convertingcolors.com/blog/article/convert_hex_to_rgb_with_javascript.html

// While this function may be useful in some scenarios, it's important to note that
// Tailwind colors can be given an alpha channel. For example:
// className='bg-[blue]/25 text-black/50'

export const convertToRGB = (value: string) => {
  value = value.startsWith('#') ? value.substring(1) : value
  value =
    value.length === 3
      ? `${value[0]?.repeat(2)}${value[1]?.repeat(2)}${value[2]?.repeat(2)}`
      : value

  if (value.length !== 6) {
    throw new Error("The convertToRGB() function's value argument was invalid.")
  }

  const arrayRgbHex = value.match(/.{1,2}/g) // ???

  const rgb = {
    r: parseInt(arrayRgbHex?.[0] || '', 16),
    g: parseInt(arrayRgbHex?.[1] || '', 16),
    b: parseInt(arrayRgbHex?.[2] || '', 16)
  }
  return rgb
}

export default theme
