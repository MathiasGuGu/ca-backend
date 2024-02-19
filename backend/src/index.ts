import { Hono } from "hono";
import image from "./images/images";
import { cors } from "hono/cors";
import users from "./users/users";
const app = new Hono();

app.use(
  "/*",
  cors({
    origin: "http://localhost:3000",
  }),
);

app.route("/images", image);
app.route("/users", users);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default {
  port: 3001,
  fetch: app.fetch,
};
