export type challengeData = {
  challengeID: number;
  platform: "telegram";
  requestUser: {
    name: string;
    avatar: string;
  };
  verifyContent: string;
  createTime: number;
};
