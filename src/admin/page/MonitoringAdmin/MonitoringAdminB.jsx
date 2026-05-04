import { useEffect, useState } from 'react'
import { Container, Table, Spinner, Form, Badge } from 'react-bootstrap'
import Swal from 'sweetalert2'
import api from '../../../api'

const MonitoringAdminB = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const ASSETS_URL = 'http://localhost:3001/uploads'

  const fetchData = () => {
    const token = localStorage.getItem('token')
    setLoading(true)
    api
      .get('/monitoringNota/', {
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
        `/monitoringNota/${id}`,
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
        `/monitoringNota/${id}`,
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
    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token')
        await api.delete(`/monitoringNota/${id}`, {
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
        Swal.fire('Error', 'Gagal menghapus data', 'error')
      }
    }
  }

  const filteredData = data.filter(item => {
    const kode = item.penerbitanNota?.kodeSatker || ''
    return kode.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <Container className='p-5'>
      <h2 className='text-center mb-4 fw-bold'>Monitoring Penerbitan Nota</h2>
      <Form.Group className='mb-4'>
        <Form.Label className='fw-bold'>Cari Kode Satker</Form.Label>
        <Form.Control
          type='text'
          placeholder='Masukkan kode satker atau nama instansi...'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ border: '2px solid #ced4da', borderRadius: '5px' }}
        />
      </Form.Group>

      <div className='table-responsive shadow-sm rounded'>
        <Table bordered hover striped vertical-align='middle'>
          <thead className='table-light'>
            <tr className='text-center'>
              <th>Kode Satker</th>
              <th>Nama Instansi</th>
              <th>Nama Lengkap</th>
              <th>Nomor Telepon</th>
              <th>Tahun Setoran</th>
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
                <td colSpan='6' className='text-center'>
                  <Spinner animation='border' variant='primary' />
                  <p className='mt-2'>Memuat data...</p>
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan='6' className='text-center text-muted p-4'>
                  Tidak ada data tersedia
                </td>
              </tr>
            ) : (
              filteredData.map(item => (
                <tr key={item.id}>
                  <td className='text-center font-monospace'>
                    {item.penerbitanNota?.satker.kodeSatker || '-'}
                  </td>
                  <td className='text-center'>
                    {item.penerbitanNota?.satker.namaInstansi || '-'}
                  </td>
                  <td className='text-center'>
                    {item.penerbitanNota?.user.namaLengkap || '-'}
                  </td>
                  <td>{item.penerbitanNota.noTelpon || '-'}</td>
                  <td>{item.penerbitanNota.tahunSetoran || '-'}</td>

                  <td>
                    {item.penerbitanNota.unggahDokumen ? (
                      <a
                        href={`${ASSETS_URL}/${item.penerbitanNota.unggahDokumen}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='btn btn-outline-primary btn-sm'
                      >
                        Lihat Dokumen
                      </a>
                    ) : (
                      <span className='text-danger text-muted'>
                        Tidak ada file
                      </span>
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
                          : ''
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
                    <td>
                      <button
                        className='btn btn-danger btn-sm'
                        onClick={() => handleDelete(item.id)}
                      >
                        Hapus
                      </button>
                    </td>
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

export default MonitoringAdminB
