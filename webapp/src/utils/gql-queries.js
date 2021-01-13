import gql from 'graphql-tag'

export const ADD_TRANSACTION = gql`
mutation AddTransaction(
  $user_id: String!,
  $amount: Float!,
  $credit: Boolean!,
  $debit: Boolean!,
  $description: String!,
  $merchant_id: String!
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
export const UPDATE_TRANSACTION = gql`
mutation UpdateTransaction(
  $id: String!,
  $user_id: String!,
  $amount: Float!,
  $credit: Boolean!,
  $debit: Boolean!,
  $description: String!,
  $merchant_id: String!
) {
  updateTransaction(id: $id, user_id: $user_id, amount: $amount, credit: $credit,
      debit: $debit, description: $description, 
      merchant_id: $merchant_id) {
    id
  }
}
`
export const DELETE_TRANSACTION = gql`
mutation DeleteTransaction($id: String!) { 
  deleteTransaction(id: $id) {
    id 
  }
}
`
