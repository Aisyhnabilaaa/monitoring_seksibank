import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const DokumenI = () => {
  const [values, setValues] = useState({
    kode: "",
    contact: "",
    unggah: null, // Default file
  });

  const [selectedPihak, setSelectedPihak] = useState(""); // Pihak yang mengajukan
  const [selectedTelegram, setSelectedTelegram] = useState(""); // Keanggotaan Telegram
  const [customReason, setCustomReason] = useState(""); // Nomor telepon jika "Tidak"

  const handleChanges = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "pihak") {
      setSelectedPihak(value);
    } else if (name === "telegram") {
      setSelectedTelegram(value);
      if (value !== "tidak") {
        setCustomReason("");
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
    console.log({
      ...values,
      pihakYangMengajukan: selectedPihak,
      tergabungTelegram: selectedTelegram,
      nomorTelepon: selectedTelegram === "tidak" ? customReason : "Tergabung",
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
                <h1 className="dokumenheader-title">Pengembalian PNBP</h1>
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
              
              {/* Pihak yang mengajukan */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4}>Pihak yang mengajukan</Form.Label>
                <Col sm={8}>
                  <Form.Check
                    type="radio"
                    label="Satuan Kerja"
                    name="pihak"
                    value="Satuan Kerja"
                    onChange={handleChanges}
                    checked={selectedPihak === "Satuan Kerja"}
                  />
                  <Form.Check
                    type="radio"
                    label="Pemerintah Daerah"
                    name="pihak"
                    value="Pemerintah Daerah"
                    onChange={handleChanges}
                    checked={selectedPihak === "Pemerintah Daerah"}
                  />
                </Col>
              </Form.Group>

              {/* Kode Satker */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4}>Kode Satker / Nama Pemda</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    name="kode"
                    placeholder="Masukkan Kode Satker / Nama Pemda"
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
                  <p>Apakah Anda tergabung dengan Telegram KPPN Palu?</p>
                  <Form.Check
                    type="radio"
                    label="Iya"
                    name="telegram"
                    value="iya"
                    onChange={handleChanges}
                    checked={selectedTelegram === "iya"}
                  />
                  <Form.Check
                    type="radio"
                    label="Tidak"
                    name="telegram"
                    value="tidak"
                    onChange={handleChanges}
                    checked={selectedTelegram === "tidak"}
                  />

                  {selectedTelegram === "tidak" && (
                    <Form.Control
                      type="text"
                      placeholder="Masukkan Nomor Telepon Anda"
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

export default DokumenI;
