document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.carousel-track');
    let slides = Array.from(track.children);
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let slideWidth;
    let currentIndex = 0;
    let autoPlayTimeout;
    let autoPlayInterval;
    let isAnimating = false;

    // 克隆第一张和最后一张幻灯片，实现无缝滚动
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    firstClone.id = 'first-clone';
    lastClone.id = 'last-clone';

    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);

    slides = Array.from(track.children); // 更新幻灯片数组，包含克隆的幻灯片

    // 设置幻灯片的位置
    const setSlidePositions = () => {
        slideWidth = slides[0].getBoundingClientRect().width;
        slides.forEach((slide, index) => {
            slide.style.left = `${slideWidth * index}px`;
        });
        // 设置初始位置
        track.style.transition = 'none';
        track.style.transform = `translateX(-${slideWidth * (currentIndex + 1)}px)`;
    };

    setSlidePositions();

    // 窗口大小变化时，重新计算幻灯片宽度和位置
    window.addEventListener('resize', () => {
        setSlidePositions();
    });

    // 自动播放函数
    const autoPlay = () => {
        autoPlayInterval = setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, 5000);
    };

    // 在初始延迟 5 秒后启动自动播放
    autoPlayTimeout = setTimeout(() => {
        autoPlay();
    }, 5000);

    // 暂停自动播放
    const pauseAutoPlay = () => {
        clearInterval(autoPlayInterval);
        clearTimeout(autoPlayTimeout);
    };

    // 移动到指定的幻灯片
    const moveToSlide = (index) => {
        if (isAnimating) return; // 如果正在动画，直接返回，防止重复触发
        isAnimating = true; // 标记动画开始

        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = `translateX(-${slideWidth * (index + 1)}px)`;
        currentIndex = index;
    };

    // 处理无限循环，在过渡结束时调整位置
    track.addEventListener('transitionend', () => {
        if (slides[currentIndex + 1].id === 'first-clone') {
            // 到达克隆的第一张幻灯片，瞬间跳转到真实的第一张
            track.style.transition = 'none';
            currentIndex = 0;
            track.style.transform = `translateX(-${slideWidth * (currentIndex + 1)}px)`;

            // 强制重绘，确保样式变化被及时应用
            requestAnimationFrame(() => {
                track.style.transition = 'transform 0.5s ease-in-out';
                isAnimating = false; // 标记动画结束
            });
        } else if (slides[currentIndex + 1].id === 'last-clone') {
            // 到达克隆的最后一张幻灯片，瞬间跳转到真实的最后一张
            track.style.transition = 'none';
            currentIndex = slides.length - 3;
            track.style.transform = `translateX(-${slideWidth * (currentIndex + 1)}px)`;

            // 强制重绘
            requestAnimationFrame(() => {
                track.style.transition = 'transform 0.5s ease-in-out';
                isAnimating = false; // 标记动画结束
            });
        } else {
            isAnimating = false; // 标记动画结束
        }
    });

    // 下一张幻灯片
    const nextSlide = () => {
        moveToSlide(currentIndex + 1);
    };

    // 上一张幻灯片
    const prevSlide = () => {
        moveToSlide(currentIndex - 1);
    };

    // 左右按钮点击事件
    prevButton.addEventListener('click', () => {
        pauseAutoPlay();
        prevSlide();
        autoPlay(); // 重新启动自动播放
    });

    nextButton.addEventListener('click', () => {
        pauseAutoPlay();
        nextSlide();
        autoPlay(); // 重新启动自动播放
    });

    // 如果需要在鼠标悬停时暂停自动播放，可以添加以下代码
    /*
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', pauseAutoPlay);
    carousel.addEventListener('mouseleave', () => {
        autoPlayTimeout = setTimeout(() => {
            autoPlay();
        }, 5000);
    });
    */
});
