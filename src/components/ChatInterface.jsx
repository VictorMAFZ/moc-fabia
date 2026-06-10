import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, ChevronRight, AlertTriangle, Shield, TrendingUp, Zap, CheckCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const SUGGESTIONS = [
  "¿Qué cobertura tiene la póliza?",
  "¿Cuáles son los requisitos?",
  "Manejo de objeción por competencia",
  "¿Cómo funcionan los pagos PAT/PAC?"
];

// ─── Componentes Ricos ────────────────────────────────────────────────────────

const Motor3x3 = ({ onCardClick }) => {
  const products = [
    {
      title: 'Vida Plus',
      desc: 'Protección + Devolución',
      price: '$18.500/mes',
      icon: Shield,
      gradient: 'from-blue-500 to-blue-700',
      badge: 'Recomendado',
      badgeColor: 'bg-blue-100 text-blue-700',
      query: 'vida plus'
    },
    {
      title: 'Vida Ahorro',
      desc: 'Rentabilidad Garantizada',
      price: '$24.900/mes',
      icon: TrendingUp,
      gradient: 'from-emerald-500 to-emerald-700',
      badge: 'Mayor Retorno',
      badgeColor: 'bg-emerald-100 text-emerald-700',
      query: 'vida ahorro'
    },
    {
      title: 'Vida Flex',
      desc: 'Ajuste Dinámico Anual',
      price: 'Desde $12.000/mes',
      icon: Zap,
      gradient: 'from-purple-500 to-purple-700',
      badge: 'Más Flexible',
      badgeColor: 'bg-purple-100 text-purple-700',
      query: 'vida flex'
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
      className="mt-4 w-full"
    >
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        🏆 Motor de Recomendación — Alternativas Complementarias
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {products.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              onClick={() => onCardClick(p.query)}
              className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className={`bg-gradient-to-br ${p.gradient} p-4 flex items-center justify-between`}>
                <Icon size={22} className="text-white" />
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.badgeColor}`}>
                  {p.badge}
                </span>
              </div>
              <div className="p-3">
                <h4 className="font-bold text-gray-800 text-sm mb-1">{p.title}</h4>
                <p className="text-[11px] text-gray-500 mb-3 leading-snug">{p.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-700">{p.price}</span>
                  <button className="text-[10px] font-semibold bg-gray-100 text-gray-700 px-2 py-1 rounded-lg group-hover:bg-blue-700 group-hover:text-white transition-colors">
                    Explorar
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

const DerivarCoachButton = () => {
  const [state, setState] = useState('idle'); // idle | loading | success

  const handleClick = async () => {
    setState('loading');
    await new Promise(resolve => setTimeout(resolve, 2000));
    setState('success');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-3 w-full bg-red-50/50 p-4 rounded-xl border border-red-100">
      {state === 'idle' && (
        <button 
          onClick={handleClick}
          className="flex items-center gap-2 bg-[#EC0000] hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg group w-full justify-center"
        >
          <span className="text-base group-hover:animate-bounce">⚠️</span>
          <span>Derivar consulta a un Coach</span>
          <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </button>
      )}
      
      {state === 'loading' && (
        <button disabled className="flex items-center justify-center gap-2 bg-red-400 text-white px-5 py-2.5 rounded-xl text-sm font-semibold w-full cursor-wait">
          <Loader2 size={16} className="animate-spin" />
          <span>Derivando...</span>
        </button>
      )}

      {state === 'success' && (
        <div className="flex flex-col items-center justify-center bg-green-50 text-green-700 px-5 py-3 rounded-xl text-sm font-medium border border-green-200">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle size={18} className="text-green-500" />
            <span className="font-bold">Asignado con éxito</span>
          </div>
          <span className="text-xs text-green-600">Un Coach comercial se pondrá en contacto en breve.</span>
        </div>
      )}
    </motion.div>
  );
}

// ─── Helper de formateo ──────────────────────────────────────────────────────
const formatText = (text) => {
  return text.split('\n').map((line, i) => (
    <span key={i} className="block mb-1.5 last:mb-0">
      {line.split(/(\*\*.*?\*\*|\*.*?\*)/g).map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={j} className="italic">{part.slice(1, -1)}</em>;
        }
        return part;
      })}
    </span>
  ));
};


// ─── ChatInterface Principal ─────────────────────────────────────────────────

export default function ChatInterface({ externalQuery, onQueryHandled }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      text: '¡Hola! Soy FabIA, tu asistente comercial experto. Estoy aquí para actuar como tu copiloto interactivo de alta fidelidad. ¿En qué argumento de venta o proceso te puedo apoyar hoy?',
      showMotor: false,
      showEscalate: false,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (externalQuery) {
      handleSend(externalQuery);
      if (onQueryHandled) onQueryHandled();
    }
  }, [externalQuery]);

  const normalize = (text) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const getResponse = (rawText) => {
    const text = normalize(rawText);

    if (text.includes("procesos midas") || text.includes("midas")) {
      return { text: "¡Excelente elección! El sistema MIDAS es la clave para acelerar tus cierres y dar agilidad al proceso comercial...\n\n💡 **Tip de Ventas MIDAS (Acelerador en Tiempo Real)**:\nAl emitir la póliza en MIDAS, no le hables al cliente de 'un trámite administrativo largo'. Conviértelo en un valor tecnológico de la alianza Zurich Santander, hablándole de la 'Emisión y Activación Expresa'.", showMotor: false, showEscalate: false };
    }
    if (text.includes("vida plus") || (text.includes("plus") && !text.includes("ahorro") && !text.includes("flex"))) {
      return { text: "¡Excelente elección! El seguro comercial **Vida Plus** es ideal para clientes prudentes que buscan un gran incentivo de retorno...\n\n📊 **Propuesta de Valor de Vida Plus**:\n- **Protección + Devolución**: Devuelve hasta el 50% de las primas no utilizadas si no ha ocurrido ningún siniestro al cabo de 5 años...\n- **Ventaja de Cierre**: Dile al cliente: *'Con Vida Plus de Zurich Santander, usted no está perdiendo su dinero...'*", showMotor: false, showEscalate: false };
    }
    if (text.includes("vida ahorro") || text.includes("ahorro")) {
      return { text: "El seguro comercial **Vida Ahorro** combina de manera brillante la tranquilidad familiar con el crecimiento patrimonial estratégico de tus clientes...\n\n📈 **Propuesta de Valor de Vida Ahorro**:\n- **Rentabilidad Garantizada**: Invierte de forma transparente un porcentaje de su prima mensual directa en fondos mutuos seleccionados...\n- **Ventaja de Cierre**: Presenta esta opción diciéndole al cliente: *'Este no es un costo de protección tradicional, sino un vehículo de ahorro disciplinado...'*", showMotor: false, showEscalate: false };
    }
    if (text.includes("vida flex") || text.includes("flex")) {
      return { text: "El plan comercial **Vida Flex** es la respuesta moderna e indispensable para clientes jóvenes o trabajadores con flujos de ingresos variables...\n\n⚙️ **Propuesta de Valor de Vida Flex**:\n- **Ajuste Dinámico Anual**: Permite de manera ágil aumentar o reducir la cobertura contratada y las primas...\n- **Ventaja de Cierre**: Destácalo ante el cliente: *'Un producto que crece con su ritmo de vida, dándole la libertad total de regular su cuota...'*", showMotor: false, showEscalate: false };
    }
    if (text.includes("manual") || text.includes("poliza vida mvp")) {
      return { text: "El Manual de la Póliza Vida MVP es tu biblia técnica preferencial para superar cualquier reticencia del cliente con fundamentos indiscutibles...\n\n📚 **Estrategia Comercial del Manual Vida MVP**:\nUsa la transparencia regulada a tu favor. En lugar de esconder las condiciones del seguro, utilízalas como un gran argumento de venta (Inmediatez de Vigencia, Sin Exámenes Complejos).", showMotor: false, showEscalate: false };
    }
    if (text.includes("checklist")) {
      return { text: "El Checklist Comercial es tu brújula de control para asegurar que cada asesoría se traduzca en una póliza emitida con éxito y 0% de rechazos...\n\n📋 **Tip de Ventas del Checklist Comercial**:\nNo abordes el checklist como una lista de control fría al final de la entrevista. Preséntalo como una garantía de transparencia (Beneficiarios, Validación PAT/PAC, Transparencia de Cobertura).", showMotor: false, showEscalate: false };
    }
    if (text.includes("cobertura") || text.includes("cubre")) {
      return { text: "La Póliza Vida MVP cubre fallecimiento natural y accidental. Adicionalmente, como ventaja competitiva, incluye un anticipo de capital del 50% en caso de diagnóstico de enfermedades graves.", showMotor: true, showEscalate: true };
    }
    if (text.includes("requisito") || text.includes("edad")) {
      return { text: "Para contratar este seguro, el cliente debe tener entre 18 y 64 años. Un excelente argumento de venta es que no requiere exámenes médicos previos para capitales inferiores a 2.000 UF.", showMotor: false, showEscalate: false };
    }
    if (text.includes("carencia") || text.includes("deducible")) {
      return { text: "Esta póliza no tiene deducible. Cuenta con un periodo de carencia de 30 días para enfermedades graves, pero la cobertura por muerte accidental es inmediata desde la firma.", showMotor: false, showEscalate: false };
    }
    if (text.includes("competencia") || text.includes("banco") || text.includes("barato")) {
      return { text: "Esa es una objeción muy común. Tu argumento debe enfocarse en el respaldo. Dile al cliente: 'Es cierto que hay opciones de menor costo, pero Zurich Santander le garantiza el respaldo del grupo financiero más sólido, con procesos de liquidación rápidos y sin letra chica en el momento que su familia más lo necesite.'", showMotor: true, showEscalate: false };
    }
    if (text.includes("pago") || text.includes("pagar") || text.includes("pat") || text.includes("pac") || text.includes("tarjeta")) {
      return { text: "El pago es 100% automatizado para la comodidad del cliente. Se puede adherir mediante Pago Automático con Tarjeta de Crédito (PAT) o Cargo en Cuenta Corriente (PAC). Tip comercial: Recuerda mencionar que la póliza acumula puntos/millas si utiliza las tarjetas del banco.", showMotor: false, showEscalate: false };
    }
    if (text.includes("siniestro") || text.includes("fallecimiento") || text.includes("denunciar")) {
      return { text: "Para denunciar un siniestro, debes guiar al beneficiario para que ingrese la solicitud directamente por la web pública o derivarlo a Servicio al Cliente. Internamente, puedes hacer el seguimiento del estado ingresando el RUT del cliente en el sistema MIDAS, módulo 'Gestión de Siniestros'.", showMotor: false, showEscalate: false };
    }
    if (text.includes("cancelar") || text.includes("renunciar") || text.includes("termino")) {
      return { text: "El seguro es de libre permanencia. El cliente puede cancelarlo cuando lo desee sin multas. Sin embargo, antes de cancelar, intenta retenerlo: Recuérdale que perderá la antigüedad y que, si decide volver a contratar en el futuro, las primas se calcularán con su nueva edad, lo que será más costoso.", showMotor: false, showEscalate: false };
    }
    
    // Fallback
    return {
      text: "Esa consulta específica parece estar fuera del alcance de la Póliza MVP actual o mi nivel de certeza es bajo. Según mis protocolos de seguridad, te recomiendo consultar esto con un experto.",
      showMotor: false,
      showEscalate: true,
    };
  };

  const processResponse = async (userText) => {
    setIsTyping(true);
    // Simular delay de 1.0 segundo exacto como pidió el prompt
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { text: responseText, showMotor, showEscalate } = getResponse(userText);

    setIsTyping(false);

    const newMessage = {
      id: Date.now(),
      role: 'assistant',
      text: '',
      showMotor,
      showEscalate,
    };
    setMessages((prev) => [...prev, newMessage]);

    // Streaming realista (letras/palabras) con intervalos rápidos
    // Para no recargar el DOM renderizando letra por letra (muy lento en React), 
    // lo haremos palabra por palabra rápido, simulando el streaming.
    const words = responseText.split(' ');
    let currentText = '';
    for (let i = 0; i < words.length; i++) {
      currentText += (i > 0 ? ' ' : '') + words[i];
      const snapshot = currentText;
      setMessages((prev) =>
        prev.map((msg) => (msg.id === newMessage.id ? { ...msg, text: snapshot } : msg))
      );
      await new Promise((resolve) => setTimeout(resolve, 35));
    }
  };

  const handleSend = (text) => {
    if (!text.trim() || isTyping) return;
    const userMsg = { id: Date.now(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    processResponse(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header FabIA */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 bg-white shrink-0 shadow-sm z-10">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-[#0033A0] rounded-full flex items-center justify-center text-white shadow-md font-bold font-serif text-xl italic">
              F
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-[#0033A0] text-base flex items-center gap-2">
              FabIA
              <span className="text-[10px] bg-[#0033A0]/10 text-[#0033A0] px-2 py-0.5 rounded-full font-semibold tracking-wide">
                COPILOTO EXPERTO
              </span>
            </h3>
            <p className="text-xs text-gray-500 font-medium">Asesor Comercial Alianza Zurich Santander</p>
          </div>
        </div>
      </div>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#F3F4F6]">
        {messages.map((msg) => (
          <motion.div 
            key={msg.id} 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {/* Avatar izquierdo (FabIA) */}
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-white border border-[#0033A0] text-[#0033A0] flex items-center justify-center shadow-sm mr-2 mt-1 shrink-0 font-bold font-serif italic text-sm">
                F
              </div>
            )}

            <div className={`flex flex-col ${msg.role === 'user' ? 'items-end max-w-[75%]' : 'items-start w-full max-w-[85%]'}`}>
              {/* Burbuja de texto */}
              <div
                className={`px-5 py-3.5 rounded-2xl shadow-sm text-[14px] leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-slate-200 text-slate-800 rounded-tr-none'
                    : 'bg-white border border-[#0033A0]/10 text-[#374151] rounded-tl-none'
                }`}
              >
                {formatText(msg.text)}
                {msg.role === 'assistant' && msg.text === '' && (
                  <span className="inline-block w-1 h-4 bg-gray-300 animate-pulse ml-1 rounded-sm" />
                )}
              </div>

              {/* Extras */}
              {msg.showMotor && msg.text.length > 20 && (
                <Motor3x3 onCardClick={handleSend} />
              )}

              {msg.showEscalate && msg.text.length > 20 && (
                <DerivarCoachButton />
              )}
            </div>
          </motion.div>
        ))}

        {/* Indicador de Análisis animado (Framer Motion rebote) */}
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-[#0033A0] text-[#0033A0] flex items-center justify-center shadow-sm mr-2 mt-1 shrink-0 font-bold font-serif italic text-sm">
              F
            </div>
            <div className="bg-white border border-[#0033A0]/10 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-3">
              <span className="text-xs text-gray-500 font-medium">FabIA está escribiendo</span>
              <div className="flex gap-1">
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.0 }} className="w-1.5 h-1.5 bg-[#0033A0]/50 rounded-full" />
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#0033A0]/50 rounded-full" />
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#0033A0]/50 rounded-full" />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} className="h-2" />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100 shrink-0 z-10">
        <div className="flex flex-wrap gap-2 mb-3">
          {SUGGESTIONS.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(sug)}
              disabled={isTyping}
              className="text-[11px] font-medium bg-[#F3F4F6] hover:bg-[#0033A0]/10 text-gray-600 hover:text-[#0033A0] px-3 py-1.5 rounded-full border border-gray-200 hover:border-[#0033A0]/30 transition-all disabled:opacity-50"
            >
              {sug}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Chatea con FabIA o usa el menú lateral..."
            className="w-full pl-5 pr-14 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0033A0] focus:bg-white transition-all text-sm"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className={`absolute right-2 p-2.5 rounded-xl transition-all ${
              input.trim() && !isTyping
                ? 'bg-[#0033A0] text-white shadow-md hover:bg-blue-800'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send size={17} />
          </button>
        </form>
      </div>
    </div>
  );
}
