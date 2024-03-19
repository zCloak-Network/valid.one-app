import { Actor, ActorSubclass, HttpAgent } from "@dfinity/agent";
import { CreateActorOptions, idlFactory } from "./idl";
import { Principal } from "@dfinity/principal";
import { _SERVICE } from "./idl/valid_one_backend.did";
import fetch from "isomorphic-fetch";

const canisterId = import.meta.env.VITE_APP_CANISTER_ID;
const canisterHost = import.meta.env.VITE_APP_CANISTER_HOST;

export let actor: ActorSubclass<_SERVICE>;

export const createActor = async (
  canisterId: string | Principal,
  options: CreateActorOptions
): Promise<ActorSubclass<_SERVICE>> => {
  const agent = options.agent || new HttpAgent({ ...options.agentOptions });

  if (options.agent && options.agentOptions) {
    console.warn(
      "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
    );
  }

  // Fetch root key for certificate validation during development

  await agent.fetchRootKey().catch((err: Error) => {
    console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
    console.error(err);
  });

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions,
  });
};

export default async function initActor() {
  actor = await createActor(canisterId, { agentOptions: { host: canisterHost, fetch } });
}
