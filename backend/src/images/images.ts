import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

let image = new Hono();

image.get("/all", async (c) => {
  // get all images from database
  try {
    let images = await prisma.image.findMany();
    return c.json(images, 200);
  } catch (error) {
    return c.json({ message: "Something went wrong" }, 404);
  }
});

image.get("/:id", async (c) => {
  let paramid = c.req.param("id");

  try {
    let image = await prisma.image.findFirst({
      where: {
        Id: parseInt(paramid),
      },
    });

    if (!image?.Base64) {
      return c.json({ message: "Image not found" }, 404);
    }

    return c.json(image, 200);
  } catch (error) {
    return c.json({ message: "Image not found" }, 404);
  }

  return c.text("Hello Hono GET ONE IMAGE!");
});

image.post("/save", async (c) => {
  try {
    let body = await c.req.json();

    console.log(body.userId);
    let user = await prisma.user.findFirst({
      where: {
        userId: body.userId,
      },
    });

    console.log(user);

    if (!user.username) {
      return c.json({ message: "User not found" }, 404);
    }
    let imageSource = body.imageSource;
    if (!imageSource || imageSource === "") {
      return c.json({ message: "Image not found" }, 404);
    }
    if (
      !body.title ||
      body.title === "" ||
      !body.description ||
      body.description === ""
    ) {
      return c.json({ message: "Title or description not found" }, 404);
    }

    let image = await prisma.image.create({
      data: {
        Base64: imageSource,
        title: body.title,
        description: body.description,
        userId: body.userId,
      },
    });

    if (!image) {
      return c.json({ message: "Image not saved" }, 500);
    }

    return c.json({ message: "Image saved" }, 201);
  } catch (error) {
    return c.json({ message: "Image not saved" }, 500);
  }
});

image.delete("/:id", async (c) => {
  let paramid = c.req.param("id");

  try {
    let image = await prisma.image.findFirst({
      where: {
        Id: parseInt(paramid),
      },
    });

    if (!image?.Base64) {
      return c.json({ message: "Image not found" }, 404);
    }

    let deletedImage = await prisma.image.delete({
      where: {
        Id: parseInt(paramid),
      },
    });
    return c.text("Hello Hono DELETE IMAGE!");
  } catch (error) {
    return c.json({ message: "Image not deleted" }, 500);
  }
});

export default image;
