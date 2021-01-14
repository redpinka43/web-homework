import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import { useMutation } from 'react-apollo'
import TransactionForm from './transaction-form'
import { UPDATE_TRANSACTION, DELETE_TRANSACTION } from '../../utils/gql-queries'
import Number from '../../utils/roman-number/number'

TransactionRow.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.string,
    amount: PropTypes.number,
    credit: PropTypes.bool,
    debit: PropTypes.bool,
    description: PropTypes.string,
    merchant_id: PropTypes.string,
    user_id: PropTypes.string
  }).isRequired,
  refreshList: PropTypes.func.isRequired
}

export default function TransactionRow (props) {
  let { transaction, refreshList } = props
  const [beingEdited, setBeingEdited] = useState(false)

  const [formState, setFormState] = useState({
    amount: transaction.amount,
    credit: transaction.credit,
    debit: transaction.debit,
    description: transaction.description,
    merchant_id: transaction.merchant_id,
    user_id: transaction.user_id
  })

  const [deleteTransaction] = useMutation(DELETE_TRANSACTION)
  const [updateTransaction] = useMutation(UPDATE_TRANSACTION, {
    variables: {
      id: transaction.id,
      amount: formState.amount,
      credit: formState.credit,
      debit: formState.debit,
      description: formState.description,
      merchant_id: formState.merchant_id,
      user_id: formState.user_id
    }
  })

  function deleteClickHandler () {
    deleteTransaction({ variables: { id: transaction.id } })
    refreshList()
  }

  function getCreditOrDebit () {
    if (formState.credit) {
      return 'Credit'
    } else if (formState.debit) {
      return 'Debit'
    } else {
      return '---'
    }
  }

  if (beingEdited) {
    return (
      <tr css={inputRowStyle}>
        <TransactionForm
          formId={transaction.id}
          formState={formState}
          setFormState={setFormState}
        />
        <td css={noPaddingTd}>
          <Button css={[circleButton, spaceOnRight]}
            form={'form-' + transaction.id}
            type='submit'
            variant='danger'>
            <i className='fas fa-save' />
          </Button>
          <Button css={circleButton} disabled variant='secondary'>
            <i className='fas fa-trash-alt' />
          </Button>
          <form id={'form-' + transaction.id} onSubmit={(e) => {
            e.preventDefault()
            updateTransaction()
            refreshList()
            setBeingEdited(false)
          }} />
        </td>
      </tr>
    )
  } else {
    return (
      <tr>
        <td>{Number(formState.amount)}</td>
        <td>{formState.user_id}</td>
        <td>{formState.merchant_id}</td>
        <td>{formState.description}</td>
        <td>{getCreditOrDebit()}</td>
        <td css={noPaddingTd}>
          <Button css={[circleButton, spaceOnRight]} onClick={() => setBeingEdited(true)}
            variant='secondary'>
            <i className='fas fa-pen' />
          </Button>
          <Button css={circleButton} onClick={() => deleteClickHandler()}
            variant='secondary'>
            <i className='fas fa-trash-alt' />
          </Button>
        </td>
      </tr>
    )
  }
}

/* ---------- Styles ----------- */
const inputRowStyle = css`
  & td { 
    padding: 0;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
  }
`
const circleButton = css`
  width: 34px;
  height: 34px;
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
