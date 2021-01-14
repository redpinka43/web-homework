import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'

export default function Sidebar () {
  const [location, setLocation] = useState(window.location.pathname)

  LinkItem.propTypes = {
    route: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }

  function LinkItem (props) {
    let { route, name } = props

    return (
      <li className={(location === route) ? 'active' : null}>
        <Link onClick={() => setLocation(route)}
          to={route}
        >{name}</Link>
      </li>
    )
  }

  return (
    <nav css={sidebarStyle}>
      <div className='sidebar-header'>
        <h3>TransactionsApp</h3>
      </div>
      <ul className='list-unstyled components'>
        <LinkItem name='Home' route='/' />
        <LinkItem name='Analytics' route='/analytics' />
        <LinkItem name='Settings' route='/settings' />
      </ul>
    </nav>
  )
}

/* ---------- Styles ----------- */
const colors = {
  white: '#fff',
  lightGrey1: '#d1d1d1',
  darkGrey1: '#303030',
  darkGrey2: '#292929',
  darkGrey3: '#191919'
}

const sidebarStyle = css`
  width: 240px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 999;
  background: ${colors.darkGrey3};
  color: ${colors.lightGrey1};

  h3 {
    font-size: 1.6em;
    color: ${colors.white};
  }

  a, a:hover, a:focus {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;
  }
  .sidebar-header {
    padding: 20px;
    padding-top: 27px;
    padding-left: 15px;
    background: ${colors.darkGrey1};
  }

  ul.components {
    padding: 10px 0;
    border-bottom: 1px solid ${colors.darkGrey1};
  }

  ul p {
    color: ${colors.white};
    padding: 10px;
  }

  ul li a {
    padding: 10px;
    padding-left: 15px;
    font-size: 1.1em;
    display: block;
  }
  
  ul li a:hover {
    color: ${colors.white};
    background: ${colors.darkGrey2};
  }

  ul li.active > a, a[aria-expanded="true"] {
    color: ${colors.white};
    background: ${colors.darkGrey1};
  }
  
  ul ul a {
    font-size: 0.9em !important;
    padding-left: 30px !important;
    background: ${colors.darkGrey1};
  }
`
