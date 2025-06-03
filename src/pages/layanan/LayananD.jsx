import { Container, Row, Col } from 'react-bootstrap'
import layananImg from '/src/assets/img/23.png'
import NavbarComponent from '../../components/NavbarComponent'

const LayananD = () => {
  return (
    <div className='Layanan-D'>
      <NavbarComponent />
      {/* Bagian Header Full Width */}
      <header className='header-layanan-D'>
        <Container fluid>
          {' '}
          {/* Menggunakan container-fluid untuk full width */}
          <Row className='layananheader-box d-flex align-items-center justify-content-center'>
            <Col
              xs={12}
              md={6}
              className='text-center text-md-start d-flex flex-column justify-content-center'
            >
              <div className='layananheader-title-D-container'>
                <h1 className='layananheader-title-D'>Permohonan VOID SP2D</h1>
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
                <span className='text-retur'>Void SP2D</span>
              </h1>
              <p className='text-black'>
                Void SP2D adalah pembatalan atas Surat Perintah Pencairan Dana
                (SP2D) yang sudah diterbitkan oleh Kantor Pelayanan
                Perbendaharaan Negara (KPPN).
              </p>
              <img src={layananImg} alt='Layanan' className='img-fluid w-50' />
            </Col>

            {/* mekanisme prosedur */}
            <Col xs={12} md={6} className='text-start'>
              <h1 className='fw-bold text-dark'>
                Sistem, mekanisme dan prosedur{' '}
              </h1>
              <h2 className='layananretur fw-bold'>Layanan Void SP2D</h2>
              <ul className='list-unstyled'>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>Satker mengajukan surat
                  permohonan Void SP2D pada KPPN sesuai format yang disediakan.
                </li>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>KPPN melakukan
                  pemeriksaan atas permohonan Void SP2D yang diajukan oleh
                  satker.
                </li>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>Apabila telah sesuai dan
                  transaksi memenuhi syarat untuk dilakukan Void SP2D maka KPPN
                  selanjutnya membuat Nota Dinas ke Direktorat Sistem Informasi
                  Dan Teknologi Perbendaharaan atas Permohonan Void SP2D
                  tersebut.
                </li>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>Apabila telah dilakukan
                  proses Void oleh Direktorat Sistem Informasi Dan Teknologi
                  Perbendaharaan, KPPN memlakukan pembatalan invoice dan
                  memberikan pemberitahuan ke satker atas Void yang telah
                  dilakukan.
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Wrapper dengan background putih */}
      <div className='wrapper'>
        {/* Bagian Dokumen Kelengkapan */}
        <section className='dokkelengkapan-D py-5'>
          <Container>
            <Row className='align-items-center'>
              {/* Judul */}
              <Col xs={12} className='text-center mb-4'>
                <h1 className='dokjudul-D text-4xl fw-bold'>
                  Dokumen Kelengkapan <br />
                  Permohonan VOID SP2D
                </h1>
              </Col>
              {/*Daftar Dokumen */}
              <Col xs={12} lg={10} className='mx-auto'>
                <div className='dokumen-list d-flex flex-column flex-lg-row align-items-start gap-5'>
                  <div className='dokumen-content flex-grow-1'>
                    {[
                      { number: '1', desc: 'Surat Permohonan Void SP2D' },
                      { number: '2', desc: 'Daftar SP2D' },
                      {
                        number: '3',
                        desc: 'Dokumen pendukung lainnya (untuk mendukung alasan void dilakukan)'
                      },
                      {
                        number: '4',
                        desc: 'Surat perubahan data supplier (dalam hal terdapat perubahan Nama pemilik rekening)'
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
                    href='https://docs.google.com/document/d/1Lf3T8nsc8VKNlnNRqL5s8Ph8wD4zH2pD/edit?tab=t.0'
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
              <h2 className='fw-bold text-dark'>Silahkan Disini</h2>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default LayananD
