$(document).ready(() => {
    var sideBarWidth = $('.respSideBar').width();
    console.log(sideBarWidth);
    $('.responsiveLevtNav').on('click', () => {
        $('.respSideBar').toggle("slide");
        $('body').toggleClass("noScroll");
    })
})