import request from "@/apis/request.js";

const getCityWaterPressure = async (city) => {
  return request.get(`/citywaterpressure/infos/${city}`);
};
const getCityWaterAvgPressure = async (city) => {
  return request.get(`/citywaterpressure/avg/${city}`);
};
export { getCityWaterPressure, getCityWaterAvgPressure };
