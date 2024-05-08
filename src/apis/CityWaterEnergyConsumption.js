import request from "@/apis/request.js";

const getCityEnergyConsumption = async (city) => {
  return request.get(`/citywaterenergyconsumption/${city}`);
};
export { getCityEnergyConsumption };
