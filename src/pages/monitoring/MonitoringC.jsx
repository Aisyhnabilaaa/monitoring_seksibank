// import { useEffect, useState } from 'react'
// import {
//   Container,
//   Table,
//   Spinner,
//   Form,
//   Button,
//   Badge,
//   Card,
//   Modal
// } from 'react-bootstrap'
// import api from '../../api'
// import NavbarComponent from '../../components/NavbarComponent'
// import Swal from 'sweetalert2'

// const MonitoringC = () => {
//   const [data, setData] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [fileInputs, setFileInputs] = useState({})
//   const [searchTerm, setSearchTerm] = useState('')

//   const [showModal, setShowModal] = useState(false)
//   const [selectedItem, setSelectedItem] = useState(null)
//   const [newFile, setNewFile] = useState(null)
//   const [uploading, setUploading] = useState(false)

//   const fetchData = () => {
//     setLoading(true)
//     api
//       .get('/monitoringKoreksi/')
//       .then(response => {
//         setData(Array.isArray(response.data) ? response.data : [])
//       })
//       .catch(error => {
//         console.error('Gagal mengambil data:', error)
//       })
//       .finally(() => {
//         setLoading(false)
//       })
//   }

//   useEffect(() => {
//     fetchData()
//   }, [])

//   const handleShowModal = item => {
//     // Deep clone agar perubahan di modal tidak merusak data tabel sebelum di-save
//     setSelectedItem(JSON.parse(JSON.stringify(item)))
//     setShowModal(true)
//   }

//   const handleCloseModal = () => {
//     setShowModal(false)
//     setSelectedItem(null)
//     setNewFile(null)
//   }

//   const handleFileChange = (id, file) => {
//     setFileInputs(prev => ({
//       ...prev,
//       [id]: file
//     }))
//   }

//   const handleUpload = async id => {
//     const file = fileInputs[id]
//     if (!file) return

//     const formData = new FormData()
//     formData.append('unggahDokumen', file)

//     try {
//       await api.patch(`/koreksiPenerimaan/${id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       })
//       fetchData()
//       Swal.fire({
//         title: 'Pengajuan Dokumen Berhasil Diubah!',
//         icon: 'success',
//         draggable: true
//       })
//     } catch (error) {
//       console.error('Gagal Upload ulang Dokumen:', error)
//       Swal.fire('Gagal', 'Terjadi kesalahan server', 'error')
//     }
//   }

//   const filteredData = data.filter(item => {
//     const kode = item.koreksiPenerimaan?.kodeSatker || ''
//     const instansi = item.koreksiPenerimaan?.satker?.namaInstansi || ''
//     return (
//       kode.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       instansi.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   })

//   return (
//     <div>
//       <NavbarComponent />
//       <Container className='mt-5 p-5'>
//         <h2 className='text-center mb-4'>Monitoring Koreksi Penerimaan</h2>
//         <div className='cariKode'>
//           <Form.Group className='mb-3'>
//             <Form.Label>Cari Kode Satker</Form.Label>
//             <Form.Control
//               type='text'
//               placeholder='Masukkan kode satker...'
//               value={searchTerm}
//               onChange={e => setSearchTerm(e.target.value)}
//               style={{ border: '2px solid #000000', borderRadius: '5px' }}
//             />
//           </Form.Group>
//         </div>
//         <div className='table-responsive'>
//           <Table bordered hover>
//             <thead className='table-light'>
//               <tr>
//                 <th>Kode Satker</th>
//                 <th>Nomor Telepon</th>
//                 <th>Tahun Setoran</th>
//                 <th>Dokumen</th>
//                 <th>Status</th>
//                 <th>catatan</th>
//                 <th>Upload Ulang</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan='5' className='text-center'>
//                     <Spinner animation='border' variant='primary' />
//                   </td>
//                 </tr>
//               ) : data.length === 0 ? (
//                 <tr>
//                   <td colSpan='7' className='text-center text-muted'>
//                     Tidak ada data tersedia
//                   </td>
//                 </tr>
//               ) : (
//                 filteredData.map(item => (
//                   <tr key={item.id}>
//                     <td>
//                       <strong>
//                         {item.koreksiPenerimaan?.satker?.kodeSatker}
//                       </strong>
//                       <br />
//                       <small>
//                         {item.koreksiPenerimaan?.satker?.namaInstansi}
//                       </small>
//                     </td>
//                     <td>{item.koreksiPenerimaan?.noTelpon}</td>
//                     <td>{item.koreksiPenerimaan?.tahunSetoran}</td>
//                     <td>
//                       {item.koreksiPenerimaan?.unggahDokumen ? (
//                         <a
//                           href={`http://localhost:3001/uploads/${item.koreksiPenerimaan.unggahDokumen}`}
//                           target='_blank'
//                           rel='noopener noreferrer'
//                         >
//                           Lihat Dokumen
//                         </a>
//                       ) : (
//                         '-'
//                       )}
//                     </td>
//                     <td>
//                       <Badge
//                         bg={
//                           item.status === 'Selesai'
//                             ? 'success'
//                             : item.status === 'Ditolak'
//                             ? 'danger'
//                             : 'warning'
//                         }
//                       >
//                         {item.status || 'PROSES'}
//                       </Badge>
//                     </td>
//                     <td>{item.catatan || '-'}</td>
//                     <td>
//                       {item.status === 'DITOLAK' && (
//                         <div>
//                           <Form.Control
//                             type='file'
//                             accept='.pdf,.jpg,.png'
//                             onChange={e =>
//                               handleFileChange(item.id, e.target.files[0])
//                             }
//                           />
//                           <Button
//                             className='mt-2'
//                             size='sm'
//                             variant='primary'
//                             onClick={() => handleUpload(item.id)}
//                           >
//                             Upload Ulang
//                           </Button>
//                         </div>
//                       )}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </Table>
//         </div>
//       </Container>
//     </div>
//   )
// }

// export default MonitoringC

import { useEffect, useState } from 'react'
import {
  Container,
  Table,
  Spinner,
  Form,
  Button,
  Badge,
  Card,
  Modal,
  Row,
  Col
} from 'react-bootstrap'
import api from '../../api'
import NavbarComponent from '../../components/NavbarComponent'
import Swal from 'sweetalert2'

const MonitoringC = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [newFile, setNewFile] = useState(null)
  const [newTahun, setNewTahun] = useState('') // State untuk edit tahun
  const [uploading, setUploading] = useState(false)

  const purpleColor = '#6f42c1'

  // Fungsi Helper untuk menghilangkan huruf 'T' di depan tahun
  const formatTahun = tahunEnum => {
    if (!tahunEnum) return '-'
    return tahunEnum.startsWith('T') ? tahunEnum.substring(1) : tahunEnum
  }

  const fetchData = () => {
    setLoading(true)
    api
      .get('/monitoringKoreksi/')
      .then(response => {
        setData(Array.isArray(response.data) ? response.data : [])
      })
      .catch(error => {
        console.error('Gagal mengambil data:', error)
        Swal.fire('Error', 'Gagal memuat data monitoring koreksi', 'error')
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleShowModal = item => {
    setSelectedItem(JSON.parse(JSON.stringify(item)))
    // Set default tahun di modal (hilangkan 'T' jika ada)
    setNewTahun(formatTahun(item.koreksiPenerimaan?.tahunSetoran))
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedItem(null)
    setNewFile(null)
    setNewTahun('')
  }

  const handleUpdateAction = async () => {
    setUploading(true)
    const formData = new FormData()

    // Kirim file jika ada
    if (newFile) {
      formData.append('unggahDokumen', newFile)
    }

    // Kirim tahun yang baru (Pastikan Backend menangani konversi kembali ke T2025 atau simpan apa adanya)
    formData.append('tahunSetoran', newTahun)

    try {
      await api.patch(
        `/koreksiPenerimaan/${selectedItem.koreksiPenerimaanId}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )

      Swal.fire('Berhasil', 'Data koreksi berhasil diperbarui!', 'success')
      handleCloseModal()
      fetchData()
    } catch (error) {
      console.error('Gagal update:', error)
      Swal.fire('Gagal', 'Terjadi kesalahan saat menyimpan perubahan', 'error')
    } finally {
      setUploading(false)
    }
  }

  const filteredData = data.filter(item => {
    const kode = item.koreksiPenerimaan?.satker?.kodeSatker || ''
    const instansi = item.koreksiPenerimaan?.satker?.namaInstansi || ''
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
            <h2 className='text-center mb-4 fw-bold'>
              Monitoring Koreksi Penerimaan
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
              <Table hover align='middle' className='border text-center'>
                <thead className='table-dark'>
                  <tr>
                    <th className='text-start'>Satker / Instansi</th>
                    <th>Nama Lengkap</th>
                    <th>Nomor Telepon</th>
                    <th>Tahun</th>
                    <th>Dokumen</th>
                    <th>Status</th>
                    <th>Catatan</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan='8' className='py-5'>
                        <Spinner
                          animation='border'
                          style={{ color: purpleColor }}
                        />
                      </td>
                    </tr>
                  ) : filteredData.length === 0 ? (
                    <tr>
                      <td colSpan='8' className='py-4 text-muted text-center'>
                        Data tidak ditemukan
                      </td>
                    </tr>
                  ) : (
                    filteredData.map(item => (
                      <tr key={item.id}>
                        <td className='text-start'>
                          <div className='fw-bold'>
                            {item.koreksiPenerimaan?.satker?.kodeSatker}
                          </div>
                          <div className='text-muted small'>
                            {item.koreksiPenerimaan?.satker?.namaInstansi}
                          </div>
                        </td>
                        <td>
                          <div className='small fw-bold'>
                            {item.koreksiPenerimaan?.user?.namaLengkap || '-'}
                          </div>
                        </td>
                        <td className='small fw-bold'>
                          {item.koreksiPenerimaan?.noTelpon}
                        </td>
                        <td className='small'>
                          {/* Logika Prisma Tahun */}
                          {item.koreksiPenerimaan?.tahunSetoran === 'LAINNYA'
                            ? item.koreksiPenerimaan?.tahunLainnya
                            : item.koreksiPenerimaan?.tahunSetoran?.replace(
                                'T',
                                ''
                              )}
                        </td>
                        <td>
                          {item.koreksiPenerimaan?.unggahDokumen ? (
                            <Button
                              variant='link'
                              size='sm'
                              className='text-decoration-none'
                              onClick={() =>
                                window.open(
                                  `http://localhost:3001/uploads/${item.koreksiPenerimaan.unggahDokumen}`,
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
                                : item.status === 'DITOLAK'
                                ? 'danger'
                                : 'warning'
                            }
                            className='p-2'
                          >
                            {item.status || 'PROSES'}
                          </Badge>
                        </td>
                        <td className='small text-danger fw-bold'>
                          {item.catatan || '-'}
                        </td>
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

      {/* --- MODAL UPDATE --- */}
      <Modal show={showModal} onHide={handleCloseModal} centered size='lg'>
        <Modal.Header
          closeButton
          style={{ backgroundColor: purpleColor }}
          className='text-white'
        >
          <Modal.Title className='h5'>Update Data Koreksi</Modal.Title>
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
                  {selectedItem.koreksiPenerimaan?.satker?.namaInstansi}
                </div>
              </div>

              <Row>
                <Col md={6}>
                  <Form.Group className='mb-3'>
                    <Form.Label className='fw-bold small'>
                      TAHUN SETORAN
                    </Form.Label>
                    <Form.Select
                      value={newTahun}
                      onChange={e => setNewTahun(e.target.value)}
                    >
                      <option value='T2024'>2024</option>
                      <option value='T2025'>2025</option>
                      <option value='LAINNYA'>LAINNYA</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className='mb-3'>
                    <Form.Label className='fw-bold small'>
                      DOKUMEN BARU (OPSIONAL)
                    </Form.Label>
                    <Form.Control
                      type='file'
                      onChange={e => setNewFile(e.target.files[0])}
                      accept='.pdf,.jpg,.jpeg,.png'
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className='mt-3 alert alert-warning small border-0'>
                <strong>PENTING:</strong> Perubahan data akan membuat status
                kembali ke <strong>PROSES</strong> untuk divalidasi ulang oleh
                admin.
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
            disabled={uploading}
            className='px-4 text-white fw-bold'
          >
            {uploading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default MonitoringC
