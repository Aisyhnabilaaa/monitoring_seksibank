import { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import NavbarComponent from '../../components/NavbarComponent'

const DokumenD = () => {
  const [values, setValues] = useState({
    kode: '',
    contact: '',
    unggah: null
  })

  const [telegramOption, setTelegramOption] = useState('') // Iya/Tidak
  const [phoneNumber, setPhoneNumber] = useState('') // Nomor jika Tidak
  const [errorMessage, setErrorMessage] = useState('')

  const handleChanges = e => {
    const { name, value, type, files } = e.target

    if (name === 'telegram') {
      setTelegramOption(value)
    } else {
      setValues(prev => ({
        ...prev,
        [name]: type === 'file' ? (files.length > 0 ? files[0] : null) : value
      }))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (telegramOption === 'tidak' && !phoneNumber) {
      setErrorMessage('Nomor telepon harus diisi jika memilih "Tidak" Telegram')
      return
    }

    setErrorMessage('')

    const formData = new FormData()
    formData.append('kodeSatker', values.kode)
    formData.append(
      'noTelpon',
      telegramOption === 'tidak' ? phoneNumber : 'Tergabung Telegram'
    )
    formData.append('alasanVoid', values.contact)
    if (values.unggah) {
      formData.append('unggahDokumen', values.unggah)
    }

    try {
      const token = localStorage.getItem('token') // Kalau pakai auth
      if (!token)
        throw new Error('Token tidak ditemukan. Silakan login kembali.')

      const response = await fetch(
        'https://layananbank-production.up.railway.app/api/pengajuanVoid/create',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        }
      )

      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Gagal mengirim data')
      Swal.fire({
        title: 'Pengajuan Dokumen Berhasil!',
        icon: 'success',
        draggable: true
      })
    } catch (err) {
      setErrorMessage(`Terjadi kesalahan: ${err.message}`)
      Swal.fire({
        title: 'Gagal Mengirim Dokumen!',
        icon: 'warning',
        draggable: true
      })
    }
  }

  return (
    <div>
      <NavbarComponent />
      {/* Header */}
      <header className='header-dokumen'>
        <Container fluid>
          <Row className='dokumenheader-box d-flex align-items-center justify-content-center'>
            <Col
              xs={12}
              md={6}
              className='text-center text-md-start d-flex flex-column justify-content-center'
            >
              <div className='dokumenheader-title-container'>
                <h1 className='dokumenheader-title'>Void SP2D</h1>
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
              {/* Kode Satker */}
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm={4}>
                  Kode Satker
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type='text'
                    name='kode'
                    placeholder='Masukkan Kode Satker'
                    onChange={handleChanges}
                    required
                    value={values.kode}
                  />
                </Col>
              </Form.Group>

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
                    value='iya'
                    onChange={handleChanges}
                    checked={telegramOption === 'iya'}
                    required
                  />
                  <Form.Check
                    type='radio'
                    label='Tidak'
                    name='telegram'
                    value='tidak'
                    onChange={handleChanges}
                    checked={telegramOption === 'tidak'}
                  />
                  {telegramOption === 'tidak' && (
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

              {/* Alasan Void */}
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm={4}>
                  Alasan Void
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type='text'
                    name='contact'
                    placeholder='Masukkan Alasan Void'
                    onChange={handleChanges}
                    required
                    value={values.contact}
                  />
                </Col>
              </Form.Group>

              {/* Unggah Dokumen */}
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm={4}>
                  Unggah Dokumen Persyaratan
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type='file'
                    name='unggah'
                    accept='.pdf'
                    onChange={handleChanges}
                    required
                  />
                  <p className='fs-6 text-warning text-justify'>
                    Harap jadikan dokumen persyaratan menjadi satu dokumen PDF
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
                <Button type='submit' variant='primary'>
                  Kirim
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default DokumenD
