/* =====================================================
   Resume section tabs and tab contents
===================================================== */
const resumeTabs = document.querySelector(".resume-tabs");
const resumePortfolioTabBtns = resumeTabs.querySelectorAll(".tab-btn");
const resumeTabContents = document.querySelectorAll(".resume-tab-content");

var resumeTabNav = function(resumeTabClick){
   resumeTabContents.forEach((resumeTabContent) => {
      resumeTabContent.style.display = "none";
      resumeTabContent.classList.remove("active");
   });

   resumePortfolioTabBtns.forEach((resumePortfolioTabBtn) => {
      resumePortfolioTabBtn.classList.remove("active");
   });

   resumeTabContents[resumeTabClick].style.display = "flex";

   setTimeout(() => {
      resumeTabContents[resumeTabClick].classList.add("active");
   }, 100);
   
   resumePortfolioTabBtns[resumeTabClick].classList.add("active");
}

resumePortfolioTabBtns.forEach((resumePortfolioTabBtn, i) => {
   resumePortfolioTabBtn.addEventListener("click", () => {
      resumeTabNav(i);
   });
});
/* =====================================================
   Service modal open/close function
===================================================== */
const serviceCardWithModals = document.querySelectorAll(".service-container .card-with-modal");

serviceCardWithModals.forEach((serviceCardWithModal) => {
   const serviceCard = serviceCardWithModal.querySelector(".service-card");
   const serviceBackDrop = serviceCardWithModal.querySelector(".service-modal-backdrop");
   const serviceModal = serviceCardWithModal.querySelector(".service-modal");
   const modalCloseBtn = serviceCardWithModal.querySelector(".modal-close-btn");
   

   serviceCard.addEventListener("click", () => {
      serviceBackDrop.style.display = "flex";

      setTimeout(() => {
         serviceBackDrop.classList.add("active");
      }, 100);

      setTimeout(() => {
         serviceModal.classList.add("active");
      }, 300);
   });

   modalCloseBtn.addEventListener("click", () => {
      setTimeout(() => {
         serviceBackDrop.style.display = "none";
      }, 500);

      setTimeout(() => {
         serviceBackDrop.classList.remove("active");
         serviceModal.classList.remove("active");
      }, 100);   
   });
});
/* =====================================================
   Portfolio modals, tabs and cards
===================================================== */

// Filter portfolio cards according to portfolio tabs.
document.addEventListener("DOMContentLoaded", () => {
   const portfolioTabs = document.querySelector(".portfolio-tabs");
   const portfolioTabBtns = portfolioTabs.querySelectorAll(".tab-btn");
   const cardWithModals = document.querySelectorAll(".portfolio-container .card-with-modal");

   portfolioTabBtns.forEach((tabBtn) => {
      tabBtn.addEventListener("click", () => {
         const filter = tabBtn.getAttribute("data-filter");

         cardWithModals.forEach((cardWithModal) => {
            if(filter === "all" || cardWithModal.classList.contains(filter)){
               cardWithModal.classList.remove("hidden");

               setTimeout(() => {
                  cardWithModal.style.opacity = "1";
                  cardWithModal.style.transition = ".5s ease";
               }, 1);

            }else{
               cardWithModal.classList.add("hidden");

               setTimeout(() => {
                  cardWithModal.style.opacity = "0";
                  cardWithModal.style.transition = ".5s ease";
               }, 1);
            }
         });
         // Add active class to the clicked tab button.
         portfolioTabBtns.forEach((tabBtn) => tabBtn.classList.remove("active"));
         tabBtn.classList.add("active");
      });
   });
});

// Open/Close Portfolio modals.
const portfolioCardsWithModals = document.querySelectorAll(".portfolio-container .card-with-modal");

portfolioCardsWithModals.forEach((portfolioCardsWithModal) => {
   const portfolioCard = portfolioCardsWithModal.querySelector(".portfolio-card");
   const portfolioBackdrop = portfolioCardsWithModal.querySelector(".portfolio-modal-backdrop");
   const portfolioModal = portfolioCardsWithModal.querySelector(".portfolio-modal");
   const modalCloseBtn = portfolioCardsWithModal.querySelector(".modal-close-btn");

   portfolioCard.addEventListener("click", () => {
      portfolioBackdrop.style.display = "flex";

      setTimeout(() => {
         portfolioBackdrop.classList.add("active");
      }, 100);
      
      setTimeout(() => {
         portfolioModal.classList.add("active");
      }, 100);

      modalCloseBtn.addEventListener("click", () =>{

         
         setTimeout(() => {
            portfolioBackdrop.style.display = "none";
         }, 500);
         
         setTimeout(() => {
            portfolioBackdrop.classList.remove("active");
            portfolioModal.classList.remove("active");
         }, 100);
      });
   });
});

/* =====================================================
   Testimonial Swiper
===================================================== */
var swiper = new Swiper(".javi-client-swiper", {
   slidesPerView: 1,
   spaceBetween: 30,
   loop: true,
   pagination: {
     el: ".swiper-pagination",
     clickable: true,
   },
   navigation: {
     nextEl: ".swiper-button-next",
     prevEl: ".swiper-button-prev",
   },
 });
/* =====================================================
   Send/Receive emails from contact form - EmailJS
===================================================== */
(function() {
   // https://dashboard.emailjs.com/admin/account
   emailjs.init({
     publicKey: "PFcDMppPR88l5dy-t",
   });
 })();
 
 const javiContactForm = document.getElementById("javi-contact-form");
 const javiContactFormAlert = document.querySelector(".contact-form-alert");
 
 // Generar pregunta del captcha y respuesta correcta
 function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
 }
 
 function generateCaptcha() {
   const num1 = getRandomInt(1, 10);
   const num2 = getRandomInt(1, 10);
   const operator = getRandomInt(0, 1) === 0 ? "+" : "-"; // Aleatorio entre + y -
   const question = `${num1} ${operator} ${num2}`;
   const correctAnswer = operator === "+" ? num1 + num2 : num1 - num2;
 
   document.getElementById("captcha-question").textContent = question;
   return correctAnswer;
 }
 
 let correctAnswer = generateCaptcha(); // Inicializamos el captcha
 
 // Función para validar el captcha antes de enviar el formulario
 javiContactForm.addEventListener('submit', function(event) {
   event.preventDefault(); // Evitar el envío del formulario
 
   const userAnswer = parseInt(document.getElementById("captcha-answer").value);
   const captchaMessage = document.getElementById("captcha-message");
 
   // Verificar si la respuesta del captcha es correcta
   if (userAnswer !== correctAnswer) {
     captchaMessage.textContent = "Incorrecto!";
     return; // No continuar con el envío si la respuesta es incorrecta
   } else {
     captchaMessage.textContent = ""; // Limpiar mensaje si la respuesta es correcta
   }
 
   // Si la respuesta es correcta, entonces enviamos el formulario con EmailJS
   emailjs.sendForm('service_bugw8hh', 'template_ftqp524', '#javi-contact-form')
     .then(() => {
       javiContactFormAlert.innerHTML = "<span>¡Tu mensaje se ha enviado!</span><i class='ri-checkbox-circle-fill'></i>";
       javiContactForm.reset();
       setTimeout(() => {
         javiContactFormAlert.innerHTML = "";
       }, 5000);
     }, (error) => {
       javiContactFormAlert.innerHTML = "<span>Mensaje no enviado</span><i class='ri-error-warning-fill'></i>";
       javiContactFormAlert.title = error;
     });
 });
/* =====================================================
   Shrink the height of the header on scroll
===================================================== */
window.addEventListener("scroll", () => {
   const javiHeader = document.querySelector(".javi-header");

   javiHeader.classList.toggle("shrink", window.scrollY > 0);
});
/* =====================================================
   Bottom navigation menu
===================================================== */

// Each bottom navigation menu items active on page scroll.
window.addEventListener("scroll", () => {
   const navMenuSections = document.querySelectorAll(".nav-menu-section");
   const scrollY = window.pageYOffset;

   navMenuSections.forEach((navMenuSection) => {
      let sectionHeight = navMenuSection.offsetHeight;
      let sectionTop = navMenuSection.offsetTop - 50;
      let id = navMenuSection.getAttribute("id");

      if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
         document.querySelector(".bottom-nav .menu li a[href*=" + id + "]").classList.add("current");
      }else{
         document.querySelector(".bottom-nav .menu li a[href*=" + id + "]").classList.remove("current");
      }
   });
});

// Javascript to show bottom navigation menu on home(page load).
window.addEventListener("DOMContentLoaded", () => {
   const bottomNav = document.querySelector(".bottom-nav");

   bottomNav.classList.toggle("active", window.scrollY < 10);

})

// Javascript to show/hide bottom navigation menu on home(scroll).
const bottomNav = document.querySelector(".bottom-nav");
const menuHideBtn = document.querySelector(".menu-hide-btn");
const menuShowBtn = document.querySelector(".menu-show-btn");
var navTimeout;

window.addEventListener("scroll", () => {
   bottomNav.classList.add("active");
   menuShowBtn.classList.remove("active");
   
   if(window.scrollY < 10){
      menuHideBtn.classList.remove("active");

      function scrollStoped(){
         bottomNav.classList.add("active");
      }

      clearTimeout(navTimeout);
      navTimeout = setTimeout(scrollStoped, 2500);
   }

   if(window.scrollY > 10){
      menuHideBtn.classList.add("active");

      function scrollStoped(){
         bottomNav.classList.remove("active");
         menuShowBtn.classList.add("active");
      }

      clearTimeout(navTimeout);
      navTimeout = setTimeout(scrollStoped, 2500);
   }
});

// Hide bottom navigation menu on click menu-hide-btn.
menuHideBtn.addEventListener("click", () => {
   bottomNav.classList.toggle("active");
   menuHideBtn.classList.toggle("active");
   menuShowBtn.classList.toggle("active");
});

// Show bottom navigation menu on click menu-show-btn.
menuShowBtn.addEventListener("click", () => {
   bottomNav.classList.toggle("active");
   menuHideBtn.classList.add("active");
   menuShowBtn.classList.toggle("active");
});

/* =====================================================
   To-top-button with scroll indicator bar
===================================================== */
window.addEventListener("scroll", () => {
   const toTopBtn = document.querySelector(".to-top-btn");

   toTopBtn.classList.toggle("active", window.scrollY > 0);

   //Scroll indicator bar
   const scrollIndicatorBar = document.querySelector(".scroll-indicator-bar");

   const pageScroll = document.body.scrollTop || document.documentElement.scrollTop;
   const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

   const scrollValue = (pageScroll / height) * 100;

   scrollIndicatorBar.style.height = scrollValue + "%";
});
/* =====================================================
   Customized cursor on mousemove
===================================================== */
const cursor = document.querySelector(".cursor");
const cursorDot = cursor.querySelector(".cursor-dot");
const cursorCircle = cursor.querySelector(".cursor-circle");

document.addEventListener("mousemove", (e) => {
   let x = e.clientX;
   let y = e.clientY;

   cursorDot.style.top = cursorCircle.style.top = y + "px";
   cursorDot.style.left = cursorCircle.style.left = x + "px";
})

// Cursor effects on hover website elements.
const cursorHoverlinks = document.querySelectorAll("body a, .theme-btn, .sue-main-btn, portfolio-card, .swipper-button-next, swipper-button-prev, .swipper-pagination-bullet, .service-card, .contact-social-links li, .contact-form .submit-btn, .menu-show-btn, .menu-hide-btn")

cursorHoverlinks.forEach((cursorHoverlink) => {
   cursorHoverlink.addEventListener("mouseover", () => {
      cursorDot.classList.add("large");
      cursorCircle.style.display = "none";
   });
});

cursorHoverlinks.forEach((cursorHoverlink) => {
   cursorHoverlink.addEventListener("mouseout", () => {
      cursorDot.classList.remove("large");
      cursorCircle.style.display = "block";
   });
 });

/* =====================================================
   Website dark/light theme
===================================================== */

// Change theme and save current theme on click the theme button.
const themeBtn = document.querySelector(".theme-btn");

themeBtn.addEventListener("click", () => {
   // Change theme and save current theme on click the theme button.
   themeBtn.classList.toggle("active-sun-icon");
   document.body.classList.toggle("light-theme");
   
   const getCurrentIcon = () => themeBtn.classList.contains("active-sun-icon") ? "sun" : "moon";
   const getCurrentTheme = () => document.body.classList.contains("light-theme") ? "light" : "dark";

   localStorage.setItem("javi-saved-icon", getCurrentIcon());
   localStorage.setItem("javi-saved-theme", getCurrentIcon());
});

// Get saved theme icon and theme on document loaded.

const savedIcon = localStorage.getItem("javi-saved-icon");
const savedTheme = localStorage.getItem("javi-saved-theme");

document.addEventListener("DOMContentLoaded", () => {
   themeBtn.classList[savedIcon === "sun" ? "add" : "remove"]("active-sun-icon");
   document.body.classList[savedTheme === "light" ? "add" : "remove"]("light-theme");
});
/* =====================================================
   ScrollReveal JS animations
===================================================== */

// Common reveal options to create reveal animations.
ScrollReveal({ 
   // reset: true,
   distance: '60px',
   duration: 2500,
   delay: 400
});

// Target elements and specify options to create reveal animations.
ScrollReveal().reveal('.avatar-img, .resume-tabs, .javi-main-btn', { delay: 50, origin: 'top' });
ScrollReveal().reveal('.avatar-info, .section-title, .section-title-testimonial', { delay: 150, origin: 'top' });
ScrollReveal().reveal('.home-social, .home-scroll-btn, .copy-right, .service-card', { delay: 200, origin: 'bottom' });
ScrollReveal().reveal('.about-img', { delay: 200, origin: 'top' });
ScrollReveal().reveal('.about-info, .javi-footer .javi-logo', { delay: 150, origin: 'bottom' });
ScrollReveal().reveal('.pro-card, .about-buttons, .portfolio-tabs', { delay: 200, origin: 'right', interval: 100 });
ScrollReveal().reveal('#resume .section-content', { delay: 300, origin: 'bottom' });
ScrollReveal().reveal(' .portfolio-card, .contact-item, .contact-social-links li, .footer-menu ', { delay: 150, origin: 'bottom', interval: 200 });
ScrollReveal().reveal('.javi-client-swiper, .contact-form-container', { delay: 200, origin: 'right' });
ScrollReveal().reveal('.contact-info h3', { delay: 100, origin: 'bottom', interval: 150 });

//Hiden elements 

eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('a x(){4 k=6.s(\'.w\');4 i=6.c(\'r-b-t\');4 h=6.c(\'q-b-t\');4 j=o.n(k).m(2=>2.1.0===\'3\'||2.1.0===\'\');k.l(a(2){9(j){2.1.0=\'5\'}8{2.1.0=\'3\'}});9(j){i.1.0=\'3\';h.1.0=\'7-5\'}8{i.1.0=\'7-5\';h.1.0=\'3\'}}a v(){4 g=6.s(\'.u\');4 e=6.c(\'r-b-p\');4 d=6.c(\'q-b-p\');4 f=o.n(g).m(2=>2.1.0===\'3\'||2.1.0===\'\');g.l(a(2){9(f){2.1.0=\'5\'}8{2.1.0=\'3\'}});9(f){e.1.0=\'3\';d.1.0=\'7-5\'}8{e.1.0=\'7-5\';d.1.0=\'3\'}}',34,34,'display|style|caja|none|var|block|document|inline|else|if|function|button|getElementById|ocultarButton|mostrarButton|algunoOculto|cajas|ocultarButton1|mostrarButton1|algunoOculto1|cajas1|forEach|some|from|Array|two|ocultar|mostrar|querySelectorAll|one|caja2|toggleCajas2|caja1|toggleCajas1'.split('|'),0,{}))
