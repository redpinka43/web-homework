import React, { Fragment } from 'react'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'

TransactionForm.propTypes = {
  formState: PropTypes.object,
  setFormState: PropTypes.func.isRequired,
  formId: PropTypes.string,
  whiteBorder: PropTypes.bool
}

export default function TransactionForm (props) {
  let { formState, setFormState, formId } = props
  formId = 'form-' + formId

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

  function getCreditOrDebit () {
    if (formState.credit) {
      return 'credit'
    } else if (formState.debit) {
      return 'debit'
    } else {
      return ''
    }
  }

  inputField.propTypes = {
    onChangeHandler: PropTypes.any,
    placeholder: PropTypes.any,
    type: PropTypes.string,
    value: PropTypes.any
  }

  function getInputFieldCss () {
    if (props.whiteBorder === true) {
      return ([roundedInputField, whiteBorder])
    } else {
      return roundedInputField
    }
  }

  function inputField ({ onChangeHandler, placeholder, type, value }) {
    return (
      <input
        css={getInputFieldCss()}
        form={formId}
        onChange={onChangeHandler}
        placeholder={placeholder}
        required
        type={type}
        value={value}
      />
    )
  }

  return (
    <Fragment>
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
      <td>
        {/* Category */ }
        {/* eslint-disable */}
        <select
          form={formId}
          onChange={(e) => setFormState({
            ...formState,
            category: e.target.value
          })}
          /* eslint-enable */
          required
          value={formState.category}
        >
          <option value='Other'>Other</option>
          <option value='Travel'>Travel</option>
          <option value='Food'>Food</option>
          <option value='Supplies'>Supplies</option>
          <option value='Consulting'>Consulting</option>
          <option value='Real estate'>Real estate</option>
        </select>
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
        {/* eslint-disable */}
        <select
          form={formId}
          onChange={(e) =>
            setCreditOrDebit(e.target.value)
          }
          /* eslint-enable */
          required
          value={getCreditOrDebit()}
        >
          <option value=''>Credit/Debit</option>
          <option value='credit'>Credit</option>
          <option value='debit'>Debit</option>
        </select>
      </td>
    </Fragment>
  )
}

/* ---------- Styles ----------- */
const roundedInputField = css`
  border-radius: 5px;
  border-width: 1px;
  border-color:  #cfcfcf;
`
const whiteBorder = css`
  border-color: white;
`
