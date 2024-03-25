export type SignType = "message" | "file";

export type SignatureResultObject = {
  signer: string;
  signature: string;
  message: string;
};
