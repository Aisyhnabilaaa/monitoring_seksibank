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

const MonitoringA = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  // --- State Modal ---
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [newFile, setNewFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const fetchData = () => {
    setLoading(true)
    api
      .get('/monitoringRetur/')
      .then(response => {
        setData(Array.isArray(response.data) ? response.data : [])
      })
      .catch(error => {
        console.error('Gagal mengambil data:', error)
        Swal.fire('Error', 'Gagal memuat data monitoring', 'error')
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleShowModal = item => {
    // Deep clone agar perubahan di modal tidak merusak data tabel sebelum di-save
    setSelectedItem(JSON.parse(JSON.stringify(item)))
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedItem(null)
    setNewFile(null)
  }

  const handleUpdateAction = async () => {
    // Validasi jika pilih LAINNYA tapi alasanLainnya kosong
    if (
      selectedItem.returSp2d.alasanRetur === 'LAINNYA' &&
      !selectedItem.returSp2d.alasanLainnya
    ) {
      return Swal.fire(
        'Info',
        'Mohon isi keterangan untuk alasan Lainnya',
        'info'
      )
    }

    setUploading(true)
    const formData = new FormData()

    if (newFile) formData.append('unggah_dokumen', newFile)

    // Data Enum & Keterangan Tambahan
    formData.append('alasanRetur', selectedItem.returSp2d.alasanRetur)
    formData.append('alasanLainnya', selectedItem.returSp2d.alasanLainnya || '')

    try {
      await api.patch(`/retur/${selectedItem.returSp2dId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      Swal.fire('Berhasil', 'Data dan Dokumen berhasil diperbarui!', 'success')
      handleCloseModal()
      fetchData()
    } catch (error) {
      console.error('Gagal update:', error)
      const msg = error.response?.data?.error || 'Gagal menyimpan perubahan'
      Swal.fire('Gagal', msg, 'error')
    } finally {
      setUploading(false)
    }
  }

  const filteredData = data.filter(item => {
    const kode = item.returSp2d?.satker?.kodeSatker || ''
    const instansi = item.returSp2d?.satker?.namaInstansi || ''
    return (
      kode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instansi.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div className='bg-light' style={{ minHeight: '100vh' }}>
      <NavbarComponent />

      <Container className='mt-5 pt-5 pb-5'>
        <Card className='shadow-sm '>
          <Card.Body className='p-4'>
            <h2 className='text-center mb-4 fw-bold'>Monitoring Retur SP2D</h2>

            <Form.Group className='mb-4'>
              <Form.Control
                type='text'
                placeholder='Cari Kode Satker atau Nama Instansi...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='py-2'
              />
            </Form.Group>

            <div className='table-responsive'>
              <Table hover align='middle'>
                <thead className='table-dark'>
                  <tr>
                    <th>Satker / Instansi</th>
                    <th>Nama Lengkap</th>
                    <th>Alasan Retur</th>
                    <th>Dokumen</th>
                    <th>Status</th>
                    <th>Catatan Admin</th>
                    <th className='text-center'>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan='6' className='text-center py-5'>
                        <Spinner animation='border' variant='primary' />
                      </td>
                    </tr>
                  ) : filteredData.length === 0 ? (
                    <tr>
                      <td colSpan='6' className='text-center py-4 text-muted'>
                        Data tidak ditemukan
                      </td>
                    </tr>
                  ) : (
                    filteredData.map(item => (
                      <tr key={item.id}>
                        <td>
                          <div className='fw-bold text-uppercase '>
                            {item.returSp2d?.satker?.kodeSatker}
                          </div>
                          <div className='text-muted small'>
                            {item.returSp2d?.satker?.namaInstansi}
                          </div>
                        </td>
                        <td>
                          <div className='fw-bold text-uppercase '>
                            {item.returSp2d?.user?.namaLengkap}
                          </div>
                        </td>
                        <td>
                          <div className='small fw-bold'>
                            {item.returSp2d?.alasanRetur?.replace(/_/g, ' ')}
                          </div>
                          {item.returSp2d?.alasanRetur === 'LAINNYA' && (
                            <div className='text-muted x-small italic'>
                              {item.returSp2d?.alasanLainnya}
                            </div>
                          )}
                        </td>
                        <td>
                          {item.returSp2d?.unggah_dokumen ? (
                            <Button
                              variant='link'
                              size='sm'
                              onClick={() =>
                                window.open(
                                  `http://localhost:3001/uploads/${item.returSp2d.unggah_dokumen}`,
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
                            {item.status || 'DIPROSES'}
                          </Badge>
                        </td>
                        <td className='text-danger small fw-medium'>
                          {item.catatan || '-'}
                        </td>
                        <td className='text-center'>
                          <Button
                            size='sm'
                            className='fw-bold'
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

      {/* --- MODAL EDIT --- */}
      <Modal show={showModal} onHide={handleCloseModal} centered size='lg'>
        <Modal.Header closeButton className='bg-purple text-white'>
          <Modal.Title>Update Pengajuan Retur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <Form>
              <div className='mb-3 p-3 bg-light rounded border small'>
                <strong>Instansi:</strong>{' '}
                {selectedItem.returSp2d?.satker?.namaInstansi} <br />
                <strong>Kontak:</strong> {selectedItem.returSp2d?.noTelpon}
              </div>

              {/* Select Enum Alasan */}
              <Form.Group className='mb-3'>
                <Form.Label className='fw-bold text-secondary'>
                  Alasan Retur
                </Form.Label>
                <Form.Select
                  value={selectedItem.returSp2d.alasanRetur}
                  onChange={e =>
                    setSelectedItem({
                      ...selectedItem,
                      returSp2d: {
                        ...selectedItem.returSp2d,
                        alasanRetur: e.target.value,
                        alasanLainnya:
                          e.target.value === 'LAINNYA'
                            ? selectedItem.returSp2d.alasanLainnya
                            : ''
                      }
                    })
                  }
                >
                  <option value='REKENING_TIDAK_AKTIF'>
                    REKENING TIDAK AKTIF
                  </option>
                  <option value='REKENING_PASIF'>REKENING PASIF</option>
                  <option value='NOMOR_REKENING_SALAH'>
                    NOMOR REKENING SALAH
                  </option>
                  <option value='LAINNYA'>LAINNYA</option>
                </Form.Select>
              </Form.Group>

              {/* Conditional Input Alasan Lainnya */}
              {selectedItem.returSp2d.alasanRetur === 'LAINNYA' && (
                <Form.Group className='mb-3 animate__animated animate__fadeIn'>
                  <Form.Label className='fw-bold text-secondary'>
                    Keterangan Lainnya
                  </Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={2}
                    value={selectedItem.returSp2d.alasanLainnya || ''}
                    onChange={e =>
                      setSelectedItem({
                        ...selectedItem,
                        returSp2d: {
                          ...selectedItem.returSp2d,
                          alasanLainnya: e.target.value
                        }
                      })
                    }
                    placeholder='Jelaskan detail alasan retur...'
                  />
                </Form.Group>
              )}

              {/* Input File */}
              <Form.Group className='mb-3'>
                <Form.Label className='fw-bold text-secondary'>
                  Pilih Dokumen Baru (Opsional)
                </Form.Label>
                <Form.Control
                  type='file'
                  onChange={e => setNewFile(e.target.files[0])}
                  accept='.pdf,.jpg,.jpeg,.png'
                />
                <Form.Text className='text-muted'>
                  Kosongkan jika hanya ingin merubah alasan tanpa mengganti
                  file.
                </Form.Text>
              </Form.Group>

              <div className='alert alert-warning py-2 small mb-0 mt-4 border-start border-4 border-warning'>
                <i className='bi bi-exclamation-triangle'></i>{' '}
                <strong>PENTING:</strong> Menyimpan perubahan akan me-reset
                status menjadi <strong>DIPROSES</strong> untuk divalidasi ulang
                oleh admin.
              </div>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer className='bg-light'>
          <Button
            variant='outline-secondary'
            onClick={handleCloseModal}
            disabled={uploading}
          >
            Batal
          </Button>
          <Button
            onClick={handleUpdateAction}
            disabled={uploading}
            className=' px-4 fw-bold'
          >
            {uploading ? (
              <>
                <Spinner size='sm' className='me-2' /> Menyimpan...
              </>
            ) : (
              'Simpan & Update'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default MonitoringA
