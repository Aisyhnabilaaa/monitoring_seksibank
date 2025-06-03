import { Container, Row, Col } from 'react-bootstrap'
import NavbarComponent from '../../components/NavbarComponent'

const LayananH = () => {
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
                  Penerbitan Bukti Penerimaan Negara
                </h1>
              </div>
            </Col>
          </Row>
        </Container>
      </header>

      {/* Bagian Tambahan - Sesuai Gambar */}
      <section className='layanan-content py-5'>
        <Container>
          <Row className='d-flex align-items-center'>
            {/* Kolom Kiri - Teks */}
            <Col xs={12} md={6} className='text-start'>
              <span className='badge bg-purple text-white px-3 py-2 mb-3'>
                Informasi
              </span>
              <h2 className='fw-bold text-dark'>
                Layanan
                <br />
                <span className='text-retur'>
                  Bukti Penerimaan Negara (BPN)
                </span>
              </h2>
              <p className='text-black'>
                Bukti Penerimaan Negara (BPN) bukti penerimaan negara yang
                diterbitkan oleh KPPN atas potongan pajak dari SPM yang
                disampaikan Satker.
              </p>
              <ul className='list-unstyled'>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>BPN adalah bukti
                  pemotongan pajak yang dicetak oleh Seksi Bank KPPN.
                </li>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>BPN diterbitkan atas
                  permintaan Satuan Kerja.
                </li>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>BPN tertera nomor
                  transaksi penerimaan negara (NTPN) serta nomor transaksi bank
                  (NTB) atau nomor transaksi pos (NTP).
                </li>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>Fungsinya setara dengan
                  surat setoran dalam administrasi.
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

            {/* Kolom Kanan - Testimoni */}
            <Col xs={12} md={6} className='text-start'>
              <h2 className='fw-bold text-dark'>
                Sistem, mekanisme dan prosedur{' '}
              </h2>
              <h3 className='layananretur fw-bold'>
                Layanan Penerbitan Bukti Penerimaan Negara
              </h3>
              <ul className='list-unstyled'>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>Pegawai Seksi Bank
                  menerima dan meneliti Surat Permohonan Penerbitan Nota
                  Konfirmasi Penerimaan Negara beserta dokumen pendukung dari
                  satuan kerja.
                </li>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>Pegawai Seksi Bank
                  melakukan unggah ADK Konfirmasi pada aplikasi yang disediakan
                  oleh DJPb.
                </li>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>Pegawai Seksi Bank
                  meneliti kesesuaian data penerimaan negara antara aplikasi
                  dengan lampiran surat permohonan yang disampaikan oleh Satker.
                  Apabila data telah sesuai, Pegawai Seksi Bank melakukan proses
                  konfirmasi pada aplikasi.
                </li>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>Pegawai Seksi Bank
                  menerbitkan Nota Konfirmasi Penerimaan Negara dengan cara
                  mengunduh Nota Konfirmasi dari Aplikasi.
                </li>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>Pegawai Seksi Bank
                  membubuhkan TTE pada Nota Konfirmasi dan kemudian menyampaikan
                  Nota KonfirmasiPenerimaan Negara ke Satuan kerja.
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
                  Dokumen Kelengkapan Penerbitan Nota Konfirmasi Atas Penerimaan
                  Negara
                </h1>
              </Col>
              {/*Daftar Dokumen */}
              <Col xs={12} lg={10} className='mx-auto'>
                <div className='dokumen-list d-flex flex-column flex-lg-row align-items-start gap-5'>
                  <div className='dokumen-content flex-grow-1'>
                    {[
                      {
                        number: '1',
                        desc: 'Surat Permohonan Penerbitan Nota Konfirmasi Penerimaan Negara'
                      },
                      { number: '2', desc: 'Daftar Rekapitulasi setoran' },
                      {
                        number: '3',
                        desc: 'Lampiran Bukti Setoran Penerimaan Negara'
                      },
                      {
                        number: '4',
                        desc: 'Lampiran Bukti Setoran Penerimaan Negara'
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
                    href='https://docs.google.com/document/d/1bmGyg_6xViX0qznaLtAcPWIrWM8258ei/edit?tab=t.0'
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
    </div>
  )
}

export default LayananH
