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

const MonitoringG = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const [searchTerm, setSearchTerm] = useState('')

  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [newFile, setNewFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [editFields, setEditFields] = useState({
    noTelpon: '',
    pihakMengajukan: ''
  })
  const fetchData = () => {
    setLoading(true)
    api
      .get('/monitoringPfk/')
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
      noTelpon: item.pengembalianPfk?.noTelpon || '',
      pihakMengajukan: item.pengembalianPfk?.pihakMengajukan || ''
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
    formData.append('pihakMengajukan', editFields.pihakMengajukan)
    if (newFile) {
      formData.append('unggahDokumen', newFile)
    }

    try {
      await api.patch(
        `/pengembalianPfk/${selectedItem.pihakMengajukanId}`,
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
      console.error('Gagal Upload ulang dokumen:', error)
      Swal.fire('Gagal', 'Terjadi kesalahan server', 'error')
    } finally {
      setUploading(false)
    }
  }

  const filteredData = data.filter(item => {
    const kode = item.pengembalianPfk?.satker?.kodeSatker || ''
    const instansi = item.pengembalianPfk?.satker?.namaInstansi || ''
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
            <h2 className='text-center mb-4'>Pengembalian PFK</h2>
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
                    <th>Pihak Mengajukan</th>
                    <th className='text-start'>Satker / Instansi</th>
                    <th>Nama Lengkap</th>
                    <th>Nomor Telepon</th>
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
                            {item.pengembalianPfk?.satker.kodeSatker || '-'}
                          </div>

                          <div className='text-muted small'>
                            {item.pengembalianPfk?.satker.namaInstansi || '-'}
                          </div>
                        </td>
                        <td>
                          <div className='fw-bold'>
                            {item.pengembalianPfk?.user.namaLengkap || '-'}
                          </div>
                        </td>
                        <td>{item.pengembalianPfk.pihakMengajukan || '-'}</td>
                        <td>{item.pengembalianPfk.kodeSatker || '-'}</td>
                        <td>{item.pengembalianPfk.noTelpon || '-'}</td>
                        <td>
                          {item.pengembalianPfk.unggahDokumen ? (
                            <a
                              href={`http://localhost:3001/uploads/${item.pengembalianPfk.unggahDokumen}`}
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
          <Modal.Title>Edit Pengembalian PFK</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='mb-3'>
            <label className='fw-bold'>Instansi:</label>
            <p className='mb-0'>
              {selectedItem?.pengembalianPfk?.satker?.namaInstansi}
            </p>
            <label className='fw-bold'>Kode Satker:</label>
            <p className='mb-0'>
              {selectedItem?.pengembalianPfk?.satker?.kodeSatker}
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
            <Form.Label className='fw-bold'>Pihak Mengajukan</Form.Label>
            <Form.Select
              value={editFields.pihakMengajukan}
              onChange={e =>
                setEditFields({
                  ...editFields,
                  pihakMengajukan: e.target.value
                })
              }
            >
              <option value=''>-- Pilih Pihak Mengajukan --</option>
              <option value='satuan_kerja'>Satuan Kerja</option>
              <option value='pemerintah_daerah'>Pemerintah Daerah</option>
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

export default MonitoringG
