// import { useState } from 'react'

// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import Swal from 'sweetalert2'

// const Login = () => {
//   const [form, setForm] = useState({
//     email: '',
//     satkerId: '',
//     password: ''
//   })
//   const navigate = useNavigate()

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async e => {
//     e.preventDefault()
//     try {
//       const res = await axios.post('http://localhost:3001/api/auth/login', form)
//       const token = res.data.data.token
//       const role = res.data.data.user.role
//       const id = res.data.data.user.id

//       localStorage.setItem('token', token)
//       localStorage.setItem('role', role)
//       localStorage.setItem('id', id) // Simpan ID pengguna

//       window.dispatchEvent(new Event('userLoggedIn'))

//       Swal.fire({
//         icon: 'success',
//         title: 'Login Berhasil!',
//         text: 'Selamat Datang Kembali!',
//         timer: 2000,
//         showConfirmButton: false
//       })

//       setTimeout(() => {
//         if (role === 'admin') {
//           console.log('Navigating to /admin')
//           navigate('/admin') // ⬅️ masuk ke route admin layout
//         } else {
//           console.log('Navigating to user layout')
//           navigate('/') // ⬅️ masuk ke user layout
//         }
//       }, 2000)
//     } catch (err) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Login Gagal!',
//         text: err.response?.data?.error || 'Terjadi kesalahan saat login'
//       })
//     }
//   }

//   return (
//     <section className='login-container'>
//       <div className='login-box'>
//         <h1 className='login-title'>MASUK</h1>
//         <form className='login-form' onSubmit={handleSubmit}>
//           <div className='input-group'>
//             <label className='input-label'>Email</label>
//             <input
//               type='text'
//               name='email'
//               className='input-field-login'
//               placeholder='Email'
//               onChange={handleChange}
//             />
//           </div>
//           <div className='input-group'>
//             <label className='input-label'>Password</label>
//             <input
//               type='password'
//               name='password'
//               className='input-field-login'
//               placeholder='*****'
//               onChange={handleChange}
//             />
//           </div>
//           <button className='login-button'>Login</button>
//         </form>
//       </div>
//     </section>
//   )
// }

// export default Login

import { useState, useEffect } from 'react' // Tambahkan useEffect
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    satkerId: '', // Pastikan ini ada
    password: ''
  })
  const [satkerOptions, setSatkerOptions] = useState([]) // State untuk daftar satker
  const navigate = useNavigate()

  // Ambil data satker saat komponen di-mount
  useEffect(() => {
    const fetchSatker = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/satker')
        setSatkerOptions(res.data)
      } catch (err) {
        console.error('Gagal mengambil data satker', err)
      }
    }
    fetchSatker()
  }, [])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // Validasi sederhana
    if (!form.satkerId) {
      return Swal.fire(
        'Peringatan',
        'Silakan pilih Satker terlebih dahulu',
        'warning'
      )
    }

    try {
      // Pastikan payload mengirimkan satkerId sebagai integer
      const payload = {
        ...form,
        satkerId: parseInt(form.satkerId)
      }

      const res = await axios.post(
        'http://localhost:3001/api/auth/login',
        payload
      )

      const { token, user } = res.data.data
      localStorage.setItem('token', token)
      localStorage.setItem('role', user.role)
      localStorage.setItem('id', user.id)
      localStorage.setItem('satkerId', user.satkerId) // Simpan juga satkerId jika perlu

      window.dispatchEvent(new Event('userLoggedIn'))

      Swal.fire({
        icon: 'success',
        title: 'Login Berhasil!',
        timer: 1500,
        showConfirmButton: false
      })

      setTimeout(() => {
        navigate(user.role === 'admin' ? '/admin' : '/')
      }, 1500)
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Login Gagal!',
        text: err.response?.data?.error || 'Email, Password, atau Satker salah'
      })
    }
  }

  return (
    <section className='login-container'>
      <div className='login-box'>
        <h1 className='login-title'>MASUK</h1>
        <form className='login-form' onSubmit={handleSubmit}>
          <div className='input-group'>
            <label className='input-label'>Email</label>
            <input
              type='email'
              name='email'
              className='input-field-login'
              placeholder='Email'
              onChange={handleChange}
              required
            />
          </div>

          {/* INPUT DROPDOWN SATKER */}
          <div className='input-group'>
            <label className='input-label'>Satker / Instansi</label>
            <select
              name='satkerId'
              className='input-field-login' // Gunakan class yang sama agar style konsisten
              onChange={handleChange}
              value={form.satkerId}
              required
            >
              <option value=''>-- Pilih Satker --</option>
              {satkerOptions.map(s => (
                <option key={s.id} value={s.id}>
                  {s.namaInstansi} ({s.kodeSatker})
                </option>
              ))}
            </select>
          </div>

          <div className='input-group'>
            <label className='input-label'>Password</label>
            <input
              type='password'
              name='password'
              className='input-field-login'
              placeholder='*****'
              onChange={handleChange}
              required
            />
          </div>

          <button className='login-button'>Login</button>
        </form>
      </div>
    </section>
  )
}

export default Login
