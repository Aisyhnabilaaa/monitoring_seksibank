import { useEffect, useState } from 'react'
import { Container, Table, Spinner, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import NavbarComponent from '../../components/NavbarComponent'
import Swal from 'sweetalert2'

const MonitoringC = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [fileInputs, setFileInputs] = useState({})
  const [searchTerm, setSearchTerm] = useState('') // 👉 State untuk pencarian
  const fetchData = () => {
    axios
      .get(
        'https://layananbank-production.up.railway.app/api/monitoringKoreksi/'
      )
      .then(response => {
        console.log(response.data) // Tambahkan log ini
        setData(response.data)
      })
      .catch(error => {
        console.error('Gagal mengambil data:', error)
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
      await axios.patch(
        `https://layananbank-production.up.railway.app/api/koreksiPenerimaan/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      fetchData()
      Swal.fire({
        title: 'Pengajuan Dokumen Berhasil Diubah!',
        icon: 'success',
        draggable: true
      })
    } catch (error) {
      console.error('Gagal Upload dokumen:', error)
      alert('Upload Gagal')
    }
  }

  // 👉 Filter data berdasarkan searchTerm
  const filteredData = data.filter(item =>
    item.koreksiPenerimaan?.kodeSatker
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <NavbarComponent />
      <Container className='mt-5 p-5'>
        <h2 className='text-center mb-4'>Monitoring Koreksi Penerimaan</h2>

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
                <th>Kode Satker</th>
                <th>Nomor Telepon</th>
                <th>Tahun Setoran</th>
                <th>Dokumen</th>
                <th>Status</th>
                <th>catatan</th>
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
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan='5' className='text-center text-muted'>
                    Tidak ada data tersedia
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.koreksiPenerimaan.kodeSatker || '-'}</td>
                    <td>{item.koreksiPenerimaan.noTelpon || '-'}</td>
                    <td>{item.koreksiPenerimaan.tahunSetoran || '-'}</td>
                    <td>
                      {item.koreksiPenerimaan?.unggahDokumen ? (
                        <a
                          href={item.koreksiPenerimaan?.unggahDokumen}
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
                      <span>{item.status || 'DIPROSES'}</span>
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
                            className='mt-2'
                            size='sm'
                            variant='primary'
                            onClick={() => handleUpload(item.id)}
                          >
                            Upload Ulang
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

export default MonitoringC
