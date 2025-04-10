import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({
    namaLengkap: '',
    email: '',
    noTelepon: '',
    password: '',
  });
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', form);
      console.log('Register success:', response.data);
    } catch (err) {
      console.error('Error response:', err.response.data); // ← Lihat error-nya di sini
    }
  };
    

  return (
    <section className="register-container mt-5">
      <div className="register-box">
        <h1 className="register-title">Daftar akun</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Nama Lengkap</label>
            <input name="namaLengkap" type="text" className="input-field" placeholder="Nama Lengkap" onChange={handleChange} />
          </div>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input name="email" type="email" className="input-field" placeholder="Email" onChange={handleChange} />
          </div>
          <div className="input-group">
            <label className="input-label">No Telepon</label>
            <input name="noTelepon" type="tel" className="input-field" placeholder="No Telepon" onChange={handleChange} />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input name="password" type="password" className="input-field" placeholder="*****" onChange={handleChange} />
          </div>
          <button className="register-button">Register</button>
        </form>
        <p className="login-text">
          Sudah punya akun? <a href="/login" className="login-link">Masuk di sini</a>
        </p>
      </div>
    </section>
  );
};

export default Register;
