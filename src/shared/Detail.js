import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

export default function Detail(props) {
    const location = useLocation()
    let listItem
    if (__isBrowser__) {
        listItem = window.__INITIAL_DATA__
        delete window.__INITIAL_DATA__
    } else {
        listItem = props.staticContext.data
    }
    const [listItemData, updateListItem] = useState(listItem)
    const [loading, updateloading] = useState(listItem ? false : true)
    useEffect(() => {
        if (!listItemData) {
            fecthData()
        }
    }, [])
    const fecthData = () => {
        updateloading(true)
        console.log(location)
        props.fetchDetailData(location.pathname)
            .then(data => {
                updateListItem(data)
                updateloading(false)
            })

    }
    return loading ? (
        <header>
            <h1>Loading...</h1>
        </header>
    ) : (
            <>
                <header>
                    <h1>SpcaeX Shuttle Details</h1>
                </header>
                <NavLink activeStyle={{ fontWeight: 'bold' }} to={`/`}>
                    <button className='align-right'>Go Back</button>
                </NavLink>
                <section>
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Value</th>
                        </tr>
                        <tr>
                            <td>flight No.</td>
                            <td>{listItemData.flight_number}</td>

                        </tr>
                        <tr>
                            <td>Mission Name</td>
                            <td>{listItemData.mission_name}</td>

                        </tr>
                        <tr>
                            <td>Launch Year</td>
                            <td>{listItemData.launch_year}</td>

                        </tr>
                        <tr>
                            <td>Launch Time</td>
                            <td>{new Date(listItemData.launch_date_utc).toDateString()}</td>

                        </tr>
                        <tr>
                            <td>Rocket Name</td>
                            <td>{listItemData.rocket.rocket_name}</td>

                        </tr>
                        <tr>
                            <td>Rocket Type</td>
                            <td>{listItemData.rocket.rocket_type}</td>

                        </tr>
                        <tr>
                            <td>Launch Site</td>
                            <td>{listItemData.launch_site.site_name_long}</td>

                        </tr>
                        <tr>
                            <td>Launch Status</td>
                            <td>{listItemData.launch_success ? 'Successfull' : 'Failed'}</td>

                        </tr>
                        <tr>
                            <td>Mission Icon</td>
                            <td><img src={listItemData.links.mission_patch_small} /></td>

                        </tr>
                        <tr>
                            <td>Details</td>
                            <td>{listItemData.details}</td>

                        </tr>
                        <tr>
                            <td>Article Link</td>
                            <td><a href={listItemData.links.article_link} target="_blank">Article</a></td>

                        </tr>
                        <tr>
                            <td>Wikipedia</td>
                            <td><a href={listItemData.links.wikipedia} target="_blank">Wikipedia</a></td>

                        </tr>
                        <tr>
                            <td>Video</td>
                            <td><a href={listItemData.links.video_link} target="_blank">Watch Video</a></td>

                        </tr>
                        <tr>
                            <td>is Upcoming</td>
                            <td>{listItemData.upcoming ? 'Yes' : 'No'}</td>

                        </tr>
                        <tr>
                            <td>Had Crew</td>
                            <td>{listItemData.crew ? 'Yes' : 'No'}</td>

                        </tr>
                    </table>
                </section>
            </>
        )
}