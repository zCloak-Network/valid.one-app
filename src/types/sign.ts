export type SignType = "message" | "file";

export type SignatureResult = {
  signer: string;
  signature: string;
  message: string;
};
