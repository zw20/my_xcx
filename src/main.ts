import { createSSRApp } from "vue";
import App from "./App.vue";

import uviewPlus from 'uview-plus'
// import router from '@/router'

export function createApp() {
    const app = createSSRApp(App);
    app.use(uviewPlus);
    // app.use(router)
    return {
        app,
    };
}
