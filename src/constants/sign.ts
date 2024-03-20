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
