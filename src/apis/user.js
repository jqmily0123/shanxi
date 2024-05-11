import request from "@/apis/request.js";

const getUsers = async () => {
  return request.get(`/users`);
};
const deleteUserById = async (id) => {
  return request.delete(`/delete_user/${id}`);
};
const updateUserById = async (user) => {
  return request.post(`/updateuser`, user);
};
const getUserByUsername = async (username) => {
  return request.get(`/user/${username}`);
};
export { getUsers, deleteUserById, updateUserById, getUserByUsername };
