import fetch from 'isomorphic-fetch'

export function fetchInitialListData () {
  const encodedURI = encodeURI(`https://api.spaceXdata.com/v3/launches?limit=100`)

  return fetch(encodedURI)
    .then((data) => data.json())
    .catch((error) => {
      console.warn(error)
      return null
    });
}
export function fetchFlightDetail(flightNumber = 1){
  const encodedURI = encodeURI(`https://api.spacexdata.com/v3/launches?flight_number=${flightNumber}`)

  return fetch(encodedURI)
    .then((data) => data.json())
    .then((data) => data[0])
    .catch((error) => {
      console.warn(error)
      return null
    });
}