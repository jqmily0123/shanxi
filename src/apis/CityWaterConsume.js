import request from "@/apis/request.js";

const getCityWaterConsume = async (city) => {
  return request.get(`/citywaterconsume/infos/${city}`);
};
const getCityWaterAvgConsume = async (city) => {
  return request.get(`/citywaterconsume/avg/${city}`);
};

export { getCityWaterConsume, getCityWaterAvgConsume };
