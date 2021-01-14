import React, { Fragment } from 'react'
import RomanNumberToggle from '../../utils/roman-number/roman-number-toggle'
import Number from '../../utils/roman-number/number'
import { css } from '@emotion/core'

export function Settings () {
  return (
    <Fragment>
      <h2>Settings</h2>
      <br />
      <RomanNumberToggle />
      <br />
      <div css={indentStyle}>
        <p>For example:</p>
        <div css={indentStyle}>
          <p>{Number(4)}</p>
          <p>{Number(2031)}</p>
          <p>{Number(999)}</p>
          <p>{Number(483)}</p>
          <p>{Number(11)}</p>
          <p>{Number(0)}</p>
        </div>
      </div>
    </Fragment>
  )
}

/* ---------- Styles ----------- */
const indentStyle = css`
  padding-left: 22px;
`
