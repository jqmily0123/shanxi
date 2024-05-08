import request from "@/apis/request.js";

const getCityWaterConsume = async (city) => {
  return request.get(`/citywaterconsume/${city}`);
};
export { getCityWaterConsume };
