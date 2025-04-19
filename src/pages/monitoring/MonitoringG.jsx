import { useEffect, useState } from 'react'
import { Container, Table, Spinner } from 'react-bootstrap'
import axios from 'axios'

const MonitoringG = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')
  const fetchData = () => {
    axios
      .get('http://localhost:3000/api/monitoringPfk/', {
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
  })
  return (
    <Container className='mt-5 p-5'>
      <h2 className='text-center mb-4'>Pengembalian PFK</h2>

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
                <tr key={index}>
                  <td>{item.pengembalianPfk.pihakMengajukan || '-'}</td>
                  <td>{item.pengembalianPfk.kodeSatker || '-'}</td>
                  <td>{item.pengembalianPfk.noTelpon || '-'}</td>
                  <td>
                    {item.pengembalianPfk.unggahDokumen ? (
                      <a
                        href={`http://localhost:3000/uploads/${item.pengembalianPfk.unggahDokumen}`}
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
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  )
}

export default MonitoringG
