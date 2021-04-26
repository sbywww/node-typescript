import App from "./app";
import ValidateEnv from "./utils/ValidateEnv";

new ValidateEnv();

const app = new App();
app.listen();
