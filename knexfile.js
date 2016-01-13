module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/gcrud'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
