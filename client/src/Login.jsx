// src/Auth.js
import  React, { useState } from 'react';
import { register, login } from './auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(true); // Toggle between login/register

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await register(email, password);
        alert('Registration successful');
      } else {
        await login(email, password);
        alert('Login successful');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form className="w-1/3 p-4 border rounded-lg" onSubmit={handleAuth}>
        <h2 className="text-xl font-semibold">{isRegister ? 'Register' : 'Login'}</h2>
        <div className="mb-4">
          <label className="block text-sm">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button type="submit" className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md">
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
      <button
        className="mt-4 text-sm text-blue-500"
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister ? 'Already have an account? Login' : 'New here? Register'}
      </button>
    </div>
  );
};

export default Login;
