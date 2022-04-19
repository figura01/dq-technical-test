import axios from "axios";
import { API_URL } from './config';
const service = axios.create({
  baseURL: API_URL ,
  withCredentials: true,
});

function errorHandler(error) {
  if (error.response) {
    console.log(error.response.data.message);
    throw error.response.data;
  }
  throw error;
}

export default {
  service,

  getAll(endPoint) {
    return service
      .get(endPoint)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  createOne(endPoint, data) {
    return service
      .post(endPoint, data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getOne(endPoint, data) {
    return service
      .get(`${endPoint}/${data}`)
      .then((resDb) => resDb.data)
      .catch(errorHandler);
  },

  updateOne(endPoint, data) {
    console.log(endPoint)
    console.log(data)
    return service
      .put(endPoint, data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  deleteOne(endPoint, data) {
    return service
      .delete(endPoint, data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  delete_one(endPoint, id) {
    return service
      .delete(`${endPoint}${id}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },
};