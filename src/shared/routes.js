import Home from './Home'
import Detail from './Detail'
import { fetchFlightDetail,fetchInitialListData } from './api'

const routes =  [
  {
    path: '/',
    exact: true,
    component: Home,
    fetchData: () => fetchInitialListData()
  },
  {
    path: '/detail/:id',
    component: Detail,
    fetchDetailData: (path = '') => fetchFlightDetail(path.split('/').pop())
  }
]

export default routes