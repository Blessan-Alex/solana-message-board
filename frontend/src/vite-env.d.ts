/// <reference types="vite/client" />

declare module "*.json" {
  const value: any;
  export default value;
}

interface ImportMetaEnv {
  readonly VITE_NETWORK: string
  readonly VITE_PROGRAM_ID: string
  readonly VITE_RPC_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
