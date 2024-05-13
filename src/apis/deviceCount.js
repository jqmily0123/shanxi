import request from "@/apis/request.js";

const getDeviceCount = async (city) => {
  console.log(city);
  return request.get(`/devicecount/${city}`);
};
export { getDeviceCount };
