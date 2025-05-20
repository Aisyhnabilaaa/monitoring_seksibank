import { Container, Row, Col, Card } from 'react-bootstrap'
import HeroImage from '../assets/img/HERO1.png'
import { useNavigate } from 'react-router-dom'

import { useRef } from 'react'
import NavbarComponent from '../components/NavbarComponent'

const HomePage = () => {
  const daftarLayananRef = useRef(null)

  const scrollToDaftarLayanan = () => {
    if (daftarLayananRef.current) {
      daftarLayananRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navigate = useNavigate()

  return (
    <div className='homepage'>
      <NavbarComponent />
      <header className='header w-100'>
        <Container>
          <Row className='header-box d-flex align-items-center justify-content-center'>
            <Col xs={12} md={6} className='text-center'>
              <img
                src={HeroImage}
                alt='hero-img'
                className='hero-img w-40 h-40 object-contain absolute left-0 top-1/2 transform -translate-y-1/2'
              />
            </Col>
            <Col
              xs={12}
              md={6}
              className='text-center text-md-start d-flex flex-column justify-content-center'
            >
              <div className='header-title-container'>
                <h1 className='header-title'>
                  Selamat Datang Di <br />
                  <span className='text-talise'>TALISE</span>
                </h1>
              </div>
              <p className='paragraf-text'>
                Digi<span className='text-talise'>TA</span>lisasi{' '}
                <span className='text-talise'>L</span>ayanan dan{' '}
                <span className='text-talise'>I</span>nformasi{' '}
                <span className='text-talise'>SE</span>ksi Bank KPPN Palu
              </p>
            </Col>
          </Row>
        </Container>
      </header>
      {/* Section Layanan Kami */}
      <div className='layanan w-100 min-vh-10 mt-5'>
        <Container>
          <Row>
            <Col>
              <h1 className='text-center fw-bold mt-4'>
                <span className='text-layanan'>Layanan</span>{' '}
                <span className='text-kami'>Kami</span>
              </h1>
              <p>Silahkan pilih menu layanan dibawah ini</p>
            </Col>
          </Row>
          <Row className='justify-content-center mt-4'>
            {/* Card 1 */}
            <Col xs={12} md={4} className=' d-flex justify-content-center'>
              <Card
                className='layanan-card text-center p-3'
                onClick={scrollToDaftarLayanan}
                style={{ cursor: 'pointer' }}
              >
                <i className='ri-information-line layanan-icon'></i>
                <h5>Informasi dan Daftar Layanan</h5>
              </Card>
            </Col>
            {/* Card 2 */}
            <Col xs={12} md={4} className='d-flex justify-content-center'>
              <Card className='layanan-card text-center p-4'>
                <i className='ri-file-add-line layanan-icon'></i>
                <h5>Pengajuan Dokumen</h5>
              </Card>
            </Col>
            {/* Card 3 */}
            <Col xs={12} md={4} className='d-flex justify-content-center'>
              <Card className='layanan-card text-center p-4'>
                <i className='ri-file-search-line layanan-icon'></i>
                <h5>Monitoring</h5>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Section Tentang Kami */}
      <div className='tentang-kami w-100'>
        <Container>
          <Row className='align-items-center'>
            {/* Gambar */}
            <Col xs={12} md={6} className='text-center'>
              <img
                src='src\assets\img\tentang-kami.png' // Ganti dengan gambar yang sesuai
                alt='Tentang Kami'
                className='img-fluid'
              />
            </Col>
            {/* Deskripsi */}
            <Col xs={12} md={6}>
              <h1 className='fw-bold'>
                <span className='text-tentang'>Tentang</span>{' '}
                <span className='text-kamii'>Kami</span>
              </h1>
              <p className='fs-6 mt-4'>
                Sebagai upaya meningkatkan kualitas pelayanan dan kualitas yang
                informasi yang dihasilkan oleh seksi bank KPPN Palu, maka Seksi
                bank kppn palu menggagas inovasi “TALISE” digiTAlisasi Layanan
                dan Informasi SEksi Bank. Layanan melalui TALISE ini merupakan
                layanan penunjang yang mengakomodir kebutuhan satuan kerja
                terkait layanan Seksi bank yang selama ini dilakukan melalui
                email bendum.palu@gmail.com Dengan adanya layanan ini maka
                diharapkan dapat memudahkan satuan kerja dalam mengakses
                informasi,mengajukan layanan, dan melakukan monitoring atas
                layanan yang digunakan.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Section Daftar Layanan */}
      <div ref={daftarLayananRef} className='daftar-layanan w-100 py-5'>
        <Container>
          <Row className='text-center'>
            <Col>
              <h1 className='fw-bold'>
                <span className='text-daftar'>Daftar Layanan </span>
                <span className='text-seksi'>Seksi Bank KPPN Palu</span>
              </h1>
              <p>Silahkan pilih menu layanan dibawah ini</p>
            </Col>
          </Row>

          {/* Grid untuk tombol layanan */}
          <Row className='justify-content-center mt-3'>
            {/* Baris pertama (4 tombol) */}
            <Col xs={12} md={25}>
              <div className='d-flex flex-wrap justify-content-center gap-3'>
                <button
                  className='layanan-btn'
                  onClick={() =>
                    navigate('/layanan/Penyelesaian Retur Atas SP2D')
                  }
                >
                  Penyelesaian Retur atas SP2D
                </button>
                <button
                  className='layanan-btn'
                  onClick={() =>
                    navigate(
                      '/layanan/Penerbitan Nota Konfirmasi Atas Penerimaan Negara'
                    )
                  }
                >
                  Penerbitan Nota Konfirmasi Atas Penerimaan Negara
                </button>
                <button
                  className='layanan-btn'
                  onClick={() =>
                    navigate(
                      '/layanan/Koreksi Penerimaan Negara Atas Setoran Satuan Kerja'
                    )
                  }
                >
                  Koreksi penerimaan Negara Atas Setoran Satuan Kerja
                </button>
                <button
                  className='layanan-btn'
                  onClick={() => navigate('/layanan/Permohonan VOID SP2D')}
                >
                  Permohonan VOID SP2D
                </button>
              </div>
            </Col>
          </Row>

          {/* Baris kedua (3 tombol) */}
          <Row className='justify-content-center mt-3'>
            <Col xs={12} md={25}>
              <div className='d-flex flex-wrap justify-content-center gap-3'>
                <button
                  className='layanan-btn'
                  onClick={() =>
                    navigate(
                      '/layanan/Penerbitan Surat Persetujuan / Penolakan Pembukaan Rekening Satker'
                    )
                  }
                >
                  Penerbitan surat persetujuan / penolakan pembukaan rekening
                  satker
                </button>
                <button
                  className='layanan-btn'
                  onClick={() =>
                    navigate('/layanan/Laporan Pembukaan / Penutupan Rekening')
                  }
                >
                  Laporan Pembukaan / Penutupan Rekening
                </button>
                <button
                  className='layanan-btn'
                  onClick={() => navigate('/layanan/Pengembalian PFK')}
                >
                  Pengembalian PFK
                </button>
                <button
                  className='layanan-btn'
                  onClick={() =>
                    navigate('/layanan/Penerbitan Bukti Penerimaan Negara')
                  }
                >
                  Penerbitan Bukti Penerimaan Negara
                </button>
                <button
                  className='layanan-btn'
                  onClick={() => navigate('/dokumen/Pengembalian PNBP')}
                >
                  Pengembalian PNBP
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className='mt-5 text-center mb-5'>
        <Container>
          <Row className='align-items-center'>
            <Col className='info'>
              <h1 className='fw-bold'>
                <span className='text-kami'>SEKSI</span>{' '}
                <span className='text-kamii'>BANK</span>
              </h1>
              <p className='text-informasi text-justify-custom mt-3'>
                Seksi Bank memiliki tugas yaitu melakukan penyelesaian transaksi
                pencairan dana, fungsi cash management, penerbitan Daftar
                Tagihan, pengelolaan rekening Kuasa BUN dan Bendahara serta
                penatausahaan penerimaan negara
              </p>
            </Col>
            <Col>
              <img
                src='src\assets\img\18.png'
                alt='bankbank'
                className='img-bank'
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* isi aja disini */}
    </div>
  )
}

export default HomePage
