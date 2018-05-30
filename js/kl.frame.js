//初始化导航
function init_swiper() {
    function setNavSlide(ele, index) {
        $(".swiper_nav .swiper-slide").removeClass("selected");
        ele.addClass("selected");
    }
    var swiper_nav = new Swiper('.swiper_nav', {
        freeMode: true,
        initialSlide: 0,
        slidesPerView: 5.5,
        spaceBetween: true,
        slideToClickedSlide: true,
        preventLinksPropagation: false,
        loop: false
    });
    var swiper_operation = new Swiper('.swiper_operation', {
        preventClicks: true,
        initialSlide: 0,
        watchSlidesProgress: true,
        resistanceRatio: 0,
        onTransitionEnd: function (swiper) {
            var ele = $(swiper_nav.slides[swiper.activeIndex]);
            setNavSlide(ele, swiper.activeIndex);
        }
    });
    swiper_nav.slides.each(function (index, val) {
        var ele = $(this);
        ele.on("click", function (e) {
            setNavSlide(ele, index);
            swiper_operation.slideTo(index, 0);
        });
    });
}