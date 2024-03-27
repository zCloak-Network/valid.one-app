export type SignatureResultObject = {
  signer: string;
  signature: string;
  message: string;
};

export type SignatureResponse = {
  content: string;
  create_time: number;
  created_by: number;
  modify_time: number;
  sign_type: number;
  signature: string;
  uuid: string;
};
