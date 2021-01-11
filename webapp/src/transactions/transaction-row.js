import React, { /* useState, Fragment */ } from 'react'
import { Button } from 'react-bootstrap'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'

export default function TransactionRow (props) {
  const transaction = props.transaction

  function getCreditOrDebit () {
    if (transaction.credit) {
      return 'Credit'
    }
    else if (transaction.debit) {
      return 'Debit'
    }
    else {
      return '---'
    }
  }

  return (
    <tr>
      <td>{transaction.amount}</td>
      <td>{transaction.user_id}</td>
      <td>{transaction.merchant_id}</td>
      <td>{transaction.description}</td>
      <td>{getCreditOrDebit()}</td>
      <td css={noPaddingTd}>
        <Button variant='secondary' css={[circleButton, spaceOnRight]}>
          <i className='fas fa-pen'></i>
        </Button>
        <Button variant='secondary' css={circleButton}>
          <i className='fas fa-trash-alt'></i>
        </Button>
      </td>
    </tr>
  )
}

TransactionRow.propTypes = {
  transaction: PropTypes.shape({
    amount: PropTypes.number,
    credit: PropTypes.bool,
    debit: PropTypes.bool,
    description: PropTypes.string,
    merchant_id: PropTypes.string,
    user_id: PropTypes.string
  }).isRequired
}

/* ---------- Styles ----------- */
const circleButton = css`
  width: 35px;
  height: 35px;
  border-radius: 20px;
  text-align: center;
  padding: 6px 0px;
  font-size: 13px;
`
const spaceOnRight = css`
  margin-right: 6px;
`
const noPaddingTd = css`
  padding: 0px !important;
  padding-top: 7px !important;
  text-align: center;
`
