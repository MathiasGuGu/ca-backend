import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

let users = new Hono();

users.get("/all", async (c) => {
  // get all users from database
  try {
    let users = await prisma.user.findMany();
    return c.json(users, 200);
  } catch (error) {
    return c.json({ message: "Something went wrong" }, 404);
  }
});

users.get("/:id", async (c) => {
  let paramid = c.req.param("id");
  try {
    let users = await prisma.user.findFirst({
      where: {
        id: parseInt(paramid),
      },
    });
    return c.json(users, 200);
  } catch (error) {
    return c.json({ message: "Something went wrong" }, 404);
  }
});

users.post("/save", async (c) => {
  try {
    let body = await c.req.json();
    let userId = body.userId;
    let user = await prisma.user.create({
      data: {
        username: body.username,
        userId: userId,
      },
    });

    return c.json(user, 200);
  } catch (error) {
    return c.json({ message: "Try a different username" }, 404);
  }
});

users.put("/update", async (c) => {
  let body = await c.req.json();
  let username = await body.username;
  let userId = await body.userId;
  let user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      username: username,
    },
  });
});

export default users;
