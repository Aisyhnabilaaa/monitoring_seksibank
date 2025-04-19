import { Routes, Route } from 'react-router-dom'

import UserLayout from './layouts/UserLayout'
import AdminLayout from './admin/AdminLayout'
import BerandaAdmin from './admin/page/berandaAdmin'

import HomePage from './pages/HomePage'
import Monitoring from './pages/MonitoringPage'
import LayananPage from './pages/LayananPage'
import Dokumen from './pages/DokumenPage'

import Login from './components/Login'
import Register from './components/Register'

import LayananA from './pages/layanan/LayananA'
import LayananB from './pages/layanan/LayananB'
import LayananC from './pages/layanan/LayananC'
import LayananD from './pages/layanan/LayananD'
import LayananE from './pages/layanan/LayananE'
import LayananF from './pages/layanan/LayananF'
import LayananG from './pages/layanan/LayananG'
import LayananH from './pages/layanan/LayananH'

import DokumenA from './pages/dokumen/DokumenA'
import DokumenB from './pages/dokumen/DokumenB'
import DokumenC from './pages/dokumen/DokumenC'
import DokumenD from './pages/dokumen/DokumenD'
import DokumenE from './pages/dokumen/DokumenE'
import DokumenF from './pages/dokumen/DokumenF'
import DokumenG from './pages/dokumen/DokumenG'
import DokumenH from './pages/dokumen/DokumenH'
import DokumenI from './pages/dokumen/DokumenI'

import MonitoringA from './pages/monitoring/MonitoringA'
import MonitoringB from './pages/monitoring/MonitoringB'
import MonitoringC from './pages/monitoring/MonitoringC'
import MonitoringD from './pages/monitoring/MonitoringD'
import MonitoringE from './pages/monitoring/MonitoringE'
import MonitoringF from './pages/monitoring/MonitoringF'
import MonitoringG from './pages/monitoring/MonitoringG'
import MonitoringH from './pages/monitoring/MonitoringH'
import MonitoringI from './pages/monitoring/MonitoringI'

import MonitoringAdminA from './admin/page/MonitoringAdmin/MonitoringAdminA'
import MonitoringAdminB from './admin/page/MonitoringAdmin/MonitoringAdminB'
import MonitoringAdminC from './admin/page/MonitoringAdmin/MonitoringAdminC'
import MonitoringAdminD from './admin/page/MonitoringAdmin/MonitoringAdminD'
import MonitoringAdminE from './admin/page/MonitoringAdmin/MonitoringAdminE'
import MonitoringAdminF from './admin/page/MonitoringAdmin/MonitoringAdminF'
import MonitoringAdminG from './admin/page/MonitoringAdmin/MonitoringAdminG'
import MonitoringAdminH from './admin/page/MonitoringAdmin/MonitoringAdminH'
import MonitoringAdminI from './admin/page/MonitoringAdmin/MonitoringAdminI'

function App () {
  return (
    <Routes>
      {/* Routes untuk User */}
      <Route path='/' element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path='monitoring' element={<Monitoring />} />
        <Route path='layanan' element={<LayananPage />} />
        <Route path='dokumen' element={<Dokumen />} />

        {/* Layanan Routes */}
        <Route
          path='layanan/Penyelesaian Retur Atas SP2D'
          element={<LayananA />}
        />
        <Route
          path='layanan/Penerbitan Nota Konfirmasi Atas Penerimaan Negara'
          element={<LayananB />}
        />
        <Route
          path='layanan/Koreksi Penerimaan Negara Atas Setoran Satuan Kerja'
          element={<LayananC />}
        />
        <Route path='layanan/Permohonan VOID SP2D' element={<LayananD />} />
        <Route
          path='layanan/Penerbitan Surat Persetujuan / Penolakan Pembukaan Rekening Satker'
          element={<LayananE />}
        />
        <Route
          path='layanan/Laporan Pembukaan / Penutupan Rekening'
          element={<LayananF />}
        />
        <Route path='layanan/Pengembalian PFK' element={<LayananG />} />
        <Route
          path='layanan/Penerbitan Bukti Penerimaan Negara'
          element={<LayananH />}
        />

        {/* Dokumen Routes */}
        <Route
          path='dokumen/Penyelesaian Retur Atas SP2D'
          element={<DokumenA />}
        />
        <Route
          path='dokumen/Penerbitan Nota Konfirmasi Atas Penerimaan Negara'
          element={<DokumenB />}
        />
        <Route
          path='dokumen/Koreksi Penerimaan Negara Atas Setoran Satuan Kerja'
          element={<DokumenC />}
        />
        <Route path='dokumen/Permohonan VOID SP2D' element={<DokumenD />} />
        <Route
          path='dokumen/Penerbitan Surat Persetujuan / Penolakan Pembukaan Rekening Satker'
          element={<DokumenE />}
        />
        <Route
          path='dokumen/Laporan Pembukaan / Penutupan Rekening'
          element={<DokumenF />}
        />
        <Route path='dokumen/Pengembalian PFK' element={<DokumenG />} />
        <Route
          path='dokumen/Penerbitan Bukti Penerimaan Negara'
          element={<DokumenH />}
        />
        <Route path='dokumen/Pengembalian PNBP' element={<DokumenI />} />

        {/* Monitoring Routes */}
        <Route
          path='monitoring/Penyelesaian Retur Atas SP2D'
          element={<MonitoringA />}
        />
        <Route
          path='monitoring/Penerbitan Nota Konfirmasi Atas Penerimaan Negara'
          element={<MonitoringB />}
        />
        <Route
          path='monitoring/Koreksi Penerimaan Negara Atas Setoran Satuan Kerja'
          element={<MonitoringC />}
        />
        <Route
          path='monitoring/Permohonan VOID SP2D'
          element={<MonitoringD />}
        />
        <Route
          path='monitoring/Penerbitan Surat Persetujuan / Penolakan Pembukaan Rekening Satker'
          element={<MonitoringE />}
        />
        <Route
          path='monitoring/Laporan Pembukaan / Penutupan Rekening'
          element={<MonitoringF />}
        />
        <Route path='monitoring/Pengembalian PFK' element={<MonitoringG />} />
        <Route
          path='monitoring/Penerbitan Bukti Penerimaan Negara'
          element={<MonitoringH />}
        />
        <Route path='monitoring/Pengembalian PNBP' element={<MonitoringI />} />

        {/* Login & Register */}
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>

      {/* Routes untuk Admin */}
      <Route path='/admin' element={<AdminLayout />}>
        <Route index element={<BerandaAdmin />} />
        <Route path='monitoring/a' element={<MonitoringAdminA />} />
        <Route path='monitoring/b' element={<MonitoringAdminB />} />
        <Route path='monitoring/c' element={<MonitoringAdminC />} />
        <Route path='monitoring/d' element={<MonitoringAdminD />} />
        <Route path='monitoring/e' element={<MonitoringAdminE />} />
        <Route path='monitoring/f' element={<MonitoringAdminF />} />
        <Route path='monitoring/g' element={<MonitoringAdminG />} />
        <Route path='monitoring/h' element={<MonitoringAdminH />} />
        <Route path='monitoring/i' element={<MonitoringAdminI />} />
      </Route>
    </Routes>
  )
}

export default App
