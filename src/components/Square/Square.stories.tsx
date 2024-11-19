import React, { useState } from 'react'
import {
  // StoryFn,
  StoryObj, // Use in conjunction with CSF3.
  Meta
} from '@storybook/react'
import { Square } from './index'
import { fn } from '@storybook/test'

/* ======================
          meta
====================== */

const meta /* : Meta<typeof Square> */ = {
  title: 'Components/Square',
  component: Square,

  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // This can also be set in main.ts as docs: { autodocs: true }, then we don't need to manually specificy it in every file.
  // tags: ['autodocs'],
  // args: {}
  parameters: {
    componentSubtitle: 'A basic Square component.',
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
    // docs: {  description: { component: `<div><p>...</p></div>` }},
  },

  // https://storybook.js.org/docs/api/arg-types
  // argTypes allow us to manually implement controls that are not automatically generated.
  // This is useful for props that are implied (e.g., ComponentProps<'div'>), but not
  // explicitly stated by the component props.
  argTypes: {
    style: {
      control: 'object',
      description: 'An object of CSS Properties.'
    }
  },

  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() }
} satisfies Meta<typeof Square>

export default meta

/* ======================
        Story
====================== */

type Story = StoryObj<typeof meta>

/* ======================
        Stories
====================== */

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {}
}

/* ======================

====================== */

export const RedSquare: Story = {
  args: {
    style: {
      backgroundColor: 'red'
    },
    className: ''
  }
}

/* ======================

====================== */

export const Changeable: Story = {
  args: {
    style: {
      cursor: 'pointer'
    }
  },
  render: ({ style, ...otherProps }) => {
    const [bgColor, setBgColor] = useState('orange')
    return (
      <Square
        {...otherProps}
        style={{ backgroundColor: bgColor, ...style }}
        onClick={() => {
          setBgColor((prev) => {
            if (prev === 'orange') {
              return 'purple'
            }
            return 'orange'
          })
        }}
      />
    )
  }
}
