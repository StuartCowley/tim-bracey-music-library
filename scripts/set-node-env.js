const path = require('path');

const setNodeEnv = (NODE_ENV) => {
  if (NODE_ENV != 'production') {
    const args = process.argv.slice(2)[0];
  
    const envFile = args === 'test' ? '../.env.test' : '../.env';
  
    require('dotenv').config({
      path: path.join(__dirname, envFile)
    });
  }
}

module.exports = setNodeEnv;