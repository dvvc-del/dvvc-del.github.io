document.addEventListener('DOMContentLoaded', function() {
    // 高亮当前页面链接
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // 用户菜单交互
    const userProfile = document.querySelector('.user-profile');
    userProfile.addEventListener('click', function() {
        // 获取用户登录状态
        const usernameElement = document.getElementById('username');
        const isLoggedIn = usernameElement.textContent !== '请登录';

        // 根据登录状态跳转到不同页面
        if (isLoggedIn) {
            window.location.href = 'profile.html'; // 跳转到个人简介页面
        } else {
            window.location.href = 'login.html'; // 跳转到登录页面
        }
    });

    // 从后端获取用户数据
    fetchUserData();
});

function fetchUserData() {
    axios.get('/api/user')
        .then(response => {
            updateUserUI(response.data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}

function updateUserUI(userData) {
    const avatarElement = document.getElementById('userAvatar');
    const usernameElement = document.getElementById('username');
    
    if (userData.isLoggedIn) {
        avatarElement.src = userData.avatar || "images/default-avatar.jpg"; // 如果没有头像，使用默认头像
        usernameElement.textContent = userData.username || "未知用户";
    } else {
        avatarElement.src = "images/default-avatar.jpg";
        usernameElement.textContent = "请登录";
    }
}

// 轮播图功能
let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
    // 处理边界情况
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }
    
    // 移动轮播图
    const carousel = document.querySelector('.carousel');
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // 更新指示点状态
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

function moveSlide(step) {
    showSlide(currentIndex + step);
}

function currentSlide(index) {
    showSlide(index - 1);
}

// 自动轮播（可选）
let autoSlideInterval;
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        moveSlide(1);
    }, 2000); // 3秒切换一次
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    showSlide(0);
    startAutoSlide();
    
    // 鼠标悬停时暂停自动轮播
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);
});