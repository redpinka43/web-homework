import React, { useContext } from 'react'
import { RomanNumberContext } from '../../routes'

export default function RomanNumberToggle () {
  const { romanNumber, setRomanNumber } = useContext(RomanNumberContext)

  return (
    <div>
      <input onClick={() => setRomanNumber(!romanNumber)} 
        type='checkbox' 
        checked={romanNumber} />
      &nbsp;&nbsp;Use roman numerals instead of number values.
    </div>
  )
}
