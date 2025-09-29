import React, { useState } from 'react';
import './confirm.css';
import { Mail, Linkedin, Github } from 'lucide-react';

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
{/* Icono + texto */}
<div className="calendar-icon">
  <img src="/count/icono-calendario.svg" alt="Calendario con corazón" />
</div>
<p className="confirmacion-subtitulo">¡Agendá la fecha en tu calendario!</p>

{/* Botón de agendar (dropdown) */}
<div className="agendar-container">
  <button
    className="confirmacion-boton agendar-boton"
    onClick={() => setOpenDropdown(!openDropdown)}
  >
    AGENDAR EVENTO ▾
  </button>

  {openDropdown && (
    <div className="dropdown-agendar">
      {/* Google: crea evento directo */}
      <a
        href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Jup%C3%A1%20%E2%80%93%20Boda%20Flor%20%26%20Nico&dates=20251120T211500Z/20251120T221500Z&details=Ceremonia%20de%20Jup%C3%A1&location="
        target="_blank" rel="noopener noreferrer"
      >
        Google — Jupá (18:15)
      </a>
      <a
        href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Fiesta%20%E2%80%93%20Boda%20Flor%20%26%20Nico&dates=20251120T233000Z/20251121T080000Z&details=Fiesta%20en%20Rut%20Haus&location=Rut%20Haus"
        target="_blank" rel="noopener noreferrer"
      >
        Google — Fiesta (20:30)
      </a>

      {/* Apple / Outlook / 365 / Yahoo */}
      {/* En prod cambiá http(s) por webcal:// para abrir app calendario */}
      <a href="/evento-jupa.ics">Apple / Outlook — Jupá (18:15)</a>
      <a href="/evento-fiesta.ics">Apple / Outlook — Fiesta (20:30)</a>
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
