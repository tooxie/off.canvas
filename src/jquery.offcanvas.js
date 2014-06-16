(function ($) {
    $.fn.offcanvas = function (options) {

        // Default settings
        var settings = $.extend({
            animated: true,
            oldPhones: true,
            enableTouch: false,
            activeClass: 'offcanvas-active'
        }, options);

        // Default element names
        var sections = $.extend({
            sidebarLeft: '',
            sidebarRight: '',
            leftBurger: '',
            rightBurger: ''
        }, options);

        if (sections.sidebarRight !== '') {
            var rSidebar = $(sections.sidebarRight);
            var hasSidebarRight = true;
        }
        if (sections.sidebarLeft !== '') {
            var lSidebar = $(sections.sidebarLeft);
            var hasSidebarLeft = true;
        }
        var mainPage;
        var lBurger = $(sections.leftBurger);
        var rBurger = $(sections.rightBurger);
        var $html = $('html');



        return this.each(function () {
            mainPage = $(this);
            // Add offcanvas class for setting layout specific css
            $html.addClass('offcanvas');

            // Events
            mainPage.on('slideLeft', function slideLeft(ev) {
                if ($html.hasClass(settings.activeClass)) {
                    // Close the left sidebar
                    if (hasSidebarLeft && lSidebar.hasClass('visible')) {
                        $html.removeClass(settings.activeClass);
                        lSidebar.removeClass('visible');
                        mainPage.removeClass('slidRight');
                        emit(lSidebar, 'close');
                    }
                } else {
                    // Open the right sidebar
                    if (hasSidebarRight && !rSidebar.hasClass('visible')) {
                        $html.addClass(settings.activeClass);
                        rSidebar.addClass('visible');
                        mainPage.addClass('slidLeft');
                        emit(rSidebar, 'open');
                    }
                }
            });

            mainPage.on('slideRight', function slideRight(ev) {
                if ($html.hasClass(settings.activeClass)) {
                    // Close the right sidebar
                    if (hasSidebarRight && rSidebar.hasClass('visible')) {
                        $html.removeClass(settings.activeClass);
                        rSidebar.removeClass('visible');
                        mainPage.removeClass('slidLeft');
                        emit(rSidebar, 'close');
                    }
                } else {
                    // Open the left sidebar
                    if (hasSidebarLeft && !lSidebar.hasClass('visible')) {
                        $html.addClass(settings.activeClass);
                        lSidebar.addClass('visible');
                        mainPage.addClass('slidRight');
                        emit(lSidebar, 'open');
                    }
                }
            });

            if (settings.animated) {
                if (hasSidebarLeft) {
                    lSidebar.addClass('animatedSlide');
                }
                if (hasSidebarRight) {
                    rSidebar.addClass('animatedSlide');
                }
            }

            if (hasSidebarLeft) {
                $('.slideRight').on('click', function (event) {
                    if ($html.hasClass(settings.activeClass)) {
                        mainPage.trigger('slideLeft');
                    } else {
                        mainPage.trigger('slideRight');
                    }

                    return false;
                });
                $('.shutLeft').on('click', function (event) {
                    mainPage.trigger('slideLeft');
                    return false;
                });
            }

            if (hasSidebarRight) {
                $('.slideLeft').on('click', function (event) {
                    if ($html.hasClass(settings.activeClass)) {
                        mainPage.trigger('slideRight');
                    } else {
                        mainPage.trigger('slideLeft');
                    }

                    return false;
                });
                $('.shutRight').on('click', function (event) {
                    mainPage.trigger('slideRight');
                    return false;
                });
            }

            // Add overthrow polyfill if option is enabled
            if (settings.oldPhones) {
                $('.scrollableArea').addClass('overthrow');
            }

            function emit(element, eventName) {
                window.setTimeout(function() {
                    element.trigger(eventName);
                }, 1);
            }

            if (settings.enableTouch) {
                $html.hammer({
                    drag: false,
                    prevent_default: false,
                    css_hacks: false
                }).on('swipe', function (event) {
                    if (event.direction === 'right') {
                        mainPage.trigger('slideRight');
                        return false;
                    } else if (event.direction === 'left') {
                        mainPage.trigger('slideLeft');
                        return false;
                    }
                });
            }
        });
    };
})(jQuery);
