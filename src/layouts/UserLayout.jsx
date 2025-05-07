import { Outlet } from 'react-router-dom'
// import NavbarComponent from '../components/NavbarComponent'
import FooterComponent from '../components/FooterComponent'

function UserLayout () {
  return (
    <div className='layout'>
      {/* <NavbarComponent /> */}

      <main className='main-content'>
        <Outlet />
      </main>

      <FooterComponent />
    </div>
  )
}

export default UserLayout
