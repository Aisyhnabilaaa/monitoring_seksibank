import { Container, Row, Col } from "react-bootstrap";

const LayananF = () => {
  return (
    <div className="Layanan-D">
      {/* Bagian Header Full Width */}
      <header className="header-layanan-D">
        <Container fluid> {/* Menggunakan container-fluid untuk full width */}
          <Row className="layananheader-box d-flex align-items-center justify-content-center">
            <Col xs={12} md={6} className="text-center text-md-start d-flex flex-column justify-content-center">
              <div className="layananheader-title-D-container">
                <h1 className="layananheader-title-D">
                Laporan Pembukaan / Penutupan Rekening
                </h1>
              </div>
            </Col>
          </Row>
        </Container>
      </header>

      {/* Bagian Tambahan */}
      <section className="layanan-content py-5">
        <Container>
          <Row className="d-flex justify-content-center text-center">
            {/* Kolom - Teks */}
            <Col xs={12} md={8} lg={6}> {/* Sesuaikan ukuran agar tetap responsif */}
              <span className="badge bg-purple text-white px-3 py-2 mb-3">Informasi</span>
              <h2 className="fw-bold text-dark">
                Layanan<br />
                <span className="text-retur">Laporan Pembukaan / Penutupan Rekening</span> 
              </h2>
              <p className="text-black text-justify">
              KPA/ Kepala Satuan Kerja/ Pimpinan BLU harus menyampaikan laporan pembukaan Rekening kepada Kuasa BUN di Daerah paling lambat:
              </p>
              <ul className="list-unstyled text-justify">
                    <li className="list-item-bordered d-flex align-items-center gap-2">
                        <span className="text-purple ">●</span>20 (dua puluh) hari kerja sejak terbitnya surat persetujuan pembukaan Rekening; dan
                    </li>
                    <li className="list-item-bordered d-flex align-items-center gap-2">
                        <span className="text-purple">●</span>10 (sepuluh) hari kerj a sej ak pembukaan rekening pengelolaan kas BLU dalam bentuk deposito.
                    </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>


            {/* Wrapper dengan background putih */}
            <div className="wrapper">
                  <h1 className="dokjudul-B text-3xl fw-bold mb-5 text-center">Dokumen Persyaratan</h1>

                  {/* Membuat kedua bagian berdampingan di layar besar dan stacking di layar kecil */}
                  <Container>
                    <Row className="align-items-start">
                      {/* Laporan Pembukaan Rekening */}
                      <Col xs={20} lg={6}>
                        <section className="dokkelengkapan-B py-5">
                          <h3 className="my-2 fw-semibold">Laporan Pembukaan Rekening</h3>
                          <ul className="list-unstyled">
                            <li className="d-flex gap-3 my-2 text-justify fs-5">
                              <span className="fw-bold">1.</span>
                              Surat Laporan Pembukaan Rekening sesuai format terlampir.
                            </li>
                            <li className="d-flex gap-3 my-2 text-justify fs-5">
                              <span className="fw-bold">2.</span>
                              Rekening koran.
                            </li>
                          </ul>
                          <div className="text-center mt-5">
                              <a 
                                href="https://docs.google.com/document/d/11ziuH9X2x-KxoIpC2ZjMAEGNRYDp8EQ3/edit?tab=t.0" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="layanan-btn">
                                Download Blanko
                              </a>

                          </div>
                        </section>
                      </Col>

                      {/* Laporan Penutupan Rekening */}
                      <Col xs={12} lg={6}>
                        <section className="dokkelengkapan-B py-5">
                          <h3 className="my-2 fw-semibold">Laporan Penutupan Rekening</h3>
                          <ul className="list-unstyled">
                            <li className="d-flex gap-3 my-2 text-justify fs-5">
                              <span className="fw-bold">1.</span>
                              Surat Laporan Penutupan Rekening sesuai format terlampir.
                            </li>
                            <li className="d-flex gap-3 my-2 text-justify fs-5">
                              <span className="fw-bold">2.</span>
                              Rekening koran.
                            </li>
                          </ul>
                          <div className="text-center mt-5">
                                <a 
                                  href="https://docs.google.com/document/d/1r_XAM3Lr3n09t2uRy57tNE_4kEyhG2Ey/edit?tab=t.0" 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="layanan-btn"
                                  >
                                  Download Blanko
                                </a>
                          </div>
                        </section>
                      </Col>
                    </Row>
                  </Container>
                </div>
        

        {/* Bagian Perhatian dalam Retur */}
        <section className="perhatian-retur py-5">
        <Container>
            {/* Judul Section */}
            <Row className="text-center mb-5">
            <Col>
                <h2 className="fw-bold text-dark">
                Silahkan Disini
                </h2>
            </Col>
            </Row>
        </Container>
        </section>


    </div>
  );
};

export default LayananF;
