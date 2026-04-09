loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const userAccount = document.getElementById('userAccount').value;
    const password = document.getElementById('password').value;

    axios.post('http://localhost:8080/api/user-login', {
        userAccount: userAccount,
        password: password
    })
    .then(function(response) {
        errorMessage.textContent = '';

        // ==========================================
        // ✅ 关键修复：正确获取 token
        // ==========================================
        const token = response.data.token; 
        console.log("登录成功，token：", token); // 调试看token

        // 保存 token
        localStorage.setItem("token", token);

        // 提示
        alert("登录成功");

        // 跳转
        transferMathTeaching();
    })
    .catch(function(error) {
        if (error.response) {
            errorMessage.textContent = error.response.data;
        } else {
            errorMessage.textContent = '请求失败';
        }
    });
});

function transferMathTeaching() {
    let countdownTime = 2;
    let countdownElement = document.getElementById('countdown');

    const countdownInterval = setInterval(function() {
        countdownElement.innerText = `页面将在 ${countdownTime} 秒后跳转...`;
        countdownTime--;

        if (countdownTime < 0) {
            clearInterval(countdownInterval);
            window.location.href = "mathTeaching.html";
        }
    }, 1000);
}