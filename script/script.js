"use strict";

// ---------------- 타이핑 효과
window.onload = function () {

    let i = 0
    let j = 0



    const content = ['FRONT-END DEV', 'PUBLISHER'],
        speed = 100,
        text = document.querySelector('.title')

    function txtnum() {
        j == content.length - 1
            ? j = 0
            : j++
    }

    function type() {
        i < content[j].length
            ? (text.innerHTML += content[j].charAt(i), i++, setTimeout(type, speed))
            : setTimeout(function () { remove(); }, 2000)
    }

    function remove() {
        0 <= i
            ? (text.innerHTML = text.innerHTML.slice(0, i), i--, setTimeout(remove, speed))
            : (type(), txtnum())
    }

    type();

    // ---------------- 타이핑 효과

    // ---------------- 메뉴
    let MenuList = document.querySelectorAll(".menu li a");

    for (let i = 0; i < MenuList.length; i++) {
        MenuList[i].addEventListener("mouseover", function () {
            MenuList[i].classList.add("list-hover");
        })
        MenuList[i].addEventListener("mouseout", function () {
            MenuList[i].classList.remove("list-hover");
        })
        MenuList[i].addEventListener("click", function () {
            for (let j = 0; j < MenuList.length; j++) {
                MenuList[j].classList.remove("list-click");
            }
            MenuList[i].classList.add("list-click");
        })
    }

    let header = document.querySelector('header')
    let logoImg = document.querySelector('header img')
    let menuBox = document.querySelector('.menu-box')
    let menuBtn = document.querySelector('.menu-btn')
    let menuBg = document.querySelector('.menu-bg')
    let menuLi = document.querySelectorAll('header .menu li')
    let sectionList = document.querySelectorAll('section')
    let nav = document.querySelectorAll('header .menu a')


    window.addEventListener("scroll", scrollHandler);

    function scrollHandler() {

        let navOffsetTop = document.querySelector('.menu').offsetTop;
        let scrollY = window.scrollY;
        let bannerHeight = document.getElementById('banner').clientHeight;

        if (scrollY + navOffsetTop > bannerHeight) {
            for (let i = 0; i < nav.length; i++) {
                header.classList.add('color')
                nav[i].classList.add('color')
                menuBtn.classList.add('color')
                logoImg.setAttribute('src', "images/logo-black.png")
            }
        }
        else {
            for (let i = 0; i < nav.length; i++) {
                header.classList.remove('color')
                nav[i].classList.remove('color')
                menuBtn.classList.remove('color')
                logoImg.setAttribute('src', "images/logo-white.png")
            }
        }
        for (let i = 0; i < sectionList.length; i++) {
            if (scrollY > sectionList[i].offsetTop - 250) {
                for (let j = 0; j < sectionList.length; j++) {
                    MenuList[j].classList.remove("list-click");
                }
                MenuList[i].classList.add("list-click");
            }
        }
    }

    menuBtn.addEventListener('click', function () {
        menuBox.classList.toggle('active')
        menuBg.classList.toggle('active')
    })
    for (let i = 0; i < menuLi.length; i++) {
        menuLi[i].addEventListener('click', function () {
            menuBox.classList.remove('active')
            menuBg.classList.remove('active')
        })
    }

    // ---------------- PROJECT slide

    let slideWrap = document.querySelector('.slide-wrap')
    let slideBox = document.querySelector('.slide-box')
    let slideList = document.querySelector('.slide-list');
    let slideContents = document.querySelectorAll('.slide-content');
    let slideBtnNext = document.querySelector('.slide-btn-next');
    let slideBtnPrev = document.querySelector('.slide-btn-prev');
    let slideLen = slideContents.length;
    let slideWidth = slideWrap.offsetWidth;
    let slideSpeed = 300;
    let startNum = 0;

    let curIndex = startNum;
    let curSlide = slideContents[curIndex];

    window.addEventListener(`resize`, function () {
        slideWidth = slideWrap.offsetWidth;
        slideList.style.width = slideWidth * (slideLen + 2) + "px";
        let slideContentsResize = document.querySelectorAll('.slide-content');

        for (let i = 0; i < slideLen; i++) {
            slideContentsResize[i].style.width = slideWidth + "px";
            slideContentsResize[i].firstElementChild.style.width = slideWidth + "px";
        }
        slideBox.style.height = slideContentsResize[curIndex + 1].offsetHeight + 'px'
        slideList.style.transform = "translate3d(-" + (slideWidth * (curIndex + 1)) + "px, 0px, 0px)";
        
    });

    slideList.style.width = slideWidth * (slideLen + 2) + "px";
    for (let i = 0; i < slideLen; i++) {
        slideContents[i].style.width = slideWidth + "px";
        slideContents[i].firstElementChild.style.width = slideWidth + "px";
    }
    slideBox.style.height = slideContents[startNum].clientHeight + 'px'



    // Copy first and last slide
    let firstChild = slideList.firstElementChild;
    let lastChild = slideList.lastElementChild;
    let clonedFirst = firstChild.cloneNode(true);
    let clonedLast = lastChild.cloneNode(true);

    // Add copied Slides
    slideList.appendChild(clonedFirst);
    slideList.insertBefore(clonedLast, slideList.firstElementChild);

    slideList.style.transform = "translate3d(-" + (slideWidth * (startNum + 1)) + "px, 0px, 0px)";


    // ---------------- PROJECT pagination
    let pageChild = '';
    let pagination = document.querySelector('.slide-pagination')

    for (let i = 0; i < slideLen; i++) {
        pageChild += '<li class="dot';
        pageChild += (i === startNum) ? ' dot-active' : '';
        pageChild += '" data-index="' + i + '"><a href="#"></a></li>';
    }

    pagination.innerHTML = pageChild;
    let pageDots = pagination.childNodes


    // ---------------- PROJECT slide NextButton
    slideBtnNext.addEventListener('click', next)
    function next() {
        if (curIndex <= slideLen - 1) { // 0 1 2 3 4 
            slideList.style.transition = slideSpeed + 'ms';
            slideList.style.transform = 'translate3d(-' + (slideWidth * (curIndex + 2)) + 'px, 0px, 0px)';
        }
        if (curIndex === slideLen - 1) { // 4
            setTimeout(function () {
                slideList.style.transition = '0ms';
                slideList.style.transform = 'translate3d(-' + slideWidth + 'px, 0px, 0px)';
            }, slideSpeed);
            curIndex = -1;
        }
        curSlide.classList.remove('slide-active');
        pageDots[(curIndex === -1) ? slideLen - 1 : curIndex].classList.remove('dot-active');
        curSlide = slideContents[++curIndex];
        curSlide.classList.add('slide-active');
        pageDots[curIndex].classList.add('dot-active');
        slideBox.style.height = slideContents[curIndex].offsetHeight + 'px'
        
        
    }


    // ---------------- PROJECT slide PrevButton
    slideBtnPrev.addEventListener('click', prev)

    function prev() {
        if (curIndex >= 0) {
            slideList.style.transition = slideSpeed + 'ms';
            slideList.style.transform = 'translate3d(-' + (slideWidth * curIndex) + 'px, 0px, 0px)';
        }
        if (curIndex === 0) {
            setTimeout(function () {
                slideList.style.transition = '0ms';
                slideList.style.transform = 'translate3d(-' + (slideWidth * slideLen) + 'px, 0px, 0px)';
            }, slideSpeed)
            curIndex = slideLen;
        }
        curSlide.classList.remove('slide-active');
        pageDots[(curIndex === slideLen) ? 0 : curIndex].classList.remove('dot-active');
        curSlide = slideContents[--curIndex];
        curSlide.classList.add('slide-active');
        pageDots[curIndex].classList.add('dot-active');
        slideBox.style.height = slideContents[curIndex].offsetHeight + 'px'
    }

    ///
    let mouseStart
    let mouseEnd
    let mouseDistance

    let click = false;
    slideBox.addEventListener('mousedown', function (e) {
        mouseStart = e.clientX
        click = true;
    });
    slideBox.addEventListener('touchstart', function (e) {
        mouseStart = e.touches[0].clientX
        click = true;
    });
    slideBox.addEventListener('mouseup', function (e) {
        mouseEnd = e.clientX
        mouseDistance = mouseEnd - mouseStart;
        click = false;
        if (mouseDistance > 100) {
            prev();
        }
        if (mouseDistance < -100) {
            next();
        }
    });
    slideBox.addEventListener('touchend', function (e) {
        mouseEnd = e.changedTouches[0].clientX
        mouseDistance = mouseEnd - mouseStart;
        click = false;
        if (mouseDistance > 100) {
            prev();
        }
        if (mouseDistance < -100) {
            next();
        }
    });


    // ---------------- PROJECT pagination click
    let curDot;
    Array.prototype.forEach.call(pageDots, function (dot, i) {
        dot.addEventListener('click', function (e) {
            e.preventDefault();
            curDot = document.querySelector('.dot-active');
            curDot.classList.remove('dot-active');

            curDot = this;
            this.classList.add('dot-active');

            curSlide.classList.remove('slide-active');
            curIndex = Number(this.getAttribute('data-index'));
            curSlide = slideContents[curIndex];
            curSlide.classList.add('slide-active');
            slideList.style.transition = slideSpeed + "ms";
            slideList.style.transform = "translate3d(-" + (slideWidth * (curIndex + 1)) + "px, 0px, 0px)";
            slideBox.style.height = slideContents[curIndex].offsetHeight + 'px'
        })
    })


    // ---------------- PROJECT 이미지 클릭 시 효과
    let slideContent = document.querySelectorAll('#project .slide-content')
    let imgList = document.querySelectorAll('#project .slide-content .img-list > div')

    for (let i = 0; i < imgList.length; i++) {
        imgList[i].addEventListener("click", imgMinClick);
    }

    function imgMinClick(e) {
        let clickImgDiv = e.target
        let slideMainImg = clickImgDiv.parentElement.previousElementSibling.firstElementChild
        let clickMinImgList = clickImgDiv.parentElement.children
        let clickImg = clickImgDiv.firstElementChild
        let imgSrc = clickImg.getAttribute("src");
        let slideMainImgSrc = slideMainImg.getAttribute("src");

        if (imgSrc !== slideMainImgSrc) {
            for (let i = 0; i < clickMinImgList.length; i++) {
                clickMinImgList[i].classList.remove("img-click");
            }
            clickImgDiv.classList.add("img-click");

            slideMainImg.style.opacity = '0'
            setTimeout(function () {
                slideMainImg.setAttribute("src", imgSrc)
            }, 400);
            setTimeout(function () {
                slideMainImg.style.opacity = '1'
            }, 400);
        }
    }

}