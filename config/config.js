require('dotenv').config();
module.exports = {
  "development": {
    "username": `${process.env.DB_USER}`,
    "password": `${process.env.DB_PASS}`,
    "port": `${process.env.DB_PORT}`,
    "database": "event_monster_db",
    "host": `${process.env.DB_HOST}`,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "mj4qs4jysx8qit0r",
    "password": "s5iqa3mek0isb9w2",
    "database": "a453vjh3p85g18u1",
    "port": 3306,
    "host": "ol5tz0yvwp930510.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    "dialect": "mysql"
  }
}