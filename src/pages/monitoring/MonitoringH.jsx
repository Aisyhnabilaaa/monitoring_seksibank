import { useEffect, useState } from 'react'
import { Container, Table, Spinner } from 'react-bootstrap'
import axios from 'axios'

const MonitoringH = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')
  const fetchData = () => {
    axios
      .get('http://localhost:3000/api/monitoringPenerbitanBukti/', {
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
      <h2 className='text-center mb-4'>Monitoring Penerbitan Bukti Negara</h2>

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
                  <td>{item.penerbitanBukti.kodeSatker || '-'}</td>
                  <td>{item.penerbitanBukti.noTelpon || '-'}</td>
                  <td>{item.penerbitanBukti.alasanRetur || '-'}</td>
                  <td>
                    {item.penerbitanBukti.unggah_dokumen ? (
                      <a
                        href={`http://localhost:3000/uploads/${item.penerbitanBukti.unggah_dokumen}`}
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

export default MonitoringH
