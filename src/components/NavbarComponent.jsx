import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";


 
const NavbarComponent = () => {
  const navigate = useNavigate();
  
  return (
    <Navbar expand="lg" className="bg-light shadow-md fixed-top">
      <Container>
      <Navbar.Brand as={NavLink} to="/" className="fw-bold text-lg d-flex align-items-center gap-2">
        <img src="/kppnlogo.png" alt="KPPN PALU" width="80" height="30" />
        <span className="fs-5 text-gray-600 hover:text-blue-500">TALISE</span>
      </Navbar.Brand>


        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex mx-auto gap-4">
            <NavLink to="/" className="nav-link text-gray-600 hover:text-blue-500">
              Home
            </NavLink>

            {/* Dropdown untuk Layanan */}
            <NavDropdown title="Layanan" id="navbarDropdown">
              <NavDropdown.Item as={NavLink} to="/layanan/Penyelesaian Retur Atas SP2D">Penyelesaian Retur Atas SP2D</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/layanan/Penerbitan Nota Konfirmasi Atas Penerimaan Negara">Penerbitan Nota Konfirmasi Atas Penerimaan Negara</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/layanan/Koreksi Penerimaan Negara Atas Setoran Satuan Kerja">Koreksi Penerimaan Negara Atas Setoran Satuan Kerja</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/layanan/Permohonan VOID SP2D">Permohonan VOID SP2D</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/layanan/Penerbitan Surat Persetujuan / Penolakan Pembukaan Rekening Satker">Penerbitan Surat Persetujuan / Penolakan Pembukaan Rekening Satker</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/layanan/Laporan Pembukaan / Penutupan Rekening">Laporan Pembukaan / Penutupan Rekening</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/layanan/Pengembalian PFK">Pengembalian PFK</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/layanan/Penerbitan Bukti Penerimaan Negara">Penerbitan Bukti Penerimaan Negara</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Pengajuan Dokumen" id="navbarDropdown">
              <NavDropdown.Item as={NavLink} to="/dokumen/Penyelesaian Retur Atas SP2D">Penyelesaian Retur Atas SP2D</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/dokumen/Penerbitan Nota Konfirmasi Atas Penerimaan Negara">Penerbitan Nota Konfirmasi Atas Penerimaan Negara</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/dokumen/Koreksi Penerimaan Negara Atas Setoran Satuan Kerja">Koreksi Penerimaan Negara Atas Setoran Satuan Kerja</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/dokumen/Permohonan VOID SP2D">Permohonan VOID SP2D</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/dokumen/Penerbitan Surat Persetujuan / Penolakan Pembukaan Rekening Satker">Penerbitan Surat Persetujuan / Penolakan Pembukaan Rekening Satker</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/dokumen/Laporan Pembukaan / Penutupan Rekening">Laporan Pembukaan / Penutupan Rekening</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/dokumen/Pengembalian PFK">Pengembalian PFK</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/dokumen/Penerbitan Bukti Penerimaan Negara">Penerbitan Bukti Penerimaan Negara</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/dokumen/Pengembalian PNBP">Pengembalian PNBP</NavDropdown.Item>
            </NavDropdown>

            {/* <NavDropdown title="Monitoring" id="navbarDropdown">
              <NavDropdown.Item as={NavLink} to="/monitoring/Penyelesaian Retur Atas SP2D">Penyelesaian Retur Atas SP2D</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/monitoring/Penerbitan Nota Konfirmasi Atas Penerimaan Negara">Penerbitan Nota Konfirmasi Atas Penerimaan Negara</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/monitoring/Koreksi Penerimaan Negara Atas Setoran Satuan Kerja">Koreksi Penerimaan Negara Atas Setoran Satuan Kerja</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/monitoring/Permohonan VOID SP2D">Permohonan VOID SP2D</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/monitoring/Penerbitan Surat Persetujuan / Penolakan Pembukaan Rekening Satker">Penerbitan Surat Persetujuan / Penolakan Pembukaan Rekening Satker</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/monitoring/Laporan Pembukaan / Penutupan Rekening">Laporan Pembukaan / Penutupan Rekening</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/monitoring/Pengembalian PFK">Pengembalian PFK</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/monitoring/Penerbitan Bukti Penerimaan Negara">Penerbitan Bukti Penerimaan Negara</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/monitoring/Pengembalian PNBP">Pengembalian PNBP</NavDropdown.Item>
            </NavDropdown> */}


            <NavLink to="/monitoring" className="nav-link text-gray-600 hover:text-blue-500">
              Monitoring
            </NavLink>
          </Nav>

          <div className="d-flex gap-4">
          <button className="btn btn-outline-primary" onClick={() => navigate("/login")}>
            Masuk
          </button>
            <button className="btn btn-outline-primary" onClick={() => navigate("/register")}>
              Daftar
            </button>

          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
