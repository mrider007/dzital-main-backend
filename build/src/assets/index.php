<?php include 'header.php'; ?>
<?php include 'banner.php'; ?>
<?php include 'mid-index.php'; ?>
<?php include 'footer.php'; ?>

<script>
    var swiper = new Swiper(".mySwiperVertical", {
        loop: true,
        direction: "vertical",
        mousewheel: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    var swiper = new Swiper(".mainBannerSwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        keyboard: {
            enabled: true,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay: {
            delay: 3000,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
</script>