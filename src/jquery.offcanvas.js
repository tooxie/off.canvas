(function ($) {
    $.fn.offcanvas = function (options) {

        // Default settings
        var settings = $.extend({
            animated: true,
            oldPhones: true,
            enableTouch: true,
            enableKeys: true
        }, options);

        // Default element names
        var sections = $.extend({
            sidebarLeft: '#sidebarLeft',
            sidebarRight: '#sidebarRight',
            mainPage: '#page',
            leftBurger: '#leftBurger',
            rightBurger: '#rightBurger'
        }, options);

        var rSidebar = $(sections.sidebarRight);
        var lSidebar = $(sections.sidebarLeft);
        var mainPage = $(sections.mainPage);
        var lBurger = $(sections.leftBurger);
        var rBurger = $(sections.rightBurger);

        var hasSidebarLeft = lSidebar.length > 0;
        var hasSidebarRight = rSidebar.length > 0;

        return this.each(function () {

            // Add offcanvas class for setting layout specific css
            $(this).addClass('offcanvas');

            $.each(sections, function (index, element) {
                // Add animation class if option is enabled
                if (settings.animated) {
                    $(element).addClass('animatedSlide');
                }
            });

            // Add overthrow polyfill if option is enabled
            if (settings.oldPhones) {
                $('.scrollableArea').addClass('overthrow');
            }

            var slidRight = 0;
            var slidLeft = 0;

            var timeout = window.setTimeout(function (sidebar) {
                $(sidebar).removeClass('show');
            }, 400);

            function emit(element, eventName) {
                window.setTimeout(function() {
                    element.trigger(eventName);
                }, 1);
            }

            // Function that performs the sliding by adding classes to the relevant elements
            function slide(direction, settings) {
                switch (direction) {
                case 'right':
                    if (!lSidebar.hasClass('show')) {
                        emit(lSidebar, 'open');
                        lSidebar.addClass('slidRight show');
                    }
                    if (rSidebar.hasClass('show')) {
                        rSidebar.removeClass('show');
                    }
                    $('html').addClass('active');
                    mainPage.addClass('slidRight');
                    lBurger.addClass('pressed');

                    slidRight = 1;
                    return

                case 'left':
                    if (!rSidebar.hasClass('show')) {
                        emit(rSidebar, 'open');
                        rSidebar.addClass('slidLeft show');
                    }
                    if (lSidebar.hasClass('show')) {
                        lSidebar.removeClass('show');
                    }
                    $('html').addClass('active');
                    mainPage.addClass('slidLeft');
                    rBurger.addClass('pressed');

                    slidLeft = 1;
                    break;

                case 'shutLeft':
                    if (lSidebar.hasClass('slidRight')) {
                        emit(lSidebar, 'close');
                        lSidebar.removeClass('slidRight');
                    }
                    lBurger.removeClass('pressed');
                    mainPage.removeClass('slidRight');

                    var timeout = window.setTimeout(function () {
                        lSidebar.removeClass('show');
                    }, 300);
                    window.clearTimeout(timeout);

                    $('html').removeClass('active');
                    slidRight = 0;
                    break;

                case 'shutRight':
                    if (rSidebar.hasClass('slidLeft')) {
                        emit(rSidebar, 'close');
                        rSidebar.removeClass('slidLeft');
                    }
                    rBurger.removeClass('pressed');
                    mainPage.removeClass('slidLeft');

                    var timeout = window.setTimeout(function () {
                        $(rSidebar).removeClass('show');
                    }, 300);
                    window.clearTimeout(timeout);

                    $('html').removeClass('active');
                    slidLeft = 0;
                    break;
                }
            }

            if (hasSidebarLeft) {
                $('.slideRight').on('click', function (event) {
                    if (!slidRight) {
                        slide('right');
                    } else {
                        slide('shutLeft');
                    }

                    return false;
                });
            }
            if (hasSidebarRight) {
                $('.slideLeft').on('click', function (event) {
                    if (!slidLeft) {
                        slide('left');
                    } else {
                        slide('shutRight');
                    }

                    return false;
                });
            }
            if (hasSidebarLeft) {
                $('.shutLeft').on('click', function (event) {
                    slide('shutLeft');

                    return false;
                });
            }
            if (hasSidebarRight) {
                $('.shutRight').on('click', function (event) {
                    slide('shutRight');

                    return false;
                });
            }

            if (settings.enableKeys) {
                $(this).keydown(function (e) {
                    if (e.keyCode === 39) {
                        if (!slidRight && !slidLeft && hasSidebarLeft) {
                            slide('right');
                        } else {
                            slide('shutRight');
                        }

                        return false;
                    }

                    if (e.keyCode === 37) {
                        if (!slidRight && !slidLeft && hasSidebarRight) {
                            slide('left');
                        } else {
                            slide('shutLeft');
                        }

                        return false;
                    }
                });
            }

            if (settings.enableTouch) {
                $(this).hammer({
                    drag: false,
                    prevent_default: false,
                    css_hacks: false
                }).on('swipe', function (event) {
                    if (event.direction === 'right') {
                        if (!slidRight && !slidLeft && hasSidebarLeft) {
                            slide('right');
                        } else {
                            slide('shutRight');
                        }

                        return false;
                    } else if (event.direction === 'left') {
                        if (!slidRight && !slidLeft && hasSidebarRight) {
                            slide('left');
                        } else {
                            slide('shutLeft');
                        }

                        return false;
                    }
                });
            }
        });
    };
})(jQuery);
