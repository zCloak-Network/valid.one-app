export type SignatureResultObject = {
  original_content: string;
  signer: string;
  signature: string;
  message: string;
};

export type SignatureResponse = {
  content_key: string;
  create_time: number;
  created_by: number;
  hash: string;
  modify_time: number;
  sign_type: number;
  signature: string;
  uuid: string;
};
