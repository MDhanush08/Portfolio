(function () {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector(".header-toggle");

  function headerToggle() {
    document.querySelector("#header").classList.toggle("header-show");
    headerToggleBtn.classList.toggle("bi-list");
    headerToggleBtn.classList.toggle("bi-x");
  }
  headerToggleBtn.addEventListener("click", headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".header-show")) {
        headerToggle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector(".typed");
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll(".skills-animation");
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: "80%",
      handler: function (direction) {
        let progress = item.querySelectorAll(".progress .progress-bar");
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false
        );
      });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();


// Animation

$(document).ready(function () {
  $(".animate-hero").waypoint(
    function () {
    $(".animate-hero").addClass("animate__animated animate__fadeInLeft");
  },{offset: "80%"}
);


$(".animate-dev").waypoint(
  function () {
  $(".animate-dev").addClass("animate__animated animate__fadeInLeft");
},{offset: "80%"}
);

$(".animate-sociallinks").waypoint(
  function () {
  $(".animate-sociallinks").addClass("animate__animated animate__bounceIn");       
},{offset: "80%"}
);

$(".resume-btn").waypoint(
  function () {
  $(".resume-btn").addClass("animate__animated animate__bounceIn");    
},{offset: "80%"}
);
   
// About
$(".animate-abouth1").waypoint(   // abouth1
  function () {
  $(".animate-abouth1").addClass("animate__animated animate__backInUp");    
},{offset: "80%"}
);

$(".about1-container").waypoint(    /// about img
  function () {
  $(".about1-container").addClass("animate__animated animate__fadeInLeft");    
},{offset: "80%"}
);

$(".animate-abouth3").waypoint(  ///about head h3
  function () {
  $(".animate-abouth3").addClass("animate__animated animate__fadeInRight");    
},{offset: "80%"}
);

$(".animate-para1").waypoint(   // para 1
  function () {
  $(".animate-para1").addClass("animate__animated animate__fadeInRight");    
},{offset: "80%"}
);

$(".animate-para2").waypoint(  //para2
  function () {
  $(".animate-para2").addClass("animate__animated animate__fadeInRight");    
},{offset: "80%"}
);

// skills 

$(".animate-skillh1").waypoint(
  function () {
  $(".animate-skillh1").addClass("animate__animated animate__fadeInRight");    
},{offset: "80%"}
);

$(".animate-skillimg").waypoint(
  function () {
  $(".animate-skillimg").addClass("animate__animated animate__bounceIn");    
},{offset: "90%"}
);

$(".animate-skillimg1").waypoint(
  function () {
  $(".animate-skillimg1").addClass("animate__animated animate__bounceIn");    
},{offset: "90%"}
);

$(".animate-skillimg2").waypoint(
  function () {
  $(".animate-skillimg2").addClass("animate__animated animate__bounceIn");    
},{offset: "90%"}
);

$(".animate-skillimg3").waypoint(
  function () {
  $(".animate-skillimg3").addClass("animate__animated animate__bounceIn");    
},{offset: "90%"}
);

$(".animate-skillimg4").waypoint(
  function () {
  $(".animate-skillimg4").addClass("animate__animated animate__bounceIn");    
},{offset: "90%"}
);

$(".animate-skillimg5").waypoint(
  function () {
  $(".animate-skillimg5").addClass("animate__animated animate__bounceIn");    
},{offset: "90%"}
);

$(".animate-skillimg6").waypoint(
  function () {
  $(".animate-skillimg6").addClass("animate__animated animate__bounceIn");    
},{offset: "90%"}
);

$(".animate-skillimg7").waypoint(
  function () {
  $(".animate-skillimg7").addClass("animate__animated animate__bounceIn");    
},{offset: "90%"}
);

$(".animate-skillimg8").waypoint(
  function () {
  $(".animate-skillimg8").addClass("animate__animated animate__bounceIn");    
},{offset: "90%"}
);

$(".animate-skillimg9").waypoint(
  function () {
  $(".animate-skillimg9").addClass("animate__animated animate__bounceIn");    
},{offset: "90%"}
);

$(".animate-skillimg10").waypoint(
  function () {
  $(".animate-skillimg10").addClass("animate__animated animate__zoomIn");    
},{offset: "90%"}
);

$(".animate-skillimg11").waypoint(
  function () {
  $(".animate-skillimg11").addClass("animate__animated animate__heartBeat");    
},{offset: "90%"}
);

$(".skill2-text").waypoint(  //skil image
  function () {
  $(".skill2-text").addClass("animate__animated animate__fadeInRight");    
},{offset: "80%"}
);



// Project

$(".animate-projh2").waypoint(
  function () {
   $(".animate-projh2").addClass("animate__animated animate__fadeInUp");   
  // $(".animate-projh2").addClass("animate__animated animate__zoomIn");  
},{offset: "80%"}
);

$("#animate-proj1").waypoint(
  function () {
  $("#animate-proj1").addClass("animate__animated animate__zoomIn");    
},{offset: "80%"}
);

$("#animate-proj2").waypoint(
  function () {
  $("#animate-proj2").addClass("animate__animated animate__zoomIn");    
},{offset: "80%"}
);

$("#animate-proj3").waypoint(
  function () {
  $("#animate-proj3").addClass("animate__animated animate__zoomIn");    
},{offset: "80%"}
);

$("#animate-proj4").waypoint(
  function () {
  $("#animate-proj4").addClass("animate__animated animate__zoomIn");    
},{offset: "80%"}
);

$("#animate-proj5").waypoint(
  function () {
  $("#animate-proj5").addClass("animate__animated animate__zoomIn");    
},{offset: "80%"}
);

$("#animate-proj6").waypoint(
  function () {
  $("#animate-proj6").addClass("animate__animated animate__zoomIn");    
},{offset: "80%"}
);

// contact
$(".animate-contacth2").waypoint(
  function () {
  $(".animate-contacth2").addClass("animate__animated animate__zoomIn");      
},{offset: "80%"}
);


$(".animate-conp").waypoint(
  function () {
  $(".animate-conp").addClass("animate__animated animate__zoomIn");    
},{offset: "80%"}
);

$(".animate-cicon1").waypoint(
  function () {
  $(".animate-cicon1").addClass("animate__animated animate__heartBeat");    
},{offset: "80%"}
);

$(".animate-cicon2").waypoint(
  function () {
  $(".animate-cicon2").addClass("animate__animated animate__heartBeat");    
},{offset: "80%"}
);

$(".animate-cicon3").waypoint(
  function () {
  $(".animate-cicon3").addClass("animate__animated animate__heartBeat");      
},{offset: "80%"}
);

$(".resume-button").waypoint(   // resume
  function () {
  $(".resume-button").addClass("animate__animated animate__rubberBand");      
},{offset: "80%"}
);

$(".contact-para").waypoint(
  function () {
  $(".contact-para").addClass("animate__animated animate__backInUp");        
},{offset: "80%"}
);


$("#animate-contactimg").waypoint(
  function () {
  $("#animate-contactimg").addClass("animate__animated animate__zoomIn");    
},{offset: "50%"}
);


$(".animate-made1").waypoint(
  function () {
  $(".animate-made1").addClass("animate__animated animate__backInLeft");    
},{offset: "90%"}
);

$(".animate-made3").waypoint(
  function () {
  $(".animate-made3").addClass("animate__animated animate__backInRight");    
},{offset: "90%"}
);

$(".animate-made2").waypoint(
  function () {
  $(".animate-made2").addClass("animate__animated animate__zoomIn");    
},{offset: "90%"}
);

});







