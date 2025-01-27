$(document).ready(function () {
    let homeActive = true; // Home section is active on load
    let imageActive = false; // Image section starts inactive
    let whatIDoActive = false; // What I Do section starts inactive
    let isScrollEffectDisabled = false; // Disable scroll logic during programmatic scrolls
    let lastScrollY = 0; // Track the last scroll position
    let isIncreasingY = true; // Track scroll direction
    let scrollTimeout = null; // For debouncing scroll events

    // Function to determine and update scroll direction
    function updateScrollDirection() {
        const { scrollY } = window;
        isIncreasingY = scrollY > lastScrollY;
        lastScrollY = scrollY;
    }

    // Attach scroll event to update scroll direction
    $(window).on('scroll', updateScrollDirection);

    $(window).scroll(function () {
        if (isScrollEffectDisabled) return; // Ignore logic during programmatic scrolls

        debounceScroll(() => {
            const { scrollY } = window;

            // Auto-scroll logic with bounds
            if (homeActive && isIncreasingY && scrollY >= 100 && scrollY < 650) {
                autoScrollTo("#image-section-link", "image");
            } else if (imageActive && !isIncreasingY && scrollY <= 650 && scrollY > 100) {
                autoScrollTo("#home-section-link", "home");
            } else if (imageActive && isIncreasingY && scrollY >= 1200 && scrollY < 1900) {
                autoScrollTo("#what-section-link", "whatIDo");
            } else if (whatIDoActive && !isIncreasingY && scrollY <= 1900 && scrollY > 1200) {
                autoScrollTo("#image-section-link", "image");
            }
        }, 50); // Debounce delay
    });

    // Debounce function to limit scroll logic execution
    function debounceScroll(callback, delay) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(callback, delay);
    }

    // Function to handle auto-scroll and state updates
    function autoScrollTo(target, newState) {
        isScrollEffectDisabled = true; // Disable user scroll effects during navigation
        $('html, body').animate(
            { scrollTop: $(target).offset().top }, // Scroll to the target section
            1000, // Duration
            "swing", // Easing
            function () {
                updateState(newState); // Update state after reaching target
                syncScrollStates(); // Ensure scroll states are in sync
                isScrollEffectDisabled = false; // Re-enable scroll effects
            }
        );
    }

    // Synchronize scroll-related states immediately
    function syncScrollStates() {
        const { scrollY } = window;
        lastScrollY = scrollY;
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
            1000, // Duration
            "swing",
            function () {
                updateState("home"); // Set state to Home
                $('html, body').animate(
                    { scrollTop: $(href).offset().top }, // Scroll to dropdown target
                    1000, // Duration
                    "swing",
                    function () {
                        updateState("whatIDo"); // Update state to What I Do
                        syncScrollStates(); // Synchronize scroll states
                        isScrollEffectDisabled = false; // Re-enable scroll effects
                    }
                );
            }
        );
    });

    // Smooth scroll on menu items click
    $('.navbar .menu li a').click(function () {
        const href = $(this).attr('href'); // Target section
        $('html, body').animate(
            { scrollTop: $(href).offset().top },
            1000, // Duration
            "swing",
            function () {
                syncScrollStates(); // Ensure scroll direction is accurate
                isScrollEffectDisabled = false; // Re-enable scroll effects
            }
        );
        isScrollEffectDisabled = true; // Disable effects during menu click
    });

    // Menu button toggle
    $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass('active');
        $('.menu-btn i').toggleClass('active');
        updateState("home"); // Reset active state to Home
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
