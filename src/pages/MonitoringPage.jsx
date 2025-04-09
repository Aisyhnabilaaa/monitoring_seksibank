import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const MonitoringPage = () => {

  const daftarLayananRef = useRef(null);
  const navigate = useNavigate();

  return (
    <div>
                {/* Section Daftar Layanan */}
                <div ref={daftarLayananRef} className="mt-5 w-100 py-5">
            <Container>
              <Row className="text-center">
                <Col>
                  <h1 className="fw-bold">
                    <span className="text-daftar">Monitoring Layanan </span>
                    <span className="text-seksi">Seksi Bank KPPN Palu</span>
                  </h1>
                  <p>
                    Silahkan pilih menu layanan dibawah ini
                  </p>
                </Col>
              </Row>

              {/* Grid untuk tombol layanan */}
              <Row className="justify-content-center mt-3">
                {/* Baris pertama (4 tombol) */}
                <Col xs={12} md={25}>
                  <div className="d-flex flex-wrap justify-content-center gap-3">
                  <button className="layanan-btn" onClick={() => navigate("/monitoring/Penyelesaian Retur Atas SP2D")}>
                    Penyelesaian Retur atas SP2D
                  </button>
                  <button className="layanan-btn" onClick={() => navigate("/monitoring/Penerbitan Nota Konfirmasi Atas Penerimaan Negara")}>
                    Penerbitan Nota Konfirmasi Atas Penerimaan Negara
                  </button>
                  <button className="layanan-btn" onClick={() => navigate("/monitoring/Koreksi Penerimaan Negara Atas Setoran Satuan Kerja")}>
                    Koreksi penerimaan Negara Atas Setoran Satuan Kerja
                  </button>
                  <button className="layanan-btn" onClick={() => navigate("/monitoring/Permohonan VOID SP2D")}>
                    Permohonan VOID SP2D
                    </button>
                  </div>
                </Col>
              </Row>

              {/* Baris kedua (3 tombol) */}
              <Row className="justify-content-center mt-3">
                <Col xs={12} md={25}>
                  <div className="d-flex flex-wrap justify-content-center gap-3">
                  <button className="layanan-btn" onClick={() => navigate("/monitoring/Penerbitan Surat Persetujuan / Penolakan Pembukaan Rekening Satker")}>
                    Penerbitan surat persetujuan / penolakan pembukaan rekening satker
                    </button>
                    <button className="layanan-btn" onClick={() => navigate("/monitoring/Laporan Pembukaan / Penutupan Rekening")}>
                      Laporan Pembukaan / Penutupan Rekening
                    </button>
                    <button className="layanan-btn" onClick={() => navigate("/monitoring/Pengembalian PFK")}>
                      Pengembalian PFK
                    </button>
                    <button className="layanan-btn" onClick={() => navigate("/monitoring/Penerbitan Bukti Penerimaan Negara")}>
                    Penerbitan Bukti Penerimaan Negara
                    </button>
                    <button className="layanan-btn p-3" onClick={() => navigate("/monitoring/Pengembalian PNBP")}>
                    Pengembalian PNBP
                    </button>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
    </div>
  )
}

export default MonitoringPage