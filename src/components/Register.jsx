import React from 'react';

const Register = () => {
  return (
    <section className="register-container mt-5">
      <div className="register-box">
        <h1 className="register-title">Daftar akun</h1>
        <form className="register-form">
          <div className="input-group">
            <label className="input-label">Nama Lengkap</label>
            <input type="text" className="input-field" placeholder="Nama Lengkap" />
          </div>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input type="email" className="input-field" placeholder="Email" />
          </div>
          <div className="input-group">
            <label className="input-label">No Telepon</label>
            <input type="tel" className="input-field" placeholder="No Telepon" />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input type="password" className="input-field" placeholder="*****" />
          </div>
          <button className="register-button">Register</button>
        </form>
        <p className="login-text">
          Sudah punya akun? <a href="#" className="login-link">Masuk di sini</a>
        </p>
      </div>
    </section>
  );
};

export default Register;
