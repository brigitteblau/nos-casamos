import React, { useState } from 'react';
import './confirm.css';
import { Mail, Linkedin, Github, Calendar } from 'lucide-react';

const CalendarHeartIcon = (props) => (
  <svg
    viewBox="0 0 64 64"
    width="80"
    height="80"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {/* Anillas */}
    <path d="M16 10v8M24 10v8M32 10v8M40 10v8M48 10v8" />
    {/* Marco */}
    <rect x="10" y="10" width="44" height="42" rx="6" ry="6" />
    {/* Corazón */}
    <path d="M24.5 34c0-3.6 2.9-6.5 6.5-6.5 2 0 3.8.9 5 2.3 1.2-1.4 3-2.3 5-2.3 3.6 0 6.5 2.9 6.5 6.5 0 8-11.5 12.5-11.5 12.5S24.5 42 24.5 34z" />
  </svg>
);

export const Confirmacion = () => {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <>
      <section className="confirmacion-section">
        <h2 className="confirmacion-titulo"><b>CONFIRMACIÓN DE ASISTENCIA </b></h2>
        <p className="confirmacion-subtitulo">
          Esperamos que seas parte de esta gran celebración. Por favor completar <b>un formulario por persona</b>!!
        </p>

        {/* Botón de confirmación */}
        <a
          href="https://forms.gle/PFNpxXm1zQ2R2edVA"
          target="_blank"
          rel="noopener noreferrer"
          className="confirmacion-boton"
        >
          CONFIRMAR ASISTENCIA
        </a>

        {/* ⬇️ AQUÍ VA EL ICONO ENTRE MEDIO DE LOS BOTONES */}
        <div className="calendar-icon">
          <CalendarHeartIcon />
        </div>

        {/* Botón agendar evento */}
        <div className="agendar-container">
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="confirmacion-boton agendar-boton"
            aria-expanded={openDropdown}
          >
            <Calendar size={18} style={{ marginRight: 8 }} />
            AGENDAR EVENTO
          </button>

          {openDropdown && (
            <div className="dropdown-agendar">
              <a
                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+Flor+%26+Nico&dates=20251120T213000Z/20251120T223000Z&details=Jup%C3%A1&location=Lugar+de+la+ceremonia"
                target="_blank" rel="noopener noreferrer"
              >Google – Jupá</a>

              <a href="/evento.ics" download>Apple / Outlook / 365 / Yahoo – Jupá + Fiesta</a>
            </div>
          )}
        </div>
      </section>

      <div className="agradecimiento">
        ¡Gracias por acompañarnos en este momento tan importante!
      </div>
      <div className="footer">
        <p>Brigitte Blau</p>
        <div className="p">
          <a href="mailto:brigitteyaelblau@gmail.com" target="_blank" rel="noopener noreferrer">
            <Mail size={20} />
          </a>
          <a href="https://linkedin.com/in/brigitte-blau-17567835b" target="_blank" rel="noopener noreferrer">
            <Linkedin size={20} />
          </a>
          <a href="https://github.com/brigitteblau" target="_blank" rel="noopener noreferrer">
            <Github size={20} />
          </a>
        </div>
      </div>
    </>
  );
};