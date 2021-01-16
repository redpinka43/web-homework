import React from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import { css } from '@emotion/core'
import { useQuery } from 'react-apollo'
import { GET_TRANSACTIONS } from '../../utils/gql-queries'
import { Spinner } from 'react-bootstrap'

export default function CategoryPieChart () {
  
  // const theData = [
  //   { title: 'One', value: 10, color: '#E38627' },
  //   { title: 'Two', value: 15, color: '#C13C37' },
  //   { title: 'Three', value: 20, color: '#6A2135' }
  // ]

  const categories = {
    'Other': { title: 'Other', color: '#ef798a', value: 0, sum: 0 },
    'Travel': { title: 'Travel', color: '#f7a9a8', value: 0, sum: 0 },
    'Food': { title: 'Food', color: '#e5c3d1', value: 0, sum: 0 },
    'Supplies': { title: 'Supplies', color: '#bea2cd', value: 0, sum: 0 },
    'Consulting': { title: 'Consulting', color: '#a99ea0', value: 0, sum: 0 },
    'Real estate': { title: 'Real estate', color: '#82d4bb', value: 0, sum: 0 }
  }
  
  const { loading, data, error } = useQuery(GET_TRANSACTIONS)

  function tallyCategoryData () {
    let amountTotal = 0

    data.transactions.forEach(transaction => {
      categories[transaction.category].sum += transaction.amount
      amountTotal += transaction.amount
    });

    for (let str in categories) {
      categories[str].value = categories[str].sum / amountTotal * 100
    }    
  }

  if (loading) {
    return (
      <div className='text-center'>
        <Spinner animation='border' className='m-3' />
      </div>
    )
  }

  if (error) {
    return error.message
  } else if (data && data.transactions.length) {
    tallyCategoryData()

    let nonEmptyCategories = []
    Object.values(categories).forEach(category => {
      if (category.sum > 0) {
        category.title = Math.round(category.value) + '% ' + category.title
        nonEmptyCategories.push(category)
      }
    })

    return (
      <div css={labelStyle}>
        <div css={pieChartContainerStyle}>
          <h3 className='text-center'>Spend per category</h3>
          <PieChart
            data={nonEmptyCategories}
            label={({ dataEntry }) => dataEntry.title}
            animate='true'
            radius='30'
          />
        </div>
      </div>
    )
  } else {
    return (
      <p>
        Add data in order to view metrics.
      </p>
    )
  }
}

/* ---------- Styles ----------- */
const labelStyle = css`
  text {
    fill: white;
    font-size: 0.14rem;
  }
`
const pieChartContainerStyle = css`
  width: 700px;
  margin: auto;
  margin-top: 40px;
`
