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
export { getDeviceInfo, updateDeviceInfo, deleteDeviceInfoById };
