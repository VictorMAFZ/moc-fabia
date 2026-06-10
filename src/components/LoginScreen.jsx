import React, { useState } from 'react';
import { ShieldCheck, TrendingUp, Briefcase } from 'lucide-react';

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin();
    }
  };

  return (
    <div className="flex h-screen w-full bg-white">
      {/* Lado Izquierdo: Marca y Propuesta de Valor */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-zs-blue to-blue-800 text-white p-12 relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <polygon fill="white" points="0,100 100,0 100,100" />
          </svg>
        </div>
        
        <div className="z-10 max-w-md">
          {/* Logo Corporativo */}
          <div className="h-20 w-64 overflow-hidden flex items-center justify-center relative bg-white rounded-2xl shadow-md mb-8 border border-white/10 animate-fade-in-up">
            <img 
              src="/images/logo-zurich-santander.webp" 
              alt="Zurich Santander Logo" 
              className="h-36 w-auto max-w-none object-contain absolute"
            />
          </div>
          <h1 className="text-5xl font-bold mb-6 leading-tight">Seguros ONLINE 2.0</h1>
          <p className="text-xl text-blue-100 mb-12">El portal comercial avanzado potenciado con inteligencia artificial para nuestros asesores.</p>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <ShieldCheck size={28} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Póliza Vida MVP</h3>
                <p className="text-blue-100 text-sm">Cotización y emisión instantánea.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <TrendingUp size={28} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Venta Inteligente</h3>
                <p className="text-blue-100 text-sm">Asistencia de FabIA en tiempo real.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <Briefcase size={28} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Gestión MIDAS</h3>
                <p className="text-blue-100 text-sm">Sincronización total con sistemas core.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lado Derecho: Formulario de Login */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 lg:p-24 bg-zs-gray">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8 flex flex-col items-center">
            {/* Logo de contingencia para pantallas sin panel izquierdo y refuerzo de marca */}
            <div className="h-20 w-64 overflow-hidden flex items-center justify-center relative bg-white rounded-2xl border border-gray-100 shadow-sm mb-4">
              <img 
                src="/images/logo-zurich-santander.webp" 
                alt="Zurich Santander Logo" 
                className="h-36 w-auto max-w-none object-contain absolute"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Bienvenido</h2>
            <p className="text-gray-500 mt-2">Ingresa tus credenciales corporativas</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Usuario (RUT)</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-zs-blue focus:border-zs-blue transition-colors outline-none"
                placeholder="Ej: 12.345.678-9"
                required
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                <a href="#" className="text-sm text-zs-blue hover:underline">¿Olvidaste tu clave?</a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-zs-blue focus:border-zs-blue transition-colors outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-zs-red hover:bg-red-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              Ingresar
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Zurich Santander Seguros de Vida S.A.</p>
            <p className="mt-1">Uso exclusivo para asesores y fuerza de ventas.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
