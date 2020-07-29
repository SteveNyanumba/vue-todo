window._ = require('lodash');

try {
    window.Popper = require('@popperjs/core');
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
    require('@fortawesome/fontawesome-free')
} catch (e) {}


window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

