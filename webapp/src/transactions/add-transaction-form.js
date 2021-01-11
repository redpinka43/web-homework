import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'

AddTransactionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default function AddTransactionForm (props) {
  const ADD_TRANSACTION = gql`
        mutation AddTransaction(
            $user_id: String,
            $amount: Float,
            $credit: Boolean,
            $debit: Boolean,
            $description: String,
            $merchant_id: String
        ) {
            addTransaction(user_id: $user_id, amount: $amount, credit: $credit,
                debit: $debit, description: $description, 
                merchant_id: $merchant_id) {
            id
            user_id
            amount
            credit
            debit
            description
            merchant_id
            }
        }
    `

  const [formState, setFormState] = useState({
    user_id: '',
    amount: '',
    credit: false,
    debit: false,
    description: '',
    merchant_id: ''
  })

  const [createTransaction] = useMutation(ADD_TRANSACTION, {
    variables: {
      user_id: formState.user_id,
      amount: formState.amount,
      credit: formState.credit,
      debit: formState.debit,
      description: formState.description,
      merchant_id: formState.merchant_id
    }
  })

  function onSubmitForm () {
    // Clear form
    setFormState({
      user_id: '',
      amount: '',
      credit: false,
      debit: false,
      description: '',
      merchant_id: ''
    })
    
    props.onSubmit()
  }

  function get2DecimalPlaces (numStr) {
    let parsedFloat = parseFloat(numStr)
    if (isNaN(parsedFloat)) {
      return ''
    }

    let arr = numStr.split('.')
    if (arr.length === 1 || arr[1].length <= 2) {
      return parsedFloat
    }
    return parsedFloat.toFixed(2)
  }

  function setCreditOrDebit (val) {
    let credit = false
    let debit = false

    if (val === 'credit') {
      credit = true
    } else if (val === 'debit') {
      debit = true
    }

    setFormState({
      ...formState,
      credit: credit,
      debit: debit
    })
  }

  function inputField ({ onChangeHandler, placeholder, type, value }) {
    return (
      <input
        css={roundedInputField}
        form='form1'
        onChange={onChangeHandler}
        placeholder={placeholder}
        required
        type={type}
        value={value}
      />
    )
  }

  inputField.propTypes = {
    onChangeHandler: PropTypes.any,
    placeholder: PropTypes.any,
    type: PropTypes.string,
    value: PropTypes.any
  }

  return (
    <tr css={rowStyle}>
      <td>{
        // Amount
        inputField({
          onChangeHandler: (e) => setFormState({
            ...formState,
            amount: get2DecimalPlaces(e.target.value)
          }),
          placeholder: '0.00',
          type: 'number',
          value: formState.amount
        })}
      </td>
      <td>{
        // User ID
        inputField({
          onChangeHandler: (e) => setFormState({
            ...formState,
            user_id: e.target.value
          }),
          placeholder: 'User ID',
          type: 'text',
          value: formState.user_id
        })}
      </td>
      <td>{
        // Merchant ID
        inputField({
          onChangeHandler: (e) => setFormState({
            ...formState,
            merchant_id: e.target.value
          }),
          placeholder: 'Merchant ID',
          type: 'text',
          value: formState.merchant_id
        })}
      </td>
      <td>{
        // Description
        inputField({
          onChangeHandler: (e) => setFormState({
            ...formState,
            description: e.target.value
          }),
          placeholder: 'Description',
          type: 'text',
          value: formState.description
        })}
      </td>
      <td>
        {/* Credit/Debit */}
        <select
          form='form1'
          onBlur={(e) =>
            setCreditOrDebit(e.target.value)
          }
          required
        >
          <option value=''>Credit/Debit</option>
          <option value='credit'>Credit</option>
          <option value='debit'>Debit</option>
        </select>
      </td>
      <td>
        <Button form='form1' css={buttonCss}
          type='submit'
        ><i className='fa fa-plus'/> Add</Button>
        <form id='form1' onSubmit={(e) => {
          e.preventDefault()
          createTransaction()
          onSubmitForm()
        }} />
      </td>
    </tr>
  )
}

/* ---------- Styles ----------- */
const rowStyle = css`
  background-color: #e0e0e0 !important;

  & td { 
    border-bottom: 2px solid #cfcfcf;
    padding: 0;
    padding-top: 12px;
    padding-bottom: 2px;
    padding-left: 10px;
  }
`
const roundedInputField = css`
  border-radius: 5px;
  border-width: 1px;
  border-color: white;
`
const buttonCss = css`
  position: relative;
  bottom: 5px;
  margin-right: 3px;
  padding-left: 12px;
  padding-right: 12px;
`
