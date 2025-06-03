import { Container, Row, Col } from 'react-bootstrap'

import layananImg from '/src/assets/img/23.png'

import NavbarComponent from '../../components/NavbarComponent'

const LayananE = () => {
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
                <h1 className='layananheader-title-D'>
                  Permohonan Persetujuan Pembukaan Rekening Satker
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
                <span className='text-retur'>
                  Permohonan Persetujuan Pembukaan Rekening Satker
                </span>
              </h1>
              <p className='text-black'>
                Berdasarkan Peraturan Menteri Keuangan Nomor 182/PMK.05/2007 dan
                Peraturan Menteri Keuangan Nomor 183/PMK.05/2009, jenis Rekening
                yang dapat dibuka oleh Kementerian Negara/ Lembaga adalah:
              </p>
              <ul className='list-unstyled'>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span>●</span>
                  <strong>Rekening Penerimaan.</strong>
                </li>
                <p>
                  Rekening Penerimaan adalah Rekening giro pemerintah pada Bank
                  Umum yang dipergunakan untuk menampung uang pendapatan negara
                  dalam rangka pelaksanaan Anggaran Pendapatan dan Belanja
                  Negara pada Kementerian Negara/ Lembaga/ Satuan Kerja
                </p>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span>●</span>
                  <strong>Rekening Pengeluaran.</strong>
                </li>
                <p>
                  Rekening Pengeluaran adalah Rekening giro pemerintah pada Bank
                  Umum yang dipergunakan untuk menampung uang bagi keperluan
                  belanj a negara dalam rangka pelaksanaan Anggaran Pendapatan
                  dan Belanj a Negara pada Kementerian Negara/ Lembaga/ Satuan
                  Kerja, termasuk didalamnya Rekening Pengeluaran Pembantu
                </p>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span>●</span>
                  <strong>Rekening Lainnya.</strong>
                </li>
                <p>
                  Rekening Lainnya adalah Rekening giro atau deposito pada Bank
                  Umum yang dipergunakan untuk menampung uang yang tidak dapat
                  ditampung pada Rekening Penerimaan dan Rekening Pengeluaran
                  berdasarkan tugas dan fungsi Kementerian Negara/Lembaga/Satuan
                  Kerja
                </p>
              </ul>
            </Col>

            {/* Kolom Kanan - Tambahan */}
            <Col xs={5} md={6} className='text-start mt-5'>
              <h3 className='fw-bold text-dark'>
                KPPN Memiliki Kewenangan Untuk Menerbitkan{' '}
                <span className='layananretur fw-bold'>
                  Ijin Pembukaan Rekening :
                </span>
              </h3>
              <ul className='list-unstyled'>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>Rekening Bendahara
                  Penerimaan.
                </li>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>Rekening Bendahara
                  Pengeluaran.
                </li>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>Rekening Penampungan
                  Hibah Langsung.
                </li>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>Rekening Milik Badan
                  Layanan Umum (BLU).
                </li>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>Rekening Penampungan
                  Sementara.
                </li>
                <li className='list-item-bordered d-flex align-items-center gap-2'>
                  <span className='text-purple'>●</span>Rekening Penampungan
                  Dana Titipan.
                </li>
              </ul>
              <img src={layananImg} alt='Layanan' className='img-fluid w-80' />
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
                <h1 className='dokjudul-B text-3xl fw-bold mb-5'>
                  Persyaratan Persetujuan Izin Rekening
                </h1>
              </Col>

              {/* Daftar Dokumen */}
              <Col xs={12} lg={10} className='mx-auto'>
                <div className='dokumen-list d-flex flex-column flex-lg-row align-items-start gap-5'>
                  {/* Rekening Satuan Kerja */}
                  <div className='dokumen-content flex-grow-1'>
                    <h3 className='my-2 fw-semibold'>Rekening Satuan Kerja</h3>
                    <ul className='list-unstyled'>
                      <li className='d-flex gap-3 my-2 text-justify mt-5 fs-5'>
                        <span className='fw-bold'>1.</span>
                        Surat permohonan persetujuan pembukaan rekening
                        pemerintah sesuai format lampiran PMK No:
                        182/PMK.05/2017.
                      </li>
                      <li className='d-flex gap-3 my-2 text-justify mt-4 fs-5'>
                        <span className='fw-bold'>2.</span>
                        Surat Kuasa KPA/Pemimpin BLU kepada Kuasa BUN
                        Pusat/Daerah sesuai format lampiran PMK No:
                        182/PMK.05/2017.
                      </li>
                    </ul>
                  </div>

                  <hr className='garis-pemisah' />

                  {/* Rekening Khusus Untuk Menampung Dana Hibah */}
                  <div className='dokumen-content flex-grow-1'>
                    <h4 className='mb-3 fw-semibold'>
                      Rekening Khusus Untuk Menampung Dana Hibah
                    </h4>
                    <ul className='list-unstyled'>
                      <li className='d-flex gap-3 my-2 text-justify mt-5 fs-5'>
                        <span className='fw-bold'>1.</span>
                        Satu rekening hibah langsung untuk satu register.
                      </li>
                      <li className='d-flex gap-3 my-2 text-justify mt-4 fs-5'>
                        <span className='fw-bold'>2.</span>
                        Melampirkan paling sedikit:
                      </li>
                      <ul className='mt-2 ps-5 text-justify fs-5'>
                        <li>
                          Surat permohonan persetujuan pembukaan rekening
                          pemerintah sesuai format lampiran PMK No:
                          182/PMK.05/2017.
                        </li>
                        <li>
                          Surat Kuasa KPA/Pemimpin BLU kepada Kuasa BUN
                          Pusat/Daerah sesuai format lampiran PMK No:
                          182/PMK.05/2017.
                        </li>
                        <li>
                          Salinan/copy surat penerbitan nomor register hibah.
                        </li>
                      </ul>
                    </ul>
                  </div>
                </div>

                {/* Tombol Download */}
                <div className='text-center mt-4'>
                  <a
                    href='https://docs.google.com/document/d/1KpOTOiRY9-egg2qSqk4ntSacQXEtmR4K/edit?tab=t.0'
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

export default LayananE
