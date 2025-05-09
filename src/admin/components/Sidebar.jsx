import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios' // Pakai axios untuk request API

const Sidebar = () => {
  const [isMonitoringOpen, setMonitoringOpen] = useState(false)
  const [isUserMenuOpen, setUserMenuOpen] = useState(false)
  const [username, setUsername] = useState('') // Buat state username

  const navigate = useNavigate()

  useEffect(() => {
    // Fungsi fetch data user
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token')
        const id = localStorage.getItem('id')
        console.log('User ID:', id) // Periksa nilai ID

        const response = await axios.get(
          `http://localhost:3000/api/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        setUsername(response.data.namaLengkap)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUser()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className='sidebar-container'>
      <div className='sidebar'>
        <ul className='sidebar-menu'>
          {/* Home */}
          <li className='sidebar-item'>
            <Link className='sidebar-link' to='/admin'>
              <div className='sidebar-left'>
                <i className='bi bi-house sidebar-icon'></i>
                <span className='sidebar-text'>Home</span>
              </div>
            </Link>
          </li>

          {/* Monitoring Dropdown */}
          <li className='sidebar-item'>
            <button
              className='sidebar-link dropdown-btn'
              onClick={() => setMonitoringOpen(!isMonitoringOpen)}
            >
              <div className='sidebar-left'>
                <i className='bi bi-table sidebar-icon'></i>
                <span className='sidebar-text'>Monitoring</span>
              </div>
              <i
                className={`bi bi-chevron-${
                  isMonitoringOpen ? 'up' : 'down'
                } sidebar-arrow`}
              ></i>
            </button>

            {isMonitoringOpen && (
              <ul className='sidebar-submenu'>
                {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map(item => (
                  <li key={item}>
                    <Link
                      to={`/admin/monitoring/${item.toLowerCase()}`}
                      className='sidebar-submenu-link'
                    >
                      Monitoring {item}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>

        {/* Footer */}
        <div className='sidebar-footer'>
          <hr className='text-secondary' />
          <div className='sidebar-user'>
            <i className='bi bi-person fs-5'></i>
            <span className='sidebar-username'>
              {username ? username : <div className='spinner'></div>}
            </span>
            <button
              className='user-menu-toggle'
              onClick={() => setUserMenuOpen(!isUserMenuOpen)}
            >
              <i className='bi bi-three-dots-vertical'></i>
            </button>

            {/* Dropdown menu logout */}
            {isUserMenuOpen && (
              <div className='user-menu'>
                <button onClick={handleLogout} className='logout-btn'>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
