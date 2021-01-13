import React, { Fragment } from 'react'
import { Spinner } from 'react-bootstrap'
import PropTypes from 'prop-types'
import TransactionRow from './transaction-row'
import AddTransactionForm from './add-transaction-form'

TransactionsList.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  refreshList: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.object,
  data: PropTypes.object
}

export default function TransactionsList (props) {
  if (props.loading) {
    return (
      <div className='text-center'>
        <Spinner animation='border' className='m-3' />
      </div>
    )
  }
  if (props.error) {
    return props.error.message
  } else {
    return (
      <Fragment>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>Amount ($)</th>
              <th scope='col'>User ID</th>
              <th scope='col'>Merchant ID</th>
              <th scope='col'>Description</th>
              <th scope='col'>Credit/Debit</th>
              <th scope='col' />
            </tr>
          </thead>
          <tbody>
            <AddTransactionForm onSubmit={() => props.onSubmit()} />
            {props.data.transactions.map(transaction => (
              <TransactionRow
                key={transaction.id}
                refreshList={() => props.refreshList()}
                transaction={transaction} />
            ))}
          </tbody>
        </table>
      </Fragment>
    )
  }
}

/* ---------- Styles ----------- */
// const aStyle = css `
//   color: blue;
// `
