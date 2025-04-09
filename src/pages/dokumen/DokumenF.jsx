import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const DokumenF = () => {
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
                <h1 className="dokumenheader-title"> Permohonan Persetujuan Pembukaan Rekening Satker</h1>
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

              {/* Jenis Rekening */}
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4}>Jenis Rekening</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    name="contact"
                    placeholder="Masukkan Jenis Rekening                    "
                    onChange={handleChanges}
                    required
                    value={values.contact}
                  />
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
                  <p className="fs-6 text-warning">Silahkan Unggah Dokumen kelengkapan dalam format .pdf dan ADK dalam Format .txt</p>
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

export default DokumenF;
