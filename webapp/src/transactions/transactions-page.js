import React, { useState /* Fragment */} from 'react'
import { Button } from 'react-bootstrap'
import { useMutation } from 'react-apollo'
import gql from 'graphql-tag'
// import { css } from '@emotion/core'

export function Transactions () {
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
      amount: (isNaN(parseFloat(formState.amount)) ? 0 : formState.amount)
    }
  })

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          createTransaction()
        }}
      >
        <div className='flex flex-column mt3'>
          <input
            className='mb-2 mr-2'
            onChange={(e) =>
              setFormState({
                ...formState,
                user_id: e.target.value
              })
            }
            placeholder='A description for the user_id.'
            type='text'
            value={formState.user_id}
          />
          <input
            className='mb-2'
            onChange={(e) =>
              setFormState({
                ...formState,
                amount: get2DecimalPlaces(e.target.value)
              })
            }
            placeholder='0.00'
            type='number'
            value={formState.amount}
          />
        </div>
        <Button type='submit'>Submit</Button>
      </form>

      {/*
      <Fragment>
        <div css={aStyle}>This is the transactions page.</div>

      </Fragment>
      */}
    </div>
  )
}

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
/* ---------- Styles ----------- */
// const aStyle = css `
//   color: blue;
// `
