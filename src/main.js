import Vue from 'vue';
import App from './App';
import router from "./router";

Vue.config.productionTip = false;

export const listener = new Vue();

new Vue({
    el: '#app',
    router,
    render: h => h(App)
}).$mount('#app')