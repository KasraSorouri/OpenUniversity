import axios from "axios";
import { Diary, NewDiary } from "../type";

const baseUrl = 'http://localhost:3002/api/diaries'

const getAllDiary = ()  => {
  return axios
    .get<Diary[]>(baseUrl)
    .then(response => response.data);
}

const addDiary = (object: NewDiary) => {
  return axios
    .post(baseUrl,object)
    .then(response => response.data)
}

export default {
  getAllDiary,
  addDiary
}