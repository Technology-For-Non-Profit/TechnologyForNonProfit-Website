/**
 * Template Name: UpConstruction
 * Updated: Mar 10 2023 with Bootstrap v5.2.3
 * Template URL: https://bootstrapmade.com/upconstruction-bootstrap-construction-website-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });

    document.getElementById(
      "insert-header"
    ).innerHTML = `<header id="header" class="header d-flex align-items-center">
    <div class="container-fluid container-xl d-flex align-items-center justify-content-between">

      <a href="index.html" class="logo d-flex align-items-center">
         <!-- Uncomment the line below if you also wish to use an image logo -->
        <img src="assets/img/favicon.png" alt=""> 
        <h1>Lets Tech for A Better World<span>.</span></h1>
      </a>

      <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
      <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
      <nav id="navbar" class="navbar">
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="projects.html">Projects</a></li>
          <li><a href="contact.html">Contact</a></li>
            <!-- <li><a href="blog.html">Blog</a></li> -->
          <!-- <li class="dropdown"><a href="#"><span>Dropdown</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
            <ul>
              <li><a href="#">Dropdown 1</a></li>
              <li class="dropdown"><a href="#"><span>Deep Dropdown</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
                <ul>
                  <li><a href="#">Deep Dropdown 1</a></li>
                  <li><a href="#">Deep Dropdown 2</a></li>
                  <li><a href="#">Deep Dropdown 3</a></li>
                  <li><a href="#">Deep Dropdown 4</a></li>
                  <li><a href="#">Deep Dropdown 5</a></li>
                </ul>
              </li>
              <li><a href="#">Dropdown 2</a></li>
              <li><a href="#">Dropdown 3</a></li>
              <li><a href="#">Dropdown 4</a></li>
            </ul>
          </li> -->
        </ul>
      </nav>

    </div>
  </header>`;
  }



  /* Ensuring the Header Selector Highlights current Page  - Start */


  const currentPage = window.location.pathname.split('/').pop();

  // Get all the links in the navigation
  const navLinks = document.querySelectorAll("#navbar a");

  // Loop through all the links
  navLinks.forEach(link => {
    // Remove the 'active' class from all links
    link.classList.remove('active');

    // Check if the link's href matches the current page
    if (link.getAttribute('href') === currentPage) {
      // Add 'active' class to the current page's link
      link.classList.add('active');
    }


  });

  /* Ensuring the Header Selector Highlights current Page  - End */

  /**
   * Mobile nav toggle
   */

  const mobileNavShow = document.querySelector(".mobile-nav-show");
  const mobileNavHide = document.querySelector(".mobile-nav-hide");

  document.querySelectorAll(".mobile-nav-toggle").forEach((el) => {
    el.addEventListener("click", function (event) {
      event.preventDefault();
      mobileNavToogle();
    });
  });

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavShow.classList.toggle("d-none");
    mobileNavHide.classList.toggle("d-none");
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navbar a").forEach((navbarlink) => {
    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll(".navbar .dropdown > a");

  navDropdowns.forEach((el) => {
    el.addEventListener("click", function (event) {
      if (document.querySelector(".mobile-nav-active")) {
        event.preventDefault();
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("dropdown-active");

        let dropDownIndicator = this.querySelector(".dropdown-indicator");
        dropDownIndicator.classList.toggle("bi-chevron-up");
        dropDownIndicator.classList.toggle("bi-chevron-down");
      }
    });
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector(".scroll-top");
  if (scrollTop) {
    const togglescrollTop = function () {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    };
    window.addEventListener("load", togglescrollTop);
    document.addEventListener("scroll", togglescrollTop);
    scrollTop.addEventListener(
      "click",
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    );
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Porfolio isotope and filter
   */
  let portfolionIsotope = document.querySelector(".portfolio-isotope");

  if (portfolionIsotope) {
    let portfolioFilter = portfolionIsotope.getAttribute(
      "data-portfolio-filter"
    )
      ? portfolionIsotope.getAttribute("data-portfolio-filter")
      : "*";
    let portfolioLayout = portfolionIsotope.getAttribute(
      "data-portfolio-layout"
    )
      ? portfolionIsotope.getAttribute("data-portfolio-layout")
      : "masonry";
    let portfolioSort = portfolionIsotope.getAttribute("data-portfolio-sort")
      ? portfolionIsotope.getAttribute("data-portfolio-sort")
      : "original-order";

    window.addEventListener("load", () => {
      let portfolioIsotope = new Isotope(
        document.querySelector(".portfolio-container"),
        {
          itemSelector: ".portfolio-item",
          layoutMode: portfolioLayout,
          filter: portfolioFilter,
          sortBy: portfolioSort,
        }
      );

      let menuFilters = document.querySelectorAll(
        ".portfolio-isotope .portfolio-flters li"
      );
      menuFilters.forEach(function (el) {
        el.addEventListener(
          "click",
          function () {
            document
              .querySelector(
                ".portfolio-isotope .portfolio-flters .filter-active"
              )
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            portfolioIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aos_init === "function") {
              aos_init();
            }
          },
          false
        );
      });
    });
  }

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper(".slides-1", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  /**
   * Init swiper slider with 2 slides at once in desktop view
   */
  new Swiper(".slides-2", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },

      1200: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
  });

  /**
   * Initiate pURE cOUNTER
   */
  new PureCounter();

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 800,
      easing: "slide",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", () => {
    aos_init();
  });
});
