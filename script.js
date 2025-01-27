$(document).ready(function () {
    // State Variables
    let currentSection = "home"; // Tracks the active section
    let isAutoScrollEnabled = true; // Controls whether auto-scroll is active
    let lastScrollY = 0; // Last recorded scroll position
    let isIncreasingY = true; // Scroll direction tracker
    const callbacks = []; // Queue for navigation callbacks

    // Helper: Update scroll direction
    function updateScrollDirection() {
        const { scrollY } = window;
        isIncreasingY = scrollY > lastScrollY;
        lastScrollY = scrollY;
    }

    // Helper: Execute the next callback in the queue
    function executeNextCallback() {
        if (callbacks.length > 0) {
            const nextCallback = callbacks.shift(); // Remove the first callback
            nextCallback(); // Execute it
        }
    }

    // Central Auto-Scroll Function
    function autoScroll(target, targetSection) {
        isAutoScrollEnabled = false; // Disable auto-scroll during animation
        callbacks.push(() => {
            $('html, body').animate(
                {
                    scrollTop: $(target).offset().top, // Navigate to the target
                },
                800, // Duration
                function () {
                    currentSection = targetSection; // Update the active section
                    isAutoScrollEnabled = true; // Reactivate auto-scroll
                    updateScrollDirection(); // Sync scroll direction
                    executeNextCallback(); // Execute the next callback
                }
            );
        });
        executeNextCallback(); // Start execution if queue was empty
    }

    // Scroll Event Listener
    $(window).on('scroll', function () {
        if (!isAutoScrollEnabled) return; // Skip if auto-scroll is disabled

        updateScrollDirection();

        const { scrollY } = window;

        // Auto-scroll logic based on direction and bounds
        if (currentSection === "home" && isIncreasingY && scrollY >= 100 && scrollY < 650) {
            autoScroll("#image-section-link", "image");
        } else if (currentSection === "image" && !isIncreasingY && scrollY <= 650 && scrollY > 100) {
            autoScroll("#home-section-link", "home");
        } else if (currentSection === "image" && isIncreasingY && scrollY >= 1200 && scrollY < 1900) {
            autoScroll("#what-section-link", "whatIDo");
        } else if (currentSection === "whatIDo" && !isIncreasingY && scrollY <= 1900 && scrollY > 1200) {
            autoScroll("#image-section-link", "image");
        }
    });

    // Navbar Link Click Handler
    $('.navbar .menu li a').click(function (e) {
        e.preventDefault(); // Prevent default anchor behavior
        const target = $(this).attr('href'); // Get target href

        // Add a navigation callback
        callbacks.push(() => {
            $('html, body').animate(
                {
                    scrollTop: $(target).offset().top, // Navigate to target
                },
                800, // Duration
                function () {
                    currentSection = target.includes("home")
                        ? "home"
                        : target.includes("image")
                        ? "image"
                        : target.includes("what")
                        ? "whatIDo"
                        : currentSection; // Update section state
                    isAutoScrollEnabled = true; // Reactivate auto-scroll
                    updateScrollDirection(); // Sync scroll direction
                    executeNextCallback(); // Execute the next callback
                }
            );
        });
        executeNextCallback(); // Start execution if queue was empty
    });

    // Dropdown Link Click Handler (What I Do topics)
    $('.navbar .menu ul li ul li a').click(function (e) {
        e.preventDefault(); // Prevent default anchor behavior
        const target = $(this).attr('href'); // Get target href

        // Queue navigation to Home, then the dropdown section
        callbacks.push(() => autoScroll("#home-section-link", "home")); // Navigate to Home
        callbacks.push(() =>
            $('html, body').animate(
                {
                    scrollTop: $(target).offset().top, // Navigate to the dropdown target
                },
                800, // Duration
                function () {
                    currentSection = "whatIDo"; // Update to What I Do section
                    isAutoScrollEnabled = true; // Reactivate auto-scroll
                    updateScrollDirection(); // Sync scroll direction
                    executeNextCallback(); // Execute the next callback
                }
            )
        );
        executeNextCallback(); // Start execution if queue was empty
    });

    // Navbar Sticky Behavior
    $(window).scroll(function () {
        if (window.scrollY > 20) {
            $('.navbar').addClass('sticky');
            $('.dropdown').addClass('sticky');
        } else {
            $('.navbar').removeClass('sticky');
            $('.dropdown').removeClass('sticky');
        }
    });

    // Menu Button Toggle
    $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass('active');
        $('.menu-btn i').toggleClass('active');
        currentSection = "home"; // Reset state when toggling menu
    });

    // Close Menu on Link Click
    $('.navbar .menu li a').click(function () {
        $('.navbar .menu').removeClass('active');
        $('.menu-btn i').removeClass('active');
    });

    // Typing Animation
    new Typed('.typing', {
        strings: [' SWE intern', 'Founding UX @ Otto'],
        typeSpeed: 140,
        backSpeed: 100,
        loop: true,
    });
});
