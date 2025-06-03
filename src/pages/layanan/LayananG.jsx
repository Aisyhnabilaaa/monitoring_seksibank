import { Container, Row, Col } from 'react-bootstrap'
import NavbarComponent from '../../components/NavbarComponent'

const LayananG = () => {
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
                <h1 className='layananheader-title-D'>Pengembalian PFK</h1>
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
                <span className='text-retur'>Pengembalian PFK</span>
              </h1>
              <p className='text-black'>
                Atas kesalahan dan/atau kelebihan potongan SPM untuk penerimaan
                PFK oleh satuan kerja dan kesalahan input setoran PFK oleh Bank
                dapat dimintakan pembayaran pengembalian PFK.
              </p>
              <p>
                Dasar Hukum: Surat Edaran Direktorat Jenderal Perbendaharaan
                Nomor SE-108/PB/2018 tentang Pengembalian Kelebihan
                Setoran/Potongan Penerimaan Dana Perhitungan Fihak Ketiga (PFK).
                Pengembalian Dana PFK dapat diajukan oleh:
              </p>
              <ul className='list-unstyled'>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>Satker Kementerian
                  Negara/Lembaga.
                </li>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>Bank/Pos Persepsi.
                </li>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>Pemerintah Daerah.
                </li>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>Pihak Lain selaku
                  penyetor dana PFK.
                </li>
              </ul>
            </Col>

            {/* Kolom Kanan - Tambahan */}
            <Col xs={5} md={6} className='text-start mt-5'>
              <p className='text-black fs-4 '>
                {' '}
                <strong>
                  Ketentuan lanjutan atas pengajuan permintaan pengembalian yang
                  telah diproses oleh KPPN :
                </strong>
              </p>
              <ul className='list-unstyled'>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>Seluruh permintaan
                  pengembalian yang telah diterima oleh KPPN akan diteruskan ke
                  Direktorat Sistem Perbendaharaan (DSP) karena wewenang
                  pengembalian ada di DSP c.q. Kepala Subdit Pembayaran Program
                  Jaminan Sosial, Perhitungan Fihak Ketiga, dan Kebijakan
                  Tuntutan Ganti Rugi.
                </li>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>Permintaan pengembalian
                  PFK tidak terikat tahun anggaran.
                </li>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>Permintaan pengembalian
                  PFK mengurangi dana PFK periode tahun berjalan.
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Wrapper dengan background putih */}
      <div className='wrapper-E p-20'>
        <h1 className='judul-syarat-E fw-bold text-center mb-4'>
          Dokumen Persyaratan:
        </h1>
        <Container fluid>
          {/* Scrollable Wrapper */}
          <div
            style={{
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              paddingBottom: '10px',
              scrollbarWidth: 'thin',
              display: 'flex',
              gap: '50px'
            }}
          >
            {/* Row harus flex dengan nowrap agar tidak turun */}
            <Row
              className='d-flex flex-nowrap'
              style={{ display: 'flex', flexWrap: 'nowrap' }}
            >
              {/* Dokumen Kelengkapan 1 */}
              <Col
                className='flex-shrink-0'
                style={{ minWidth: '150px', padding: '10px' }}
              >
                <section className='p-5 border rounded shadow-sm bg-light'>
                  <h2 className='fw-bold text-justify mb-4'>
                    Satuan Kerja mengajukan permintaan pembayaran <br />
                    pengembalian potongan dana PFK dengan <br /> kelengkapan:
                  </h2>
                  <div className='d-flex flex-column gap-3'>
                    {[
                      'Surat Permintaan Pembayaran Pengembalian PFK sesuai format Lampiran A pada SE-108/PB/2018',
                      'Copy SPM dan SP2D yang memuat adanya kelebihan/kesalahan potongan PFK',
                      'Copy rekening tujuan pengembalian PFK',
                      'Surat Ketetapan Pengembalian sesuai format Lampiran B pada SE-108/PB/2018',
                      'Surat Pernyataan Tanggungjawab Mutlak (SPTJM) sesuai format Lampiran C pada SE-108/PB/2018'
                    ].map((desc, idx) => (
                      <div
                        key={idx}
                        className='d-flex align-items-center gap-2'
                      >
                        <div className='step-number'>{idx + 1}</div>
                        <p className='text-dark mb-0 fs-6 fw-medium'>{desc}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </Col>

              {/* Dokumen Kelengkapan 2 */}
              <Col
                className='flex-shrink-0'
                style={{ minWidth: '150px', padding: '10px' }}
              >
                <section className='p-5 border rounded shadow-sm bg-light'>
                  <h2 className='fw-bold text-justify mb-4'>
                    Pemerintah Daerah dan/atau Pihak Lain selaku <br /> penyetor
                    dana PFK mengajukan permintaan <br /> dengan kelengkapan:
                  </h2>
                  <div className='d-flex flex-column gap-3'>
                    {[
                      'Surat Permintaan Pembayaran Pengembalian PFK sesuai format Lampiran A pada SE-108/PB/2018',
                      'Copy SPM dan SP2D yang memuat adanya kelebihan/kesalahan potongan PFK',
                      'Copy rekening tujuan pengembalian PFK',
                      'Surat Ketetapan Pengembalian sesuai format Lampiran B pada SE-108/PB/2018',
                      'Surat Pernyataan Tanggungjawab Mutlak (SPTJM) sesuai format Lampiran C pada SE-108/PB/2018'
                    ].map((desc, idx) => (
                      <div
                        key={idx}
                        className='d-flex align-items-center gap-2'
                      >
                        <div className='step-number'>{idx + 1}</div>
                        <p className='text-dark mb-0 fs-6 fw-medium'>{desc}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </Col>

              {/* Dokumen Kelengkapan 3 */}
              <Col
                className='flex-shrink-0'
                style={{ minWidth: '150px', padding: '10px' }}
              >
                <section className='p-5 border rounded shadow-sm bg-light'>
                  <h2 className='fw-bold text-justify mb-4'>
                    Bank/Pos Persepsi mengajukan permintaan <br /> dengan
                    kelengkapan:
                  </h2>
                  <div className='d-flex flex-column gap-3'>
                    {[
                      'Surat Permintaan Pembayaran Pengembalian PFK sesuai format Lampiran A pada SE-108/PB/2018',
                      'Copy bukti setor dan/atau Bukti Penerimaan Negara (BPN)',
                      'Laporan Harian Penerimaan (LHP)',
                      'Daftar Nominatif Penerimaan (DNP)',
                      'Copy Bukti Pelimpahan Penerimaan Negara',
                      'Surat Ketetapan Pengembalian sesuai format Lampiran B pada SE-108/PB/2018',
                      'Surat Pernyataan Tanggungjawab Mutlak (SPTJM) sesuai format Lampiran C pada SE-108/PB/2018',
                      'Copy BPN atas Transaksi Pengganti'
                    ].map((desc, idx) => (
                      <div
                        key={idx}
                        className='d-flex align-items-center gap-2'
                      >
                        <div className='step-number'>{idx + 1}</div>
                        <p className='text-dark mb-0 fs-6 fw-medium'>{desc}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </Col>
            </Row>
          </div>
        </Container>
      </div>

      {/* Bagian Perhatian dalam Retur */}
      <section className='perhatian-retur py-5'>
        <Container>
          {/* Judul Section */}
          <Row className='text-center mb-5'>
            <Col>
              <h2 className='fw-bold text-dark mb-5'>Silahkan Disini</h2>
              <a
                href='#'
                target='_blank'
                rel='noopener noreferrer'
                className='layanan-btn'
              >
                Download Blanko
              </a>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default LayananG
