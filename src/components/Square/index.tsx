// import data from './data.json'
// @ts-ignore
import ren from './ren.jpeg'

///////////////////////////////////////////////////////////////////////////
//
// DO NOT import styles directly into library components!
// The rollup config object for handling this has been commented out
// because it's an anti-pattern.
//
// A better approach is to use @import them into the main.css file.
// However, because the library now uses a consumption pattern of h
// having the user implement library.plugin + library.content in their
// tailwind.config.ts, they will not be importing the dist/main.css
// This means that the use of @import is no longer an option.
// Consequently, if any component should need additional styles, it should
// be done entirely through src/plugins.
//
// ❌ import './styles.css'
//
///////////////////////////////////////////////////////////////////////////

import React from 'react'
import { twMerge } from 'tailwind-merge'
import { Props } from './types'

/* ========================================================================
                              Square
======================================================================== */
//# Add data back in then add the JSON plugin as needed...

const Square = ({ className = '', style = {}, ...otherProps }: Props) => {
  /* ======================
          return
  ====================== */

  return (
    <div
      {...otherProps}
      style={style}
      className={twMerge(
        'flex h-40 w-40 items-center justify-center bg-purple-500 text-2xl font-bold text-white',
        className
      )}
      // className={twMerge('square', className)}
    >
      <img className='block h-32 w-32 rounded-lg' src={ren} alt='' />
      {/* {data.test} */}
    </div>
  )
}

export { Square }
