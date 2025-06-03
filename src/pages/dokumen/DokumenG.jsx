import { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import NavbarComponent from '../../components/NavbarComponent'

const DokumenG = () => {
  const [values, setValues] = useState({
    kode: '',
    pihak: '',
    unggah: null
  })

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

    const formData = new FormData()
    formData.append('kodeSatker', values.kode)
    formData.append('pihakMengajukan', values.pihak)
    formData.append(
      'noTelpon',
      selectedOption === 'tidak' ? phoneNumber : 'Tergabung Telegram'
    )
    if (values.unggah) {
      formData.append('unggahDokumen', values.unggah)
    }

    try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('Token tidak ditemukan.')

      const response = await fetch(
        'https://layananbank-production.up.railway.app/api/pengembalianPfk/create',
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
      console.error(err)
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
      <header className='header-dokumen'>
        <Container fluid>
          <Row className='dokumenheader-box d-flex align-items-center justify-content-center'>
            <Col
              xs={12}
              md={6}
              className='text-center text-md-start d-flex flex-column justify-content-center'
            >
              <div className='dokumenheader-title-container'>
                <h1 className='dokumenheader-title'>Pengembalian PFK</h1>
              </div>
            </Col>
          </Row>
        </Container>
      </header>

      <Container>
        <Row className='justify-content-center mt-4'>
          <Col md={8} lg={10}>
            <Form onSubmit={handleSubmit} className='formulir'>
              {/* Jenis Laporan */}
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm={4}>
                  Pihak Mengajukan
                </Form.Label>
                <Col sm={8}>
                  <Form.Select
                    name='pihak'
                    onChange={handleChanges}
                    required
                    value={values.pihak}
                  >
                    <option value=''>Pilih Pihak Yang Mengajukan</option>
                    <option value='satuan_kerja'>Satuan Kerja</option>
                    <option value='pemerintah_daerah'>Pemerintah Daerah</option>
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm={4}>
                  Kode Satker / Nama Pemda
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type='text'
                    name='kode'
                    placeholder='Masukkan Kode Satker / Nama Pemda'
                    onChange={handleChanges}
                    required
                    value={values.kode}
                  />
                </Col>
              </Form.Group>

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

              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm={4}>
                  Unggah Dokumen Persyaratan
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type='file'
                    name='unggah'
                    onChange={handleChanges}
                    required
                  />
                  <p className='fs-6 text-warning'>
                    Harap jadikan dokumen persyaratan menjadi satu dokumen PDF
                  </p>
                </Col>
              </Form.Group>

              {errorMessage && <p className='text-danger'>{errorMessage}</p>}

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

export default DokumenG
