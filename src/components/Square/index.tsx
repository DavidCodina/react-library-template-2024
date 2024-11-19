import React from 'react'
import './Square.css'
import { Props } from './types'

/* ========================================================================
                              Square
======================================================================== */

const Square = ({ className = '', style = {} }: Props) => {
  /* ======================
          return
  ====================== */

  return (
    <div
      style={style}
      className={`dc-square${className ? ` ${className}` : ''}`}
    />
  )
}

export { Square }
