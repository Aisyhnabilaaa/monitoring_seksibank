import { Container, Table } from "react-bootstrap";

const MonitoringI = () => {
  return (
    <Container className="mt-5 p-5">
      <h2 className="text-center mb-4">Monitoring Pengembalian PNBP</h2>

      <div className="table-responsive">
        <Table bordered hover>
          <thead className="table-light">
            <tr>
              <th>Pihak Pengaju</th>
              <th>Kode Satker / Nama Pemda</th>
              <th>Nomor Telepon</th>
              <th>Dokumen</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="5" className="text-center text-muted">
                Tidak ada data tersedia
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default MonitoringI;
