import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import './style.css'

export default function Home(props) {

  let list
  if (__isBrowser__) {
    list = window.__INITIAL_DATA__
    delete window.__INITIAL_DATA__
  } else {
    list = props.staticContext.data
  }
  const [listData, updateList] = useState(list)
  const [loading, updateloading] = useState(list ? false : true)
  useEffect(() => {
    if (!listData) {
      fecthData()
    }
  }, [])
  const fecthData = () => {
    updateloading(true)
    props.fetchData()
      .then(data => {
        updateList(data)
        updateloading(false)
      })

  }
  const content = loading ? <h2>Loading</h2> : (
    <ul>
      {listData.map((item, index) => (
        <li key={item.flight_number}>
          {item.mission_name} on {new Date(item.launch_date_utc).toDateString()}
          <NavLink activeStyle={{ fontWeight: 'bold' }} to={`/detail/${item.flight_number}`}>
            <button className='align-right'>View Details</button>
          </NavLink>
        </li>
      ))}
    </ul>
  )
  return (
    <>
      <header>
        <h1>SpcaeX Shuttle Launches</h1>
      </header>
      <section>
        {content}
      </section>
    </>
  )
}