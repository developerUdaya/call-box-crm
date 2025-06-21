import axios from "axios";
import ApiEndPoints from "./ApiEndPoints";

// CUSTOMERS APIS 

// CUSTOMERS APIS 
export const getCustomerAPi = async (query:any) => {
    return axios.get(`${ApiEndPoints.customers}${query}`);
  };

  // CREATE CUSTOMER APIS 
export const postCustomerAPi = async (query:any,payload:any) => {
  return axios.post(`${ApiEndPoints.customers}${query}`,payload);
};

  // UPDATE CUSTOMER APIS 
  export const updateCustomerAPi = async (query:any,payload:any) => {
    return axios.put(`${ApiEndPoints.customers}${query}`,payload);
  };
  

  // DELETE CUSTOMER APIS 
  export const deleteCustomerAPi = async (query:any) => {
    return axios.delete(`${ApiEndPoints.customers}${query}`);
  };

