import request from "@/apis/request.js";

const getCityEnergyConsumption = async (city) => {
  return request.get(`/citywaterenergyconsumption/infos/${city}`);
};
const getCityAvgEnergyConsumption = async (city) => {
  return request.get(`/citywaterenergyconsumption/avg/${city}`);
};
export { getCityEnergyConsumption, getCityAvgEnergyConsumption };
