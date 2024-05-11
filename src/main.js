import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import WaterBall from "@/components/WaterBall.vue";
import WaterTemperature from "@/components/WaterTemperature.vue";
import CircleProcess from "@/components/CircleProcess.vue";
import EnergyConsumption from "@/components/EnergyConsumption.vue";

import DeviceFault from "@/components/DeviceFault.vue";
const app = createApp(App);
app.component("WaterBall", WaterBall);
app.component("WaterTemperature", WaterTemperature);
app.component("CircleProcess", CircleProcess);
app.component("EnergyConsumption", EnergyConsumption);
app.component("DeviceFault", DeviceFault);
import Antd from "ant-design-vue";
import store from "@/store";
app.use(store);
app.use(Antd);
app.use(router).mount("#app");
