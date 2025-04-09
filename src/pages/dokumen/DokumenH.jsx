import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const DokumenH = () => {
  const [values, setValues] = useState({
    kode: "",
    contact: "",
    unggah: null, // Default file
  });

  const [telegramStatus, setTelegramStatus] = useState(""); // Untuk pertanyaan Telegram
  const [selectedReason, setSelectedReason] = useState(""); // Untuk alasan retur

  const handleChanges = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "telegram") {
      setTelegramStatus(value);
      if (value === "Iya") {
        setValues({ ...values, contact: "" }); // Reset contact jika memilih "Iya"
      }
    } else {
      setValues({
        ...values,
        [name]: type === "file" ? (files.length > 0 ? files[0] : null) : value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simpan data yang akan dikirim
    const formData = new FormData();
    formData.append("kode", values.kode);
    formData.append("contact", telegramStatus === "Tidak" ? values.contact : "Tergabung di Telegram");
    formData.append("unggah", values.unggah);

    console.log("Data yang akan dikirim:", Object.fromEntries(formData.entries()));

    // Kirim ke backend (Opsional)
    // fetch('/api/upload', {
    //   method: 'POST',
    //   body: formData
    // })
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.error("Error:", error));
  };

  return (
    <div>
      {/* Header */}
      <header className="header-dokumen">
        <Container fluid>
          <Row className="dokumenheader-box d-flex align-items-center justify-content-center">
            <Col xs={12} md={6} className="text-center text-md-start d-flex flex-column justify-content-center">
              <div className="dokumenheader-title-container">
                <h1 className="dokumenheader-title">Penerbitan Bukti Penerimaan Negara (Bukti Potong)</h1>
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

              {/* Nomor Telepon dan Telegram */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4}>Nomor Telepon</Form.Label>
                <Col sm={8}>
                  <p>Apakah Anda tergabung dengan Telegram KPPN Palu?</p>
                  <Form.Check
                    type="radio"
                    label="Iya"
                    name="telegram"
                    value="Iya"
                    onChange={handleChanges}
                    checked={telegramStatus === "Iya"}
                  />
                  <Form.Check
                    type="radio"
                    label="Tidak"
                    name="telegram"
                    value="Tidak"
                    onChange={handleChanges}
                    checked={telegramStatus === "Tidak"}
                  />

                  {telegramStatus === "Tidak" && (
                    <Form.Control
                      type="text"
                      placeholder="Masukkan Nomor Telepon Anda"
                      name="contact"
                      value={values.contact}
                      onChange={handleChanges}
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
                  {values.unggah && (
                    <p className="mt-2 text-success">File: {values.unggah.name}</p>
                  )}
                  <p className="fs-6 text-warning">Silahkan unggah dokumen kelengkapan dalam format .pdf dan ADK dalam format .txt</p>
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

export default DokumenH;
