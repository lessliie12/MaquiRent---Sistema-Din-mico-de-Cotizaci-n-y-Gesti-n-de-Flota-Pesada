'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Phone, Mail, MapPin, CheckCircle, Clock, Copy, Check, MessageCircle, AlertCircle, Building, FileCheck, ShieldAlert } from 'lucide-react';
import { machinesData } from '@/lib/data/machines';
import { quotesService } from '@/lib/services/quotesService';
import { sanitizeInput, checkSubmissionRateLimit, recordFormSubmission } from '@/lib/utils/security';

interface ContactSectionProps {
  initialSummary?: string;
  onClearInitialSummary?: () => void;
}

export function ContactSection({ initialSummary, onClearInitialSummary }: ContactSectionProps) {
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [selectedMachine, setSelectedMachine] = useState(machinesData[0].name);
  const [duration, setDuration] = useState('15 días');
  const [message, setMessage] = useState('');
  const [withOperator, setWithOperator] = useState(true);

  // Security states
  const [honeypot, setHoneypot] = useState('');
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [radicadoNumber, setRadicadoNumber] = useState('');
  const [copied, setCopied] = useState(false);

  // If calculator passed an initial summary
  useEffect(() => {
    if (initialSummary) {
      setMessage((prev) => (prev ? `${prev}\n\n---\n${initialSummary}` : initialSummary));
    }
  }, [initialSummary]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRateLimitError(null);

    // 1. Honeypot check: If bot filled the hidden input, pretend success but drop spam
    if (honeypot.trim() !== '') {
      setSubmitted(true);
      setRadicadoNumber('COT-2026-SPAM-BLOCKED');
      return;
    }

    // 2. Client-side Rate Limiting check
    const rateCheck = checkSubmissionRateLimit();
    if (!rateCheck.allowed) {
      setRateLimitError(`Por seguridad anti-spam, por favor espera ${rateCheck.waitSeconds} segundos antes de radicar otra solicitud.`);
      return;
    }

    setLoading(true);

    // 3. Sanitize inputs against XSS and HTML injection
    const cleanFullName = sanitizeInput(fullName);
    const cleanCompany = sanitizeInput(company);
    const cleanCity = sanitizeInput(city);
    const cleanMessage = sanitizeInput(message);

    // Generate quote order number
    const radicado = `COT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Find machine rate to calculate estimated budget
    const machineObj = machinesData.find((m) => m.name === selectedMachine) || machinesData[0];
    const estimatedDays = parseInt(duration) || 15;
    const estimatedBudget = (machineObj.dailyRate * estimatedDays) + (withOperator ? 220000 * estimatedDays : 0);

    // Save into centralized CRM quotes service
    quotesService.saveQuote({
      id: radicado,
      fullName: cleanFullName,
      company: cleanCompany || 'Persona Natural',
      email: email.trim(),
      phone: phone.trim(),
      city: cleanCity || 'Colombia',
      machineName: selectedMachine,
      duration: duration || '15 días',
      withOperator,
      estimatedBudget,
      message: cleanMessage || 'Sin comentarios adicionales.'
    });

    recordFormSubmission();

    setTimeout(() => {
      setRadicadoNumber(radicado);
      setLoading(false);
      setSubmitted(true);
      if (onClearInitialSummary) onClearInitialSummary();
    }, 700);
  };

  const handleCopyRadicado = () => {
    navigator.clipboard.writeText(radicadoNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setFullName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setCity('');
    setMessage('');
    setSubmitted(false);
  };

  const whatsappConfirmationText = encodeURIComponent(
    `Hola Maqui-Rent, acabo de radicar la solicitud de cotización ${radicadoNumber} a nombre de ${fullName} (${company || 'Persona natural'}) para la máquina: ${selectedMachine} en ${city || 'Colombia'}.`
  );

  return (
    <section id="contact" className="scroll-mt-20 mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        {/* Left Side: Contact details & Corporate Information */}
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f6c400]/20 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#9e7600] mb-4">
            Atención Inmediata
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#141719]">
            Radica tu Solicitud de Maquinaria
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#687076]">
            Diligencia el formulario y uno de nuestros ingenieros comerciales te enviará la propuesta formal con disponibilidad y tarifas en menos de 2 horas.
          </p>

          {/* Quick contact list */}
          <div className="mt-8 space-y-4 text-xs sm:text-sm">
            <a
              href="tel:+573105550190"
              className="flex items-center gap-3 font-semibold text-[#141719] hover:text-[#b08e00] transition group"
            >
              <div className="grid size-9 place-items-center rounded-xl bg-[#f4f5f6] text-[#b08e00] group-hover:bg-[#f6c400] group-hover:text-[#141719] transition">
                <Phone className="size-4" />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-[#8a9298]">Línea Nacional 24/7</span>
                <span>+57 (310) 555-0190</span>
              </div>
            </a>

            <a
              href="mailto:cotizaciones@maqui-rent.com.co"
              className="flex items-center gap-3 font-semibold text-[#141719] hover:text-[#b08e00] transition group"
            >
              <div className="grid size-9 place-items-center rounded-xl bg-[#f4f5f6] text-[#b08e00] group-hover:bg-[#f6c400] group-hover:text-[#141719] transition">
                <Mail className="size-4" />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-[#8a9298]">Correo Institucional</span>
                <span>cotizaciones@maqui-rent.com.co</span>
              </div>
            </a>

            <div className="flex items-center gap-3 font-semibold text-[#141719]">
              <div className="grid size-9 place-items-center rounded-xl bg-[#f4f5f6] text-[#b08e00]">
                <MapPin className="size-4" />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-[#8a9298]">Patios Principales</span>
                <span>Bogotá D.C. · Medellín · Barranquilla · Cali</span>
              </div>
            </div>

            <div className="flex items-center gap-3 font-semibold text-[#141719]">
              <div className="grid size-9 place-items-center rounded-xl bg-[#f4f5f6] text-emerald-600">
                <Clock className="size-4" />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-[#8a9298]">Horario de Despacho</span>
                <span>Lunes a Sábado 6:00 AM – 8:00 PM (Turnos de obra 24/7)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form or Submission Success Screen */}
        <div className="rounded-3xl bg-white p-6 sm:p-10 shadow-lg border border-[#e3e5e7]">
          {submitted ? (
            <div className="py-8 text-center space-y-6 animate-in fade-in duration-300">
              <div className="mx-auto grid size-20 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                <FileCheck className="size-10" />
              </div>

              <div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                  ¡Solicitud Radicada Exitosamente!
                </span>
                <h3 className="mt-3 text-2xl font-black text-[#141719]">
                  Hemos recibido tu requerimiento
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#5a6268] max-w-md mx-auto">
                  Un ingeniero comercial asignado revisará la disponibilidad de la máquina solicitada y te remitirá la cotización oficial al correo <strong>{email}</strong>.
                </p>
              </div>

              {/* Radicado Box */}
              <div className="mx-auto max-w-sm rounded-2xl bg-[#fafbfc] border border-[#dfe3e5] p-5">
                <span className="text-[10px] uppercase font-bold text-[#8a9298] block">
                  Número de Radicado Oficial
                </span>
                <div className="mt-1 flex items-center justify-center gap-3">
                  <span className="text-xl font-black text-[#141719] tracking-wider">
                    {radicadoNumber}
                  </span>
                  <button
                    onClick={handleCopyRadicado}
                    className="flex items-center gap-1 rounded-lg bg-white border border-[#dfe3e5] px-2.5 py-1 text-xs font-bold text-[#5a6268] hover:border-[#141719] transition"
                  >
                    {copied ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
                    {copied ? 'Copiado' : 'Copiar'}
                  </button>
                </div>
              </div>

              {/* Fast WhatsApp confirmation */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/573105550190?text=${whatsappConfirmationText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-xs font-bold text-white hover:bg-emerald-500 transition shadow-md"
                >
                  <MessageCircle className="size-4" />
                  Confirmar Radicado por WhatsApp
                </a>

                <button
                  onClick={resetForm}
                  className="w-full sm:w-auto rounded-xl border border-[#dfe3e5] px-6 py-3 text-xs font-bold text-[#5a6268] hover:border-[#141719] hover:text-[#141719] transition"
                >
                  Hacer Otra Solicitud
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="border-b border-[#edf0f1] pb-4">
                <h3 className="text-lg font-black text-[#141719]">Formulario Oficial de Cotización</h3>
                <p className="text-xs text-[#8a9298]">Completa los datos de tu obra para generar el radicado</p>
              </div>

              {/* Row 1: Name and Company */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-[#141719] mb-1.5">
                    Nombre Completo *
                  </label>
                  <input
                    required
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ej. Ing. Mateo Arango"
                    className="w-full rounded-xl border border-[#dfe3e5] bg-[#fafbfc] px-4 py-3 text-xs text-[#141719] outline-none transition focus:border-[#f6c400] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#141719] mb-1.5">
                    Empresa / Razón Social
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Ej. Consorcio Vial del Norte"
                    className="w-full rounded-xl border border-[#dfe3e5] bg-[#fafbfc] px-4 py-3 text-xs text-[#141719] outline-none transition focus:border-[#f6c400] focus:bg-white"
                  />
                </div>
              </div>

              {/* Row 2: Email and Phone */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-[#141719] mb-1.5">
                    Correo Electrónico *
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="mateo@empresa.com.co"
                    className="w-full rounded-xl border border-[#dfe3e5] bg-[#fafbfc] px-4 py-3 text-xs text-[#141719] outline-none transition focus:border-[#f6c400] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#141719] mb-1.5">
                    Teléfono Celular / WhatsApp *
                  </label>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="310 123 4567"
                    className="w-full rounded-xl border border-[#dfe3e5] bg-[#fafbfc] px-4 py-3 text-xs text-[#141719] outline-none transition focus:border-[#f6c400] focus:bg-white"
                  />
                </div>
              </div>

              {/* Row 3: Machine & City */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-[#141719] mb-1.5">
                    Equipo de Interés *
                  </label>
                  <select
                    value={selectedMachine}
                    onChange={(e) => setSelectedMachine(e.target.value)}
                    className="w-full rounded-xl border border-[#dfe3e5] bg-[#fafbfc] px-4 py-3 text-xs font-semibold text-[#141719] outline-none transition focus:border-[#f6c400] focus:bg-white"
                  >
                    {Array.from(new Set(machinesData.map((m) => m.type))).map((cat) => (
                      <optgroup key={cat} label={`── ${cat} ──`}>
                        {machinesData
                          .filter((m) => m.type === cat)
                          .map((m) => (
                            <option key={m.id} value={m.name}>
                              {m.name}
                            </option>
                          ))}
                      </optgroup>
                    ))}
                    <option value="Paquete Múltiple de Maquinaria">Paquete Múltiple de Maquinaria</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#141719] mb-1.5">
                    Municipio o Ciudad de la Obra *
                  </label>
                  <input
                    required
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ej. Girardot, Cundinamarca"
                    className="w-full rounded-xl border border-[#dfe3e5] bg-[#fafbfc] px-4 py-3 text-xs text-[#141719] outline-none transition focus:border-[#f6c400] focus:bg-white"
                  />
                </div>
              </div>

              {/* Operator switch */}
              <div className="flex items-center gap-3 rounded-xl bg-[#fafbfc] border border-[#dfe3e5] p-3 text-xs">
                <input
                  type="checkbox"
                  id="includeOperator"
                  checked={withOperator}
                  onChange={(e) => setWithOperator(e.target.checked)}
                  className="accent-[#f6c400] size-4"
                />
                <label htmlFor="includeOperator" className="cursor-pointer font-bold text-[#141719]">
                  Requiero operador calificado con certificación SENA y ARL de Riesgo V
                </label>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-[#141719] mb-1.5">
                  Detalles del Proyecto o Simulación de Costos
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe la duración estimada de obra, tipo de terreno, condiciones de acceso en cama baja o requerimientos específicos..."
                  className="w-full resize-y rounded-xl border border-[#dfe3e5] bg-[#fafbfc] px-4 py-3 text-xs text-[#141719] outline-none transition focus:border-[#f6c400] focus:bg-white"
                />
              </div>

              {/* Honeypot anti-spam trap (invisible to humans, catches automated bots) */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="website_hp">No llenar este campo si eres humano</label>
                <input
                  id="website_hp"
                  type="text"
                  name="website_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {rateLimitError && (
                <div className="flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-300 p-3 text-xs font-bold text-amber-800 animate-in fade-in">
                  <ShieldAlert className="size-4 text-amber-600 shrink-0" />
                  <span>{rateLimitError}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#f6c400] py-4 text-xs font-black text-[#141719] shadow-lg shadow-[#f6c400]/25 transition hover:bg-[#ffd52b] hover:shadow-xl disabled:opacity-50"
              >
                {loading ? 'Generando radicado oficial...' : 'Radicar Solicitud de Cotización'}
                {!loading && <ArrowRight className="size-4" />}
              </button>

              <p className="text-[10px] text-center text-[#8a9298]">
                * Conexión protegida con cifrado SSL y validación técnica previa a despacho.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
