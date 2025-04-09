import { Container, Table } from "react-bootstrap";

const MonitoringC = () => {
  return (
    <Container className="mt-5 p-5">
      <h2 className="text-center mb-4">Monitoring Koreksi Penerimaan Negara</h2>

      <div className="table-responsive">
        <Table bordered hover>
          <thead className="table-light">
            <tr>
              <th>Kode Satker / Nama Instansi</th>
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

export default MonitoringC;
