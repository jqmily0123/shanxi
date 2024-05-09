import request from "@/apis/request.js";

const getHomeData = async () => {
  return request.get(`/home`);
};
export { getHomeData };
