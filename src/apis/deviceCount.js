import request from "@/apis/request.js";

const getDeviceCount = async (city) => {
  return request.get(`/devicecount/${city}`);
};
export { getDeviceCount };
