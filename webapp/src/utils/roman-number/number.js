import { useContext } from 'react'
import { RomanNumberContext } from '../../routes'

export default function Number (num) {
  let romanNumbers = useContext(RomanNumberContext).romanNumber

  function toRomanNumber (num) {
    // Roman numerals don't have a decimal system
    num = parseInt(num)

    if (isNaN(num) || num <= 0) {
      return 'nulla'
    }

    const romans = [
      [1000, 'M'],
      [900, 'CM'],
      [500, 'D'],
      [400, 'CD'],
      [100, 'C'],
      [90, 'XC'],
      [50, 'L'],
      [40, 'XL'],
      [10, 'X'],
      [9, 'IX'],
      [5, 'V'],
      [4, 'IV'],
      [1, 'I']
    ]

    let str = ''
    romans.forEach(pair => {
      while (num >= pair[0]) {
        num -= pair[0]
        str += pair[1]
      }
    })

    return str
  }

  if (romanNumbers) {
    return toRomanNumber(num)
  } else {
    return num
  }
}
