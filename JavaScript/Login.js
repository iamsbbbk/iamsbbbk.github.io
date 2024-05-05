document
.getElementById("loginForm")
.addEventListener("submit", async function (event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("请填写用户名和密码！");
    return;
  }

  try {
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      alert("登录成功！");
      // 可以重定向到其他页面或更新UI
    } else {
      throw new Error("登录失败！");
    }
  } catch (error) {
    alert(error.message);
  }
});