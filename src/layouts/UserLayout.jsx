import { Outlet } from 'react-router-dom'
import FooterComponent from '../components/FooterComponent'

function UserLayout () {
  return (
    <div className='layout'>
      <main className='main-content'>
        <Outlet />
      </main>

      <FooterComponent />
    </div>
  )
}

export default UserLayout
