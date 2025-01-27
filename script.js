$(document).ready(function () {
    let homeActive = true; // Home section is active on load
    let imageActive = false; // Image section starts inactive
    let whatIDoActive = false; // What I Do section starts inactive
    let isScrollEffectDisabled = false; // Disable scroll logic during certain actions
    let lastScrollY = 0; // Track the last scroll position
    let isIncreasingY = true; // Track scroll direction
    let scrollTimeout = null; // For debouncing scroll events

    // Function to determine and update scroll direction
    function updateScrollDirection() {
        const { scrollY } = window;
        isIncreasingY = scrollY > lastScrollY;
        lastScrollY = scrollY;
    }

    // Debounce scroll events
    function debounceScroll(callback, delay) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(callback, delay);
    }

    // Scroll event listener
    $(window).scroll(function () {
        debounceScroll(() => {
            updateScrollDirection();

            if (isScrollEffectDisabled) return; // Ignore logic during disabled state

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

    // Function to handle auto-scroll and state updates
    function autoScrollTo(target, newState) {
        isScrollEffectDisabled = true; // Disable scroll effects during navigation
        $(target)[0].click(); // Simulate a menu click
        updateState(newState);
        setTimeout(() => {
            isScrollEffectDisabled = false; // Re-enable scroll effects
        }, 1000); // Allow smooth scrolling to complete
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

        // Simulate scroll to Home first
        autoScrollTo("#home-section-link", "home");

        // After reaching Home, navigate to the dropdown section
        setTimeout(() => {
            $('html, body').animate(
                {
                    scrollTop: $(href).offset().top, // Scroll to the target section
                },
                1000, // Duration
                function () {
                    updateState("whatIDo"); // Update state to What I Do
                    isScrollEffectDisabled = false; // Re-enable scroll effects
                }
            );
        }, 1000);
    });

    // Smooth scroll on menu items click
    $('.navbar .menu li a').click(function () {
        $('html').css('scrollBehavior', 'smooth');
        isScrollEffectDisabled = true; // Disable effects during menu click
        setTimeout(() => (isScrollEffectDisabled = false), 100); // Re-enable after menu click
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
