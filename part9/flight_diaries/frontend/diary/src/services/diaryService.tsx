import axios,{AxiosError} from "axios";
import { Diary, NewDiary } from "../type";

const baseUrl = 'http://localhost:3002/api/diaries'

const getAllDiary = ()  => {
  return axios
    .get<Diary[]>(baseUrl)
    .then(response => response.data);
}

const addDiary = async (object: NewDiary) => {
    const response = await axios.post(baseUrl,object)
    return response.data;
}

export default {
  getAllDiary,
  addDiary
}