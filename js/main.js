$(document).ready(function() {
    $('.about-us-description').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            infinite: true,
            asNavFor: '.about-us-carousel'
    });
    $('.about-us-carousel').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        asNavFor: '.about-us-description',
        dots: false,
        focusOnSelect: true,
        infinite: true,
        responsive: [
            {
              breakpoint: 769,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: false,
                dots: false
              }
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: false,
                dots: false
              }
            }
        ]
    });

    $('.short-description-gallery').slick({
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        centerMode: false,
        focusOnSelect: false
    });

    /**
     * Связь между основной каруселью и вспомогательной.
     */ 
    var shortGalleryItems = document.querySelectorAll(".about-us-carousel--mini .about-us-carousel__item");
    var galleryItems = document.querySelectorAll('.about-us-carousel .about-us-carousel__item');

    /**
     * @description функция перебирает элементы и вызывает колбэк на каждом (что бы каждый раз не писать конструкцию:  '[].forEach.call')
     * @param {NodeList} items - колекция перебираемых элементов
     * @param {Function} callback - функция для обработки каждого элемента массива
     */ 
    var eachGalleryItems = function eachGalleryItems(items, callback) {
        [].forEach.call(items, function(item) {
            callback(item);
        });
    };

    eachGalleryItems(shortGalleryItems, function(item) {
        item.addEventListener('click', function() {
            var dataAttr = $(item).data('slick-index');

            eachGalleryItems(galleryItems, function(parentItem) {
                var parentItemAttr = $(parentItem).data('slick-index');

                if (dataAttr == parentItemAttr) {
                    $(parentItem).click();
                }
            });
        });
    });

    eachGalleryItems(galleryItems, function(item) {
        item.addEventListener('click', function() {
            var dataAttr = $(item).data('slick-index');

            eachGalleryItems(shortGalleryItems, function(parentItem) {
                var parentItemAttr = $(parentItem).data('slick-index');

                if (dataAttr == parentItemAttr) {
                    $(parentItem).click();
                }
            });
        });
    });

    var galleryArrow = document.querySelectorAll('.about-us-carousel .slick-arrow');

    [].forEach.call(galleryArrow, function(item) {
        item.addEventListener('click', function() {
            eachGalleryItems(galleryItems, function(item) {
                if ($(item).hasClass('slick-current')) {
                    var dataAttr = $(item).data('slick-index');
                    eachGalleryItems(shortGalleryItems, function(parentItem) {
                        var parentItemAttr = $(parentItem).data('slick-index');
        
                        if (dataAttr == parentItemAttr) {
                            $(parentItem).click();
                        }
                    });
                }
            });
        });
    });
});

$(document).ready(function() {
    /**
     * @description функция переключения модальных окон
     */ 
    var toggleModal = function toggleModal() {
        var btnsOpen = document.querySelectorAll('[data-modal-toggle]');
        var modals = document.querySelectorAll('[data-modal]');
        var overlay = document.querySelector('[data-overlay]');

        if (btnsOpen.length > 1) {
            [].forEach.call(btnsOpen, function(btn) {
                btn.addEventListener('click', function(e) {
                    var btnAttr = btn.getAttribute('data-modal-toggle');
                    modalHendler(modals, btnAttr);
                });
            })
        } else {
            btnsOpen[0].addEventListener('click', function(e) {
                var btnAttr = btnsOpen[0].getAttribute('data-modal-toggle');
                modalHendler(modals, btnAttr);
            });
        }

        function modalHendler(modals, btnAttr) {
            if (modals.length > 1) {
                [].forEach.call(modals, function(modal) {
                    var modalAttr = modal.getAttribute('data-modal');
    
                    if (modalAttr === btnAttr) {
                        $(modal).toggle(200);
                        $(overlay).toggle(200);
                    }

                });
            } else {
                var modalAttr = modals[0].getAttribute('data-modal');

                if (modalAttr === btnAttr) {
                    $(modals).toggle(200);
                    $(overlay).toggle(200);
                }
            }
            
        }

        (function closeOutClick() {
            document.addEventListener('click', function(e) {
                if ( e.target.hasAttribute('data-overlay') == true ) {
                    [].forEach.call(modals, function(modal) {
                        $(modal).toggle(200);
                        $(overlay).toggle(200);
                    });
                }
            });
        })();
    }

    toggleModal();
});

$(document).ready(function() { 
    var arrowScrollDown = document.querySelector('.main-banner .arrow-down');
    var headerHeight = document.querySelector('header').offsetHeight;

    $(arrowScrollDown).on('click', function() {
        $([document.documentElement, document.body]).animate({
            scrollTop: ($("#short-description").offset().top) - headerHeight
        }, 1000);
    })
});

$(document).ready(function() { 
    var toggle = function toggle() {
        var btns = document.querySelectorAll('[data-toggle-btn]');
        var toggleContent = document.querySelectorAll('[data-toggle]');

        if (btns.length > 1) {
            [].forEach.call(btns, function(btn) {
                btn.addEventListener('click', function(e) {
                    var btnAttr = e.target.getAttribute('data-toggle-btn');
    
                    [].forEach.call(toggleContent, function(content) {
                        var contentAttr = content.getAttribute('data-toggle');
    
                        if (btnAttr == contentAttr) {
                            $(btn).toggleClass('toggle-btn--open');
                            $(toggle).slideToggle(200);
                            $(toggle).toggleClass('toggle--open');
                        }
                    });
    
                });
            });
        } else {
            btns[0].addEventListener('click', function(e) {
                var btnAttr = e.target.getAttribute('data-toggle-btn');
                var contentAttr = toggleContent[0].getAttribute('data-toggle');

                if (btnAttr == contentAttr) {
                    $(btns[0]).toggleClass('toggle-btn--open');
                    $(toggleContent[0]).slideToggle(200);
                    $(toggleContent[0]).toggleClass('toggle--open');
                }
            });
        }

        
    };

    toggle();
});

$(document).ready(function() {
    $('.portfolio-list').slick({
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        centerMode: false,
        focusOnSelect: false
    });

    $('.additional-services-video-slider').slick({
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        centerMode: false,
        focusOnSelect: false
    });
});

$(document).ready(function() {
    $('.portfolio-photo-gallery__grouped').fancybox();
});
