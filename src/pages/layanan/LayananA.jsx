import { Container, Row, Col } from 'react-bootstrap'

import { RiErrorWarningFill } from 'react-icons/ri'

import layananImg from '/src/assets/img/23.png'

import NavbarComponent from '../../components/NavbarComponent'

const LayananA = () => {
  return (
    <div className='Layanan-A'>
      <NavbarComponent />
      {/* Bagian Header Full Width */}
      <header className='header-layanan-A'>
        <Container fluid>
          {' '}
          {/* Menggunakan container-fluid untuk full width */}
          <Row className='layananheader-box d-flex align-items-center justify-content-center'>
            <Col
              xs={12}
              md={6}
              className='text-center text-md-start d-flex flex-column justify-content-center'
            >
              <div className='layananheader-title-A-container'>
                <h1 className='layananheader-title-A'>
                  Penyelesaian Retur atas SP2D
                </h1>
              </div>
            </Col>
          </Row>
        </Container>
      </header>

      {/* Bagian Tambahan */}
      <section className='layanan-content py-5'>
        <Container>
          <Row className='d-flex align-items-start'>
            {/* Kolom Kiri - Teks */}
            <Col xs={12} md={6} className='text-start'>
              <span className='badge bg-purple text-white px-3 py-2 mb-3'>
                Informasi
              </span>
              <h1 className='fw-bold text-dark'>
                Layanan
                <br />
                <span className='text-retur'>Retur SP2D</span>
              </h1>
              <p className='text-black'>
                Retur SP2D adalah penolakan atau pengembalian atas
                pemindahbukuan dana APBN dari bank penerima ke bank pengirim.
                Retur SP2D dapat terjadi karena kesalahan nama atau nomor
                rekening, atau rekening tidak aktif.
              </p>
              <img src={layananImg} alt='Layanan' className='img-fluid w-50' />
            </Col>

            {/* mekanisme prosedur */}
            <Col xs={12} md={6} className='text-start'>
              <h1 className='fw-bold text-dark'>
                Sistem, mekanisme dan prosedur{' '}
              </h1>
              <h2 className='layananretur fw-bold'>Layanan Retur SP2D</h2>
              <ul className='list-unstyled'>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>KPPN melakukan
                  monitoring ada/tidaknya retur atas SP2D, monitoring dilakukan
                  setiap hari secara berkala melalui SPAN EXT.
                </li>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>Apabila terdapat retur
                  satker, KPPN membuat surat pemberitahuan retur SP2D ke satker.
                </li>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>Satker melakukan
                  pengecekan atas retur yang ada, mendaftarkan/melakukan
                  perubahan supplier (apabila diperlukan), dan membuat dokumen
                  kelengkapan retur.
                </li>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>Satker mengirimkan
                  dokumen kelengkapan retur ke KPPN melalui sarana yang
                  tersedia.
                </li>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>KPPN melakukan
                  pemeriksaan atas dokumen satker, apabila telah sesuai maka
                  KPPN memroses SPP dan SPM Retur satker.
                </li>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>SPM Retur kemudian
                  disampaikan kepada KPPN selaku kuasa BUN untuk kemudian
                  diterbitkan SP2D.
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Wrapper dengan background putih */}
      <div className='wrapper'>
        {/* Bagian Dokumen Kelengkapan */}
        <section className='dokkelengkapan-B py-5'>
          <Container>
            <Row className='align-items-center'>
              {/* Judul */}
              <Col xs={12} className='text-center mb-4'>
                <h1 className='dokjudul-B text-4xl fw-bold'>
                  Dokumen Kelengkapan Penyelesaian Retur atas SP2D
                </h1>
              </Col>
              {/*Daftar Dokumen */}
              <Col xs={12} lg={10} className='mx-auto'>
                <div className='dokumen-list d-flex flex-column flex-lg-row align-items-start gap-5'>
                  <div className='dokumen-content flex-grow-1'>
                    {[
                      {
                        number: '1',
                        desc: 'Surat Ralat/Perbaikan Rekening (SRPR)'
                      },
                      {
                        number: '2',
                        desc: 'Daftar Ralat/Perbaikan Data Rekening Penerima Pembayaran'
                      },
                      {
                        number: '3',
                        desc: 'Surat Pernyataan Tanggungjawab Mutlak (SPTJM) bermaterai'
                      },
                      {
                        number: '4',
                        desc: 'Surat perubahan data supplier (dalam hal terdapat perubahan Nama pemilik rekening)'
                      },
                      {
                        number: '5',
                        desc: 'Bukti upload adk BCSR (dalam hal terdapat perubahan nomor rekening penerima retur)'
                      },
                      {
                        number: '6',
                        desc: 'Surat keterangan rekening aktif dari bank (dalam hal retur disebabkan karena rekening tidak aktif dan tidak melakukan perubahan rekening)'
                      }
                    ].map((item, index) => (
                      <div
                        key={index}
                        className='d-flex align-items-center gap-4 mb-3'
                      >
                        <div className='step-number d-flex align-items-center justify-content-center'>
                          {item.number}
                        </div>
                        <p className='text-gray-100 mb-0 fs-5 fw-medium text-justify'>
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                  <a
                    href='https://docs.google.com/document/d/1ndvyavO_apF7c5w6gJLG9-iV5zK5AaYo/edit?tab=t.0'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='layanan-btn'
                  >
                    Download Blanko Dokumen Persyaratan
                  </a>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>

      {/* Bagian Perhatian dalam Retur */}
      <section className='perhatian-retur py-5'>
        <Container>
          {/* Judul Section */}
          <Row className='text-center mb-5'>
            <Col>
              <h2 className='fw-bold text-dark'>
                Hal-hal Yang Harus Diperhatikan Dalam Pengajuan Retur
              </h2>
            </Col>
          </Row>

          {[
            [
              {
                icon: <RiErrorWarningFill />,
                desc: 'SPTJM harap diberi materai.'
              },
              {
                icon: <RiErrorWarningFill />,
                desc: 'Apabila melakukan perubahan rekening penerima retur, harap mendaftarkan rekening baru sebagai supplier baru menggunakan mekanisme BCSR.'
              }
            ],
            [
              {
                icon: <RiErrorWarningFill />,
                desc: 'Apabila melakukan perubahan nama pemilik rekening, harap melakukan perubahan data supplier menggunakan surat perubahan data supplier.'
              },
              {
                icon: <RiErrorWarningFill />,
                desc: 'Pastikan data rekening telah sesuai untuk menghindari retur berulang.'
              }
            ]
          ].map((row, rowIndex) => (
            <Row key={rowIndex} className='justify-content-center mb-4'>
              {row.map((item, index) => (
                <Col
                  key={index}
                  xs={12}
                  md={6}
                  className='d-flex align-items-center gap-3'
                >
                  <div
                    className='text-primary d-flex align-items-center justify-content-center'
                    style={{ fontSize: '2rem', minWidth: '50px' }}
                  >
                    {item.icon}
                  </div>
                  <p className='text-black mb-0 flex-grow-1'>{item.desc}</p>
                </Col>
              ))}
            </Row>
          ))}
        </Container>
      </section>
    </div>
  )
}

export default LayananA
