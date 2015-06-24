(function($) {
    // Share
    $('body').on('click', function() {
        $('.article-share-box.on').removeClass('on');
    }).on('click', '.article-share-link', function(e) {
        e.stopPropagation();

        var $this = $(this),
            url = $this.attr('data-url'),
            encodedUrl = encodeURIComponent(url),
            id = 'article-share-box-' + $this.attr('data-id'),
            offset = $this.offset();

        if ($('#' + id).length) {
            var box = $('#' + id);

            if (box.hasClass('on')) {
                box.removeClass('on');
                return;
            }
        } else {
            var html = [
                '<div id="' + id + '" class="article-share-box">',
                '<input class="article-share-input" value="' + url + '">',
                '<div class="article-share-links">',
                '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="fa fa-twitter article-share-twitter" target="_blank" title="Twitter"></a>',
                '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="fa fa-facebook article-share-facebook" target="_blank" title="Facebook"></a>',
                '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="fa fa-pinterest article-share-pinterest" target="_blank" title="Pinterest"></a>',
                '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="fa fa-google article-share-google" target="_blank" title="Google+"></a>',
                '</div>',
                '</div>'
            ].join('');

            var box = $(html);

            $('body').append(box);
        }

        $('.article-share-box.on').hide();

        box.css({
            top: offset.top + 25,
            left: offset.left
        }).addClass('on');
    }).on('click', '.article-share-box', function(e) {
        e.stopPropagation();
    }).on('click', '.article-share-box-input', function() {
        $(this).select();
    }).on('click', '.article-share-box-link', function(e) {
        e.preventDefault();
        e.stopPropagation();

        window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
    });

    // Caption
    $('.article-entry').each(function(i) {
        $(this).find('img').each(function() {
            if ($(this).parent().hasClass('fancybox')) return;

            var alt = this.alt;

            if (alt) $(this).after('<span class="caption">' + alt + '</span>');

            $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
        });

        $(this).find('.fancybox').each(function() {
            $(this).attr('rel', 'article' + i);
        });
    });

    if ($.fancybox) {
        $('.fancybox').fancybox();
    }

    // Profile card
    $(document).on('click', function() {
        $('#profile').removeClass('card');
    }).on('click', '#profile-anchor', function(e) {
        e.stopPropagation();
        $('#profile').toggleClass('card');
    }).on('click', '.profile-inner', function(e) {
        e.stopPropagation();
    });

    // To Top
    function initGoToTop() {
        var b = $(window).height() - 200;
        $(function() {
            $(window).scroll(function() {
                if ($(this).scrollTop() > 200) {
                    if ($(document).width() >= 800) {
                        $('#backtotop').css('left', $('#sidebar').offset().left);
                    }
                    $('#backtotop').addClass("showme");
                } else {
                    if ($(document).width() >= 800) {
                        $('#backtotop').css('left', "100%");
                    }
                    $('#backtotop').removeClass("showme");
                }
            });
            $('#backtotop').click(function() {
                $("body,html").animate({
                    scrollTop: 0
                }, 1000);
                return false;
            });
        });
        if ($(window).scrollTop() === 0) {
            $('#backtotop').removeClass('showme');
        } else {
            $('#backtotop').addClass('showme');
        }
    }
    initGoToTop();

})(jQuery);
