import { useEffect, useState } from 'react'
import { Container, Table, Spinner, Form } from 'react-bootstrap'
import axios from 'axios'

const MonitoringAdminA = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = () => {
    const token = localStorage.getItem('token') // ambil token
    axios
    axios
      .get('http://localhost:3000/api/monitoringRetur/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
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

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token')
      await axios.patch(
        `http://localhost:3000/api/monitoringRetur/${id}`,
        {
          status: newStatus
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      // Update status secara langsung pada data yang ada di state
      setData(prevData =>
        prevData.map(item =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      )
    } catch (error) {
      console.error('Gagal update status:', error)
    }
  }

  const handleCatatanChange = async (id, newCatatan) => {
    try {
      const token = localStorage.getItem('token')
      await axios.patch(
        `http://localhost:3000/api/monitoringRetur/${id}`,
        {
          catatan: newCatatan
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      // Update catatan secara langsung pada data yang ada di state
      setData(prevData =>
        prevData.map(item =>
          item.id === id ? { ...item, catatan: newCatatan } : item
        )
      )
    } catch (error) {
      console.error('Gagal update catatan:', error)
    }
  }

  return (
    <Container className='mt-5 p-5'>
      <h2 className='text-center mb-4'>Monitoring Penyelesaian Retur SP2D</h2>

      <div className='table-responsive'>
        <Table bordered hover>
          <thead className='table-light'>
            <tr>
              <th>Kode Satker</th>
              <th>Nomor Telepon</th>
              <th>Alasan Retur</th>
              <th>Dokumen</th>
              <th>Status</th>
              <th>Catatan</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan='6' className='text-center'>
                  <Spinner animation='border' variant='primary' />
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan='6' className='text-center text-muted'>
                  Tidak ada data tersedia
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.returSp2d.kodeSatker || '-'}</td>
                  <td>{item.returSp2d.noTelpon || '-'}</td>
                  <td>{item.returSp2d.alasanRetur || '-'}</td>
                  <td>
                    {item.returSp2d.unggah_dokumen ? (
                      <a
                        href={`http://localhost:3000/uploads/${item.returSp2d.unggah_dokumen}`}
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
                    <Form.Select
                      value={item.status || 'DIPROSES'}
                      onChange={e =>
                        handleStatusChange(item.id, e.target.value)
                      }
                    >
                      <option value='DIPROSES'>Diproses</option>
                      <option value='SELESAI'>Selesai</option>
                      <option value='DITOLAK'>Ditolak</option>
                    </Form.Select>
                  </td>
                  <td>
                    <Form.Control
                      as='textarea'
                      rows={3}
                      value={item.catatan || ''}
                      onChange={e =>
                        handleCatatanChange(item.id, e.target.value)
                      }
                    />
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

export default MonitoringAdminA
