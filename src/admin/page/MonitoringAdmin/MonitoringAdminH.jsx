import { Container, Table } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";

import { useState } from "react";

const MonitoringAdminH = () => {
  const [statuses, setStatuses] = useState({
    1: "DIPROSES",
    2: "DITOLAK",
    3: "SELESAI"
  });

  const handleStatusChange = (id, newStatus) => {
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [id]: newStatus,
    }));
  };



  return (
    <Container className="p-5">
      <h2 className="text-center mb-4">Monitoring Penerbitan Bukti Penerimaan Negara</h2>

      <div className="table-responsive">
        <Table bordered hover>
          <thead className="table-light">
            <tr>
              <th>Kode Satker</th>
              <th>Nomor Telepon</th>
              <th>Alasan Retur</th>
              <th>Dokumen</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(statuses).map((id) =>(
              <tr key={id}>
                <td>{id}</td>
                <td>Nama Pengguna {id}</td>
                <td>Alasan {id}</td>
                <td>file</td>
                <td>
                  <select className="status-dropdown"
                  value={statuses[id]}
                  onChange={(e) => handleStatusChange (id, e.target.value)}
                  >
                    <option value="DIPROSES">DIPROSES</option>
                    <option value="DITOLAK">DITOLAK</option>
                    <option value="SELESAI">SELESAI</option>
                  </select>
                </td>
                <td>
                  <span className="actions">
                    <BsFillTrashFill className="delete-btn" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default MonitoringAdminH;
