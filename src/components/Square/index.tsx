import React from 'react'
import './Square.css'
import data from './data.json'
import { Props } from './types'

/* ========================================================================
                              Square
======================================================================== */

const Square = ({ className = '', style = {}, ...otherProps }: Props) => {
  /* ======================
          return
  ====================== */
  return (
    <div
      {...otherProps}
      style={style}
      className={`dc-square${className ? ` ${className}` : ''}`}
    >
      {data.test}
    </div>
  )
}

export { Square }
