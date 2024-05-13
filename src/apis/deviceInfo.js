import request from "@/apis/request.js";

const getDeviceInfo = async (city) => {
  return request.get(`/citydevice/${city}`);
};
const updateDeviceInfo = async (device) => {
  return request.post(`/citydevice/updateDevice`, device);
};

const deleteDeviceInfoById = async (id) => {
  return request.delete(`/citydevice/deleteDeviceInfo/${id}`);
};

const getDeviceInfoByCityAndByDate = async (city, startDate, endDate) => {
  return request.get(`/citydevice/${city}/${startDate}/${endDate}`);
};
export {
  getDeviceInfo,
  updateDeviceInfo,
  deleteDeviceInfoById,
  getDeviceInfoByCityAndByDate,
};
