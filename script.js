$(document).ready(function () {
    let homeActive = true; // Home section is active on load
    let imageActive = false; // Image section starts inactive
    let whatIDoActive = false; // What I Do section starts inactive
    let isScrollEffectDisabled = false; // Disable scroll logic during programmatic scrolls
    let lastScrollY = 0; // Store the last scroll position
    let isIncreasingY = true; // Track scroll direction

    // Ensure accurate initial state
    function initializeScrollState() {
        lastScrollY = window.scrollY;
        isIncreasingY = true; // Default direction is "down"
    }

    // Function to determine and update scroll direction
    function updateScrollDirection() {
        const { scrollY } = window;
        isIncreasingY = scrollY > lastScrollY;
        lastScrollY = scrollY;
    }

    // Attach scroll event to update scroll direction
    $(window).on('scroll', function () {
        if (isScrollEffectDisabled) return; // Ignore during programmatic scrolls
        updateScrollDirection(); // Update direction
        handleAutoScroll(); // Check for auto-scroll logic
    });

    // Handle auto-scroll logic
    function handleAutoScroll() {
        const { scrollY } = window;

        if (homeActive && isIncreasingY && scrollY >= 100 && scrollY < 650) {
            autoScrollTo("#image-section-link", "image");
        } else if (imageActive && !isIncreasingY && scrollY <= 650 && scrollY > 100) {
            autoScrollTo("#home-section-link", "home");
        } else if (imageActive && isIncreasingY && scrollY >= 1200 && scrollY < 1900) {
            autoScrollTo("#what-section-link", "whatIDo");
        } else if (whatIDoActive && !isIncreasingY && scrollY <= 1900 && scrollY > 1200) {
            autoScrollTo("#image-section-link", "image");
        }
    }

    // Function to handle auto-scroll and state updates
    function autoScrollTo(target, newState) {
        isScrollEffectDisabled = true; // Disable user scroll effects
        $('html, body').animate(
            { scrollTop: $(target).offset().top },
            1000,
            "swing",
            function () {
                updateState(newState); // Update state after scrolling
                synchronizeScrollState(); // Sync scroll direction and state
                isScrollEffectDisabled = false; // Re-enable scroll effects
            }
        );
    }

    // Synchronize scroll-related states immediately
    function synchronizeScrollState() {
        lastScrollY = window.scrollY;
        updateScrollDirection();
    }

    // Update active states
    function updateState(activeSection) {
        homeActive = activeSection === "home";
        imageActive = activeSection === "image";
        whatIDoActive = activeSection === "whatIDo";
    }

    // Handle dropdown section clicks
    $('.navbar .menu ul li ul li a').click(function (e) {
        e.preventDefault(); // Prevent default anchor behavior
        const href = $(this).attr('href'); // Get the href target

        isScrollEffectDisabled = true; // Disable auto-scroll effects during navigation

        // Scroll to Home first
        $('html, body').animate(
            { scrollTop: $("#home-section-link").offset().top },
            1000,
            "swing",
            function () {
                updateState("home"); // Set state to Home
                $('html, body').animate(
                    { scrollTop: $(href).offset().top },
                    1000,
                    "swing",
                    function () {
                        updateState("whatIDo"); // Update state to What I Do
                        synchronizeScrollState(); // Sync scroll states
                        isScrollEffectDisabled = false; // Re-enable scroll effects
                    }
                );
            }
        );
    });

    // Smooth scroll on menu items click
    $('.navbar .menu li a').click(function (e) {
        e.preventDefault(); // Prevent default anchor behavior
        const href = $(this).attr('href'); // Get the href target

        isScrollEffectDisabled = true; // Disable effects during menu click
        $('html, body').animate(
            { scrollTop: $(href).offset().top },
            1000,
            "swing",
            function () {
                synchronizeScrollState(); // Ensure scroll direction is accurate
                isScrollEffectDisabled = false; // Re-enable scroll effects
            }
        );
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

    // Navbar stickiness logic
    $(window).on('scroll', function () {
        const { scrollY } = window;
        if (scrollY > 20) {
            $('.navbar').addClass('sticky');
            $('.dropdown').addClass('sticky');
        } else {
            $('.navbar').removeClass('sticky');
            $('.dropdown').removeClass('sticky');
        }
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

    // Initialize scroll state on page load
    initializeScrollState();
});
