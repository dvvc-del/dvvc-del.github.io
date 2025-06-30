document.addEventListener('DOMContentLoaded', function() {
    // 添加点击事件，展开或收起章节内容
    const chapters = document.querySelectorAll('.chapter h2');

    chapters.forEach(chapter => {
        chapter.addEventListener('click', function() {
            const content = this.nextElementSibling;
            if (content.style.display === 'none') {
                content.style.display = 'block';
            } else {
                content.style.display = 'none';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // 添加点击事件，确保链接正常跳转
    const links = document.querySelectorAll('.chapter ul li a');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // 阻止默认的链接跳转行为
            const href = this.getAttribute('href'); // 获取链接的href属性
            window.open(href, '_blank'); // 在新标签页中打开链接
        });
    });
});


