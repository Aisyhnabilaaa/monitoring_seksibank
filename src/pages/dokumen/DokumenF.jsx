import { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import api from '../../api'
import NavbarComponent from '../../components/NavbarComponent'

const DokumenF = () => {
  const [values, setValues] = useState({
    unggah: null
  })
  const [isLoading, setIsLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState('') // Iya / tidak
  const [phoneNumber, setPhoneNumber] = useState('') // Kalau pilih "tidak"
  const [errorMessage, setErrorMessage] = useState('')

  const handleChanges = e => {
    const { name, value, type, files } = e.target

    if (name === 'subject') {
      setSelectedOption(value)
    } else {
      setValues(prev => ({
        ...prev,
        [name]: type === 'file' ? (files.length > 0 ? files[0] : null) : value
      }))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (selectedOption === 'tidak' && !phoneNumber) {
      setErrorMessage('Nomor telepon harus diisi jika memilih "Tidak" Telegram')
      return
    }

    setErrorMessage('')
    setIsLoading(true)

    const formData = new FormData()
    formData.append('kodeSatker', values.kode)
    formData.append(
      'noTelpon',
      selectedOption === 'tidak' ? phoneNumber : 'Tergabung Telegram'
    )
    formData.append('jenisLaporan', values.laporan)
    if (values.unggah) {
      formData.append('unggahDokumen', values.unggah)
    }
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
      const token = localStorage.getItem('token') // jika pakai autentikasi
      await api.post('/laporanRekening/create', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      Swal.fire({
        title: 'Pengajuan Dokumen Berhasil!',
        icon: 'success',
        draggable: true
      })
      setValues({ unggah: null, contact: '', kode: '' })
      setPhoneNumber('')
      setSelectedOption('')
      e.target.reset()
    } catch (err) {
      setErrorMessage(`Terjadi kesalahan: ${err.message}`)
      console.error(err)
      Swal.fire({
        title: 'Gagal Mengirim Dokumen!',
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
                  Permohonan Persetujuan Pembukaan Rekening Satker
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
                  Nomor Telepon
                </Form.Label>
                <Col sm={8}>
                  <p>Apakah Anda tergabung dengan Telegram KPPN Palu?</p>
                  <Form.Check
                    type='radio'
                    label='Iya'
                    name='subject'
                    value='iya'
                    onChange={handleChanges}
                    checked={selectedOption === 'iya'}
                    required
                  />
                  <Form.Check
                    type='radio'
                    label='Tidak'
                    name='subject'
                    value='tidak'
                    onChange={handleChanges}
                    checked={selectedOption === 'tidak'}
                  />
                  {selectedOption === 'tidak' && (
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

              {/* Jenis Laporan */}
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm={4}>
                  Jenis Laporan
                </Form.Label>
                <Col sm={8}>
                  <Form.Select
                    name='laporan'
                    onChange={handleChanges}
                    required
                    value={values.laporan}
                  >
                    <option value=''>Pilih Jenis Laporan</option>
                    <option value='LAPORAN_PEMBUKAAN_REKENING'>
                      Laporan Pembukaan Rekening
                    </option>
                    <option value='LAPORAN_PENTUPUAN_REKENING'>
                      Laporan Penutupan Rekening
                    </option>
                  </Form.Select>
                </Col>
              </Form.Group>

              {/* Upload */}
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm={4}>
                  Unggah Dokumen Persyaratan
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type='file'
                    name='unggah'
                    accept='.pdf,.txt'
                    onChange={handleChanges}
                    required
                  />
                  <p className='fs-6 text-warning text-justify'>
                    Silahkan Unggah Dokumen kelengkapan dalam format .pdf dan
                    ADK dalam Format .txt
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
                  {isLoading ? (
                    <>
                      <span
                        className='spinner-border spinner-border-sm me-2'
                        role='status'
                        aria-hidden='true'
                      ></span>
                      Kirim...
                    </>
                  ) : (
                    'Kirim'
                  )}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default DokumenF
