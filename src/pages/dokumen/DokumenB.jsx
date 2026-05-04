import { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import NavbarComponent from '../../components/NavbarComponent'

const DokumenB = () => {
  const [values, setValues] = useState({
    unggah: null
  })

  const [isLoading, setIsLoading] = useState(false)
  const [selectedReason, setSelectedReason] = useState('') // Tahun Setoran
  const [customReason, setCustomReason] = useState('') // Tahun Lainnya
  const [phoneOption, setPhoneOption] = useState('') // Iya / Tidak
  const [phoneNumber, setPhoneNumber] = useState('') // Nomor jika "Tidak"
  const [errorMessage, setErrorMessage] = useState('')

  const handleChanges = e => {
    const { name, value, type, files } = e.target

    if (name === 'tahunSetoran') {
      setSelectedReason(value)
    } else if (name === 'telegram') {
      setPhoneOption(value)
    } else {
      setValues(prev => ({
        ...prev,
        [name]: type === 'file' ? (files.length > 0 ? files[0] : null) : value
      }))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (phoneOption === 'Tidak' && !phoneNumber) {
      setErrorMessage(
        'Nomor telepon harus diisi jika Anda memilih "Tidak" untuk Telegram'
      )
      return
    } else {
      setErrorMessage('')
    }

    const formData = new FormData()
    formData.append(
      'noTelpon',
      phoneOption === 'Tidak' ? phoneNumber : 'Tergabung Telegram'
    )
    // Data Tahun Setoran
    formData.append(
      'tahunSetoran',
      selectedReason === 'lainnya' ? customReason : selectedReason
    )
    if (values.unggah) {
      formData.append('unggahDokumen', values.unggah)
    }

    setIsLoading(true)
    Swal.fire({
      title: 'Mohon Tunggu',
      text: 'Sedang memproses dokumen ',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    try {
      const token = localStorage.getItem('token')
      await axios.post('http://localhost:3001/api/nota/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })

      Swal.fire({
        title: 'Pengajuan Dokumen Berhasil!',
        icon: 'success',
        draggable: true
      })
      setValues({ unggah: null })
      setPhoneNumber('')
      setSelectedReason('')
      setPhoneOption('')
      setCustomReason('')
      e.target.reset()
    } catch (err) {
      setErrorMessage(`Terjadi kesalahan: ${err.message}`)
      Swal.fire({
        title: 'Gagal Mengirim Dokumen!',
        text: err.response?.data?.message || err.message,
        icon: 'warning',
        draggable: true
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <NavbarComponent />
      <header className='header-dokumen'>
        <Container fluid>
          <Row className='dokumenheader-box d-flex align-items-center justify-content-center'>
            <Col
              xs={12}
              md={6}
              className='text-center text-md-start d-flex flex-column justify-content-center'
            >
              <div className='dokumenheader-title-container'>
                <h1 className='dokumenheader-title'>
                  Pengajuan Penerbitan Nota Konfirmasi atas Penerimaan Negara
                </h1>
              </div>
            </Col>
          </Row>
        </Container>
      </header>

      {/* Form */}
      <Container>
        <Row className='justify-content-center mt-4'>
          <Col md={8} lg={10}>
            <Form onSubmit={handleSubmit} className='formulir'>
              {/* Telegram */}
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm={4}>
                  Tergabung Telegram KPPN Palu?
                </Form.Label>
                <Col sm={8}>
                  <Form.Check
                    type='radio'
                    label='Iya'
                    name='telegram'
                    value='Iya'
                    onChange={handleChanges}
                    checked={phoneOption === 'Iya'}
                    required
                  />
                  <Form.Check
                    type='radio'
                    label='Tidak'
                    name='telegram'
                    value='Tidak'
                    onChange={handleChanges}
                    checked={phoneOption === 'Tidak'}
                  />
                  {phoneOption === 'Tidak' && (
                    <Form.Control
                      type='text'
                      placeholder='Masukkan Nomor Telepon Anda'
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      className='mt-2'
                      required
                    />
                  )}
                </Col>
              </Form.Group>

              {/* Tahun Setoran */}
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm={4}>
                  Tahun Setoran
                </Form.Label>
                <Col sm={8}>
                  <Form.Check
                    type='radio'
                    label='2024'
                    name='tahunSetoran'
                    value='2024'
                    onChange={handleChanges}
                    checked={selectedReason === '2024'}
                    required
                  />
                  <Form.Check
                    type='radio'
                    label='2025'
                    name='tahunSetoran'
                    value='2025'
                    onChange={handleChanges}
                    checked={selectedReason === '2025'}
                  />
                  <Form.Check
                    type='radio'
                    label='Yang Lainnya'
                    name='tahunSetoran'
                    value='lainnya'
                    onChange={handleChanges}
                    checked={selectedReason === 'lainnya'}
                  />
                  {selectedReason === 'lainnya' && (
                    <Form.Control
                      type='text'
                      placeholder='Masukkan Tahun Lainnya'
                      value={customReason}
                      onChange={e => setCustomReason(e.target.value)}
                      className='mt-2'
                      required
                    />
                  )}
                </Col>
              </Form.Group>

              {/* Unggah Dokumen */}
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm={4}>
                  Unggah Dokumen
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type='file'
                    name='unggah'
                    accept='.pdf,.txt'
                    onChange={handleChanges}
                    required
                  />
                  <p className='fs-6 text-warning'>
                    Silahkan Unggah Dokumen kelengkapan (.pdf) dan ADK (.txt)
                  </p>
                </Col>
              </Form.Group>

              {/* Error Message */}
              {errorMessage && (
                <div className='alert alert-danger' role='alert'>
                  {errorMessage}
                </div>
              )}

              {/* Submit */}
              <div className='text-end'>
                <Button type='submit' variant='primary' disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Kirim'}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default DokumenB
