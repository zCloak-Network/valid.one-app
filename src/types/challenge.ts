export type challengeData = {
  id: string;
  challenge: string;
  platform: "telegram";
  from: string;
  to: string;
  requestUser: {
    name: string;
    avatar: string;
  };
  verifyContent: string;
  creatTime: number;
  status: 0 | 1 | 2;
};
