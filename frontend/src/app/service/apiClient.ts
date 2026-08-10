import { env } from "../config/env";

type HttpMethod = "GET"|"POST"|"PUT"|"PATCH"|"DELETE"
interface RequestOptions{
    method:HttpMethod,
    url:string;
    body?:unknown
}

const request =async function <T> (options:RequestOptions):Promise<T>{

    const url = env.apiUrl+options.url
    const response = await fetch(url,{
    method:options.method,
    headers: {
        "Content-Type": "application/json",
      },
    body: options.body !== undefined
  ? JSON.stringify(options.body)
  : undefined,
})

if (!response.ok)throw new Error(`Request failed: ${response.status}`);
return response.json()
}
export const apiClient = {

   get: async function <T>(url: string): Promise<T> {
    return request<T>({
    method: "GET",
    url,
  });
  },
  post:async function <T>(url:string,body?:unknown):Promise<T>{
    return request<T>({
        method:"POST",
        url,
        body
    })
  }
};