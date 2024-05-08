import request from "@/apis/request.js";

const getCityWaterPressure = async (city) => {
  return request.get(`/citywaterpressure/${city}`);
};
export { getCityWaterPressure };
