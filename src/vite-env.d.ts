/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_APP_VALID_ID_URL: string;
  readonly VITE_APP_CANISTER_ID: string;
  readonly VITE_APP_CANISTER_HOST: string;
  readonly VITE_APP_CANISTER_ID_VALID_ONE_BACKEND: string;
  readonly VITE_APP_VALID_ONE_BACKEND_CANISTER_ID: string;
  readonly VITE_APP_DFX_NETWORK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
