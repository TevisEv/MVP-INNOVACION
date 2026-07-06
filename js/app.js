/* ============================================================
   PetMed Clínica Veterinaria — app.js
   ============================================================ */

/* ── Navbar scroll ─────────────────────────────────────────── */
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

/* ── Hamburger menú ────────────────────────────────────────── */
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const open = navLinks.classList.contains('open');
    hamburger.setAttribute('aria-expanded', open);
    // animar las líneas
    const spans = hamburger.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

/* ── Fade-in al hacer scroll ───────────────────────────────── */
const fadeEls = document.querySelectorAll('.fade-in');
if (fadeEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => io.observe(el));
}

/* ── Active nav link (index.html con secciones) ────────────── */
const sections = document.querySelectorAll('section[id]');
if (sections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        document.querySelectorAll('.nav-links a').forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === '#' + e.target.id) {
            a.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => sectionObserver.observe(s));
}

/* ── Servicios: ir a servicio.html con parámetro ───────────── */
const services = [
  {
    id: 'consulta',
    nombre: 'Consulta General',
    icono: '🩺',
    precio: 'S/ 45.00',
    duracion: '30 minutos',
    descripcion: 'Evaluación completa del estado de salud de tu mascota por un médico veterinario certificado. Incluye revisión física, control de peso y recomendaciones personalizadas de cuidado.',
    incluye: ['Revisión física completa', 'Control de peso y talla', 'Diagnóstico básico', 'Receta médica si se requiere', 'Asesoría nutricional'],
    color: 'verde',
    emoji: '🩺'
  },
  {
    id: 'vacunas',
    nombre: 'Vacunación',
    icono: '💉',
    precio: 'S/ 35.00',
    duracion: '20 minutos',
    descripcion: 'Aplicación de vacunas esenciales para proteger a tu mascota de enfermedades infecciosas. Contamos con el esquema completo de vacunación para perros y gatos.',
    incluye: ['Revisión previa a la vacuna', 'Aplicación de la vacuna', 'Registro en cartilla', 'Recordatorio próxima dosis', 'Certificado de vacunación'],
    color: 'naranja',
    emoji: '💉'
  },
  {
    id: 'bano',
    nombre: 'Baño y Grooming',
    icono: '🛁',
    precio: 'S/ 40.00',
    duracion: '90 minutos',
    descripcion: 'Servicio completo de higiene y estética para tu mascota. Nuestros groomer profesionales cuidan cada detalle para que tu mascota luzca y se sienta increíble.',
    incluye: ['Baño con shampoo especializado', 'Secado y peinado', 'Corte de uñas', 'Limpieza de oídos', 'Perfume y moño opcional'],
    color: 'azul',
    emoji: '🛁'
  },
  {
    id: 'desparasitacion',
    nombre: 'Desparasitación',
    icono: '🐛',
    precio: 'S/ 25.00',
    duracion: '15 minutos',
    descripcion: 'Tratamiento interno y externo contra parásitos para mantener a tu mascota libre de gusanos, pulgas y garrapatas. Recomendado cada 3-6 meses.',
    incluye: ['Evaluación parasitológica', 'Desparasitante interno', 'Tratamiento antipulgas', 'Plan de prevención', 'Seguimiento a los 30 días'],
    color: 'lila',
    emoji: '🐛'
  },
  {
    id: 'cirugia',
    nombre: 'Cirugía y Esterilización',
    icono: '🏥',
    precio: 'Desde S/ 250.00',
    duracion: 'Variable',
    descripcion: 'Procedimientos quirúrgicos realizados por cirujanos veterinarios especializados con equipos de última generación y protocolo anestésico completo.',
    incluye: ['Evaluación preoperatoria', 'Anestesia general', 'Procedimiento quirúrgico', 'Recuperación supervisada', 'Control post-operatorio'],
    color: 'verde',
    emoji: '🏥'
  },
  {
    id: 'laboratorio',
    nombre: 'Laboratorio Clínico',
    icono: '🔬',
    precio: 'Desde S/ 60.00',
    duracion: '1-2 días',
    descripcion: 'Análisis clínicos completos: hemograma, bioquímica, urianálisis y más. Resultados rápidos para un diagnóstico preciso de la salud de tu mascota.',
    incluye: ['Toma de muestra', 'Hemograma completo', 'Bioquímica sérica', 'Urianálisis', 'Informe veterinario'],
    color: 'naranja',
    emoji: '🔬'
  }
];

/* Exportamos para que servicio.html pueda usarlos */
window.PetMedServices = services;

/* ── Cards de servicios: click → servicio.html?id=... ─────── */
document.querySelectorAll('.service-card[data-svc]').forEach(card => {
  card.addEventListener('click', () => {
    const id = card.dataset.svc;
    window.location.href = `servicio.html?id=${id}`;
  });
});

/* ── Página servicio.html: renderizar detalle ──────────────── */
if (document.getElementById('servicio-detalle')) {
  const params = new URLSearchParams(location.search);
  const id = params.get('id') || 'consulta';
  const svc = (window.PetMedServices || []).find(s => s.id === id) || {
    id: 'consulta', nombre: 'Servicio', icono: '🩺', precio: 'S/ 45.00',
    duracion: '30 min', descripcion: 'Descripción del servicio.',
    incluye: ['Atención profesional'], color: 'verde', emoji: '🩺'
  };

  document.title = `${svc.nombre} — VetCare`;

  const el = document.getElementById('servicio-detalle');
  el.innerHTML = `
    <div class="service-detail-grid">
      <div class="fade-in">
        <div class="breadcrumb">
          <a href="index.html">Inicio</a> <span>›</span>
          <a href="index.html#servicios">Servicios</a> <span>›</span>
          <span>${svc.nombre}</span>
        </div>
        <div class="tag">Servicio veterinario</div>
        <h1 class="section-title" style="margin-bottom:16px;">${svc.nombre}</h1>
        <p class="section-sub" style="max-width:100%;margin-bottom:36px;">${svc.descripcion}</p>

        <div class="service-detail-visual">${svc.emoji}</div>

        <h3 style="font-size:1rem;font-weight:600;color:var(--verde-oscuro);margin-bottom:16px;">¿Qué incluye?</h3>
        <div class="detail-list">
          ${svc.incluye.map(item => `
            <div class="detail-item">
              <div class="di-icon">✓</div>
              <div class="di-text"><strong>${item}</strong></div>
            </div>
          `).join('')}
        </div>

        <div style="margin-top:36px;display:flex;gap:14px;flex-wrap:wrap;">
          <a href="reserva.html?servicio=${svc.id}" class="btn btn-primary">
            📅 Reservar cita
          </a>
          <a href="index.html#servicios" class="btn btn-outline">
            ← Ver todos los servicios
          </a>
        </div>
      </div>

      <!-- Panel lateral -->
      <div class="booking-panel fade-in">
        <div class="bp-price">${svc.precio} <span>por sesión</span></div>
        <p class="bp-sub">⏱ Duración aproximada: ${svc.duracion}</p>
        <hr style="border:none;border-top:1px solid var(--verde-menta);margin-bottom:20px;">
        <h4 style="font-size:0.9rem;font-weight:600;color:var(--verde-oscuro);margin-bottom:14px;">Incluye:</h4>
        <ul class="includes-list">
          ${svc.incluye.map(i => `<li>${i}</li>`).join('')}
        </ul>
        <a href="reserva.html?servicio=${svc.id}" class="btn btn-primary" style="width:100%;justify-content:center;">
          Reservar ahora
        </a>
        <p style="text-align:center;font-size:0.78rem;color:var(--gris-medio);margin-top:14px;">
          Sin pago previo requerido
        </p>
      </div>
    </div>

    <!-- Otros servicios -->
    <div style="padding:60px 0 0;">
      <div class="section-header fade-in">
        <div class="tag">También te puede interesar</div>
        <h2 class="section-title">Otros servicios</h2>
      </div>
      <div class="services-grid">
        ${(window.PetMedServices || []).filter(s => s.id !== id).slice(0,3).map(s => `
          <div class="service-card fade-in" data-svc="${s.id}" onclick="location.href='servicio.html?id=${s.id}'">
            <div class="svc-icon ${s.color}">${s.emoji}</div>
            <div class="svc-name">${s.nombre}</div>
            <div class="svc-desc">${s.descripcion.substring(0,90)}…</div>
            <div class="svc-footer">
              <span class="svc-price">${s.precio}</span>
              <span class="svc-link">Ver más →</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  /* re-activar fade-in para elementos nuevos */
  document.querySelectorAll('.fade-in').forEach(el => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    io.observe(el);
  });
}

/* ── Formulario de reserva ─────────────────────────────────── */
const reservaForm = document.getElementById('reserva-form');
if (reservaForm) {
  /* prellenar servicio desde URL */
  const params  = new URLSearchParams(location.search);
  const svcId   = params.get('servicio');
  const selSvc  = document.getElementById('servicio');
  if (selSvc && svcId) {
    const opt = selSvc.querySelector(`option[value="${svcId}"]`);
    if (opt) opt.selected = true;
  }

  /* fecha mínima = hoy */
  const fechaInput = document.getElementById('fecha');
  if (fechaInput) {
    const hoy = new Date().toISOString().split('T')[0];
    fechaInput.setAttribute('min', hoy);
    fechaInput.value = hoy;
  }

  reservaForm.addEventListener('submit', (e) => {
    e.preventDefault();

    /* Validación básica */
    const required = reservaForm.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#EF4444';
        valid = false;
      }
    });

    const terminos = document.getElementById('terminos');
    if (terminos && !terminos.checked) {
      showToast('⚠️ Debes aceptar los términos y condiciones');
      return;
    }

    if (!valid) {
      showToast('⚠️ Completa todos los campos requeridos');
      return;
    }

    /* Recoger datos */
    const data = {
      nombre:   document.getElementById('nombre')?.value || '',
      email:    document.getElementById('email')?.value || '',
      telefono: document.getElementById('telefono')?.value || '',
      mascota:  document.getElementById('mascota')?.value || '',
      tipo:     document.getElementById('tipo')?.value || '',
      servicio: document.getElementById('servicio')?.options[document.getElementById('servicio').selectedIndex]?.text || '',
      fecha:    document.getElementById('fecha')?.value || '',
      hora:     document.getElementById('hora')?.value || '',
      notas:    document.getElementById('notas')?.value || ''
    };

    /* Mostrar confirmación */
    reservaForm.style.display = 'none';
    const confirmEl = document.getElementById('confirmacion');
    if (confirmEl) {
      confirmEl.classList.add('show');

      const cd = document.getElementById('confirm-data');
      if (cd) {
        cd.innerHTML = `
          <p><strong>Nombre:</strong> ${data.nombre}</p>
          <p><strong>Mascota:</strong> ${data.mascota} (${data.tipo})</p>
          <p><strong>Servicio:</strong> ${data.servicio}</p>
          <p><strong>Fecha:</strong> ${formatFecha(data.fecha)} a las ${data.hora}</p>
          ${data.email ? `<p><strong>Confirmación a:</strong> ${data.email}</p>` : ''}
        `;
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── Helpers ─────────────────────────────────────────────────*/
function formatFecha(fechaStr) {
  if (!fechaStr) return '';
  const [y, m, d] = fechaStr.split('-');
  const meses = ['enero','febrero','marzo','abril','mayo','junio',
                  'julio','agosto','septiembre','octubre','noviembre','diciembre'];
  return `${parseInt(d)} de ${meses[parseInt(m)-1]} de ${y}`;
}

function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}
