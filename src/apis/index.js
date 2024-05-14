import {
  getCityWaterConsume,
  getCityWaterAvgConsume,
} from "./CityWaterConsume";
import {
  getCityEnergyConsumption,
  getCityAvgEnergyConsumption,
} from "./CityWaterEnergyConsumption";
import {
  getCityWaterTemperature,
  getCityWaterAvgTemperature,
} from "./CityWaterTemperature";
import {
  getCityWaterPressure,
  getCityWaterAvgPressure,
} from "./CityWaterPressure";
import { getDeviceCount } from "@/apis/deviceCount.js";
import {
  getDeviceInfo,
  updateDeviceInfo,
  deleteDeviceInfoById,
  getDeviceInfoByCityAndByDate,
} from "./deviceInfo.js";
import {
  getUsers,
  deleteUserById,
  updateUser,
  getUserByUsername,
} from "@/apis/user.js";
import { getHomeData } from "@/apis/home.js";

export {
  getCityWaterPressure,
  getCityEnergyConsumption,
  getCityWaterTemperature,
  getCityWaterConsume,
  getDeviceCount,
  getDeviceInfo,
  updateDeviceInfo,
  deleteDeviceInfoById,
  getUsers,
  deleteUserById,
  getHomeData,
  updateUser,
  getUserByUsername,
  getDeviceInfoByCityAndByDate,
  getCityWaterAvgTemperature,
  getCityWaterAvgPressure,
  getCityAvgEnergyConsumption,
  getCityWaterAvgConsume,
};
