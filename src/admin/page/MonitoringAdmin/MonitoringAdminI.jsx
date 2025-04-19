import { useEffect, useState } from 'react'
import { Container, Table, Spinner, Form } from 'react-bootstrap'
import axios from 'axios'

const MonitoringAdminI = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = () => {
    const token = localStorage.getItem('token') // ambil token
    axios
      .get('http://localhost:3000/api/monitoringPnbp/', {
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
        `http://localhost:3000/api/monitoringPnbp/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
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
        `http://localhost:3000/api/monitoringPnbp/${id}`,
        { catatan: newCatatan },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

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

export default MonitoringAdminI
