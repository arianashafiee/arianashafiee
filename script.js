$(document).ready(function () {
    let homeActive = true; // Home section is active on load
    let imageActive = false; // Image section starts inactive
    let whatIDoActive = false; // What I Do section starts inactive
    let dropdownClicked = false; // Track if a dropdown section is clicked
    let isProgrammaticScroll = false; // Prevent interference with programmatic scrolls
    let lastScrollY = 0; // Store the last scroll position
    let isIncreasingY = true; // Track scroll direction

    $(window).scroll(function () {
        const { scrollY } = window;

        // Determine scroll direction
        isIncreasingY = scrollY > lastScrollY;
        lastScrollY = scrollY;

        // Navbar stickiness logic
        if (scrollY > 20) {
            $('.navbar').addClass('sticky');
            $('.dropdown').addClass('sticky');
        } else {
            $('.navbar').removeClass('sticky');
            $('.dropdown').removeClass('sticky');
        }

        // Ignore logic during programmatic scrolls or dropdown actions
        if (isProgrammaticScroll || dropdownClicked) return;

        // Auto-scroll logic with upper and lower bounds
        if (homeActive && isIncreasingY && scrollY >= 100 && scrollY < 650) {
            autoScrollTo("#image-section-link", "image");
        } else if (imageActive && !isIncreasingY && scrollY <= 650 && scrollY > 100) {
            autoScrollTo("#home-section-link", "home");
        } else if (imageActive && isIncreasingY && scrollY >= 1200 && scrollY < 1900) {
            autoScrollTo("#what-section-link", "whatIDo");
        } else if (whatIDoActive && !isIncreasingY && scrollY <= 1900 && scrollY > 1200) {
            autoScrollTo("#image-section-link", "image");
        }
    });

    // Function to handle auto-scroll and state updates
    function autoScrollTo(target, newState) {
        isProgrammaticScroll = true; // Prevent user scroll interference
        $(target)[0].click(); // Simulate a menu click
        updateState(newState);
        setTimeout(() => (isProgrammaticScroll = false), 1000); // Reset after scrolling
    }

    // Update active states
    function updateState(activeSection) {
        homeActive = activeSection === "home";
        imageActive = activeSection === "image";
        whatIDoActive = activeSection === "whatIDo";
    }

    // Smooth scroll on menu items click
    $('.navbar .menu li a').click(function () {
        $('html').css('scrollBehavior', 'smooth');
        isProgrammaticScroll = true; // Prevent interference
        setTimeout(() => (isProgrammaticScroll = false), 1000); // Reset after menu click
    });

    // Menu button toggle
    $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass('active');
        $('.menu-btn i').toggleClass('active');

        // Reset active sections if menu is toggled
        updateState("home");
    });

    // Close menu on link click
    $('.navbar .menu li a').click(function () {
        $('.navbar .menu').removeClass('active');
        $('.menu-btn i').removeClass('active');
    });

    // Typing animation logic
    new Typed('.typing', {
        strings: [
            ' SWE intern',
            'Founding UX @ Otto',
        ],
        typeSpeed: 140,
        backSpeed: 100,
        loop: true,
    });
});
