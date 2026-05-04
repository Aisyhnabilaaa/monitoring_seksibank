import { useEffect, useState } from 'react'
import {
  Container,
  Table,
  Spinner,
  Form,
  Button,
  Badge,
  Card
} from 'react-bootstrap'
import Swal from 'sweetalert2'
import api from '../../../api'

const MonitoringAdminA = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const ASSETS_URL = 'http://localhost:3001/uploads'

  const fetchData = () => {
    const token = localStorage.getItem('token')
    setLoading(true)
    api
      .get('/monitoringRetur/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log('Data diterima:', response.data)
        const result = Array.isArray(response.data)
          ? response.data
          : response.data.data || [response.data]
        setData(result)
      })
      .catch(error => {
        console.error('Gagal mengambil data:', error)
        if (error.response?.status === 403) {
          Swal.fire(
            'Akses Ditolak',
            'Token expired atau Anda bukan Admin',
            'error'
          )
        }
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
      await api.patch(
        `/monitoringRetur/${id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      setData(prevData =>
        prevData.map(item =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      )

      Swal.fire({
        icon: 'success',
        title: 'Status Berhasil Diperbarui',
        timer: 1500,
        showConfirmButton: false
      })
    } catch (error) {
      console.error('Gagal update status:', error)
      Swal.fire('Error', 'Gagal memperbarui status', 'error')
    }
  }

  const handleCatatanChange = async (id, newCatatan) => {
    try {
      const token = localStorage.getItem('token')
      await api.patch(
        `/monitoringRetur/${id}`,
        { catatan: newCatatan },
        {
          headers: { Authorization: `Bearer ${token}` }
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

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token')
        await api.delete(`/monitoringRetur/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setData(prevData => prevData.filter(item => item.id !== id))
        Swal.fire('Terhapus!', 'Data berhasil dihapus.', 'success')
      } catch (error) {
        console.error('Gagal menghapus data:', error)
        Swal.fire('Error', 'Gagal menghapus data', 'error')
      }
    }
  }

  const filteredData = data.filter(item => {
    const kode = item.returSp2d?.satker?.kodeSatker || ''
    const instansi = item.returSp2d?.satker?.namaInstansi || ''
    return (
      kode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instansi.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <Container className='p-5'>
      <h2 className='text-center mb-4 fw-bold'>
        Monitoring Penyelesaian Retur SP2D
      </h2>

      <Form.Group className='mb-4'>
        <Form.Label className='fw-bold'>Cari Satker / Instansi</Form.Label>
        <Form.Control
          type='text'
          placeholder='Masukkan kode satker atau nama instansi...'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ border: '2px solid #ced4da', borderRadius: '8px' }}
        />
      </Form.Group>

      <Card className='table-responsive rounded-2'>
        <Table bordered hover striped vertical-align='middle'>
          <thead className='table-light'>
            <tr className='text-center'>
              <th>Kode Satker</th>
              <th>Nama Instansi</th>
              <th>Nama Lengkap</th>
              <th>Alasan Retur</th>
              <th>Daftar Syarat Dokumen Yang Dikirimkan</th>
              <th>Dokumen</th>
              <th style={{ width: '150px' }}>Status</th>
              <th style={{ width: '200px' }}>Catatan Admin</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan='8' className='text-center p-5'>
                  <Spinner animation='border' variant='primary' />
                  <p className='mt-2'>Memuat data...</p>
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan='8' className='text-center text-muted p-4'>
                  Tidak ada data yang tersedia.
                </td>
              </tr>
            ) : (
              filteredData.map(item => (
                <tr key={item.id}>
                  <td className='text-center font-monospace'>
                    {item.returSp2d?.satker?.kodeSatker || '-'}
                  </td>
                  <td>{item.returSp2d?.satker?.namaInstansi || '-'}</td>
                  <td>{item.returSp2d?.user?.namaLengkap || '-'}</td>
                  <td className='small'>
                    {item.returSp2d?.alasanRetur === 'LAINNYA'
                      ? item.returSp2d?.alasanLainnya
                      : item.returSp2d?.alasanRetur?.replace(/_/g, ' ') || '-'}
                  </td>
                  <td>
                    {item.checklistKmp ? (
                      <div className='d-flex flex-wrap gap-1'>
                        {Object.entries(item.checklistKmp).map(
                          ([key, value]) =>
                            value === true && (
                              <Badge
                                key={key}
                                bg='success'
                                style={{
                                  fontSize: '10px',
                                  textTransform: 'capitalize'
                                }}
                              >
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </Badge>
                            )
                        )}
                      </div>
                    ) : (
                      <span className='text-muted small italic'>-</span>
                    )}
                  </td>

                  <td className='text-center'>
                    {item.returSp2d?.unggah_dokumen ? (
                      <a
                        href={`${ASSETS_URL}/${item.returSp2d.unggah_dokumen}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='btn btn-outline-primary btn-sm'
                      >
                        Lihat Dokumen
                      </a>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    <Form.Select
                      size='sm'
                      value={item.status || 'DIPROSES'}
                      onChange={e =>
                        handleStatusChange(item.id, e.target.value)
                      }
                      className={
                        item.status === 'SELESAI'
                          ? 'text-success fw-bold'
                          : item.status === 'DITOLAK'
                          ? 'text-danger fw-bold'
                          : 'text-primary'
                      }
                    >
                      <option value='DIPROSES'>DIPROSES</option>
                      <option value='SELESAI'>SELESAI</option>
                      <option value='DITOLAK'>DITOLAK</option>
                    </Form.Select>
                  </td>

                  <td>
                    <Form.Control
                      as='textarea'
                      rows={2}
                      size='sm'
                      placeholder='Catatan...'
                      value={item.catatan || ''}
                      onChange={e =>
                        handleCatatanChange(item.id, e.target.value)
                      }
                    />
                  </td>
                  <td className='text-center'>
                    <Button
                      variant='danger'
                      size='sm'
                      onClick={() => handleDelete(item.id)}
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
  )
}

export default MonitoringAdminA
