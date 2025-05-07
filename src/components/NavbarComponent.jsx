import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import axios from 'axios'

const NavbarComponent = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState({})

  const token = localStorage.getItem('token')
  console.log(token)
  const id = localStorage.getItem('id')
  console.log(id)

  const getUser = async id => {
    try {
      const response = await axios.get(`http://localhost:3000/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const result = response.data
      setUsername(result)
      setIsLoggedIn(true)
      console.log('isi navbar', result)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser(id)
  }, [id])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    setIsLoggedIn(false)
    navigate('/')
  }

  return (
    <Navbar expand='lg' className='bg-light shadow-md fixed-top'>
      <Container>
        <Navbar.Brand
          as={NavLink}
          to='/'
          className='fw-bold text-lg d-flex align-items-center gap-2'
        >
          <img src='/kppnlogo.png' alt='KPPN PALU' width='80' height='30' />
          <span className='fs-5 text-gray-600 hover:text-blue-500'>TALISE</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='d-flex mx-auto gap-4'>
            <NavLink
              to='/'
              className='nav-link text-gray-600 hover:text-blue-500'
            >
              Home
            </NavLink>

            {/* Dropdown untuk Layanan */}
            <NavDropdown title='Layanan' id='navbarDropdown'>
              <NavDropdown.Item
                as={NavLink}
                to='/layanan/Penyelesaian Retur Atas SP2D'
              >
                Penyelesaian Retur Atas SP2D
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to='/layanan/Penerbitan Nota Konfirmasi Atas Penerimaan Negara'
              >
                Penerbitan Nota Konfirmasi Atas Penerimaan Negara
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to='/layanan/Koreksi Penerimaan Negara Atas Setoran Satuan Kerja'
              >
                Koreksi Penerimaan Negara Atas Setoran Satuan Kerja
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to='/layanan/Permohonan VOID SP2D'>
                Permohonan VOID SP2D
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to='/layanan/Penerbitan Surat Persetujuan / Penolakan Pembukaan Rekening Satker'
              >
                Penerbitan Surat Persetujuan / Penolakan Pembukaan Rekening
                Satker
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to='/layanan/Laporan Pembukaan / Penutupan Rekening'
              >
                Laporan Pembukaan / Penutupan Rekening
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to='/layanan/Pengembalian PFK'>
                Pengembalian PFK
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to='layanan/Penerbitan Bukti Penerimaan Negara'
              >
                Penerbitan Bukti Penerimaan Negara
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title='Pengajuan Dokumen' id='navbarDropdown'>
              <NavDropdown.Item
                as={NavLink}
                to='/dokumen/Penyelesaian Retur Atas SP2D'
              >
                Penyelesaian Retur Atas SP2D
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to='/dokumen/Penerbitan Nota Konfirmasi Atas Penerimaan Negara'
              >
                Penerbitan Nota Konfirmasi Atas Penerimaan Negara
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to='/dokumen/Koreksi Penerimaan Negara Atas Setoran Satuan Kerja'
              >
                Koreksi Penerimaan Negara Atas Setoran Satuan Kerja
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to='/dokumen/Permohonan VOID SP2D'>
                Permohonan VOID SP2D
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to='/dokumen/Penerbitan Surat Persetujuan / Penolakan Pembukaan Rekening Satker'
              >
                Penerbitan Surat Persetujuan / Penolakan Pembukaan Rekening
                Satker
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to='/dokumen/Laporan Pembukaan / Penutupan Rekening'
              >
                Laporan Pembukaan / Penutupan Rekening
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to='/dokumen/Pengembalian PFK'>
                Pengembalian PFK
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to='/dokumen/Penerbitan Bukti Penerimaan Negara'
              >
                Penerbitan Bukti Penerimaan Negara
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to='/dokumen/Pengembalian PNBP'>
                Pengembalian PNBP
              </NavDropdown.Item>
            </NavDropdown>

            <NavLink
              to='/monitoring'
              className='nav-link text-gray-600 hover:text-blue-500'
            >
              Monitoring
            </NavLink>
          </Nav>

          <div className='d-flex gap-4 align-items-center'>
            {isLoggedIn ? (
              <>
                <div className='d-flex align-items-center gap-2'>
                  <FaUser size={20} />
                  <span className='fw-semibold text-muted'>
                    {username.namaLengkap}
                  </span>
                </div>
                <button
                  className='btn btn-outline-danger'
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className='btn btn-outline-primary'
                  onClick={() => navigate('/login')}
                >
                  Masuk
                </button>
                <button
                  className='btn btn-outline-primary'
                  onClick={() => navigate('/register')}
                >
                  Daftar
                </button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent
