import axios from 'axios'

function getBaseUrl(){
  if (process.env.NODE_ENV === "development")
    return "http://localhost:3001/";
  else throw new Error('Not implemented');
}

export function useBaseApi(){
  return axios.create({
    baseURL: getBaseUrl()
  })
}