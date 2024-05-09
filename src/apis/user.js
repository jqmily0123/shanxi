import request from "@/apis/request.js";

const getUsers = async () => {
  return request.get(`/users`);
};
const deleteUserById = async (id) => {
  return request.delete(`/delete_user/${id}`);
};
export { getUsers, deleteUserById };
