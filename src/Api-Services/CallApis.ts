import axios from "axios";
import ApiEndPoints from "./ApiEndPoints";

// CALL APIS

// GET CALL  APIS 
export const getCallAPi = async (query:any) => {
    return axios.get(`${ApiEndPoints.call}${query}`);
  };
