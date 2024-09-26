document.addEventListener('DOMContentLoaded', function () {
    new Swiper('#main-carousel', {
        direction: "horizontal",
        loop: true,

        // // 如果需要分页器
        // pagination: {
        //     el: ".swiper-pagination",
        //     clickable: true, // 添加 clickable 选项，使分页器可点击
        // },

        // 如果需要导航按钮
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        // 自动播放配置
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });
});