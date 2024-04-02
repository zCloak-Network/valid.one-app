import {
  valid_one_backend,
  createActor,
  canisterId,
} from "./valid_one_backend";
import { ActorSubclass } from "@dfinity/agent";
import { _SERVICE } from "./valid_one_backend/valid_one_backend.did";
import fetch from "isomorphic-fetch";

const canisterHost = import.meta.env.VITE_APP_CANISTER_HOST;

export let actor: ActorSubclass<_SERVICE>;
export default async function initActor() {
  console.log("initActor", import.meta.env.PROD, canisterId, valid_one_backend);
  actor = import.meta.env.PROD
    ? valid_one_backend
    : await createActor(canisterId, {
        agentOptions: { host: canisterHost, fetch },
      });
}
