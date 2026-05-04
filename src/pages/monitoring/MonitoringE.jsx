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

const MonitoringE = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [newFile, setNewFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [editFields, setEditFields] = useState({
    noTelpon: '',
    jenisRekening: ''
  })

  const purpleColor = '#6f42c1'

  const fetchData = () => {
    setLoading(true)
    api
      .get('/monitoringPembukaanRekening/')
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.error('Gagal mengambil data:', error)
        if (error.response?.status === 401) {
          Swal.fire('Error', 'Sesi login tidak valid', 'error')
        }
      })
      .finally(() => {
        setLoading(false)
      })
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
      await api.patch(
        `/pembukaanRekening/${selectedItem.pembukaanRekeningId}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )

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
    const kode = item.pembukaanRekening?.satker?.kodeSatker || ''
    const instansi = item.pembukaanRekening?.satker?.namaInstansi || ''
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
              Monitoring Pembukaan Rekening
            </h2>

            <Form.Group className='mb-3' style={{ maxWidth: '400px' }}>
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
                    <th>Jenis Rekening</th>
                    <th>Dokumen</th>
                    <th>Status</th>
                    <th>Catatan</th>
                    <th>Upload Ulang</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan='5' className='text-center'>
                        <Spinner animation='border' variant='primary' />
                      </td>
                    </tr>
                  ) : filteredData.length === 0 ? (
                    <tr>
                      <td colSpan='5' className='text-center text-muted'>
                        Tidak ada data tersedia
                      </td>
                    </tr>
                  ) : (
                    filteredData.map(item => (
                      <tr key={item.id}>
                        <td className='text-start'>
                          <div className='fw-bold'>
                            {item.pembukaanRekening?.satker?.kodeSatker || '-'}
                          </div>
                          <div className='fw-bold'>
                            {item.pembukaanRekening?.satker?.namaInstansi ||
                              '-'}
                          </div>
                        </td>
                        <td>
                          <div className='fw-bold'>
                            {item.pembukaanRekening?.user?.namaLengkap || '-'}
                          </div>
                        </td>
                        <td>{item.pembukaanRekening.noTelpon || '-'}</td>
                        <td>{item.pembukaanRekening.jenisRekening || '-'}</td>
                        <td>
                          {item.pembukaanRekening.unggahDokumen ? (
                            <Button
                              variant='link'
                              size='sm'
                              onClick={() =>
                                window.open(
                                  `http://localhost:3001/uploads/${item.pembukaanRekening.unggahDokumen}`,
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
      <Modal show={showModal} onHide={handleCloseModal} centered size='lg'>
        <Modal.Header
          closeButton
          style={{ backgroundColor: purpleColor }}
          className='text-white'
        >
          <Modal.Title className='h5'>Update Pembukaan Rekening</Modal.Title>
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
                  {selectedItem.pembukaanRekening?.satker?.namaInstansi}
                </div>
              </div>

              <Form.Group className='mb-3'>
                <Form.Label className='fw-bold'>Nomor Telepon</Form.Label>
                <Form.Control
                  type='text'
                  value={editFields.noTelpon}
                  onChange={e =>
                    setEditFields({ ...editFields, noTelpon: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label className='fw-bold'>Jenis Rekening</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={3}
                  value={editFields.jenisRekening}
                  onChange={e =>
                    setEditFields({
                      ...editFields,
                      jenisRekening: e.target.value
                    })
                  }
                />
              </Form.Group>

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

export default MonitoringE
