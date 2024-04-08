/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_APP_VALID_ID_URL: string;
  readonly VITE_APP_CANISTER_ID: string;
  readonly VITE_APP_CANISTER_HOST: string;
  readonly VITE_APP_CARD_SERVICE: string;
  readonly VITE_APP_VALID_3_SERVICE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
