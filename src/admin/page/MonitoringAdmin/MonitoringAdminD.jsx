import { useEffect, useState } from 'react'
import { Container, Table, Spinner, Form, Badge } from 'react-bootstrap'
import api from '../../../api'
import Swal from 'sweetalert2'

const MonitoringAdminD = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const ASSETS_URL = 'http://localhost:3001/uploads'
  const fetchData = () => {
    const token = localStorage.getItem('token')
    setLoading(true)
    api
      .get('/monitoringVoid/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log('Data diterima:', response.data)
        const result = Array.isArray(response.data)
          ? response.data
          : [response.data]
        setData(result)
      })
      .catch(error => {
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
        `/monitoringVoid/${id}`,
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
        `/monitoringVoid/${id}`,
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
      await api.delete(`/monitoringVoid/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
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

  const filteredData = data.filter(item => {
    const kode = item.pengajuanVoid?.kodeSatker || ''
    const instansi = item.pengajuanVoid?.satker?.namaInstansi || ''
    return (
      kode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instansi.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })
  return (
    <Container className='mt-5 p-5'>
      <h2 className='text-center mb-4'>Monitoring Pengajuan Void</h2>
      <div className='cariKode'>
        <Form.Group className='mb-4'>
          <Form.Label>Cari Kode Satker</Form.Label>
          <Form.Control
            type='text'
            placeholder='Masukkan kode satker...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ border: '2px solid #ced4da', borderRadius: '5px' }}
          />
        </Form.Group>
      </div>
      <div className='table-responsive'>
        <Table bordered hover>
          <thead className='table-light'>
            <tr>
              <th>Kode Satker</th>
              <th>Nama Instansi</th>
              <th>Nama Lengkap</th>
              <th>Nomor Telepon</th>
              <th>Alasan Pengajuan Void</th>
              <th>Dokumen</th>
              <th style={{ width: '150px' }}>Status</th>
              <th style={{ width: '200px' }}>Catatan</th>
              <th>Daftar Syarat Dokumen Yang Dikirimkan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan='8' className='text-center'>
                  <Spinner animation='border' variant='primary' />
                  <p className='mt-2'>Memuat data...</p>
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan='8' className='text-center text-muted'>
                  Tidak ada data tersedia
                </td>
              </tr>
            ) : (
              filteredData.map(item => (
                <tr key={item.id}>
                  <td className='text-center'>
                    {item.pengajuanVoid?.satker?.kodeSatker || '-'}
                  </td>
                  <td>{item.pengajuanVoid?.satker?.namaInstansi || '-'}</td>
                  <td>{item.pengajuanVoid.user?.namaLengkap || '-'}</td>
                  <td>{item.pengajuanVoid.noTelpon || '-'}</td>
                  <td>{item.pengajuanVoid.alasanVoid || '-'}</td>
                  <td>
                    {item.pengajuanVoid.unggahDokumen ? (
                      <a
                        href={`${ASSETS_URL}/${item.pengajuanVoid.unggahDokumen}`}
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
                      <option value='DIPROSES'>Diproses</option>
                      <option value='SELESAI'>Selesai</option>
                      <option value='DITOLAK'>Ditolak</option>
                    </Form.Select>
                  </td>
                  <td>
                    <Form.Control
                      as='textarea'
                      rows={2}
                      value={item.catatan || ''}
                      onChange={e =>
                        handleCatatanChange(item.id, e.target.value)
                      }
                    />
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

export default MonitoringAdminD
