import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const DokumenA = () => {
  const [values, setValues] = useState({
    kode: "",
    contact: "",
    subject: "",
    unggah: null, // Default file
  });

  const [selectedReason, setSelectedReason] = useState(""); // Untuk alasan retur
  const [customReason, setCustomReason] = useState(""); // Untuk inputan custom

  const handleChanges = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "subject") {
      setSelectedReason(value);
    } else {
      setValues({
        ...values,
        [name]: type === "file" ? (files.length > 0 ? files[0] : null) : value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      ...values,
      alasanRetur: selectedReason === "lainnya" ? customReason : selectedReason,
    });
  };

  return (
    <div>
      {/* Header */}
      <header className="header-dokumen">
        <Container fluid>
          <Row className="dokumenheader-box d-flex align-items-center justify-content-center">
            <Col xs={12} md={6} className="text-center text-md-start d-flex flex-column justify-content-center">
              <div className="dokumenheader-title-container">
                <h1 className="dokumenheader-title">Penyelesaian Retur atas SP2D</h1>
              </div>
            </Col>
          </Row>
        </Container>
      </header>

      <Container>
        {/* Form */}
        <Row className="justify-content-center mt-4">
          <Col md={8} lg={10}>
            <Form onSubmit={handleSubmit} className="formulir">
              {/* Kode Satker */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4}>Kode Satker</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    name="kode"
                    placeholder="Masukkan Kode Satker"
                    onChange={handleChanges}
                    required
                    value={values.kode}
                  />
                </Col>
              </Form.Group>

              {/* Nomor Telepon */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4}>Nomor Telepon</Form.Label>
                <Col sm={8}>
                  <p>Apakah anda tergabung dengan telegram KPPN Palu?</p>
                  <Form.Check
                    type="radio"
                    label="Iya"
                    name="subject"
                    value="Iya"
                    onChange={handleChanges}
                    checked={selectedReason === "Iya"} // HARUSNYA === "Iya"
                  />
                  <Form.Check
                    type="radio"
                    label="Tidak"
                    name="subject"
                    value="tidak"
                    onChange={handleChanges}
                    checked={selectedReason === "tidak"}
                  />

                  {selectedReason === "tidak" && (
                    <Form.Control
                      type="text"
                      placeholder="Masukkan Nomor Telepon Anda"
                      value={customReason} // customReason belum dideklarasikan
                      onChange={(e) => setCustomReason(e.target.value)}
                      className="mt-2"
                      required
                    />
                  )}
                </Col>
              </Form.Group>

              {/* Alasan Retur */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4}>Alasan Retur</Form.Label>
                <Col sm={8}>
                  <Form.Check
                    type="radio"
                    label="Rekening Supplier Tidak Aktif / Salah / Tidak Ditemukan"
                    name="subject"
                    value="Rekening Supplier Tidak Aktif"
                    onChange={handleChanges}
                    checked={selectedReason === "Rekening Supplier Tidak Aktif"}
                  />
                  <Form.Check
                    type="radio"
                    label="Rekening Pasif/Tidak Aktif/Diblokir"
                    name="subject"
                    value="Rekening Pasif"
                    onChange={handleChanges}
                    checked={selectedReason === "Rekening Pasif"}
                  />
                  <Form.Check
                    type="radio"
                    label="Nomor Rekening Salah/Tidak Ditemukan"
                    name="subject"
                    value="Nomor Rekening Salah"
                    onChange={handleChanges}
                    checked={selectedReason === "Nomor Rekening Salah"}
                  />
                  <Form.Check
                    type="radio"
                    label="Yang lain:"
                    name="subject"
                    value="lainnya"
                    onChange={handleChanges}
                    checked={selectedReason === "lainnya"}
                  />
                  {selectedReason === "lainnya" && (
                    <Form.Control
                      type="text"
                      placeholder="Masukkan alasan lainnya"
                      value={customReason}
                      onChange={(e) => setCustomReason(e.target.value)}
                      className="mt-2"
                      required
                    />
                  )}
                </Col>
              </Form.Group>

              {/* Unggah Dokumen */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4}>Unggah Dokumen Persyaratan</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="file"
                    name="unggah"
                    onChange={handleChanges}
                    required
                  />
                  <p className="fs-6 text-warning">Harap jadikan dokumen persyaratan menjadi satu dokumen PDF</p>
                </Col>
              </Form.Group>

              {/* Tombol Submit */}
              <div className="text-end">
                <Button type="submit" variant="primary">Kirim</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DokumenA;
