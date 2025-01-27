$(document).ready(function () {
    let homeActive = true; // Home section is active on load
    let imageActive = false; // Image section starts inactive
    let whatIDoActive = false; // What I Do section starts inactive

    let lastScrollY = 0; // Store the last scroll position
    let isIncreasingY = true; // Track scroll direction
    let isProgrammaticScroll = false; // Prevent interference during programmatic scrolls

    // Polling mechanism: Check scroll position at regular intervals
    setInterval(() => {
        const scrollY = window.scrollY;

        // Determine scroll direction
        isIncreasingY = scrollY > lastScrollY;
        lastScrollY = scrollY;

        // Ignore logic during programmatic scrolls
        if (isProgrammaticScroll) return;

        // Handle auto-scroll logic based on states, direction, and bounds
        if (homeActive && isIncreasingY && scrollY >= 91 && scrollY < 813) {
            autoScrollTo("#image-section-link", "image");
        } else if (imageActive && !isIncreasingY && scrollY > 91 && scrollY <= 813) {
            autoScrollTo("#home-section-link", "home");
        } else if (imageActive && isIncreasingY && scrollY >= 1190 && scrollY < 1929.76) {
            autoScrollTo("#what-section-link", "whatIDo");
        } else if (whatIDoActive && !isIncreasingY && scrollY > 1190 && scrollY <= 1929.76) {
            autoScrollTo("#image-section-link", "image");
        }
    }, 100); // Poll every 100ms

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
        isProgrammaticScroll = true; // Prevent interference during click scrolls
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
    var typed = new Typed('.typing', {
        strings: [
            ' SWE intern',
            'Founding UX @ Otto',
        ],
        typeSpeed: 140,
        backSpeed: 100,
        loop: true,
    });
});
