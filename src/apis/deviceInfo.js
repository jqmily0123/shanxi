import request from "@/apis/request.js";

const getDeviceInfo = async (city) => {
  return request.get(`/citydevice${city}`);
};
export { getDeviceInfo };
