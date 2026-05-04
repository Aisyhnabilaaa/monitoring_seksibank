// import { useState } from 'react'
// import { Container, Card, Form, Button, Spinner } from 'react-bootstrap'
// import api from '../../../api'

// import Swal from 'sweetalert2'

// const FormSatker = () => {
//   const [formData, setFormData] = useState({
//     namaInstansi: '',
//     kodeSatker: '',
//     tipe: 'SATKER'
//   })
//   const [loading, setLoading] = useState(false)

//   const purpleColor = '#6f42c1'

//   const handleChange = e => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   const handleSubmit = async e => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const token = localStorage.getItem('token')
//       // Pastikan endpoint '/satker' sesuai dengan route di backend kamu
//       await api.post('/satker/insert', formData, {
//         headers: { Authorization: `Bearer ${token}` }
//       })

//       Swal.fire('Berhasil', 'Satker baru telah ditambahkan', 'success')
//       setFormData({ namaInstansi: '', kodeSatker: '', tipe: 'SATKER' })
//     } catch (error) {
//       Swal.fire('Gagal', error.response?.data || 'Terjadi kesalahan', 'error')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className='bg-light' style={{ minHeight: '100vh' }}>
//       <Container className='d-flex justify-content-center mt-5 pt-5'>
//         <Card
//           style={{ width: '100%', maxWidth: '500px' }}
//           className='shadow border-0'
//         >
//           <Card.Header
//             className='text-white text-center fw-bold'
//             style={{ backgroundColor: purpleColor }}
//           >
//             TAMBAH DATA SATKER
//           </Card.Header>

//           <Card.Body className='p-4'>
//             <Form onSubmit={handleSubmit}>
//               <Form.Group className='mb-3'>
//                 <Form.Label>Nama Instansi</Form.Label>
//                 <Form.Control
//                   name='namaInstansi'
//                   value={formData.namaInstansi}
//                   onChange={handleChange}
//                   placeholder='Contoh: KPPN Palu'
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className='mb-3'>
//                 <Form.Label>Kode Satker</Form.Label>
//                 <Form.Control
//                   name='kodeSatker'
//                   value={formData.kodeSatker}
//                   onChange={handleChange}
//                   placeholder='Masukkan 6 digit kode'
//                   required
//                 />
//               </Form.Group>

//               <Form.Group className='mb-4'>
//                 <Form.Label>Tipe</Form.Label>
//                 <Form.Select
//                   name='tipe'
//                   value={formData.tipe}
//                   onChange={handleChange}
//                 >
//                   <option value='SATKER'>SATKER</option>
//                   <option value='PEMDA'>PEMDA</option>
//                 </Form.Select>
//               </Form.Group>

//               <Button
//                 type='submit'
//                 className='w-100 fw-bold'
//                 style={{ backgroundColor: purpleColor, border: 'none' }}
//                 disabled={loading}
//               >
//                 {loading ? <Spinner size='sm' /> : 'SIMPAN'}
//               </Button>
//             </Form>
//           </Card.Body>
//         </Card>
//       </Container>
//     </div>
//   )
// }

// export default FormSatker

import { useState, useEffect } from 'react'
import {
  Container,
  Card,
  Form,
  Button,
  Spinner,
  Table,
  Row,
  Col,
  Badge
} from 'react-bootstrap'
import api from '../../../api'
import Swal from 'sweetalert2'

const FormSatker = () => {
  const [formData, setFormData] = useState({
    namaInstansi: '',
    kodeSatker: '',
    tipe: 'SATKER'
  })
  const [satkerList, setSatkerList] = useState([])
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [editId, setEditId] = useState(null) // State untuk menyimpan ID saat mode edit

  const purpleColor = '#6f42c1'
  const token = localStorage.getItem('token')

  // --- 1. GET ALL DATA (READ) ---
  const fetchSatker = async () => {
    setFetching(true)
    try {
      const response = await api.get('/satker', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSatkerList(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      console.error('Gagal memuat data satker:', error)
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    fetchSatker()
  }, [])

  // --- 2. HANDLE SUBMIT (CREATE & UPDATE) ---
  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const id = editId // Sesuai permintaanmu, gunakan variabel id
    try {
      if (id) {
        // AKSI EDIT (PATCH)
        await api.patch(`/satker/${id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
        Swal.fire('Berhasil', 'Data Satker diperbarui', 'success')
      } else {
        // AKSI TAMBAH (POST)
        await api.post('/satker/insert', formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
        Swal.fire('Berhasil', 'Satker baru ditambahkan', 'success')
      }

      // Reset state setelah sukses
      setFormData({ namaInstansi: '', kodeSatker: '', tipe: 'SATKER' })
      setEditId(null)
      fetchSatker()
    } catch (error) {
      console.error(error)
      Swal.fire(
        'Gagal',
        error.response?.data?.message || 'Terjadi kesalahan sistem',
        'error'
      )
    } finally {
      setLoading(false)
    }
  }

  // --- 3. HANDLE EDIT MODE ---
  const handleEdit = item => {
    setFormData({
      namaInstansi: item.namaInstansi,
      kodeSatker: item.kodeSatker,
      tipe: item.tipe
    })
    setEditId(item.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // --- 4. HANDLE DELETE ---
  const handleDelete = async id => {
    const result = await Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'Data Satker akan dihapus permanen!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Ya, Hapus!'
    })

    if (result.isConfirmed) {
      try {
        await api.delete(`/satker/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        Swal.fire('Terhapus!', 'Data berhasil dihapus.', 'success')
        fetchSatker()
      } catch (error) {
        Swal.fire('Gagal', 'Tidak dapat menghapus data', error)
      }
    }
  }

  const cancelEdit = () => {
    setEditId(null)
    setFormData({ namaInstansi: '', kodeSatker: '', tipe: 'SATKER' })
  }

  return (
    <div
      className='bg-light p-5 rounded-4'
      style={{ minHeight: '100vh', paddingBottom: '50px' }}
    >
      <Container className='mt-4 '>
        <div className='d-flex justify-content-between align-items-center mb-4'>
          <h3 className='fw-bold mb-0'>MANAJEMEN DATA SATKER</h3>
          <Badge bg='dark' className='p-2'>
            Total: {satkerList.length} Satker
          </Badge>
        </div>

        {/* --- FORM SECTION (LEBAR DI ATAS) --- */}
        <Card className='shadow-sm border-0 mb-4'>
          <Card.Header
            className='text-white fw-bold py-3'
            style={{
              backgroundColor: editId ? '#fd7e14' : purpleColor,
              transition: '0.3s'
            }}
          >
            {editId ? `EDIT SATKER (ID: ${editId})` : 'TAMBAH SATKER BARU'}
          </Card.Header>
          <Card.Body className='p-4'>
            <Form onSubmit={handleSubmit}>
              <Row className='align-items-end'>
                <Col lg={4} md={12} className='mb-3 mb-lg-0'>
                  <Form.Label className='fw-bold small text-muted text-uppercase'>
                    Nama Instansi
                  </Form.Label>
                  <Form.Control
                    value={formData.namaInstansi}
                    onChange={e =>
                      setFormData({ ...formData, namaInstansi: e.target.value })
                    }
                    placeholder='Masukkan Nama Instansi'
                    required
                  />
                </Col>
                <Col lg={3} md={6} className='mb-3 mb-lg-0'>
                  <Form.Label className='fw-bold small text-muted text-uppercase'>
                    Kode Satker
                  </Form.Label>
                  <Form.Control
                    value={formData.kodeSatker}
                    onChange={e =>
                      setFormData({ ...formData, kodeSatker: e.target.value })
                    }
                    placeholder='6 Digit Kode'
                    maxLength='6'
                    required
                  />
                </Col>
                <Col lg={2} md={6} className='mb-3 mb-lg-0'>
                  <Form.Label className='fw-bold small text-muted text-uppercase'>
                    Tipe
                  </Form.Label>
                  <Form.Select
                    value={formData.tipe}
                    onChange={e =>
                      setFormData({ ...formData, tipe: e.target.value })
                    }
                  >
                    <option value='SATKER'>SATKER</option>
                    <option value='PEMDA'>PEMDA</option>
                  </Form.Select>
                </Col>
                <Col lg={3} md={12}>
                  <div className='d-flex gap-2'>
                    <Button
                      type='submit'
                      className='w-100 fw-bold border-0 shadow-sm'
                      variant={editId ? 'warning' : 'primary'}
                      style={
                        !editId
                          ? { backgroundColor: purpleColor }
                          : { color: '#fff' }
                      }
                      disabled={loading}
                    >
                      {loading ? (
                        <Spinner size='sm' />
                      ) : editId ? (
                        'UPDATE DATA'
                      ) : (
                        'POST DATA'
                      )}
                    </Button>
                    {editId && (
                      <Button variant='outline-secondary' onClick={cancelEdit}>
                        BATAL
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>

        {/* --- TABLE SECTION (DI BAWAH) --- */}
        <Card className='shadow-sm border-0 mb-4 rounded-4 overflow-hidden '>
          <Card.Header className='bg-white py-3 rounded-4xl '>
            <h5 className='mb-0 fw-bold'>Daftar Satker / Instansi</h5>
          </Card.Header>
          <Card.Body className='p-0 '>
            <div className='table-responsive '>
              <Table hover className='mb-0 align-middle '>
                <thead className='table-dark'>
                  <tr>
                    <th className='ps-4' style={{ width: '60px' }}>
                      NO
                    </th>
                    <th>KODE</th>
                    <th>NAMA INSTANSI</th>
                    <th>TIPE</th>
                    <th className='text-center' style={{ width: '180px' }}>
                      AKSI
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fetching ? (
                    <tr>
                      <td colSpan='5' className='text-center py-5'>
                        <Spinner
                          animation='border'
                          style={{ color: purpleColor }}
                        />
                        <div className='mt-2 text-muted small'>
                          Mengambil data dari server...
                        </div>
                      </td>
                    </tr>
                  ) : satkerList.length === 0 ? (
                    <tr>
                      <td colSpan='5' className='text-center py-4 text-muted'>
                        Tidak ada data ditemukan.
                      </td>
                    </tr>
                  ) : (
                    satkerList.map((item, index) => (
                      <tr
                        key={item.id}
                        className={editId === item.id ? 'table-warning' : ''}
                      >
                        <td className='ps-4'>{index + 1}</td>
                        <td className='fw-bold text-primary'>
                          {item.kodeSatker}
                        </td>
                        <td>{item.namaInstansi}</td>
                        <td>
                          <Badge
                            bg={item.tipe === 'PEMDA' ? 'info' : 'secondary'}
                          >
                            {item.tipe}
                          </Badge>
                        </td>
                        <td className='text-center'>
                          <div className='d-flex justify-content-center gap-2'>
                            <Button
                              variant='warning'
                              size='sm'
                              className='text-white'
                              onClick={() => handleEdit(item)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant='danger'
                              size='sm'
                              onClick={() => handleDelete(item.id)}
                            >
                              Hapus
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}

export default FormSatker
