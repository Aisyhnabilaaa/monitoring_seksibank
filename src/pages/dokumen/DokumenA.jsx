import { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'

const DokumenA = () => {
  const [values, setValues] = useState({
    kode: '',
    unggah: null
  })

  const [telegramGroup, setTelegramGroup] = useState('') // Untuk radio Telegram
  const [phoneNumber, setPhoneNumber] = useState('') // Nomor telepon jika "tidak"
  const [selectedReason, setSelectedReason] = useState('') // Untuk alasan retur
  const [customReason, setCustomReason] = useState('') // Alasan retur lainnya

  const handleChanges = e => {
    const { name, type, files, value } = e.target

    setValues({
      ...values,
      [name]: type === 'file' ? (files.length > 0 ? files[0] : null) : value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // Validasi sederhana
    if (
      !values.kode ||
      !selectedReason ||
      !values.unggah ||
      (telegramGroup === 'tidak' && !phoneNumber) ||
      (selectedReason === 'lainnya' && !customReason.trim())
    ) {
      alert('Harap lengkapi semua data terlebih dahulu.')
      return
    }

    const alasanReturMap = {
      'Rekening Supplier Tidak Aktif': 'REKENING_TIDAK_AKTIF',
      'Rekening Pasif': 'REKENING_PASIF',
      'Nomor Rekening Salah': 'NOMOR_REKENING_SALAH'
    }

    const formData = new FormData()

    formData.append('kodeSatker', values.kode)
    formData.append(
      'noTelpon',
      telegramGroup === 'tidak' ? phoneNumber : 'Sudah tergabung Telegram'
    )
    formData.append('unggah_dokumen', values.unggah)

    formData.append(
      'alasanRetur',
      selectedReason === 'lainnya' ? 'LAINNYA' : alasanReturMap[selectedReason]
    )
    formData.append(
      'alasanLainnya',
      selectedReason === 'lainnya' ? customReason : ''
    )

    try {
      const token = localStorage.getItem('token') // Pastikan token disimpan saat login

      const response = await axios.post(
        'http://layananbank-production.up.railway.app/api/retur/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      )

      Swal.fire({
        title: 'Pengajuan Dokumen Berhasil!',
        icon: 'success',
        draggable: true
      })
      setValues({ kode: '', unggah: null })
      setTelegramGroup('')
      setPhoneNumber('')
      setSelectedReason('')
      setCustomReason('')
      console.log(response.data)
    } catch (error) {
      console.error('Gagal mengirim:', error.response?.data || error.message)
      Swal.fire({
        title: 'Gagal Mengirim Dokumen!',
        icon: 'warning',
        draggable: true
      })
    }
  }

  return (
    <div>
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
                  Penyelesaian Retur atas SP2D
                </h1>
              </div>
            </Col>
          </Row>
        </Container>
      </header>

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

              {/* Nomor Telepon / Telegram */}
              <Form.Group as={Row} className='mb-3'>
                <Form.Label column sm={4}>
                  Nomor Telepon
                </Form.Label>
                <Col sm={8}>
                  <p>Apakah anda tergabung dengan telegram KPPN Palu?</p>
                  <Form.Check
                    type='radio'
                    label='Iya'
                    name='telegram'
                    value='Iya'
                    onChange={e => setTelegramGroup(e.target.value)}
                    checked={telegramGroup === 'Iya'}
                  />
                  <Form.Check
                    type='radio'
                    label='Tidak'
                    name='telegram'
                    value='tidak'
                    onChange={e => setTelegramGroup(e.target.value)}
                    checked={telegramGroup === 'tidak'}
                  />
                  {telegramGroup === 'tidak' && (
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
                  Alasan Retur
                </Form.Label>
                <Col sm={8}>
                  <Form.Check
                    type='radio'
                    label='Rekening Supplier Tidak Aktif / Salah / Tidak Ditemukan'
                    name='alasanRetur'
                    value='Rekening Supplier Tidak Aktif'
                    onChange={e => setSelectedReason(e.target.value)}
                    checked={selectedReason === 'Rekening Supplier Tidak Aktif'}
                  />
                  <Form.Check
                    type='radio'
                    label='Rekening Pasif/Tidak Aktif/Diblokir'
                    name='alasanRetur'
                    value='Rekening Pasif'
                    onChange={e => setSelectedReason(e.target.value)}
                    checked={selectedReason === 'Rekening Pasif'}
                  />
                  <Form.Check
                    type='radio'
                    label='Nomor Rekening Salah/Tidak Ditemukan'
                    name='alasanRetur'
                    value='Nomor Rekening Salah'
                    onChange={e => setSelectedReason(e.target.value)}
                    checked={selectedReason === 'Nomor Rekening Salah'}
                  />
                  <Form.Check
                    type='radio'
                    label='Lainnya'
                    name='alasanRetur'
                    value='lainnya'
                    onChange={e => setSelectedReason(e.target.value)}
                    checked={selectedReason === 'lainnya'}
                  />
                </Col>
              </Form.Group>

              {/* Alasan Lainnya */}
              {selectedReason === 'lainnya' && (
                <Form.Group as={Row} className='mb-3'>
                  <Form.Label column sm={4}>
                    Alasan Lainnya
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type='text'
                      placeholder='Masukkan alasan lainnya'
                      value={customReason}
                      onChange={e => setCustomReason(e.target.value)}
                      required={selectedReason === 'lainnya'} // Membuat alasan lainnya menjadi wajib jika dipilih
                    />
                  </Col>
                </Form.Group>
              )}

              {/* Upload Dokumen */}
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

              {/* Tombol Submit */}
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

export default DokumenA

// import { useState } from "react";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import axios from "axios";

// const DokumenA = () => {
//   const [values, setValues] = useState({
//     kode: "",
//     unggah: null,
//   });

//   const [telegramGroup, setTelegramGroup] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [selectedReason, setSelectedReason] = useState("");
//   const [customReason, setCustomReason] = useState("");

//   const handleChanges = (e) => {
//     const { name, type, files, value } = e.target;
//     setValues({
//       ...values,
//       [name]: type === "file" ? (files.length > 0 ? files[0] : null) : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !values.kode ||
//       !values.unggah ||
//       (telegramGroup === "tidak" && !phoneNumber.trim()) ||
//       !selectedReason ||
//       (selectedReason === "LAINNYA" && !customReason.trim())
//     ) {
//       alert("Harap lengkapi semua data terlebih dahulu.");
//       return;
//     }

//     const alasanReturMap = {
//       "Rekening Supplier Tidak Aktif": "REKENING_TIDAK_AKTIF",
//       "Rekening Pasif": "REKENING_PASIF",
//       "Nomor Rekening Salah": "NOMOR_REKENING_SALAH",
//       "Lainnya": "LAINNYA",
//     };

//     const formData = new FormData();
//     formData.append("kodeSatker", values.kode);
//     formData.append(
//       "noTelpon",
//       telegramGroup === "tidak" ? phoneNumber : "Sudah tergabung Telegram"
//     );
//     formData.append("unggah_dokumen", values.unggah);
//     formData.append("alasanRetur", alasanReturMap[selectedReason]);
//     formData.append("alasanLainnya", selectedReason === "LAINNYA" ? customReason : "");

//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post("http://localhost:3000/api/retur/create", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       alert("Berhasil mengirim retur SP2D!");
//       setValues({ kode: "", unggah: null });
//       setTelegramGroup("");
//       setPhoneNumber("");
//       setSelectedReason("");
//       setCustomReason("");
//       console.log(response.data);
//     } catch (error) {
//       console.error("Gagal mengirim:", error.response?.data || error.message);
//       alert("Gagal mengirim pengajuan retur!");
//     }
//   };

//   return (
//     <div>
//       <header className="header-dokumen">
//         <Container fluid>
//           <Row className="dokumenheader-box d-flex align-items-center justify-content-center">
//             <Col xs={12} md={6} className="text-center text-md-start d-flex flex-column justify-content-center">
//               <div className="dokumenheader-title-container">
//                 <h1 className="dokumenheader-title">Penyelesaian Retur atas SP2D</h1>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </header>

//       <Container>
//         <Row className="justify-content-center mt-4">
//           <Col md={8} lg={10}>
//             <Form onSubmit={handleSubmit} className="formulir">

//               {/* Kode Satker */}
//               <Form.Group as={Row} className="mb-3">
//                 <Form.Label column sm={4}>Kode Satker</Form.Label>
//                 <Col sm={8}>
//                   <Form.Control
//                     type="text"
//                     name="kode"
//                     placeholder="Masukkan Kode Satker"
//                     onChange={handleChanges}
//                     required
//                     value={values.kode}
//                   />
//                 </Col>
//               </Form.Group>

//               {/* Nomor Telepon / Telegram */}
//               <Form.Group as={Row} className="mb-3">
//                 <Form.Label column sm={4}>Nomor Telepon</Form.Label>
//                 <Col sm={8}>
//                   <p>Apakah Anda tergabung dengan Telegram KPPN Palu?</p>
//                   <Form.Check
//                     type="radio"
//                     label="Iya"
//                     name="telegram"
//                     value="Iya"
//                     onChange={(e) => setTelegramGroup(e.target.value)}
//                     checked={telegramGroup === "Iya"}
//                   />
//                   <Form.Check
//                     type="radio"
//                     label="Tidak"
//                     name="telegram"
//                     value="tidak"
//                     onChange={(e) => setTelegramGroup(e.target.value)}
//                     checked={telegramGroup === "tidak"}
//                   />
//                   {telegramGroup === "tidak" && (
//                     <Form.Control
//                       type="text"
//                       placeholder="Masukkan Nomor Telepon Anda"
//                       value={phoneNumber}
//                       onChange={(e) => setPhoneNumber(e.target.value)}
//                       className="mt-2"
//                     />
//                   )}
//                 </Col>
//               </Form.Group>

//               {/* Alasan Retur */}
//               <Form.Group as={Row} className="mb-3">
//                 <Form.Label column sm={4}>Alasan Retur</Form.Label>
//                 <Col sm={8}>
//                   <Form.Check
//                     type="radio"
//                     label="Rekening Supplier Tidak Aktif / Salah / Tidak Ditemukan"
//                     name="alasanRetur"
//                     value="Rekening Supplier Tidak Aktif"
//                     onChange={(e) => setSelectedReason(e.target.value)}
//                     checked={selectedReason === "Rekening Supplier Tidak Aktif"}
//                   />
//                   <Form.Check
//                     type="radio"
//                     label="Rekening Pasif/Tidak Aktif/Diblokir"
//                     name="alasanRetur"
//                     value="Rekening Pasif"
//                     onChange={(e) => setSelectedReason(e.target.value)}
//                     checked={selectedReason === "Rekening Pasif"}
//                   />
//                   <Form.Check
//                     type="radio"
//                     label="Nomor Rekening Salah/Tidak Ditemukan"
//                     name="alasanRetur"
//                     value="Nomor Rekening Salah"
//                     onChange={(e) => setSelectedReason(e.target.value)}
//                     checked={selectedReason === "Nomor Rekening Salah"}
//                   />
//                   <Form.Check
//                     type="radio"
//                     label="Lainnya"
//                     name="alasanRetur"
//                     value="Lainnya"
//                     onChange={(e) => setSelectedReason(e.target.value)}
//                     checked={selectedReason === "LAINNYA"}
//                   />
//                 </Col>
//               </Form.Group>

//               {/* Alasan Lainnya */}
//               {selectedReason === "LAINNYA" && (
//                 <Form.Group as={Row} className="mb-3">
//                   <Form.Label column sm={4}>Alasan Lainnya</Form.Label>
//                   <Col sm={8}>
//                     <Form.Control
//                       type="text"
//                       placeholder="Masukkan alasan lainnya"
//                       value={customReason}
//                       onChange={(e) => setCustomReason(e.target.value)}
//                       required
//                     />
//                   </Col>
//                 </Form.Group>
//               )}

//               {/* Upload Dokumen */}
//               <Form.Group as={Row} className="mb-3">
//                 <Form.Label column sm={4}>Unggah Dokumen Persyaratan</Form.Label>
//                 <Col sm={8}>
//                   <Form.Control
//                     type="file"
//                     name="unggah"
//                     onChange={handleChanges}
//                     required
//                   />
//                   <p className="fs-6 text-warning">Harap jadikan dokumen persyaratan menjadi satu dokumen PDF</p>
//                 </Col>
//               </Form.Group>

//               {/* Tombol Submit */}
//               <div className="text-end">
//                 <Button type="submit" variant="primary">Kirim</Button>
//               </div>

//             </Form>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default DokumenA;
