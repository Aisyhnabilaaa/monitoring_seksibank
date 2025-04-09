import { Container, Table } from "react-bootstrap";

const MonitoringH = () => {
  return (
    <Container className="mt-5 p-5">
      <h2 className="text-center mb-4">Monitoring Penerbitan Bukti Penerimaan Negara</h2>

      <div className="table-responsive">
        <Table bordered hover>
          <thead className="table-light">
            <tr>
              <th>Kode Satker</th>
              <th>Nomor Telepon</th>
              <th>Dokumen</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="4" className="text-center text-muted">
                Tidak ada data tersedia
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default MonitoringH;
