declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_SERVER_URL: string;
    NEXT_PUBLIC_SERVER_DOMAIN: string;
    NEXT_PUBLIC_RECAPTCHA_KEY: string;
    NEXT_PUBLIC_CRYPTO_KEY: string;
    NEXT_PUBLIC_NODE_ENV: string;
  }
}
