import React, { useContext } from 'react'
import { RomanNumberContext } from '../../routes'

export default function RomanNumberToggle () {
  const { romanNumber, setRomanNumber } = useContext(RomanNumberContext)

  return (
    <div>
      <input defaultChecked={romanNumber}
        onClick={() => setRomanNumber(!romanNumber)}
        type='checkbox' />
      &nbsp;&nbsp;Use roman numerals instead of number values.
    </div>
  )
}
