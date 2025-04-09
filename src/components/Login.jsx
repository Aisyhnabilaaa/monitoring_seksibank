import React from 'react';

const Login = () => {
  return (
    <section className="login-container">
      <div className="login-box">
        <h1 className="login-title">MASUK</h1>
        <form className="login-form">
          <div className="input-group">
            <label className="input-label">Email</label>
            <input 
              type="text" 
              className="input-field-login" 
              placeholder="Email" 
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input 
              type="password" 
              className="input-field-login" 
              placeholder="*****" 
            />
          </div>
          <button 
            className="login-button">
            Login
          </button>
        </form>
        <p className="register-text">
          Belum punya akun? <a href="#" className="register-link">Daftar di sini</a>
        </p>
      </div>
    </section>
  );
};

export default Login;
