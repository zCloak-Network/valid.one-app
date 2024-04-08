import { axiosInstance } from "@/utils";

export const getGenerateOptions = (params: {
  address: string;
  desc: string;
}) => {
  return axiosInstance.get(`/api/passkey/registration/generate-options`, {
    params,
  });
};

export const verifyRegistration = (params: {
  address: string;
  verifyBody: Record<string, any>;
  expectedChallenge: string;
}) => {
  return axiosInstance.post(`/api/passkey/registration/verify`, params, {});
};

export const getAuthOptions = (params: { address?: string }) => {
  return axiosInstance.get(`/api/passkey/auth/generate-options`, {
    params,
  });
};
