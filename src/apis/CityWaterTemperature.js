import request from "@/apis/request.js";

const getCityWaterTemperature = async (city) => {
  return request.get(`/citywatertemperature/infos/${city}`);
};
const getCityWaterAvgTemperature = async (city) => {
  return request.get(`/citywatertemperature/avg/${city}`);
};
export { getCityWaterTemperature, getCityWaterAvgTemperature };
