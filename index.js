// ===== NAVBAR SCROLL Y TOGGLE =====
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

// Navbar se vuelve sólida al hacer scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Menú hamburguesa en móviles
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// ===== FILTROS DEL MENÚ =====
const filtroBtns = document.querySelectorAll('.filtro-btn');
const platoItems = document.querySelectorAll('.plato-item');

filtroBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remover clase active de todos los botones
        filtroBtns.forEach(b => b.classList.remove('active'));
        // Agregar active al botón clickeado
        btn.classList.add('active');
        
        const filtro = btn.getAttribute('data-filtro');
        
        platoItems.forEach(item => {
            const etiquetas = item.getAttribute('data-etiquetas');
            
            if (filtro === 'todos') {
                item.classList.remove('hidden');
            } else if (etiquetas && etiquetas.includes(filtro)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// ===== SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ===== GALERÍA MODAL =====
const galeriaItems = document.querySelectorAll('.galeria-item');
const modal = document.getElementById('galeriaModal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.querySelector('.modal-close');

galeriaItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        const caption = item.querySelector('.galeria-overlay p').textContent;
        
        modalImage.src = imgSrc;
        modalCaption.textContent = caption;
        modal.style.display = 'flex';
    });
});

modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// ===== FORMULARIO DE RESERVA =====
const reservaForm = document.getElementById('reservaForm');
const formFeedback = document.getElementById('formFeedback');

// Establecer fecha mínima como hoy
const fechaInput = document.getElementById('fecha');
const today = new Date().toISOString().split('T')[0];
fechaInput.min = today;

reservaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validación básica
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const personas = document.getElementById('personas').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const comentario = document.getElementById('comentario').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if (!nombre || !telefono || !personas || !fecha || !hora) {
        showFeedback('Por favor completa todos los campos obligatorios (*)', 'error');
        return;
    }
    
    // Formatear fecha para mostrar
    const fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Crear mensaje para WhatsApp
    const telefonoRestaurante = "573013832317"; // Tu número
    let mensaje = `*Nueva Reserva - Riminesi*%0A%0A`;
    mensaje += `*Nombre:* ${nombre}%0A`;
    mensaje += `*Teléfono:* ${telefono}%0A`;
    if (email) mensaje += `*Email:* ${email}%0A`;
    mensaje += `*Personas:* ${personas}%0A`;
    mensaje += `*Fecha:* ${fechaFormateada}%0A`;
    mensaje += `*Hora:* ${hora}%0A`;
    if (comentario) mensaje += `*Comentario:* ${comentario}%0A%0A`;
    mensaje += `_Enviado desde la web de Riminesi_`;
    
    // Mostrar feedback y opción para abrir WhatsApp
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${telefonoRestaurante}&text=${mensaje}`;
    
    const feedbackHTML = `
        <div class="form-feedback success">
            <p>✅ Reserva preparada correctamente</p>
            <p>Haz clic en el botón para enviarla por WhatsApp:</p>
            <a href="${whatsappUrl}" target="_blank" class="btn btn-primary" style="margin-top: 10px; display: inline-block;">
                <i class="fab fa-whatsapp"></i> Enviar por WhatsApp
            </a>
            <button id="cerrarFeedback" style="display: block; margin: 10px auto 0; background: none; border: none; color: #666; cursor: pointer;">
                Cerrar
            </button>
        </div>
    `;
    
    formFeedback.innerHTML = feedbackHTML;
    
    // Limpiar formulario
    reservaForm.reset();
    
    // Botón para cerrar feedback
    document.getElementById('cerrarFeedback').addEventListener('click', () => {
        formFeedback.innerHTML = '';
    });
    
    // Scroll suave al feedback
    formFeedback.scrollIntoView({ behavior: 'smooth' });
});

function showFeedback(message, type) {
    formFeedback.innerHTML = `<p class="${type}">${message}</p>`;
    formFeedback.scrollIntoView({ behavior: 'smooth' });
    
    setTimeout(() => {
        formFeedback.innerHTML = '';
    }, 5000);
}

// ===== BOTÓN WHATSAPP FLOTANTE =====
const whatsappFloat = document.getElementById('whatsappFloat');
whatsappFloat.addEventListener('click', (e) => {
    e.preventDefault();
    
    const telefonoRestaurante = "573013832317";
    const mensaje = "Hola, me gustaría hacer una consulta sobre Riminesi.";
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${telefonoRestaurante}&text=${encodeURIComponent(mensaje)}`;
    
    // Abrir en nueva pestaña
    window.open(whatsappUrl, '_blank');
});

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Pizzería Riminesi cargada correctamente 🍕');
    
    // Asegurar que el menú esté cerrado en desktop al cargar
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
    }
});