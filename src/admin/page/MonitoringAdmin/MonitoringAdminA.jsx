import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";

const MonitoringAdminA = () => {
  const [returs, setReturs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/retur/admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReturs(response.data);
      } catch (error) {
        console.error("Gagal mengambil data retur:", error.response?.data || error.message);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:5000/api/retur/admin/${id}`, { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReturs((prev) =>
        prev.map((retur) => (retur.id === id ? { ...retur, status: newStatus } : retur))
      );
    } catch (error) {
      console.error("Gagal mengubah status:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/retur/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReturs((prev) => prev.filter((retur) => retur.id !== id));
    } catch (error) {
      console.error("Gagal menghapus:", error.response?.data || error.message);
    }
  };

  return (
    <Container className="p-5">
      <h2 className="text-center mb-4">Monitoring Penyelesaian Retur SP2D</h2>

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
            {returs.map((retur) => (
              <tr key={retur.id}>
                <td>{retur.kodeSatker}</td>
                <td>{retur.noTelpon}</td>
                <td>{retur.alasanRetur}</td>
                <td><a href={`http://localhost:5000/${retur.unggah_dokumen}`} target="_blank" rel="noreferrer">Lihat</a></td>
                <td>
                  <select value={retur.status} onChange={(e) => handleStatusChange(retur.id, e.target.value)}>
                    <option value="DIPROSES">DIPROSES</option>
                    <option value="DITOLAK">DITOLAK</option>
                    <option value="SELESAI">SELESAI</option>
                  </select>
                </td>
                <td>
                  <BsFillTrashFill className="delete-btn" onClick={() => handleDelete(retur.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default MonitoringAdminA;
