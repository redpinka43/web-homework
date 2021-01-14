import React, { Fragment, useState } from 'react'
import { css } from '@emotion/core'
import TransactionsList from '../../components/transactions/transactions-list'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'

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
  const { loading, data, error, refetch: refreshList } = useQuery(GET_TRANSACTIONS)

  function submitSuccessAlert () {
    if (submitSuccess) {
      return (
        <div className='alert alert-success' role='alert'>
          Added transaction
        </div>
      )
    } else {
      return (
        <div css={submitSuccessAlertPlaceholder} />
      )
    }
  }

  return (
    <Fragment>
      <h2>Transactions</h2>
      {submitSuccessAlert()}
      <TransactionsList
        data={data}
        error={error}
        loading={loading}
        onSubmit={
          () => {
            setSubmitSuccess(true)
            refreshList()
          }
        }
        refreshList={() => refreshList()}
      />
    </Fragment>
  )
}

/* ---------- Styles ----------- */
const submitSuccessAlertPlaceholder = css`
  padding: 33px;
`
