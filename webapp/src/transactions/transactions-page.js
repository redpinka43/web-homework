import React, { useEffect, useState } from 'react'
import TransactionsList from './transactions-list'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'
// import { css } from '@emotion/core'

export function Transactions () {
  const GET_TRANSACTIONS = gql`
    query {
      transactions {
        id
        amount
        credit
        debit
        description
        merchant_id
        user_id
      }
    }
  `

  const [submitSuccess, setSubmitSuccess] = useState(false)
  const { loading, data, error, refetch } = useQuery(GET_TRANSACTIONS)
  // useEffect(() => { refetch() }, [submitSuccess])

  function submitSuccessAlert () {
    if (submitSuccess) {
      return (
        <div className='alert alert-success' role='alert'>
          Added transaction
        </div>
      )
    }
  }

  return (
    <div className='container'>
      <h2>Transactions</h2>
      {submitSuccessAlert()}
      <TransactionsList 
        onSubmit={
          () => {
            setSubmitSuccess(true)
            refetch()
          }
        } 
        loading={loading} 
        data={data}
        error={error}
        />
    </div>
  )
}

/* ---------- Styles ----------- */
// const aStyle = css `
//   color: blue;
// `
