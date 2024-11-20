//# import data from './data.json'

///////////////////////////////////////////////////////////////////////////
//
// DO NOT import styles directly into library components!
// The rollup config object for handling this has been commented out
// because it's an anti-pattern.
//
// Instead, @import them into the main.css file. Alternatively,
// create a Tailwind (component) plugin and import that
// into tailwind.config.ts
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
      className={twMerge('h-40 w-40 bg-lime-500', className)}
      // className={`bg-red-500 dc-square${className ? ` ${className}` : ''}`}
      // className={twMerge('square', className)}
    >
      {/* {data.test} */}
    </div>
  )
}

export { Square }
