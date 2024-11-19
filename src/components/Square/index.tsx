import React from 'react'
import { Props } from './types'

/* ========================================================================
                              Square
======================================================================== */

export const Square = ({ className = '', style = {} }: Props) => {
  /* ======================
          return
  ====================== */

  return (
    <div
      style={{
        height: 150,
        width: 150,
        backgroundColor: 'green',
        ...style
      }}
      className={className}
    />
  )
}
