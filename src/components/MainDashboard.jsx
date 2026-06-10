import React, { useState } from 'react';
import { LayoutDashboard, FileText, Settings, LogOut, CheckSquare } from 'lucide-react';
import ChatInterface from './ChatInterface';

export default function MainDashboard({ onLogout }) {
  const [activeChannel, setActiveChannel] = useState('Sucursales');
  const [externalQuery, setExternalQuery] = useState(null);

  const handleSidebarClick = (query) => {
    setExternalQuery(query);
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Sidebar Fijo */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-col hidden md:flex shrink-0">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-zs-blue">
            Zurich<span className="text-zs-red">Santander</span>
          </h2>
          <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-widest font-semibold">
            Portal Comercial ONLINE 2.0
          </p>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <p className="text-[10px] font-bold text-gray-400 mb-3 px-2 uppercase tracking-widest">Herramientas</p>
          <nav className="space-y-1">
            <button
              onClick={() => handleSidebarClick('Dashboard Asesor')}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl font-medium transition-all text-gray-500 hover:bg-gray-50 hover:text-gray-800"
            >
              <LayoutDashboard size={19} />
              <span className="text-sm">Dashboard Asesor</span>
            </button>

            <button
              onClick={() => handleSidebarClick('Manual Póliza Vida MVP')}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl font-medium transition-all text-gray-500 hover:bg-gray-50 hover:text-gray-800"
            >
              <FileText size={19} />
              <span className="text-sm">Manual Póliza Vida MVP</span>
            </button>

            <button
              onClick={() => handleSidebarClick('Procesos MIDAS')}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl font-medium transition-all text-gray-500 hover:bg-gray-50 hover:text-gray-800"
            >
              <Settings size={19} />
              <span className="text-sm">Procesos MIDAS</span>
            </button>

            <button
              onClick={() => handleSidebarClick('Checklist Comercial')}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl font-medium transition-all text-gray-500 hover:bg-gray-50 hover:text-gray-800"
            >
              <CheckSquare size={19} />
              <span className="text-sm">Checklist Comercial</span>
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center space-x-3 mb-3 px-2">
            <div className="w-10 h-10 rounded-full bg-zs-blue text-white flex items-center justify-center font-bold text-base shadow-sm">
              VA
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Victor Arcila</p>
              <p className="text-[11px] text-gray-400">Asesor Nivel 2</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 text-gray-500 hover:text-zs-red transition-colors w-full px-2 py-2 rounded-xl hover:bg-red-50"
          >
            <LogOut size={16} />
            <span className="text-sm font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
          <div className="md:hidden">
            <h2 className="text-xl font-bold text-zs-blue">Z<span className="text-zs-red">S</span></h2>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="bg-gray-100 p-1 rounded-xl inline-flex shadow-inner">
              {['Sucursales', 'Contact Center', 'Telemarketing'].map((ch) => (
                <button
                  key={ch}
                  onClick={() => setActiveChannel(ch)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeChannel === ch
                      ? 'bg-white text-zs-blue shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-gray-400 hidden md:block">
            Canal: <span className="font-semibold text-gray-700">{activeChannel}</span>
          </div>
        </header>

        <div className="flex-1 overflow-hidden flex flex-col p-5">
          <div className="mb-3 flex-shrink-0">
            <h1 className="text-xl font-bold text-gray-800">Asistente Inteligente FabIA</h1>
            <p className="text-gray-400 text-xs mt-0.5">Copiloto comercial interactivo</p>
          </div>
          <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col min-h-0">
            <ChatInterface externalQuery={externalQuery} onQueryHandled={() => setExternalQuery(null)} />
          </div>
        </div>
      </main>
    </div>
  );
}
