import request from "@/apis/request.js";

const getCityWaterTemperature = async (city) => {
  return request.get(`/citywatertemperature/${city}`);
};
export { getCityWaterTemperature };
