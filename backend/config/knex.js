module.exports = {
    database: process.env.MYSQL_DATABASE || 'my_db',
    host: process.env.MYSQL_HOST ||'127.0.0.1',
    port: process.env.MYSQL_PORT ||'3306',
    user: process.env.MYSQL_USER ||'my_user',
    password: process.env.MYSQL_PASSWORD ||'pass'
  }