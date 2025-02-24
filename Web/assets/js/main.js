/* =====================================================
   Resume section tabs and tab contents
===================================================== */
// const resumeTabs = document.querySelector(".resume-tabs");
// const resumePortfolioTabBtns = resumeTabs.querySelectorAll(".tab-btn");
// const resumeTabContents = document.querySelectorAll(".resume-tab-content");

// var resumeTabNav = function(resumeTabClick){
//    resumeTabContents.forEach((resumeTabContent) => {
//       resumeTabContent.style.display = "none";
//       resumeTabContent.classList.remove("active");
//    });

//    resumePortfolioTabBtns.forEach((resumePortfolioTabBtn) => {
//       resumePortfolioTabBtn.classList.remove("active");
//    });

//    resumeTabContents[resumeTabClick].style.display = "flex";

//    setTimeout(() => {
//       resumeTabContents[resumeTabClick].classList.add("active");
//    }, 100);
   
//    resumePortfolioTabBtns[resumeTabClick].classList.add("active");
// }

// resumePortfolioTabBtns.forEach((resumePortfolioTabBtn, i) => {
//    resumePortfolioTabBtn.addEventListener("click", () => {
//       resumeTabNav(i);
//    });
// });
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

javiContactForm = document.getElementById("javi-contact-form");
javiContactFormAlert = document.querySelector(".contact-form-alert");

javiContactForm.addEventListener('submit', function(event) {
   event.preventDefault();
   // these IDs from the previous steps
   emailjs.sendForm('service_bugw8hh', 'template_ftqp524', '#javi-contact-form')
       .then(() => {
           //console.log('SUCCESS!');
           javiContactFormAlert.innerHTML = "<span>¡Tu mensaje se ha enviado!</span><i class='ri-checkbox-circle-fill'></i>";
           javiContactForm.reset();

           setTimeout(() => {
            javiContactFormAlert.innerHTML = "";
           }, 5000);
       }, (error) => {
           //console.log('FAILED...', error);
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
      }

      clearTimeout(navTimeout);
      navTimeout = setTimeout(scrollStoped, 2500);
   }
});

// Hide bottom navigation menu on click menu-hide-btn.

// Show bottom navigation menu on click menu-show-btn.

/* =====================================================
   To-top-button with scroll indicator bar
===================================================== */

/* =====================================================
   Customized cursor on mousemove
===================================================== */

// Cursor effects on hover website elements.

/* =====================================================
   Website dark/light theme
===================================================== */

// Change theme and save current theme on click the theme button.

// Get saved theme icon and theme on document loaded.

/* =====================================================
   ScrollReveal JS animations
===================================================== */

// Common reveal options to create reveal animations.

// Target elements and specify options to create reveal animations.
      