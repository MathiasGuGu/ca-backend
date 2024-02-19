<aside>
👤 * is a placeholder for the start of the url

</aside>

# Image related routes

## /images/all

returns all images in database

|     |     |
| --- | --- |

```tsx
let res = await fetch("*/images/all");
let data = await res.json();
```

## /images/:id (GET)

shows the image with given id

|     |        |
| --- | ------ |
| id  | string |

```tsx
const response = await fetch(`*/images/${id}`);

const data = await response.json();
```

## /images/:id (DELETE)

deletes the selected image if owned by the logged in user

|     |        |
| --- | ------ |
| id  | string |

```tsx
const response = await fetch(`*/images/${params.id}`, {
  method: "DELETE",
});

const data = await response.json();
```

## /images/save (POST)

|             |        |
| ----------- | ------ |
| title       | string |
| description | string |
| imageSource | string |

Saves a image as base64 in the database

```tsx
let post = async () => {
  const response = await fetch("*/images/save", {
    method: "POST",
    body: JSON.stringify({
      title: title,
      description: description,
      imageSource: img,
    }),
  });
  const data = await response.json();
};
```

## /users/:id (PUT)
