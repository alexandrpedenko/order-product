export {};

declare global {
  interface JSON {
    parse(
      text: string | Buffer | (() => string),
      reviver?: (key: any, value: any) => any
    ): any;
  }

  namespace NodeJS {
    interface ProcessEnv {
      DB_URI: string;
    }
  }
}
