// 获取表单和错误信息的DOM元素
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const errorMessage = document.getElementById('errorMessage');
const getCaptchaButton = document.getElementById('getCaptcha');
const captchaTimerElement = document.getElementById('captchaTimer');

// 监听表单提交事件
forgotPasswordForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // 阻止表单的默认提交行为

    // 获取用户输入的邮箱、新密码和确认密码
    const email = document.getElementById('email').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const captcha = document.getElementById('captcha').value;

    // 前端验证
    if (newPassword !== confirmPassword) {
        errorMessage.textContent = '新密码和确认密码不匹配！';
        return;
    }

    if (!captcha) {
        errorMessage.textContent = '验证码不能为空！';
        return;
    }

    // 使用axios发送POST请求验证验证码
    axios.post('https://dvvc-del.github.io/api/verify-code', {
        email: email,
        code: captcha
    })
    .then(response => {
        // 验证码验证成功，继续处理密码重置逻辑
        errorMessage.textContent = '';
        resetPassword(email, newPassword, confirmPassword); // 传递确认密码
    })
    .catch(error => {
        // 验证码验证失败，显示错误信息
        if (error.response) {
            errorMessage.textContent = error.response.data.message || '验证码验证失败';
        } else if (error.request) {
            errorMessage.textContent = '请求已发出，但服务器没有响应';
        } else {
            errorMessage.textContent = '请求失败，请稍后再试。';
        }
        console.error('Error:', error); // 在控制台输出错误信息
    });
});

// 重置密码的逻辑
function resetPassword(email, newPassword, confirmPassword) {
    axios.post('https://dvvc-del.github.io/api/forget', {
        email: email,
        newPassword: newPassword,
        confirmPassword: confirmPassword
    })
    .then(response => {
        // 密码重置成功，显示成功信息并清空错误消息
        errorMessage.textContent = '';
        alert(response.data.message || '密码已成功重置');
        transferMathTeaching(); // 调用页面跳转函数
    })
    .catch(error => {
        // 密码重置失败，显示错误信息
        if (error.response) {
            errorMessage.textContent = error.response.data.message || '密码重置失败';
        } else if (error.request) {
            errorMessage.textContent = '请求已发出，但服务器没有响应';
        } else {
            errorMessage.textContent = '请求失败，请稍后再试。';
        }
        console.error('Error:', error); // 在控制台输出错误信息
    });
}

// 获取验证码的逻辑
function getCaptcha() {
    const email = document.getElementById('email').value;

    if (!email) {
        errorMessage.textContent = '请输入邮箱地址！';
        return;
    }

    axios.post('https://dvvc-del.github.io/api/send-email', {
        email: email
    })
    .then(response => {
        alert(response.data.message || '验证码已发送到您的邮箱');
        startCaptchaTimer();
    })
    .catch(error => {
        if (error.response) {
            errorMessage.textContent = error.response.data.message || '发送验证码失败';
        } else if (error.request) {
            errorMessage.textContent = '请求已发出，但服务器没有响应';
        } else {
            errorMessage.textContent = '请求失败，请稍后再试。';
        }
        console.error('Error:', error); // 在控制台输出错误信息
    });
}

// 使用addEventListener绑定按钮的点击事件
getCaptchaButton.addEventListener('click', getCaptcha);

// 验证码倒计时功能
let captchaTimer;
let countdownTime = 180; // 3分钟

function startCaptchaTimer() {
    clearInterval(captchaTimer); // 清除之前的计时器
    captchaTimer = setInterval(() => {
        countdownTime--;
        captchaTimerElement.textContent = `验证码有效期剩余：${countdownTime}秒`;
        if (countdownTime <= 0) {
            clearInterval(captchaTimer);
            getCaptchaButton.disabled = false;
            captchaTimerElement.textContent = '';
            countdownTime = 180; // 重置计时器
        }
    }, 1000);
    getCaptchaButton.disabled = true; // 禁用按钮
}

// 页面跳转函数
function transferMathTeaching() {
    let countdownTime = 3; // 设置倒计时为 3 秒
    const countdownElement = document.createElement('p'); // 创建一个元素用于显示倒计时
    document.body.appendChild(countdownElement); // 将倒计时元素添加到页面

    console.log("倒计时开始！"); // 调试：检查倒计时是否开始

    const countdownInterval = setInterval(function() {
        countdownElement.innerText = `页面将在 ${countdownTime} 秒后跳转...`;
        countdownTime--; // 每次减少 1 秒

        console.log("倒计时剩余：", countdownTime); // 调试：检查倒计时剩余时间

        if (countdownTime < 0) {
            clearInterval(countdownInterval); // 清除倒计时
            console.log("倒计时结束，跳转页面！"); // 调试：检查是否到了跳转阶段
            window.location.href = 'Login.html'; // 跳转到目标页面
        }
    }, 1000); // 每秒更新一次
}