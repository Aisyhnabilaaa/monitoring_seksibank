import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Sidebar = () => {
  const [isMonitoringOpen, setMonitoringOpen] = useState(false)
  const [isUserMenuOpen, setUserMenuOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [notifCount, setNotifCount] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('admin_token')
        const id = localStorage.getItem('id')
        console.log('User ID:', id)

        const response = await axios.get(
          `http://localhost:3001/api/user/${id}`,
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

  useEffect(() => {
    const fetchNotif = async () => {
      try {
        const id = localStorage.getItem('id')
        const response = await axios.get(
          `http://localhost:3001/api/notifikasi/${id}`
        )
        const unreadNotif = response.data.filter(n => n.status === 'unread')
        setNotifCount(unreadNotif.length)
      } catch (error) {
        console.error('Error fetching notifications:', error)
      }
    }

    fetchNotif()
    const interval = setInterval(fetchNotif, 10000)
    return () => clearInterval(interval)
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

          <li className='sidebar-item'>
            <Link className='sidebar-link' to='/admin/satker/formSatker'>
              <div className='sidebar-left'>
                <i className='bi bi-people sidebar-icon'></i>
                <span className='sidebar-text'>Satker</span>
              </div>
            </Link>
          </li>

          <li className='sidebar-item'>
            <Link className='sidebar-link' to='/admin/Register/Registerform'>
              <div className='sidebar-left'>
                <i className='bi bi-people sidebar-icon'></i>
                <span className='sidebar-text'>Tambah Akun</span>
              </div>
            </Link>
          </li>

          {/* Notifikasi */}
          <li className='sidebar-item'>
            <Link className='sidebar-link' to='/admin/notifikasi'>
              <div className='sidebar-left'>
                <i className='bi bi-bell sidebar-icon'></i>
                <span className='sidebar-text'>Notifikasi</span>
                {notifCount > 0 && (
                  <span className='badge bg-danger rounded-pill ms-2'>
                    {notifCount}
                  </span>
                )}
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
                  isMonitoringOpen ? 'down' : 'up'
                } sidebar-arrow`}
              ></i>
            </button>

            {isMonitoringOpen && (
              <ul className='sidebar-submenu'>
                {[
                  'Penyelesaian Retur atas SP2D',
                  'Pengajuan Penerbitan Nota Konfirmasi atas Penerimaan Negara',
                  'Koreksi Penerimaan Negara Atas Setoran Satuan Kerja',
                  'Void SP2D',
                  'Permohonan Persetujuan Pembukaan Rekening Satker',
                  'Laporan Pembukaan atau Penutupan Rekening',
                  'Pengembalian PFK',
                  'Penerbitan Bukti Penerimaan Negara',
                  'Pengembalian PNBP'
                ].map(item => (
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
          <hr className='sidebar-divider' />

          <div className='sidebar-user-container'>
            <div className='sidebar-user-info'>
              <div className='user-avatar'>
                <i className='bi bi-person-circle'></i>
              </div>
              <div className='user-details'>
                <span className='sidebar-username'>
                  {username ? (
                    username
                  ) : (
                    <span className='placeholder-glow'>
                      <span className='placeholder col-8'></span>
                    </span>
                  )}
                </span>
                <span className='user-role '>Administrator</span>
              </div>
              <button
                className={`user-menu-toggle ${isUserMenuOpen ? 'active' : ''}`}
                onClick={() => setUserMenuOpen(!isUserMenuOpen)}
              >
                <i
                  className={`bi bi-chevron-${isUserMenuOpen ? 'down' : 'up'}`}
                ></i>
              </button>
            </div>

            {/* Dropdown menu logout yang lebih cantik */}
            {isUserMenuOpen && (
              <div className='user-dropdown-menu animate__animated animate__fadeInUp'>
                <button className='dropdown-item-custom'>
                  <i className='bi bi-gear me-2'></i> Pengaturan
                </button>
                <div className='dropdown-divider'></div>
                <button onClick={handleLogout} className='logout-btn-custom'>
                  <i className='bi bi-box-arrow-right me-2'></i>
                  <span>Keluar</span>
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
