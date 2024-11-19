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
        height: 200,
        width: 200,
        backgroundColor: '#15c213',
        ...style
      }}
      className={className}
    />
  )
}
