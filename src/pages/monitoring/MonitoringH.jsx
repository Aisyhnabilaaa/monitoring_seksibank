import { useEffect, useState } from 'react'
import {
  Container,
  Table,
  Spinner,
  Form,
  Button,
  Badge,
  Card,
  Modal
} from 'react-bootstrap'
import api from '../../api'
import NavbarComponent from '../../components/NavbarComponent'
import Swal from 'sweetalert2'

const MonitoringH = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [newFile, setNewFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [editFields, setEditFields] = useState({
    noTelpon: ''
  })

  // Ambil token dari localStorage
  const token = localStorage.getItem('token')

  const fetchData = () => {
    setLoading(true)
    api
      .get('/monitoringPenerbitanBukti/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.error('Gagal mengambil data:', error)
        if (error.response?.status === 401) {
          Swal.fire('Error', 'Sesi login tidak valid atau kadaluwarsa', 'error')
        } else {
          Swal.fire('Error', 'Gagal memuat data dari server', 'error')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (token) {
      fetchData()
    } else {
      setLoading(false)
      Swal.fire('Peringatan', 'Anda harus login terlebih dahulu', 'warning')
    }
  }, [])

  const handleShowModal = item => {
    setSelectedItem(item)
    setEditFields({
      noTelpon: item.penerbitanBukti?.noTelpon || ''
    })
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedItem(null)
    setNewFile(null)
  }

  const handleUpdate = async () => {
    if (!selectedItem) return

    setUploading(true)
    const formData = new FormData()
    formData.append('noTelpon', editFields.noTelpon)
    if (newFile) {
      formData.append('unggah_dokumen', newFile)
    }

    try {
      await api.patch(
        `/penerbitanBukti/${selectedItem.penerbitanBuktiId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      )
      Swal.fire('Berhasil', 'Data dan dokumen berhasil diperbarui!', 'success')
      handleCloseModal()
      fetchData()
    } catch (error) {
      console.error('Gagal update data:', error)
      Swal.fire(
        'Gagal',
        error.response?.data?.message || 'Terjadi kesalahan server',
        'error'
      )
    } finally {
      setUploading(false)
    }
  }

  const filteredData = data.filter(item => {
    const kode = item.penerbitanBukti?.satker?.kodeSatker || ''
    const instansi = item.penerbitanBukti?.satker?.namaInstansi || ''
    return (
      kode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instansi.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div>
      <NavbarComponent />
      <Container className='mt-5 pt-5 pb-5'>
        <Card className='shadow-sm border-0'>
          <Card.Body className='p-4'>
            <h2 className='text-center mb-4 fw-bold'>
              Monitoring Penerbitan Bukti Negara
            </h2>

            <Form.Group className='mb-4' style={{ maxWidth: '400px' }}>
              <Form.Control
                type='text'
                placeholder='Cari Kode Satker atau Nama Instansi...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='shadow-sm'
              />
            </Form.Group>

            <div className='table-responsive'>
              <Table hover align='middle' className='border text-center'>
                <thead className='table-dark'>
                  <tr>
                    <th className='text-start'>Satker / Instansi</th>
                    <th>Nama Lengkap</th>
                    <th>Nomor Telepon</th>
                    <th>Dokumen</th>
                    <th>Status</th>
                    <th>Catatan</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan='6' className='py-5'>
                        <Spinner animation='border' variant='primary' />
                        <div className='mt-2 text-muted'>Memuat data...</div>
                      </td>
                    </tr>
                  ) : filteredData.length === 0 ? (
                    <tr>
                      <td colSpan='6' className='py-4 text-muted'>
                        Tidak ada data ditemukan
                      </td>
                    </tr>
                  ) : (
                    filteredData.map(item => (
                      <tr key={item.id}>
                        <td className='text-start'>
                          <div className='fw-bold text-primary'>
                            {item.penerbitanBukti?.satker?.kodeSatker}
                          </div>
                          <div className='text-muted small'>
                            {item.penerbitanBukti?.satker?.namaInstansi}
                          </div>
                        </td>
                        <td>
                          <div className='fw-bold text-primary'>
                            {item.penerbitanBukti?.user?.namaLengkap}
                          </div>
                        </td>
                        <td>{item.penerbitanBukti?.noTelpon || '-'}</td>
                        <td>
                          {item.penerbitanBukti?.unggah_dokumen ? (
                            <a
                              href={`http://localhost:3001/uploads/${item.penerbitanBukti.unggah_dokumen}`}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='btn btn-sm btn-outline-info'
                            >
                              Lihat File
                            </a>
                          ) : (
                            <span className='text-muted italic'>Kosong</span>
                          )}
                        </td>
                        <td>
                          <Badge
                            bg={
                              item.status?.toUpperCase() === 'SELESAI'
                                ? 'success'
                                : item.status?.toUpperCase() === 'DITOLAK'
                                ? 'danger'
                                : 'warning'
                            }
                          >
                            {item.status || 'PROSES'}
                          </Badge>
                        </td>
                        <td>
                          <div
                            style={{ maxWidth: '150px' }}
                            className='text-truncate mx-auto'
                          >
                            {item.catatan || '-'}
                          </div>
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

      {/* Modal Edit */}
      <Modal show={showModal} onHide={handleCloseModal} centered size='lg'>
        <Modal.Header closeButton className='bg-primary text-white'>
          <Modal.Title>Update Dokumen & Informasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='mb-4 p-3 bg-light rounded'>
            <div className='row'>
              <div className='col-md-6'>
                <label className='fw-bold text-muted small'>INSTANSI</label>
                <p className='fw-bold'>
                  {selectedItem?.penerbitanBukti?.satker?.namaInstansi}
                </p>
              </div>
              <div className='col-md-6'>
                <label className='fw-bold text-muted small'>KODE SATKER</label>
                <p className='fw-bold'>
                  {selectedItem?.penerbitanBukti?.satker?.kodeSatker}
                </p>
              </div>
            </div>
          </div>

          <Form.Group className='mb-3'>
            <Form.Label className='fw-bold'>Nomor Telepon</Form.Label>
            <Form.Control
              type='text'
              placeholder='Masukkan nomor telepon terbaru'
              value={editFields.noTelpon}
              onChange={e =>
                setEditFields({ ...editFields, noTelpon: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label className='fw-bold'>
              Ganti Dokumen (PDF/JPG/PNG)
            </Form.Label>
            <Form.Control
              type='file'
              accept='.pdf,.jpg,.png'
              onChange={e => setNewFile(e.target.files[0])}
            />
            <Form.Text className='text-muted italic'>
              *Hanya upload jika ingin mengganti dokumen yang sudah ada.
            </Form.Text>
          </Form.Group>

          {selectedItem?.catatan && (
            <div className='alert alert-warning mt-3'>
              <small className='fw-bold d-block mb-1'>
                Catatan dari Admin:
              </small>
              {selectedItem.catatan}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-secondary' onClick={handleCloseModal}>
            Batal
          </Button>
          <Button variant='primary' onClick={handleUpdate} disabled={uploading}>
            {uploading ? (
              <>
                <Spinner size='sm' animation='border' className='me-2' />
                Mengupload...
              </>
            ) : (
              'Simpan Perubahan'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default MonitoringH
