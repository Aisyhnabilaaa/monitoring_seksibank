import { useEffect, useState } from 'react'
import { Container, Table, Spinner, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import NavbarComponent from '../../components/NavbarComponent'

const MonitoringA = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [fileInputs, setFileInputs] = useState({})

  const fetchData = () => {
    axios
      .get('http://localhost:3000/api/monitoringRetur/')
      .then(response => {
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
    formData.append('unggah_dokumen', file)

    try {
      await axios.patch(`http://localhost:3000/api/retur/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}` // Menambahkan token
        }
      })

      // Fetch data lagi setelah berhasil upload
      fetchData()
      alert('Upload berhasil!')
    } catch (error) {
      console.error('Gagal upload ulang dokumen:', error)
      alert('Upload gagal!')
    }
  }

  return (
    <diV>
      <NavbarComponent />
      <Container className='mt-5 p-5'>
        <h2 className='text-center mb-4'>Monitoring Penyelesaian Retur SP2D</h2>
        <div className='table-responsive'>
          <Table bordered hover>
            <thead className='table-light'>
              <tr>
                <th>Kode Satker</th>
                <th>Nomor Telepon</th>
                <th>Alasan Retur</th>
                <th>Alasan Lainnya</th>
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
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan='7' className='text-center text-muted'>
                    Tidak ada data tersedia
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={item.returSp2d?.id || index}>
                    <td>{item.returSp2d.kodeSatker || '-'}</td>
                    <td>{item.returSp2d.noTelpon || '-'}</td>
                    <td>{item.returSp2d.alasanRetur || '-'}</td>
                    <td>{item.returSp2d.alasanLainnya || '-'}</td>
                    <td>
                      {item.returSp2d.unggah_dokumen ? (
                        <a
                          href={item.returSp2d.unggah_dokumen}
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
    </diV>
  )
}

export default MonitoringA
