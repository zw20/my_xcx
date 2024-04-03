import { createSSRApp } from "vue";
import App from "./App.vue";
// @ts-ignore
import uviewPlus from 'uview-plus'

export function createApp() {
    const app = createSSRApp(App);
    app.use(uviewPlus);
    return {
        app,
    };
}
