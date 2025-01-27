$(document).ready(function () {
    /****************************************
     *          GLOBAL STATE
     ****************************************/
    let currentSection = 'home';       // "home" | "image" | "whatIDo" | "none"
    let autoScrollEnabled = true;      // Master switch for snapping
    let lastScrollY = window.scrollY;  // Keep track of previous scroll
    let isScrollingDown = true;        // True if user is scrolling downward
    let scrollTimeout = null;          // Debounce timer
  
    /****************************************
     *        SCROLL DIRECTION
     ****************************************/
    function updateScrollDirection() {
      const newScrollY = window.scrollY;
      isScrollingDown = newScrollY > lastScrollY;
      lastScrollY = newScrollY;
    }
  
    /****************************************
     *     HELPERS: REGION DETECTION
     ****************************************/
    // Returns which of the 3 main sections you're "physically" in based on scrollY,
    // or "none" if you're outside them.
    function getPhysicalRegion() {
      const scrollY = window.scrollY;
      // Original threshold logic:
      // - HOME < 100
      // - IMAGE between 100 and 1200
      // - WHAT I DO >= 1200
      if (scrollY < 100) {
        return 'home';
      } else if (scrollY < 1200) {
        return 'image';
      } else {
        return 'whatIDo';
      }
    }
  
    // Convert an anchor => "home", "image", "whatIDo", or "none"
    function interpretSection(selector) {
      if (selector.includes('#home')) {
        return 'home';
      } else if (selector.includes('#svg-section')) {
        return 'image';
      } else if (selector.includes('#what-i-do')) {
        return 'whatIDo';
      }
      // e.g. #projects, #testimonial, #contact => "none"
      return 'none';
    }
  
    /****************************************
     *   ON PAGE LOAD WITH #HASH
     ****************************************/
    // If we arrived from a subpage link like index.html#testimonial:
    const initialHash = window.location.hash; // e.g. "#testimonial" or ""
    if (initialHash) {
      // Disable auto-scroll so it won't snap during this process
      autoScrollEnabled = false;
  
      // Jump instantly to top (HOME)
      $(window).scrollTop(0);
      lastScrollY = 0;
      currentSection = 'home';
  
      // Now smooth-scroll to the anchor
      $('html, body').animate(
        { scrollTop: $(initialHash).offset().top },
        700,
        function () {
          // After arrival, interpret which section this anchor belongs to
          currentSection = interpretSection(initialHash);
          // Re-enable auto-scroll
          autoScrollEnabled = true;
          updateScrollDirection();
        }
      );
    }
  
    /****************************************
     *       AUTO-SCROLL “INTERVALS”
     ****************************************/
    function handleAutoScroll() {
      if (!autoScrollEnabled) return;
  
      updateScrollDirection();
  
      // 1) If we're "none," see if user physically entered home/image/whatIDo.
      //    If so, adopt that region without snapping. Next threshold crossing will snap.
      if (currentSection === 'none') {
        const newRegion = getPhysicalRegion();
        if (newRegion !== 'none') {
          currentSection = newRegion;
        }
        // Stop here so we don't forcibly snap.
        return;
      }
  
      // 2) If we're already in a main region, do the threshold-based snap
      if (currentSection === 'home') {
        if (isScrollingDown && window.scrollY >= 100) {
          autoScrollTo('#svg-section', 'image');
        }
      }
      else if (currentSection === 'image') {
        if (!isScrollingDown && window.scrollY < 100) {
          autoScrollTo('#home', 'home');
        } 
        else if (isScrollingDown && window.scrollY >= 1200) {
          autoScrollTo('#what-i-do', 'whatIDo');
        }
      }
      else if (currentSection === 'whatIDo') {
        if (!isScrollingDown && window.scrollY < 1200) {
          autoScrollTo('#svg-section', 'image');
        }
      }
    }
  
    // Animate to target, re-enable snapping
    function autoScrollTo(targetSelector, newSection) {
      autoScrollEnabled = false;
      $('html, body').animate(
        { scrollTop: $(targetSelector).offset().top },
        600,
        function () {
          currentSection = newSection;
          autoScrollEnabled = true;
          updateScrollDirection();
        }
      );
    }
  
    /****************************************
     *   NAVBAR CLICK SMOOTH SCROLL
     ****************************************/
    // For top-level links
    $('.navbar .menu > li > a').on('click', function (e) {
      const href = $(this).attr('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        manualScrollTo(href);
      }
    });
  
    // For dropdown links (on the main page)
    $('.navbar .menu ul li ul li a').on('click', function (e) {
      const href = $(this).attr('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        manualScrollTo(href);
      }
    });
  
    function manualScrollTo(targetSelector) {
      const newSec = interpretSection(targetSelector);
      autoScrollEnabled = false; // Turn off mid-animation
  
      $('html, body').animate(
        { scrollTop: $(targetSelector).offset().top },
        700,
        function () {
          currentSection = newSec;
          autoScrollEnabled = true; // Immediately re-enable
          updateScrollDirection();
        }
      );
    }
  
    /****************************************
     *     SCROLL DEBOUNCE
     ****************************************/
    $(window).on('scroll', function () {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        handleAutoScroll();
      }, 50);
    });
  
    /****************************************
     *   MOBILE MENU TOGGLE
     ****************************************/
    $('.menu-btn').click(function () {
      $('.navbar .menu').toggleClass('active');
      $('.menu-btn i').toggleClass('active');
    });
  
    // Close menu on link click
    $('.navbar .menu li a').click(function () {
      $('.navbar .menu').removeClass('active');
      $('.menu-btn i').removeClass('active');
    });
  
    /****************************************
     *       TYPED.JS INIT
     ****************************************/
    new Typed('.typing', {
      strings: [' SWE intern', 'Founding UX @ Otto'],
      typeSpeed: 140,
      backSpeed: 100,
      loop: true,
    });
  });
  