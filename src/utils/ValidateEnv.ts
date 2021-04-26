import { cleanEnv, port, str } from "envalid";

class ValidateEnv {
  constructor() {
    cleanEnv(process.env, {
      PORT: port(),
      DOMAIN: str(),
      API_PREFIX: str(),
      LOG_LEVEL: str(),
      LOG_LABEL: str(),
      DATABASE_HOST: str(),
      DATABASE_PORT: str(),
      DATABASE_USERNAME: str(),
      DATABASE_PASSWORD: str(),
      DATABASE_NAME: str(),
    });
  }
}

export default ValidateEnv;
