$(window).on('load', function () {
    setTimeout(function () {
        $('#loadWrapper').css('opacity', '0.0');
        setTimeout(function () {
            $('#loadWrapper').css('display', 'none');
        }, 1);
    }, 1000);
    setTimeout(function () {
        $('#wrapper').css('display', 'block');
        setTimeout(function () {
            $('#wrapper').css('opacity', '1.0');
        }, 1);
    }, 1000);
});