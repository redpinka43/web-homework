import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useMutation } from 'react-apollo'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import TransactionForm from './transaction-form'
import { ADD_TRANSACTION } from '../../utils/gql-queries'

AddTransactionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default function AddTransactionForm (props) {
  const defaultFormState = {
    user_id: '',
    amount: '',
    category: 'Other',
    credit: false,
    debit: false,
    description: '',
    merchant_id: ''
  }
  const [formState, setFormState] = useState(defaultFormState)

  const [createTransaction] = useMutation(ADD_TRANSACTION, {
    variables: {
      user_id: formState.user_id,
      amount: formState.amount,
      category: formState.category,
      credit: formState.credit,
      debit: formState.debit,
      description: formState.description,
      merchant_id: formState.merchant_id
    }
  })

  function onSubmitForm () {
    setFormState(defaultFormState)
    props.onSubmit()
  }

  return (
    <tr css={inputRowStyle}>
      <TransactionForm
        formId={'add'}
        formState={formState}
        setFormState={setFormState}
        whiteBorder
      />
      <td>
        <Button css={buttonCss} form='form-add'
          type='submit'
        ><i className='fa fa-plus' /> Add</Button>
        <form id='form-add' onSubmit={(e) => {
          e.preventDefault()
          createTransaction()
          onSubmitForm()
        }} />
      </td>
    </tr>
  )
}

/* ---------- Styles ----------- */
const inputRowStyle = css`
  background-color: #e0e0e0 !important;

  & td { 
    border-bottom: 2px solid #cfcfcf;
    padding: 0;
    padding-top: 12px;
    padding-bottom: 2px;
    padding-left: 10px;
  }
`
const buttonCss = css`
  position: relative;
  bottom: 5px;
  margin-right: 3px;
  padding-left: 12px;
  padding-right: 12px;
`
