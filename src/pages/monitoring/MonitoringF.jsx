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

const MonitoringF = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [newFile, setNewFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [editFields, setEditFields] = useState({
    noTelpon: '',
    jenisLaporan: ''
  })
  const fetchData = () => {
    setLoading(true)
    api
      .get('/monitoringLaporan/')
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
    setSelectedItem(item)
    // Isi field dengan data yang sudah ada di tabel
    setEditFields({
      noTelpon: item.laporanRekening?.noTelpon || '',
      jenisLaporan: item.laporanRekening?.jenisLaporan || ''
    })
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedItem(null)
    setNewFile(null)
  }

  const handleUpdate = async () => {
    setUploading(true)
    const formData = new FormData()

    formData.append('noTelpon', editFields.noTelpon)
    formData.append('jenisLaporan', editFields.jenisLaporan)
    if (newFile) {
      formData.append('unggahDokumen', newFile)
    }

    try {
      await api.patch(
        `/laporanRekening/${selectedItem.laporanRekeningId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      Swal.fire('Berhasil', 'Dokumen diupdate!', 'success')
      handleCloseModal()
      fetchData()
    } catch (error) {
      console.error('Gagal Upload dokumen:', error)
      Swal.fire('Gagal', 'Terjadi kesalahan server', 'error')
    } finally {
      setUploading(false)
    }
  }

  const filteredData = data.filter(item => {
    const kode = item.laporanRekening?.satker?.kodeSatker || ''
    const instansi = item.laporanRekening?.satker.namaInstansi || ''
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
            <h2 className='text-center mb-4  fw-bold'>
              Monitoring Laporan Pembukaan / Penutupan Rekening
            </h2>

            <Form.Group className='mb-4' style={{ maxWidth: '400px' }}>
              <Form.Control
                type='text'
                placeholder='Kode Satker atau Nama Instansi...'
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
                    <th>Jenis Laporan</th>
                    <th>Dokumen</th>
                    <th>Status</th>
                    <th>Catatan</th>
                    <th>Upload Ulang</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan='5' className='py-5'>
                        <Spinner animation='border' variant='primary' />
                      </td>
                    </tr>
                  ) : filteredData.length === 0 ? (
                    <tr>
                      <td colSpan='5' className='py-4 text-muted'>
                        Tidak ada data tersedia
                      </td>
                    </tr>
                  ) : (
                    filteredData.map(item => (
                      <tr key={item.id}>
                        <td className='text-start'>
                          <div className='fw-bold'>
                            {item.laporanRekening?.satker?.kodeSatker || '-'}
                          </div>

                          <div className='text-muted small'>
                            {item.laporanRekening?.satker?.namaInstansi || '-'}
                          </div>
                        </td>
                        <td>
                          <div className='fw-bold'>
                            {item.laporanRekening?.user?.namaLengkap || '-'}
                          </div>
                        </td>
                        <td>{item.laporanRekening.noTelpon || '-'}</td>
                        <td>{item.laporanRekening.jenisLaporan || '-'}</td>
                        <td>
                          {item.laporanRekening.unggahDokumen ? (
                            <a
                              href={`http://localhost:3001/uploads/${item.laporanRekening.unggahDokumen}`}
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              Lihat File
                            </a>
                          ) : (
                            '-'
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
                        <td>{item.catatan || '-'}</td>
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
        <Modal.Header closeButton className='bg-primary text-white'>
          <Modal.Title>
            Edit Laporan Pembukaan atau Penutupan Rekening
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='mb-3'>
            <label className='fw-bold'>Instansi:</label>
            <p className='mb-0'>
              {selectedItem?.laporanRekening?.satker?.namaInstansi}
            </p>
            <label className='fw-bold'>Kode Satker:</label>
            <p className='mb-0'>
              {selectedItem?.laporanRekening?.satker?.kodeSatker}
            </p>
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
            <Form.Label className='fw-bold'>Jenis Laporan</Form.Label>
            <Form.Select
              value={editFields.jenisLaporan}
              onChange={e =>
                setEditFields({ ...editFields, jenisLaporan: e.target.value })
              }
            >
              <option value=''>-- Pilih Jenis Laporan --</option>
              <option value='LAPORAN_PEMBUKAAN_REKENING'>
                LAPORAN PEMBUKAAN REKENING
              </option>
              <option value='LAPORAN_PENTUPUAN_REKENING'>
                LAPORAN PENUTUPAN REKENING
              </option>
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label className='fw-bold'>
              Ganti Dokumen (Opsional)
            </Form.Label>
            <Form.Control
              type='file'
              accept='.pdf,.jpg,.png'
              onChange={e => setNewFile(e.target.files[0])}
            />
            <Form.Text className='text-muted'>
              Biarkan kosong jika tidak ingin mengubah dokumen.
            </Form.Text>
          </Form.Group>

          {selectedItem?.catatan && (
            <Card bg='light' className='mt-3'>
              <Card.Body className='py-2'>
                <small className='text-danger fw-bold'>
                  Catatan Admin Sebelumnya:
                </small>
                <p className='mb-0 small'>{selectedItem.catatan}</p>
              </Card.Body>
            </Card>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseModal}>
            Batal
          </Button>
          <Button variant='primary' onClick={handleUpdate} disabled={uploading}>
            {uploading ? (
              <Spinner size='sm' animation='border' />
            ) : (
              'Simpan Perubahan'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default MonitoringF
