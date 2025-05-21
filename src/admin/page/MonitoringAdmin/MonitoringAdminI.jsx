import { useEffect, useState } from 'react'
import { Container, Table, Spinner, Form } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'

const MonitoringAdminI = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const fetchData = () => {
    const token = localStorage.getItem('token')
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

  const handleDelete = async id => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data akan dihapus permanen!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    })
    if (result.confirmDelete) return

    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:3000/api/monitoringKoreksi/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      // Hapus data dari state
      setData(prevData => prevData.filter(item => item.id !== id))

      Swal.fire({
        title: 'Monitoring Berhasil Dihapus',
        icon: 'success'
      })
    } catch (error) {
      console.error('Gagal menghapus data:', error)
      alert(error.response?.data?.message || 'Gagal menghapus data')
    }
  }

  const filteredData = data.filter(item =>
    item.pengembalianPnbp?.kodeSatker
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  return (
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
              <th>Aksi</th>
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
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.pengembalianPnbp.pihakMengajukan || '-'}</td>
                  <td>{item.pengembalianPnbp.kodeSatker || '-'}</td>
                  <td>{item.pengembalianPnbp.noTelpon || '-'}</td>
                  <td>
                    {item.pengembalianPnbp.unggahDokumen ? (
                      <a
                        href={item.pengembalianPnbp.unggahDokumen}
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
                  <td>
                    <button
                      className='btn btn-danger btn-sm'
                      onClick={() => handleDelete(item.id)}
                    >
                      Hapus
                    </button>
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
