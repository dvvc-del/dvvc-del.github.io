// script.js

// 获取表单和错误信息的DOM元素
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

// 监听表单提交事件
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表单的默认提交行为

    // 获取用户输入的用户名和密码
    const userAccount = document.getElementById('userAccount').value;
    const password = document.getElementById('password').value;

    console.log('Sending login request:', userAccount, password); // 调试：打印发送的数据

    // 使用axios发送POST请求
    axios.post('https://dvvc-del.github.io/api/login', {
        userAccount: userAccount,
        password: password
    })
    .then(function(response) {
        // 登录成功，显示成功信息并清空错误消息
        errorMessage.textContent = '';
        alert(response.data); // 弹出成功提示
        transferMathTeaching();
    })
    .catch(function(error) {
        // 登录失败，显示错误信息
        if (error.response) {
            // 服务器响应了错误代码
            errorMessage.textContent = error.response.data; // 显示错误消息
        } else if (error.request) {
            // 请求已发出，但无响应
            errorMessage.textContent = '请求已发出，但服务器没有响应';
        } else {
            // 发送请求时出了点问题
            errorMessage.textContent = '请求失败，请稍后再试。';
        }
        console.error('Error:', error); // 在控制台输出错误信息
    });
});

function transferMathTeaching() {
    let countdownTime = 3; // 设置倒计时为 3 秒
    let countdownElement = document.getElementById('countdown');

    console.log("倒计时开始！"); // 调试：检查倒计时是否开始

    const countdownInterval = setInterval(function() {
        countdownElement.innerText = `页面将在 ${countdownTime} 秒后跳转...`;
        countdownTime--; // 每次减少 1 秒

        console.log("倒计时剩余：", countdownTime); // 调试：检查倒计时剩余时间

        if (countdownTime < 0) {
            clearInterval(countdownInterval); // 清除倒计时
            console.log("倒计时结束，跳转页面！"); // 调试：检查是否到了跳转阶段
            window.location.href = 'mathTeaching.html'; // 跳转到目标页面
        }
    }, 1000); // 每秒更新一次
}