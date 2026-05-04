import { useEffect, useState } from 'react'
import { Container, Table, Spinner, Form, Button, Badge } from 'react-bootstrap'
import api from '../../api'
import NavbarComponent from '../../components/NavbarComponent'
import Swal from 'sweetalert2'

const MonitoringI = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [fileInputs, setFileInputs] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const fetchData = () => {
    setLoading(true)
    api
      .get('/monitoringPnbp/')
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

  const handleFileChange = (id, file) => {
    setFileInputs(prev => ({
      ...prev,
      [id]: file
    }))
  }

  const handleUpload = async id => {
    const file = fileInputs[id]
    if (!file) return

    const formData = new FormData()
    formData.append('unggahDokumen', file)

    try {
      await api.patch(
        `http://localhost:3000/api/pengembalianPnbp/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      Swal.fire('Berhasil', 'Dokumen diupdate!', 'success')
      setFileInputs(prev => ({ ...prev, [id]: null }))
      fetchData()
    } catch (error) {
      console.error('Gagal Upload ulang dokumen:', error)
      Swal.fire('Gagal', 'Terjadi kesalahan server', 'error')
    }
  }

  const filteredData = data.filter(item => {
    const kode = item.pengembalianPnbp?.satker?.kodeSatker || ''
    const instansi = item.pengembalianPnbp?.satker?.namaInstansi || ''
    return (
      kode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instansi.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div>
      <NavbarComponent />
      <Container className='mt-5 p-5'>
        <h2 className='text-center mb-4'>Monitoring Pengembalian PNBP</h2>
        <div className='cariKode'>
          {/* 👉 Input search */}
          <Form.Group className='mb-3'>
            <Form.Label>Cari Kode Satker</Form.Label>
            <Form.Control
              type='text'
              placeholder='Masukkan kode satker...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ border: '2px solid #000000', borderRadius: '5px' }}
            />
          </Form.Group>
        </div>
        <div className='table-responsive'>
          <Table bordered hover>
            <thead className='table-light'>
              <tr>
                <th>Pihak Mengajukan</th>
                <th>Kode Satker</th>
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
                  <td colSpan='7' className='text-center'>
                    <Spinner animation='border' variant='primary' />
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan='7' className='text-center text-muted'>
                    Tidak ada data tersedia
                  </td>
                </tr>
              ) : (
                filteredData.map(item => (
                  <tr key={item.id}>
                    <td>{item.pengembalianPnbp.pihakMengajukan || '-'}</td>
                    <td>{item.pengembalianPnbp.kodeSatker || '-'}</td>
                    <td>{item.pengembalianPnbp.noTelpon || '-'}</td>
                    <td>
                      {item.pengembalianPnbp.unggahDokumen ? (
                        <a
                          href={`http://localhost:3001/uploads/${item.pengembalianPnbp.unggahDokumen}`}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          Lihat Dokumen
                        </a>
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

                    <td>{item.catatan || '-'}</td>

                    <td>
                      {item.status === 'DITOLAK' && (
                        <div>
                          <Form.Control
                            type='file'
                            accept='.pdf,.jpg,.png'
                            onChange={e =>
                              handleFileChange(item.id, e.target.files[0])
                            }
                          />
                          <Button
                            size='sm'
                            className='mt-1 w-100'
                            onClick={() => handleUpload(item.id)}
                            disabled={!fileInputs[item.id]}
                          >
                            Kirim Ulang
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  )
}

export default MonitoringI
