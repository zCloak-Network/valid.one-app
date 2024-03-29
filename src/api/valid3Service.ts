import { axiosInstance } from "@/utils";

export const saveString = ({
  content,
  createdBy = "ValidOne-ICP",
}: {
  content: string;
  createdBy: string;
}) => {
  return axiosInstance.post(
    "/api/sign",
    { content, createdBy },
    {
      baseURL: import.meta.env.VITE_APP_VALID_3_SERVICE,
    }
  );
};

export const getString = (short_link: string) => {
  return axiosInstance.get(`/api/sign/${short_link}`, {
    baseURL: import.meta.env.VITE_APP_VALID_3_SERVICE,
  });
};
