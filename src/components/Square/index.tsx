//# import data from './data.json'
// import './styles.css'
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
      // ❌ className={`square${className ? ` ${className}` : ''}`}
      className={twMerge('square', className)}
      //className={twMerge('h-40 w-40 bg-lime-500', className)}
    >
      {/* {data.test} */}
    </div>
  )
}

export { Square }
