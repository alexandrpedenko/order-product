import { App } from "./app";

function bootstrap() {
  const app = new App();
  return app.init();
}

export const root = bootstrap();
