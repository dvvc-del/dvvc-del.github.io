document.addEventListener('DOMContentLoaded', function() {
    // 获取导航按钮
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');

    // 定义页面的顺序
    const pages = [
        "../one/1-1.html",
        "../one/1-2.html",
        "../one/1-3.html",
        "../one/1-4.html",
        "../one/1-5.html",
        "../one/1-6.html",
        "../one/1-7.html",
        "../one/1-8.html",
        "../one/1-9.html",
        "../two/2-1.html",
        "../two/2-2.html",
        "../two/2-3.html",
        "../two/2-4.html",
        "../two/2-5.html",
        "../three/3-1.html",
        "../three/3-2.html",
        "../three/3-3.html",
        "../three/3-4.html",
        "../three/3-5.html",
        "../four/4-1.html",
        "../four/4-2.html",
        "../four/4-3.html",
        "../five/5-1.html",
        "../five/5-2.html",
        "../five/5-3.html",
        "../five/5-4.html",
        "../six/6-1.html",
        "../six/6-2.html",
        "../six/6-3.html",
        "../six/6-4.html",
        "../six/6-5.html",
        "../six/6-6.html",
        "../six/6-7.html",
        "../six/6-8.html",
        "../six/6-9.html",
        "../seven/7-1.html",
        "../seven/7-2.html",
        "../seven/7-3.html",
        "../seven/7-4.html",
        "../seven/7-5.html",
        "../eight/8-1.html",
        "../eight/8-2.html",
        "../eight/8-3.html",
        "../eight/8-4.html",
        "../eight/8-5.html",
        "../eight/8-6.html",
        "../eight/8-7.html",
        "../eight/8-8.html",
        "../nine/9-1.html",
        "../nine/9-2.html",
        "../nine/9-3.html",
        "../nine/9-4.html",
        "../ten/10-1.html",
        "../ten/10-2.html",
        "../ten/10-3.html",
        "../ten/10-4.html",
        "../ten/10-5.html",
        "../ten/10-6.html",
        "../ten/10-7.html"
    ];

    // 获取当前页面的完整路径并标准化以进行匹配
    const currentPage = window.location.pathname;
    
    // 查找当前页面在数组中的索引
    let currentIndex = -1;
    for (let i = 0; i < pages.length; i++) {
        // 标准化路径比较
        if (currentPage.endsWith(pages[i].substring(2))) { // 去掉 "../" 进行比较
            currentIndex = i;
            break;
        }
    }

    // 如果找不到当前页面（比如在首页），可以设置默认值
    if (currentIndex === -1) {
        currentIndex = 0; // 或其他适当的默认值
    }

    // 更新按钮状态
    function updateButtons() {
        if (currentIndex === 0) {
            prevPageButton.disabled = true;
            nextPageButton.disabled = false;
        } else if (currentIndex === pages.length - 1) {
            prevPageButton.disabled = false;
            nextPageButton.disabled = true;
        } else {
            prevPageButton.disabled = false;
            nextPageButton.disabled = false;
        }
    }

    // 添加点击事件
    prevPageButton.addEventListener('click', function() {
        if (currentIndex > 0) {
            window.location.href = pages[currentIndex - 1];
        }
    });

    nextPageButton.addEventListener('click', function() {
        if (currentIndex < pages.length - 1) {
            window.location.href = pages[currentIndex + 1];
        }
    });

    // 初始化按钮状态
    updateButtons();
});