// ------------------------------------------------------------
// Lightbox de la galería
// ------------------------------------------------------------

// Abrir
function openModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "flex";
  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

// Cerrar
function closeModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
  modal.classList.remove("show");
  document.body.style.overflow = "";
}

var slideIndex = 1;
showSlides(slideIndex);

// Controles anterior / siguiente
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Miniaturas
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");

  if (!slides.length) return;

  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";

  if (dots[slideIndex - 1]) {
    dots[slideIndex - 1].className += " active";
    if (captionText) captionText.innerHTML = dots[slideIndex - 1].alt;
  }
}

// ---------- Atajos de teclado y cierre al pulsar el fondo ----------
document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('myModal');
  if (!modal) return;

  // Clic sobre el fondo oscuro (no sobre el contenido)
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (modal.style.display !== 'flex') return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') plusSlides(1);
    if (e.key === 'ArrowLeft') plusSlides(-1);
  });
});
