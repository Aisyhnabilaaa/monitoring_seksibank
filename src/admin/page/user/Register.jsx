// import { useState, useEffect } from 'react'
// import {
//   Container,
//   Card,
//   Form,
//   Row,
//   Col,
//   Button,
//   InputGroup,
//   Table,
//   Badge,
//   Spinner
// } from 'react-bootstrap'
// import axios from 'axios'
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'

// const MySwal = withReactContent(Swal)

// const RegisterForm = () => {
//   // State Utama
//   const [users, setUsers] = useState([])
//   const [satkerOptions, setSatkerOptions] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [loadingSatker, setLoadingSatker] = useState(true)
//   const [searchTerm, setSearchTerm] = useState('')

//   // State Form
//   const [form, setForm] = useState({
//     namaLengkap: '',
//     email: '',
//     noTelepon: '',
//     satkerId: '',
//     password: '',
//     role: ''
//   })

//   const BASE_URL = 'http://localhost:3001/api'

//   useEffect(() => {
//     fetchSatkers()
//     fetchUsers()
//   }, [])

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/user/`)
//       setUsers(response.data)
//     } catch (error) {
//       console.error('Gagal mengambil data user', error)
//     }
//   }

//   const fetchSatkers = async () => {
//     try {
//       const response = await axios.get(`${BASE_URL}/satker`)
//       setSatkerOptions(response.data)
//     } catch (error) {
//       console.error('Gagal mengambil data satker:', error)
//     } finally {
//       setLoadingSatker(false)
//     }
//   }

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async e => {
//     e.preventDefault()
//     setLoading(true)
//     try {
//       const response = await axios.post(`${BASE_URL}/auth/register`, form)
//       if (response.status >= 200 && response.status < 300) {
//         MySwal.fire({
//           icon: 'success',
//           title: 'Berhasil!',
//           text: 'User baru telah ditambahkan.',
//           timer: 1500,
//           showConfirmButton: false
//         })
//         setForm({
//           namaLengkap: '',
//           email: '',
//           noTelepon: '',
//           satkerId: '',
//           password: '',
//           role: ''
//         })
//         fetchUsers() // Refresh tabel di bawah
//       }
//     } catch (error) {
//       MySwal.fire({
//         icon: 'error',
//         title: 'Gagal',
//         text: error.response?.data?.message || 'Error'
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const filteredUsers = users.filter(
//     u =>
//       u.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       u.email.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   return (
//     <Container fluid className='py-4 px-4 bg-light min-vh-100'>
//       {/* SECTION 1: FORM INPUT (DI ATAS) */}
//       <Card
//         className='shadow-sm border-0 mb-5'
//         style={{ borderRadius: '15px' }}
//       >
//         <Card.Header
//           className='bg-primary text-white py-3'
//           style={{ borderRadius: '15px 15px 0 0' }}
//         >
//           <h5 className='mb-0 fw-bold'>
//             <i className='bi bi-person-plus-fill me-2'></i>Formulir Tambah Akun
//             Baru
//           </h5>
//         </Card.Header>
//         <Card.Body className='p-4'>
//           <Form onSubmit={handleSubmit}>
//             <Row>
//               <Col md={4}>
//                 <Form.Group className='mb-3'>
//                   <Form.Label className='fw-bold small text-secondary'>
//                     Nama Lengkap
//                   </Form.Label>
//                   <Form.Control
//                     name='namaLengkap'
//                     value={form.namaLengkap}
//                     onChange={handleChange}
//                     required
//                     placeholder='Contoh: Budi Santoso'
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className='mb-3'>
//                   <Form.Label className='fw-bold small text-secondary'>
//                     Email Instansi
//                   </Form.Label>
//                   <Form.Control
//                     type='email'
//                     name='email'
//                     value={form.email}
//                     onChange={handleChange}
//                     required
//                     placeholder='budi@kemenkeu.go.id'
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className='mb-3'>
//                   <Form.Label className='fw-bold small text-secondary'>
//                     Nomor Telepon/WA
//                   </Form.Label>
//                   <Form.Control
//                     name='noTelepon'
//                     value={form.noTelepon}
//                     onChange={handleChange}
//                     required
//                     placeholder='08123456xxx'
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className='mt-2'>
//               <Col md={4}>
//                 <Form.Group className='mb-3'>
//                   <Form.Label className='fw-bold small text-secondary'>
//                     Password
//                   </Form.Label>
//                   <Form.Control
//                     type='password'
//                     name='password'
//                     value={form.password}
//                     onChange={handleChange}
//                     required
//                     placeholder='******'
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className='mb-3'>
//                   <Form.Label className='fw-bold small text-secondary'>
//                     Pilih Satker Terkait
//                   </Form.Label>
//                   <Form.Select
//                     name='satkerId'
//                     value={form.satkerId}
//                     onChange={handleChange}
//                     required
//                     disabled={loadingSatker}
//                   >
//                     <option value=''>-- Hubungkan dengan Satker --</option>
//                     {satkerOptions.map(s => (
//                       <option key={s.id} value={s.id}>
//                         {s.kodeSatker} - {s.namaInstansi}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//               <Col md={4}>
//                 <Form.Group className='mb-3'>
//                   <Form.Label className='fw-bold small text-secondary'>
//                     Role
//                   </Form.Label>
//                   <Form.Select
//                     name='role'
//                     value={form.role}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value=''>Pilih Role</option>
//                     <option value='admin'>Admin</option>
//                     <option value='user'>User</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//               <Col md={3} className='d-flex align-items-end'>
//                 <Button
//                   variant='primary'
//                   type='submit'
//                   className='w-100 mb-3 py-2 fw-bold shadow-sm'
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <Spinner size='sm' animation='border' />
//                   ) : (
//                     <>
//                       <i className='bi bi-save me-2'></i>Simpan User
//                     </>
//                   )}
//                 </Button>
//               </Col>
//             </Row>
//           </Form>
//         </Card.Body>
//       </Card>

//       <hr className='my-5' />

//       {/* SECTION 2: TABEL DAFTAR USER (DI BAWAH) */}
//       <div className='d-flex justify-content-between align-items-center mb-4'>
//         <div>
//           <h3 className='fw-bold text-dark mb-0'>Daftar Akun Pengguna</h3>
//           <p className='text-muted small'>
//             Menampilkan data user yang aktif di dalam sistem
//           </p>
//         </div>
//         <div style={{ width: '350px' }}>
//           <InputGroup className='border rounded-3 overflow-hidden shadow-sm'>
//             <InputGroup.Text className='bg-white border-0 ps-3'>
//               <i className='bi bi-search'></i>
//             </InputGroup.Text>
//             <Form.Control
//               placeholder='Cari berdasarkan nama atau email...'
//               className='border-0 shadow-none py-2'
//               onChange={e => setSearchTerm(e.target.value)}
//             />
//           </InputGroup>
//         </div>
//       </div>

//       <Card
//         className='shadow-sm border-0 overflow-hidden'
//         style={{ borderRadius: '15px' }}
//       >
//         <div className='table-responsive'>
//           <Table bordered hover className='mb-0 align-middle'>
//             <thead className='bg-dark text-white text-center'>
//               <tr style={{ height: '60px' }}>
//                 <th style={{ width: '80px', border: '1px solid #454d55' }}>
//                   ID
//                 </th>
//                 <th style={{ minWidth: '250px', border: '1px solid #454d55' }}>
//                   PROFIL LENGKAP
//                 </th>
//                 <th style={{ width: '200px', border: '1px solid #454d55' }}>
//                   KONTAK
//                 </th>
//                 <th style={{ minWidth: '300px', border: '1px solid #454d55' }}>
//                   SATUAN KERJA
//                 </th>
//                 <th style={{ width: '150px', border: '1px solid #454d55' }}>
//                   HAK AKSES
//                 </th>
//                 <th style={{ width: '100px', border: '1px solid #454d55' }}>
//                   AKSI
//                 </th>
//               </tr>
//             </thead>
//             <tbody className='bg-white text-center'>
//               {filteredUsers.length === 0 ? (
//                 <tr>
//                   <td colSpan='6' className='py-5 text-muted'>
//                     Belum ada user yang terdaftar.
//                   </td>
//                 </tr>
//               ) : (
//                 filteredUsers.map((u, index) => (
//                   <tr key={u.id} style={{ height: '75px' }}>
//                     <td
//                       className='text-muted'
//                       style={{ border: '1px solid #dee2e6' }}
//                     >
//                       {index + 1}
//                     </td>
//                     <td
//                       className='text-start ps-4'
//                       style={{ border: '1px solid #dee2e6' }}
//                     >
//                       <div
//                         className='fw-bold text-primary'
//                         style={{ fontSize: '1.05rem' }}
//                       >
//                         {u.namaLengkap}
//                       </div>
//                       <div className='text-muted small'>{u.email}</div>
//                     </td>
//                     <td style={{ border: '1px solid #dee2e6' }}>
//                       {u.noTelepon}
//                     </td>
//                     <td
//                       className='text-start ps-3'
//                       style={{ border: '1px solid #dee2e6' }}
//                     >
//                       {u.satker ? (
//                         <div>
//                           <Badge bg='secondary' className='mb-1'>
//                             {u.satker.kodeSatker}
//                           </Badge>
//                           <div className='small fw-semibold'>
//                             {u.satker.namaInstansi}
//                           </div>
//                         </div>
//                       ) : (
//                         <span className='text-muted small italic'>-</span>
//                       )}
//                     </td>
//                     <td style={{ border: '1px solid #dee2e6' }}>
//                       <Badge
//                         bg={u.role === 'ADMIN' ? 'danger' : 'info'}
//                         className='px-3 py-2'
//                       >
//                         {u.role}
//                       </Badge>
//                     </td>
//                     <td style={{ border: '1px solid #dee2e6' }}>
//                       <Button
//                         variant='outline-danger'
//                         size='sm'
//                         className='rounded-circle border-0'
//                       >
//                         <i className='bi bi-trash3-fill'></i>
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </Table>
//         </div>
//       </Card>
//     </Container>
//   )
// }

// export default RegisterForm

import { useState, useEffect } from 'react'
import {
  Container,
  Card,
  Form,
  Row,
  Col,
  Button,
  InputGroup,
  Table,
  Badge,
  Spinner,
  Modal // Tambahkan Modal
} from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const RegisterForm = () => {
  const [users, setUsers] = useState([])
  const [satkerOptions, setSatkerOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingSatker, setLoadingSatker] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  // State Form Tambah
  const [form, setForm] = useState({
    namaLengkap: '',
    email: '',
    noTelepon: '',
    satkerId: '',
    password: '',
    role: ''
  })

  // State Khusus Edit (Modal)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editForm, setEditForm] = useState({
    id: '',
    namaLengkap: '',
    email: '',
    noTelepon: '',
    satkerId: '',
    password: '',
    role: ''
  })

  const BASE_URL = 'http://localhost:3001/api'

  useEffect(() => {
    fetchSatkers()
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/`)
      setUsers(response.data)
    } catch (error) {
      console.error('Gagal mengambil data user', error)
    }
  }

  const fetchSatkers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/satker`)
      setSatkerOptions(response.data)
    } catch (error) {
      console.error('Gagal mengambil data satker:', error)
    } finally {
      setLoadingSatker(false)
    }
  }

  // Handler Input
  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })
  const handleEditChange = e =>
    setEditForm({ ...editForm, [e.target.name]: e.target.value })

  // --- FUNGSI CRUD ---

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(`${BASE_URL}/auth/register`, form)
      MySwal.fire({
        icon: 'success',
        title: 'Berhasil Tambah User',
        timer: 1500,
        showConfirmButton: false
      })
      setForm({
        namaLengkap: '',
        email: '',
        noTelepon: '',
        satkerId: '',
        password: '',
        role: ''
      })
      fetchUsers()
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Gagal',
        text: error.response?.data?.message || 'Error'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async e => {
    e.preventDefault()
    setLoading(true)

    const id = editForm.id

    // 1. Ambil data asli dari state
    const rawData = { ...editForm }

    // 2. Bersihkan payload: Hapus properti yang tidak boleh dikirim ke Prisma
    delete rawData.id // ID biasanya ada di URL, bukan di body

    // 3. Konversi tipe data & proteksi password
    const payload = {
      ...rawData,
      satkerId: parseInt(rawData.satkerId) // Pastikan Integer
    }

    // Jika password tidak diisi (kosong), jangan ikut dikirim agar password lama tidak terhapus
    if (!payload.password) {
      delete payload.password
    }

    try {
      await axios.patch(`${BASE_URL}/user/${id}`, payload)

      MySwal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Data user telah diperbarui',
        timer: 1500,
        showConfirmButton: false
      })
      setShowEditModal(false)
      fetchUsers()
    } catch (error) {
      console.error('Error Detail:', error.response?.data) // Lihat detail error di Console F12
      MySwal.fire({
        icon: 'error',
        title: 'Gagal Update',
        text: error.response?.data?.message || 'Pastikan semua input benar'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async id => {
    MySwal.fire({
      title: 'Hapus User?',
      text: 'Data tidak bisa dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus'
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${BASE_URL}/user/${id}`)
          MySwal.fire('Terhapus!', 'User telah dihapus.', 'success')
          fetchUsers()
        } catch (error) {
          MySwal.fire('Gagal!', 'Terjadi kesalahan.', error)
        }
      }
    })
  }

  const openEditModal = user => {
    setEditForm({
      id: user.id,
      namaLengkap: user.namaLengkap,
      email: user.email,
      noTelepon: user.noTelepon,
      satkerId: user.satkerId ? String(user.satkerId) : '',
      password: '',
      role: user.role.toLowerCase()
    })
    setShowEditModal(true)
  }

  const filteredUsers = users.filter(
    u =>
      u.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Container fluid className='py-4 px-4 bg-light min-vh-100'>
      {/* FORM TAMBAH (TETAP DI ATAS) */}
      <Card
        className='shadow-sm border-0 mb-5'
        style={{ borderRadius: '15px' }}
      >
        <Card.Header
          className='bg-primary text-white py-3'
          style={{ borderRadius: '15px 15px 0 0' }}
        >
          <h5 className='mb-0 fw-bold'>
            <i className='bi bi-person-plus-fill me-2'></i>Formulir Tambah Akun
            Baru
          </h5>
        </Card.Header>
        <Card.Body className='p-4'>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={4}>
                <Form.Group className='mb-3'>
                  <Form.Label className='fw-bold small'>
                    Nama Lengkap
                  </Form.Label>
                  <Form.Control
                    name='namaLengkap'
                    value={form.namaLengkap}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className='mb-3'>
                  <Form.Label className='fw-bold small'>Email</Form.Label>
                  <Form.Control
                    type='email'
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className='mb-3'>
                  <Form.Label className='fw-bold small'>No. Telepon</Form.Label>
                  <Form.Control
                    name='noTelepon'
                    value={form.noTelepon}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className='mb-3'>
                  <Form.Label className='fw-bold small'>Password</Form.Label>
                  <Form.Control
                    type='password'
                    name='password'
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className='mb-3'>
                  <Form.Label className='fw-bold small'>Satker</Form.Label>
                  <Form.Select
                    name='satkerId'
                    value={form.satkerId}
                    onChange={handleChange}
                    required
                    disabled={loadingSatker}
                  >
                    <option value=''>-- Pilih Satker --</option>
                    {satkerOptions.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.namaInstansi} - {s.kodeSatker}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className='mb-3'>
                  <Form.Label className='fw-bold small'>Role</Form.Label>
                  <Form.Select
                    name='role'
                    value={form.role}
                    onChange={handleChange}
                    required
                  >
                    <option value=''>Pilih Role</option>
                    <option value='admin'>Admin</option>
                    <option value='user'>User</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={12} className='text-end mt-2'>
                <Button
                  variant='primary'
                  type='submit'
                  className='px-4 fw-bold'
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner size='sm' animation='border' />
                  ) : (
                    'Simpan User'
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* TABEL USER */}
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h3 className='fw-bold'>Daftar Akun</h3>
        <InputGroup style={{ width: '300px' }}>
          <InputGroup.Text className='bg-white'>
            <i className='bi bi-search'></i>
          </InputGroup.Text>
          <Form.Control
            placeholder='Cari user...'
            onChange={e => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>

      <Card className='shadow-sm border-0' style={{ borderRadius: '15px' }}>
        <Table hover responsive className='mb-0 align-middle text-center'>
          <thead className='bg-dark text-white'>
            <tr>
              <th>ID</th>
              <th>PROFIL</th>
              <th>KONTAK</th>
              <th>SATKER</th>
              <th>ROLE</th>
              <th>AKSI</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u, index) => (
              <tr key={u.id}>
                <td>{index + 1}</td>
                <td className='text-start'>
                  <b>{u.namaLengkap}</b>
                  <br />
                  <small>{u.email}</small>
                </td>
                <td>{u.noTelepon}</td>
                <td>{u.satker?.namaInstansi || '-'}</td>
                <td>
                  <Badge bg={u.role === 'ADMIN' ? 'danger' : 'info'}>
                    {u.role}
                  </Badge>
                </td>
                <td>
                  <Button
                    variant='outline-warning'
                    size='sm'
                    className='me-2 border-0'
                    onClick={() => openEditModal(u)}
                  >
                    <i className='bi bi-pencil-square'></i>
                  </Button>
                  <Button
                    variant='outline-danger'
                    size='sm'
                    className='border-0'
                    onClick={() => handleDelete(u.id)}
                  >
                    <i className='bi bi-trash3-fill'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* --- MODAL EDIT --- */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
        size='lg'
      >
        <Modal.Header closeButton className='bg-warning text-white'>
          <Modal.Title className='fw-bold'>Edit Pengguna</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdate}>
          <Modal.Body className='p-4'>
            <Row>
              <Col md={6} className='mb-3'>
                <Form.Label className='fw-bold small'>Nama Lengkap</Form.Label>
                <Form.Control
                  name='namaLengkap'
                  value={editForm.namaLengkap}
                  onChange={handleEditChange}
                  required
                />
              </Col>
              <Col md={6} className='mb-3'>
                <Form.Label className='fw-bold small'>Email</Form.Label>
                <Form.Control
                  name='email'
                  value={editForm.email}
                  onChange={handleEditChange}
                  required
                />
              </Col>
              <Col md={6} className='mb-3'>
                <Form.Label className='fw-bold small'>Nomor Telepon</Form.Label>
                <Form.Control
                  name='noTelepon'
                  value={editForm.noTelepon}
                  onChange={handleEditChange}
                  required
                />
              </Col>
              <Col md={6}>
                <Form.Label className='fw-bold small'>Satker</Form.Label>
                <Form.Select
                  name='satkerId'
                  value={editForm.satkerId}
                  onChange={handleEditChange}
                  required
                >
                  <option value=''>-- Pilih Satker --</option>{' '}
                  {/* Tambahkan ini */}
                  {satkerOptions.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.namaInstansi} - {s.kodeSatker}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={6} className='mb-3'>
                <Form.Label className='fw-bold small'>Role</Form.Label>
                <Form.Select
                  name='role'
                  value={editForm.role}
                  onChange={handleEditChange}
                  required
                >
                  <option value='admin'>Admin</option>
                  <option value='user'>User</option>
                </Form.Select>
              </Col>
              <Col md={6} className='mb-3'>
                <Form.Label className='fw-bold small'>
                  Password (Kosongkan jika tidak diubah)
                </Form.Label>
                <Form.Control
                  type='password'
                  name='password'
                  value={editForm.password}
                  onChange={handleEditChange}
                  placeholder='******'
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShowEditModal(false)}>
              Batal
            </Button>
            <Button variant='warning' type='submit' disabled={loading}>
              {loading ? (
                <Spinner size='sm' animation='border' />
              ) : (
                'Update Data'
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  )
}

export default RegisterForm
