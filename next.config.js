const nextTranslate = require('next-translate');

module.exports = {
  ...nextTranslate(),
  images: {
    domains: ['admin-mrg.mrg-mall.com'],
  },
};
