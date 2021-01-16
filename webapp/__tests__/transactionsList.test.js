import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import TransactionsList from '../src/components/transactions/transactions-list'
import { MockedProvider } from '@apollo/react-testing'
import { ADD_TRANSACTION } from '../src/utils/gql-queries'

afterEach(cleanup)

const mocks = [
  {
    request: {
      query: ADD_TRANSACTION,
      variables: {    
        user_id: '',
        amount: 0,
        category: 'Other',
        credit: false,
        debit: false,
        description: '',
        merchant_id: ''
      },
      result: {
        data: {}
      }
    }
  }
]

const columnTitles = [
  'Amount ($)',
  'User ID',
  'Merchant ID',
  'Category',
  'Description',
  'Credit/Debit'
]

describe('TransactionsList', () => {
  function setup () {
    const utils = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TransactionsList 
          onSubmit={jest.fn()}
          refreshList={jest.fn()}
          loading={false}
          data={{transactions: [
            {
              id: '1',
              amount: 0,
              category: 'Other',
              credit: true,
              debit: false,
              description: 'Test description',
              merchant_id: 'Test merchant',
              user_id: 'Test user'
            }
          ]}}
        />
      </MockedProvider>
    )

    const amountInput = utils.getByPlaceholderText('0.00')
    const userIdInput = utils.getByPlaceholderText('User ID')
    const merchantIdInput = utils.getByPlaceholderText('Merchant ID')

    return {
      amountInput,
      userIdInput,
      merchantIdInput,
      ...utils
    }
  }

  it('has 6 columns', () => {
    const { getAllByText } = setup()

    columnTitles.forEach(title => {
      expect(getAllByText(title)[0]).toBeInTheDocument()
    })
  })
  
  it('should change Amount value to be 27.5', () => {
    const { amountInput } = setup()
    expect(amountInput.value).toBe('')
    fireEvent.change(amountInput, { target: { value: 27.5 }})
    expect(amountInput.value).toBe('27.5')
  })

  it('should change User ID value to be "jackblack"', () => {
    const { userIdInput } = setup()
    expect(userIdInput.value).toBe('')
    fireEvent.change(userIdInput, { target: { value: 'jackblack' }})
    expect(userIdInput.value).toBe('jackblack')
  })

  it('should change Merchant ID value to be "dennys"', () => {
    const { merchantIdInput } = setup()
    expect(merchantIdInput.value).toBe('')
    fireEvent.change(merchantIdInput, { target: { value: 'dennys' }})
    expect(merchantIdInput.value).toBe('dennys')
  })
})