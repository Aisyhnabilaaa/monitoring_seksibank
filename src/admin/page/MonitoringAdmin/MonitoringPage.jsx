import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

const MonitoringPage = () => {
  const daftarLayananRef = useRef(null)
  const navigate = useNavigate()

  const layananList = [
    { label: 'Penyelesaian Retur atas SP2D', path: '/admin/monitoring/a' },
    {
      label: 'Penerbitan Nota Konfirmasi Atas Penerimaan Negara',
      path: '/admin/monitoring/b'
    },
    {
      label: 'Koreksi Penerimaan Negara Atas Setoran Satuan Kerja',
      path: '/admin/monitoring/c'
    },
    { label: 'Permohonan VOID SP2D', path: '/admin/monitoring/d' },
    {
      label:
        'Penerbitan Surat Persetujuan / Penolakan Pembukaan Rekening Satker',
      path: '/admin/monitoring/e'
    },
    {
      label: 'Laporan Pembukaan / Penutupan Rekening',
      path: '/admin/monitoring/f'
    },
    { label: 'Pengembalian PFK', path: '/admin/monitoring/g' },
    {
      label: 'Penerbitan Bukti Penerimaan Negara',
      path: '/admin/monitoring/h'
    },
    { label: 'Pengembalian PNBP', path: '/admin/monitoring/i' }
  ]

  return (
    <div className='mt-5'>
      <Container ref={daftarLayananRef} className='py-5'>
        <Row className='text-center mb-5'>
          <Col>
            <h1 className='fw-bold'>
              <span className='text-primary'>Monitoring Layanan </span>
              <span className='text-success'>Seksi Bank KPPN Palu</span>
            </h1>
            <p className='text-muted'>
              Silahkan pilih menu layanan di bawah ini
            </p>
          </Col>
        </Row>

        {/* Grid Layanan */}
        <Row className='g-4'>
          {layananList.map((layanan, index) => (
            <Col key={index} xs={12} sm={6} md={4}>
              <div
                onClick={() => navigate(layanan.path)}
                className='layanan-card d-flex align-items-center justify-content-center text-center'
                style={{
                  cursor: 'pointer',
                  backgroundColor: '#3c2465', // warna ungu yang elegan
                  color: 'white',
                  borderRadius: '10px',
                  minHeight: '150px', // Biar tinggi semua konsisten
                  padding: '20px',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
              >
                <h5 className='fw-semibold m-0'>{layanan.label}</h5>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default MonitoringPage
