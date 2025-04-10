import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', form);
      const token = res.data.data.token;
      localStorage.setItem('token', token); // Simpan token
      alert("Login berhasil");
      navigate("/dashboard"); // arahkan ke dashboard atau halaman utama
    } catch (err) {
      alert("Login gagal: " + err.response?.data?.error);
    }
  };

  return (
    <section className="login-container">
      <div className="login-box">
        <h1 className="login-title">MASUK</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="text"
              name="email"
              className="input-field-login"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              name="password"
              className="input-field-login"
              placeholder="*****"
              onChange={handleChange}
            />
          </div>
          <button className="login-button">Login</button>
        </form>
        <p className="register-text">
          Belum punya akun? <Link to="/register" className="register-link">Daftar di sini</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
