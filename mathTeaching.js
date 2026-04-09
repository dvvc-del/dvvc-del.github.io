document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // 加载用户信息
    fetchUserData();

    // 用户菜单点击
    const userProfile = document.querySelector('.user-profile');
    userProfile.addEventListener('click', function() {
        const usernameElement = document.getElementById('username');
        const isLoggedIn = usernameElement.textContent !== '请登录';

        if (isLoggedIn) {
            window.location.href = 'profile.html';
        } else {
            window.location.href = 'Login.html';
        }
    });

    // 轮播图
    showSlide(0);
    startAutoSlide();
    
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);
});

// ==========================================
// 修复完成：从数据库读取用户信息
// ==========================================
function fetchUserData() {
    // ✅ 修复：必须先获取元素，否则报错
    const usernameElement = document.getElementById('username');
    const avatarElement = document.getElementById('userAvatar');
    const token = localStorage.getItem('token');

    if (!token) {
        usernameElement.textContent = "请登录";
        avatarElement.src = "/images/default-avatar.jpg";
        return;
    }

    // 带 token 请求后端
    axios.get("http://localhost:8080/api/user", {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(response => {
        const user = response.data;

        // ✅ 修复：后端返回的是 isLoggedIn，不是 loggedIn
        if (user.isLoggedIn) {
            usernameElement.textContent = user.username;
            avatarElement.src = "http://localhost:8080/images/" + user.avatar;
        } else {
            usernameElement.textContent = "请登录";
            avatarElement.src = "http://localhost:8080/images/default-avatar.jpg";
        }
    })
    .catch(err => {
        console.error("获取用户信息失败", err);
        usernameElement.textContent = "请登录";
        avatarElement.src = "http://localhost:8080/images/default-avatar.jpg";
    });
}

// 轮播图功能
let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
    if (index >= totalSlides) currentIndex = 0;
    else if (index < 0) currentIndex = totalSlides - 1;
    else currentIndex = index;
    
    const carousel = document.querySelector('.carousel');
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    
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

let autoSlideInterval;
function startAutoSlide() {
    autoSlideInterval = setInterval(() => moveSlide(1), 2000);
}
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}