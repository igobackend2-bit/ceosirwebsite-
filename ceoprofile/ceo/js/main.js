/*-----------------------------------------------------------------------------------

    Theme Name: Webrik - Digital Marketing & SEO Agency HTML Template
    Description: Digital Marketing & SEO Agency HTML Template
    Author: Website Design Templates
    Version: 1.0

    /* ----------------------------------

    JS Active Code Index
            
        01. Preloader
        02. Sticky Header
        03. Scroll To Top
        04. Parallax
        05. Wow animation - on scroll
        06. Video
        07. Resize function
        08. FullScreenHeight function
        09. ScreenFixedHeight function
        10. FullScreenHeight and screenHeight with resize function
        11. Owl Carousel Sliders
        12. Service Effect
        13. Countdown
        14. Current Year
        15. Isotop
        
    ---------------------------------- */    

(function($) {

    "use strict";

    var $window = $(window);

        /*------------------------------------
            01. Preloader
        --------------------------------------*/

        $('#preloader').fadeOut('normall', function() {
            $(this).remove();
        });

        /*------------------------------------
            02. Sticky Header
        --------------------------------------*/

        $window.on('scroll', function() {
            var scroll = $window.scrollTop();
            var logochange = $(".navbar-brand img");
            var logodefault = $(".navbar-brand.logodefault img");
            if (scroll <= 175) {
                $("header").removeClass("scrollHeader").addClass("fixedHeader");
                logochange.attr('src', 'img/logos/logo-inner.png');
                logodefault.attr('src', 'img/logos/logo.png');
            } 
            else {
                $("header").removeClass("fixedHeader").addClass("scrollHeader");
                logochange.attr('src', 'img/logos/logo.png');
                logodefault.attr('src', 'img/logos/logo.png');
            }
        });

        /*------------------------------------
            03. Scroll To Top
        --------------------------------------*/

        const scrollTopPercentage = () => {
            const rootStyles = getComputedStyle(document.documentElement);
            const primaryColor = rootStyles.getPropertyValue('--primary-color').trim();
            const secondaryColor = rootStyles.getPropertyValue('--secondary-color').trim();

            const scrollPercentage = () => {
                const scrollTopPos = document.documentElement.scrollTop;
                const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrollValue = Math.round((scrollTopPos / calcHeight) * 100);
                const scrollElementWrap = $(".scroll-top-percentage");

                scrollElementWrap.css("background", `conic-gradient(${primaryColor} ${scrollValue}%, ${secondaryColor} ${scrollValue}%)`);

                if (scrollTopPos > 100) {
                    scrollElementWrap.addClass("active");
                } else {
                    scrollElementWrap.removeClass("active");
                }

                if (scrollValue < 96) {
                    $("#scroll-value").text(`${scrollValue}%`);
                } else {
                    $("#scroll-value").html('<i class="fa-solid fa-angle-up"></i>');
                }
            };

            window.onscroll = scrollPercentage;
            window.onload = scrollPercentage;

            function scrollToTop() {
                document.documentElement.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }

            $(".scroll-top-percentage").on("click", scrollToTop);
        };

        scrollTopPercentage();

        /*------------------------------------
            04. Parallax
        --------------------------------------*/

        // sections background image from data background
        var pageSection = $(".parallax,.bg-img");
        pageSection.each(function(indx) {

            if ($(this).attr("data-background")) {
                $(this).css("background-image", "url(" + $(this).data("background") + ")");
            }
        });

        /*------------------------------------
            05. Wow animation - on scroll
        --------------------------------------*/
        
        var wow = new WOW({
            boxClass: 'wow', // default
            animateClass: 'animated', // default
            offset: 0, // default
            mobile: false, // default
            live: true // default
        })
        wow.init();

        /*------------------------------------
            06. Video
        --------------------------------------*/

        // It is for local video
        $('.story-video').magnificPopup({
            delegate: '.video',
            type: 'iframe'
        });

        /*------------------------------------
            07. Resize function
        --------------------------------------*/

        $window.resize(function(event) {
            setTimeout(function() {
                SetResizeContent();
            }, 500);
            event.preventDefault();
        });

        /*------------------------------------
            08. FullScreenHeight function
        --------------------------------------*/

        function fullScreenHeight() {
            var element = $(".full-screen");
            var $minheight = $window.height();
            element.css('min-height', $minheight);
        }

        /*------------------------------------
            09. ScreenFixedHeight function
        --------------------------------------*/

        function ScreenFixedHeight() {
            var $headerHeight = $("header").height();
            var element = $(".screen-height");
            var $screenheight = $window.height() - $headerHeight;
            element.css('height', $screenheight);
        }

        /*------------------------------------
            10. FullScreenHeight and screenHeight with resize function
        --------------------------------------*/        

        function SetResizeContent() {
            fullScreenHeight();
            ScreenFixedHeight();
        }

        SetResizeContent();

    // === when document ready === //
    $(document).ready(function(){

        /*------------------------------------
            11. Owl Carousel Sliders
        --------------------------------------*/        
        $('.owl-carousel').each(function () {
            const $carousel = $(this);
            const rawData = $carousel.attr('data-owl');
            let options = {};

            // Parse data-owl JSON if available
            if (rawData) {
                try {
                    options = JSON.parse(rawData);
                } catch (e) {
                    return; // Skip initializing this carousel
                }
            }

            // Initialize the Owl Carousel without counter
            try {
                $carousel.owlCarousel(options);
            } catch (e) {
                
            }
        });   

        /*------------------------------------
            12. Service Effect
        --------------------------------------*/

        //  hover-active
        let rightItems = document.querySelectorAll('.services-content .item');
        let leftItems = document.querySelectorAll('.img-group .services-img');

        rightItems.forEach((rightItem, index) => {
            rightItem.addEventListener('mouseenter', function () {
                handleHover(rightItem, leftItems[index]);
            });
        });

        function handleHover(rightItem, leftItem) {
            rightItems.forEach(item => {
                item.classList.remove('active');
                item.classList.add('item');
            });
            leftItems.forEach(item => {
                item.classList.remove('active');
                item.classList.add('services-img');
            });
            rightItem.classList.add('active');
            leftItem.classList.add('active');
        } 

        /*------------------------------------
            13. Countdown
        --------------------------------------*/

        // CountDown for coming soon page
        $(".countdown").countdown({
            date: "01 February 2028 00:01:00", //set your date and time. EX: 15 May 2026 12:00:00
            format: "on"
        });

        /*------------------------------------
            14. Current Year
        --------------------------------------*/

        $('.current-year').text(new Date().getFullYear());

        $('.odometer').waypoint(function(direction) {
            if (direction === 'down') {
                let countNumber = $(this.element).attr("data-count");
                $(this.element).html(countNumber);
            }
        }, {
            offset: '80%'
        });        
      
    });

    // === when window loading === //
    $window.on("load", function() {

        /*------------------------------------
            15. Isotop
        --------------------------------------*/

        $('.portfolio-gallery,.portfolio-gallery-isotope').lightGallery();

        $('.portfolio-link').on('click', (e) => {
            e.stopPropagation();
        });

    });

})(jQuery);