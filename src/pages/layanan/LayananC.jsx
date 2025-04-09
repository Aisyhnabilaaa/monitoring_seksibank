import { Container, Row, Col } from "react-bootstrap";


const LayananC = () => {
  return (
    <div className="Layanan-C">
      {/* Bagian Header Full Width */}
      <header className="header-layanan-C">
        <Container fluid> {/* Menggunakan container-fluid untuk full width */}
          <Row className="layananheader-box d-flex align-items-center justify-content-center">
            <Col xs={12} md={6} className="text-center text-md-start d-flex flex-column justify-content-center">
              <div className="layananheader-title-C-container">
                <h1 className="layananheader-title-C">
                Koreksi penerimaan Negara Atas Setoran Satuan Kerja
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
                <span className="text-retur">Koreksi Penerimaan Negara</span> 
              </h2>
              <p className="text-black text-justify">
                Koreksi Data adalah proses memperbaiki data transaksi tanpa mengubah data awal dan hasil koreksi membentuk history. Data transaksi keuangan dapat dilakukan koreksi oleh KPPN atau Kantor Pusat Direktorat Jenderal Perbendaharaan.
              </p>
            </Col>
          </Row>
        </Container>
      </section>


            {/* Bagian Tambahan*/}
            <section className="layanan-content py-5">
              <Container>
                {/* Judul Utama */}
                <Row className="mb-4">
                  <Col xs={12} className="text-center">
                    <h1 className="sistem-text-C fw-bold">Sistem, Mekanisme, dan Prosedur</h1>
                  </Col>
                </Row>

                <Row className="d-flex justify-content-center">
                  {/* Kolom Kiri - Setoran Satuan Kerja */}
                  <Col xs={12} md={6}>
                    <h3 className="fw-bold text-center">
                      Koreksi Penerimaan Negara Atas <span className="layananretur satuan-text">Setoran Satuan Kerja</span>
                    </h3>
                    <ul className="list-unstyled">
                      <li className="list-item-bordered d-flex align-items-start gap-2">
                        <span className="text-purple">●</span>
                        <span>Satker menyampaikan dokumen kelengkapan koreksi penerimaan negara ke KPPN melalui sarana yang tersedia.</span>
                      </li>
                      <li className="list-item-bordered d-flex align-items-start gap-2">
                        <span className="text-purple">●</span>
                        <span>KPPN melakukan pemeriksaan atas dokumen yang disampaikan oleh satker.</span>
                      </li>
                      <li className="list-item-bordered d-flex align-items-start gap-2">
                        <span className="text-purple">●</span>
                        <span>Apabila dokumen telah sesuai dan dalam lingkup KPPN Palu, maka KPPN melakukan unggah ADK Koreksi pada aplikasi yang disediakan oleh DJPb. Jika terkait BA pada KPPN lain, maka KPPN Palu akan meneruskan permohonan ke KPPN terkait.</span>
                      </li>
                      <li className="list-item-bordered d-flex align-items-start gap-2">
                        <span className="text-purple">●</span>
                        <span>KPPN mengunduh Nota Perbaikan Transaksi Penerimaan Negara atas koreksi yang dilakukan.</span>
                      </li>
                      <li className="list-item-bordered d-flex align-items-start gap-2">
                        <span className="text-purple">●</span>
                        <span>KPPN menyampaikan surat tanggapan koreksi beserta Nota Perbaikan Transaksi ke satker.</span>
                      </li>
                    </ul>
                  </Col>

                  {/* Kolom Kanan - Setoran Pemerintah Daerah */}
                  <Col xs={12} md={6}>
                    <h3 className="fw-bold text-center">
                      Koreksi Penerimaan Negara Atas <span className="layananretur satuan-text">Setoran Pemerintah Daerah</span>
                    </h3>
                    <ul className="list-unstyled">
                      <li className="list-item-bordered d-flex align-items-start gap-2">
                        <span className="text-purple">●</span>
                        <span>Pemda menyampaikan dokumen kelengkapan koreksi penerimaan negara ke KPPN melalui sarana yang tersedia.</span>
                      </li>
                      <li className="list-item-bordered d-flex align-items-start gap-2">
                        <span className="text-purple">●</span>
                        <span>KPPN melakukan pemeriksaan atas dokumen yang disampaikan oleh Pemda.</span>
                      </li>
                      <li className="list-item-bordered d-flex align-items-start gap-2">
                        <span className="text-purple">●</span>
                        <span>Apabila dokumen telah sesuai, maka KPPN membuat surat penerusan permohonan Koreksi Penerimaan Negara kepada KPPN Khusus Penerimaan.</span>
                      </li>
                      <li className="list-item-bordered d-flex align-items-start gap-2">
                        <span className="text-purple">●</span>
                        <span>Pegawai Seksi Bank menerbitkan Nota Konfirmasi Penerimaan Negara dengan cara mengunduhnya dari aplikasi.</span>
                      </li>
                      <li className="list-item-bordered d-flex align-items-start gap-2">
                        <span className="text-purple">●</span>
                        <span>Setelah proses selesai, KPPN membuat surat tanggapan koreksi penerimaan negara berdasarkan koreksi yang dilakukan oleh KPPN Khusus Penerimaan.</span>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </Container>
            </section>

      

        {/* Wrapper dengan background putih */}
        <div className="wrapper">
        {/* Bagian Dokumen Kelengkapan */}
        <section className="dokkelengkapan-C py-5">
        <Container>
          <Row className="align-items-center">
            {/* Judul */}
            <Col xs={12} className="text-center mb-4">
              <h1 className="dokjudul-C text-4xl fw-bold">
                Dokumen Kelengkapan Penerbitan Nota Konfirmasi Atas Penerimaan Negara
              </h1>
            </Col>
            {/*Daftar Dokumen */}
            <Col xs={12} lg={10} className="mx-auto">
              <div className="dokumen-list d-flex flex-column flex-lg-row align-items-start gap-5">
                <div className="dokumen-content flex-grow-1">
                  {[
                    { number: "1", desc: "Surat Permohonan Perbaikan Transaksi Penerimaan Negara" },
                    { number: "2", desc: "Daftar rincian perbaikan transsaksi penerimaan negara" },
                    { number: "3", desc: "Bukti Penerimaan Negara" },
                    { number: "4", desc: "ADK Koreksi Setoran, hasil dari SPAN EXT (Khusus satker)" }
                  ].map((item, index) => (
                    <div key={index} className="d-flex align-items-center gap-4 mb-3">
                      <div 
                        className="step-number d-flex align-items-center justify-content-center"
                      >
                        {item.number}
                      </div>
                      <p className="text-gray-100 mb-0 fs-5 fw-medium text-justify">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <a 
                  href="https://docs.google.com/document/d/1OG8LTjPzMgzFJ2wLOU0EEBaAhgCiQhhm/edit?tab=t.0" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="layanan-btn"
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
  );
};

export default LayananC;
