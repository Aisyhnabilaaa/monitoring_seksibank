import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'
import { ProtectedRoute } from './page/MonitoringAdmin/protect'

const AdminLayout = () => {
  return (
    <ProtectedRoute allowedRole={['admin']}>
      <div className='admin-layout'>
        <Sidebar />
        <div className='content-container'>
          <Outlet />
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default AdminLayout
