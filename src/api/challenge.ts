import { axiosInstance } from "@/utils";

export const getChallenge = (params: { id: string }) => {
  return axiosInstance.get(`/api/valid-one/challenge`, {
    params,
    baseURL: import.meta.env.VITE_APP_VALID_3_SERVICE,
  });
};

export const sendChallenge = (params: {
  challengeId: string;
  validId: number;
  signature: string;
}) => {
  return axiosInstance.post(`/api/valid-one/challenge`, params, {
    baseURL: import.meta.env.VITE_APP_VALID_3_SERVICE,
  });
};
