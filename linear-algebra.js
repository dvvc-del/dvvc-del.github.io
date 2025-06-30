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