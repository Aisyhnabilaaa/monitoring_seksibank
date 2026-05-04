import { useEffect, useState } from 'react'
import {
  Container,
  Table,
  Spinner,
  Button,
  Form,
  Badge,
  Card,
  Modal
} from 'react-bootstrap'
import api from '../../api'
import NavbarComponent from '../../components/NavbarComponent'
import Swal from 'sweetalert2'

const MonitoringB = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [newFile, setNewFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  // Variabel Warna Ungu
  const purpleColor = '#6f42c1'

  const fetchData = () => {
    setLoading(true)
    api
      .get('/monitoringNota/')
      .then(response => {
        setData(Array.isArray(response.data) ? response.data : [])
      })
      .catch(error => {
        console.error('Gagal mengambil data:', error)
        Swal.fire('Error', 'Gagal memuat data monitoring nota', 'error')
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleShowModal = item => {
    setSelectedItem(JSON.parse(JSON.stringify(item)))
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedItem(null)
    setNewFile(null)
  }

  const handleUpdateAction = async () => {
    if (!newFile) {
      return Swal.fire('Info', 'Silakan pilih dokumen baru dahulu', 'info')
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('unggahDokumen', newFile)

    try {
      await api.patch(`/nota/${selectedItem.penerbitanNotaId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      Swal.fire('Berhasil', 'Dokumen nota berhasil diperbarui!', 'success')
      handleCloseModal()
      fetchData()
    } catch (error) {
      console.error('Gagal update:', error)
      Swal.fire('Gagal', 'Terjadi kesalahan saat menyimpan', 'error')
    } finally {
      setUploading(false)
    }
  }

  const filteredData = data.filter(item => {
    const kode = item.penerbitanNota?.satker?.kodeSatker || ''
    const instansi = item.penerbitanNota?.satker?.namaInstansi || ''
    return (
      kode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instansi.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div className='bg-light' style={{ minHeight: '100vh' }}>
      <NavbarComponent />

      <Container className='mt-5 pt-5 pb-5'>
        <Card className='shadow-sm border-0'>
          <Card.Body className='p-4'>
            {/* Judul Ungu & Center */}
            <h2 className='text-center mb-4 fw-bold'>
              Monitoring Penerbitan Nota
            </h2>

            <Form.Group className='mb-4 ' style={{ maxWidth: '600px' }}>
              <Form.Control
                type='text'
                placeholder='Cari Kode Satker atau Nama Instansi...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='py-2 shadow-sm '
              />
            </Form.Group>

            <div className='table-responsive'>
              {/* text-center di Table agar isi tabel ke tengah */}
              <Table hover align='middle' className='border text-center'>
                <thead className='table-dark'>
                  <tr>
                    <th className='text-start'>Satker / Instansi</th>
                    <th>Nama Lengkap</th>
                    <th>Nomor Telepon</th>
                    <th>Tahun Setoran</th>
                    <th>Dokumen</th>
                    <th>Status</th>
                    <th>Catatan</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan='7' className='py-5'>
                        <Spinner
                          animation='border'
                          style={{ color: purpleColor }}
                        />
                      </td>
                    </tr>
                  ) : filteredData.length === 0 ? (
                    <tr>
                      <td colSpan='7' className='py-4 text-muted text-center'>
                        Data tidak ditemukan
                      </td>
                    </tr>
                  ) : (
                    filteredData.map(item => (
                      <tr key={item.id}>
                        <td className='text-start'>
                          <div className='fw-bold'>
                            {item.penerbitanNota?.satker?.kodeSatker}
                          </div>
                          <div className='text-muted small'>
                            {item.penerbitanNota?.satker?.namaInstansi}
                          </div>
                        </td>
                        <td>
                          <div className='text-muted small'>
                            {item.penerbitanNota?.user?.namaLengkap}
                          </div>
                        </td>
                        <td className='small fw-bold'>
                          {item.penerbitanNota?.noTelpon}
                        </td>
                        <td className='small'>
                          {/* Logika Prisma Tahun */}
                          {item.penerbitanNota?.tahunSetoran === 'LAINNYA'
                            ? item.penerbitanNota?.tahunLainnya
                            : item.penerbitanNota?.tahunSetoran?.replace(
                                'T',
                                ''
                              )}
                        </td>
                        <td>
                          {item.penerbitanNota?.unggahDokumen ? (
                            <Button
                              variant='link'
                              size='sm'
                              onClick={() =>
                                window.open(
                                  `http://localhost:3001/uploads/${item.penerbitanNota.unggahDokumen}`,
                                  '_blank'
                                )
                              }
                            >
                              Lihat File
                            </Button>
                          ) : (
                            '-'
                          )}
                        </td>
                        <td>
                          <Badge
                            bg={
                              item.status === 'Selesai'
                                ? 'success'
                                : item.status === 'Ditolak'
                                ? 'danger'
                                : 'warning'
                            }
                            className='p-2'
                          >
                            {item.status || 'PROSES'}
                          </Badge>
                        </td>
                        <td className='small fw-bold'>{item.catatan || '-'}</td>
                        <td>
                          <Button
                            size='sm'
                            className='fw-bold px-3'
                            onClick={() => handleShowModal(item)}
                          >
                            <i className='bi bi-pencil-square'></i> Edit
                          </Button>
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

      {/* --- MODAL UPDATE (STYLE UNGU) --- */}
      <Modal show={showModal} onHide={handleCloseModal} centered size='lg'>
        <Modal.Header
          closeButton
          style={{ backgroundColor: purpleColor }}
          className='text-white'
        >
          <Modal.Title className='h5'>Update Dokumen Nota</Modal.Title>
        </Modal.Header>
        <Modal.Body className='p-4'>
          {selectedItem && (
            <Form>
              <div
                className='mb-4 p-3 bg-light rounded border-start border-4'
                style={{ borderColor: purpleColor }}
              >
                <div className='small text-muted mb-1'>Instansi / Satker:</div>
                <div className='fw-bold'>
                  {selectedItem.penerbitanNota?.satker?.namaInstansi}
                </div>
                <div className='small mt-2 text-muted'>Tahun Setoran:</div>
                <div className='fw-bold'>
                  {selectedItem.penerbitanNota?.tahunSetoran === 'LAINNYA'
                    ? selectedItem.penerbitanNota?.tahunLainnya
                    : selectedItem.penerbitanNota?.tahunSetoran?.replace(
                        'T',
                        ''
                      )}
                </div>
              </div>

              <Form.Group>
                <Form.Label className='fw-bold small mb-2'>
                  UPLOAD DOKUMEN BARU (PDF/JPG)
                </Form.Label>
                <Form.Control
                  type='file'
                  onChange={e => setNewFile(e.target.files[0])}
                  accept='.pdf,.jpg,.jpeg,.png'
                />
              </Form.Group>

              <div className='mt-4 alert alert-warning small border-0'>
                <strong>INFO:</strong> Status akan kembali ke{' '}
                <strong>PROSES</strong> untuk divalidasi ulang oleh admin
                setelah Anda mengunggah file baru.
              </div>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer className='bg-light'>
          <Button variant='secondary' onClick={handleCloseModal}>
            Batal
          </Button>
          <Button
            style={{ backgroundColor: purpleColor, border: 'none' }}
            onClick={handleUpdateAction}
            disabled={uploading || !newFile}
            className='px-4 text-white fw-bold'
          >
            {uploading ? 'Mengunggah...' : 'Simpan Perubahan'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default MonitoringB

// import { useEffect, useState } from 'react'
// import {
//   Container,
//   Table,
//   Spinner,
//   Button,
//   Form,
//   Badge,
//   Card,
//   Modal
// } from 'react-bootstrap'
// import api from '../../api'
// import NavbarComponent from '../../components/NavbarComponent'
// import Swal from 'sweetalert2'

// const MonitoringB = () => {
//   const [data, setData] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [showModal, setShowModal] = useState(false)
//   const [selectedItem, setSelectedItem] = useState(null)
//   const [newFile, setNewFile] = useState(null)
//   const [uploading, setUploading] = useState(false)

//   const purpleColor = '#6f42c1'
//   const token = localStorage.getItem('token')

//   const fetchData = () => {
//     if (!token) {
//       setLoading(false)
//       return Swal.fire(
//         'Peringatan',
//         'Sesi Anda habis, silakan login kembali',
//         'warning'
//       )
//     }

//     setLoading(true)
//     api
//       .get('/monitoringNota/', {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       .then(response => {
//         // Pastikan data difilter berdasarkan user di sisi backend
//         setData(Array.isArray(response.data) ? response.data : [])
//       })
//       .catch(error => {
//         console.error('Gagal mengambil data:', error)
//         Swal.fire('Error', 'Gagal memuat data monitoring nota', 'error')
//       })
//       .finally(() => setLoading(false))
//   }

//   useEffect(() => {
//     fetchData()
//   }, [])

//   const handleShowModal = item => {
//     setSelectedItem(JSON.parse(JSON.stringify(item)))
//     setShowModal(true)
//   }

//   const handleCloseModal = () => {
//     setShowModal(false)
//     setSelectedItem(null)
//     setNewFile(null)
//   }

//   const handleUpdateAction = async () => {
//     if (!newFile) {
//       return Swal.fire('Info', 'Silakan pilih dokumen baru dahulu', 'info')
//     }

//     setUploading(true)
//     const formData = new FormData()
//     // Gunakan nama field yang konsisten dengan backend (unggah_dokumen)
//     formData.append('unggah_dokumen', newFile)

//     try {
//       await api.patch(`/nota/${selectedItem.penerbitanNotaId}`, formData, {
//         headers: {
//           // Jangan set Content-Type manual, biarkan browser yang urus
//           Authorization: `Bearer ${token}`
//         }
//       })

//       Swal.fire('Berhasil', 'Dokumen nota berhasil diperbarui!', 'success')
//       handleCloseModal()
//       fetchData()
//     } catch (error) {
//       console.error('Gagal update:', error)
//       Swal.fire('Gagal', 'Terjadi kesalahan saat menyimpan perubahan', 'error')
//     } finally {
//       setUploading(false)
//     }
//   }

//   const filteredData = data.filter(item => {
//     const kode = item.penerbitanNota?.satker?.kodeSatker || ''
//     const instansi = item.penerbitanNota?.satker?.namaInstansi || ''
//     return (
//       kode.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       instansi.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   })

//   return (
//     <div className='bg-light' style={{ minHeight: '100vh' }}>
//       <NavbarComponent />

//       <Container className='mt-5 pt-5 pb-5'>
//         <Card className='shadow-sm border-0'>
//           <Card.Body className='p-4'>
//             <h2 className='text-center mb-4 fw-bold'>
//               Monitoring Penerbitan Nota
//             </h2>

//             <Form.Group className='mb-4' style={{ maxWidth: '600px' }}>
//               <Form.Control
//                 type='text'
//                 placeholder='Cari Kode Satker atau Nama Instansi...'
//                 value={searchTerm}
//                 onChange={e => setSearchTerm(e.target.value)}
//                 className='py-2 shadow-sm'
//               />
//             </Form.Group>

//             <div className='table-responsive'>
//               <Table hover align='middle' className='border text-center'>
//                 <thead className='table-dark'>
//                   <tr>
//                     <th className='text-start'>Satker / Instansi</th>
//                     <th>Nomor Telepon</th>
//                     <th>Tahun Setoran</th>
//                     <th>Dokumen</th>
//                     <th>Status</th>
//                     <th>Catatan</th>
//                     <th>Aksi</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {loading ? (
//                     <tr>
//                       <td colSpan='7' className='py-5'>
//                         <Spinner
//                           animation='border'
//                           style={{ color: purpleColor }}
//                         />
//                         <div className='mt-2 text-muted small'>
//                           Memuat data...
//                         </div>
//                       </td>
//                     </tr>
//                   ) : filteredData.length === 0 ? (
//                     <tr>
//                       <td colSpan='7' className='py-4 text-muted text-center'>
//                         Tidak ada data ditemukan untuk akun Anda.
//                       </td>
//                     </tr>
//                   ) : (
//                     filteredData.map(item => (
//                       <tr key={item.id}>
//                         <td className='text-start'>
//                           <div className='fw-bold text-primary'>
//                             {item.penerbitanNota?.satker?.kodeSatker}
//                           </div>
//                           <div className='text-muted small'>
//                             {item.penerbitanNota?.satker?.namaInstansi}
//                           </div>
//                         </td>
//                         <td className='small fw-bold'>
//                           {item.penerbitanNota?.noTelpon || '-'}
//                         </td>
//                         <td className='small'>
//                           {item.penerbitanNota?.tahunSetoran === 'LAINNYA'
//                             ? item.penerbitanNota?.tahunLainnya
//                             : item.penerbitanNota?.tahunSetoran?.replace(
//                                 'T',
//                                 ''
//                               )}
//                         </td>
//                         <td>
//                           {item.penerbitanNota?.unggah_dokumen ? (
//                             <Button
//                               variant='outline-info'
//                               size='sm'
//                               onClick={() =>
//                                 window.open(
//                                   `http://localhost:3001/uploads/${item.penerbitanNota.unggah_dokumen}`,
//                                   '_blank'
//                                 )
//                               }
//                             >
//                               Lihat File
//                             </Button>
//                           ) : (
//                             <span className='text-muted small'>
//                               Tidak ada file
//                             </span>
//                           )}
//                         </td>
//                         <td>
//                           <Badge
//                             bg={
//                               item.status === 'Selesai'
//                                 ? 'success'
//                                 : item.status === 'Ditolak'
//                                 ? 'danger'
//                                 : 'warning'
//                             }
//                             className='p-2'
//                           >
//                             {item.status || 'PROSES'}
//                           </Badge>
//                         </td>
//                         <td className='small'>{item.catatan || '-'}</td>
//                         <td>
//                           <Button
//                             variant='warning'
//                             size='sm'
//                             className='fw-bold px-3'
//                             onClick={() => handleShowModal(item)}
//                           >
//                             Edit
//                           </Button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </Table>
//             </div>
//           </Card.Body>
//         </Card>
//       </Container>

//       {/* MODAL UPDATE */}
//       <Modal show={showModal} onHide={handleCloseModal} centered size='lg'>
//         <Modal.Header
//           closeButton
//           style={{ backgroundColor: purpleColor }}
//           className='text-white'
//         >
//           <Modal.Title className='h5'>Update Dokumen Nota</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className='p-4'>
//           {selectedItem && (
//             <Form>
//               <div
//                 className='mb-4 p-3 bg-light rounded border-start border-4'
//                 style={{ borderColor: purpleColor }}
//               >
//                 <div className='small text-muted mb-1'>Instansi / Satker:</div>
//                 <div className='fw-bold'>
//                   {selectedItem.penerbitanNota?.satker?.namaInstansi}
//                 </div>
//               </div>

//               <Form.Group>
//                 <Form.Label className='fw-bold small mb-2 text-uppercase'>
//                   Pilih File Baru
//                 </Form.Label>
//                 <Form.Control
//                   type='file'
//                   onChange={e => setNewFile(e.target.files[0])}
//                   accept='.pdf,.jpg,.jpeg,.png'
//                 />
//               </Form.Group>
//             </Form>
//           )}
//         </Modal.Body>
//         <Modal.Footer className='bg-light'>
//           <Button variant='secondary' onClick={handleCloseModal}>
//             Batal
//           </Button>
//           <Button
//             style={{ backgroundColor: purpleColor, border: 'none' }}
//             onClick={handleUpdateAction}
//             disabled={uploading || !newFile}
//             className='px-4 text-white fw-bold'
//           >
//             {uploading ? 'Mengunggah...' : 'Simpan Perubahan'}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   )
// }

// export default MonitoringB
