import { useEffect, useState } from 'react'
import { Container, Table, Spinner, Form, Button } from 'react-bootstrap'
import axios from 'axios'

const MonitoringI = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [fileInputs, setFileInputs] = useState({})

  const fetchData = () => {
    axios
      .get('http://localhost:3000/api/monitoringPnbp/')
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
    formData.append('unggahDokumen', file)

    try {
      await axios.patch(
        `http://localhost:3000/api/pengembalianPnbp/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      fetchData()
    } catch (error) {
      console.error('Gagal Upload ulang dokumen:', error)
      alert('upload gagal')
    }
  }

  return (
    <Container className='mt-5 p-5'>
      <h2 className='text-center mb-4'>Monitoring Pengembalian PNBP</h2>

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
              data.map((item, index) => (
                <tr key={item.pengembalianPnbp?.id || index}>
                  <td>{item.pengembalianPnbp.pihakMengajukan || '-'}</td>
                  <td>{item.pengembalianPnbp.kodeSatker || '-'}</td>
                  <td>{item.pengembalianPnbp.noTelpon || '-'}</td>
                  <td>
                    {item.pengembalianPnbp.unggahDokumen ? (
                      <a
                        href={`http://localhost:3000/uploads/${item.pengembalianPnbp.unggahDokumen}`}
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
  )
}

export default MonitoringI
