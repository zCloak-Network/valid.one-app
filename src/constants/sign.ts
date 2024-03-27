type SignType = "message" | "file";

export const signTypes: Array<{
  label: string;
  type: SignType;
  value: number;
}> = [
  {
    label: "Message",
    type: "message",
    value: 1,
  },
  {
    label: "File",
    type: "file",
    value: 2,
  },
];

export const signatureResultTemplate = (
  public_key: string,
  cont: string,
  hex: string
) => `${cont}
===
Valid Sign from Valid One
===
signer:0x${public_key},
sig:0x${hex}`;
