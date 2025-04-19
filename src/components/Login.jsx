import { useState } from 'react'

import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', form)
      const token = res.data.data.token
      const role = res.data.data.user.role

      localStorage.setItem('token', token)
      localStorage.setItem('role', role)

      Swal.fire({
        icon: 'success',
        title: 'Login Berhasil!',
        text: 'Selamat Datang Kembali!',
        timer: 2000,
        showConfirmButton: false
      })

      setTimeout(() => {
        if (role === 'admin') {
          console.log('Navigating to /admin')
          navigate('/admin') // ⬅️ masuk ke route admin layout
        } else {
          console.log('Navigating to user layout')
          navigate('/') // ⬅️ masuk ke user layout
        }
      }, 2000)
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Login Gagal!',
        text: err.response?.data?.error || 'Terjadi kesalahan saat login'
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
              type='text'
              name='email'
              className='input-field-login'
              placeholder='Email'
              onChange={handleChange}
            />
          </div>
          <div className='input-group'>
            <label className='input-label'>Password</label>
            <input
              type='password'
              name='password'
              className='input-field-login'
              placeholder='*****'
              onChange={handleChange}
            />
          </div>
          <button className='login-button'>Login</button>
        </form>
        <p className='register-text'>
          Belum punya akun?{' '}
          <Link to='/register' className='register-link'>
            Daftar di sini
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Login
