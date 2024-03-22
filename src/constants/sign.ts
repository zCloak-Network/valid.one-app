import type { SignType } from "@/types";

export const signTypes: Array<{ label: string; type: SignType }> = [
  {
    label: "Message",
    type: "message",
  },
  {
    label: "File",
    type: "file",
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
