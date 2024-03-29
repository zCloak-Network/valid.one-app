import { axiosInstance } from "@/utils";

export const upload = (params: FormData) => {
  console.log(params);
  return axiosInstance.post("/api/s3/upload", params, {
    baseURL: import.meta.env.VITE_APP_CARD_SERVICE,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
