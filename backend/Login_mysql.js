require("dotenv").config(); // 引入dotenv库来管理环境变量
const express = require("express");
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");
const cors = require("cors");

// 使用环境变量来配置数据库连接
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "CEKay383#",
  database: process.env.DB_NAME || "mywork",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const app = express();
app.use(express.json());
app.use(cors());

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("必需提供用户名和密码");
  }

  try {
    const query = "SELECT * FROM users WHERE username = ?";
    const [users, fields] = await pool.execute(query, [username]); // 确保返回的是用户数据和字段信息

    if (users.length === 0) {
      return res.status(401).send("用户不存在");
    }

    const user = users[0];
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send("密码错误");
    }

    res.send("登录成功");
  } catch (error) {
    console.error("登录错误:", error);
    res.status(500).send("登录过程中发生错误: " + error.message);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
