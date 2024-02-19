<aside>
👤 * is a placeholder for the start of the url

</aside>

# Account related routes

## /account/create/

<aside>
❓ Create a new account

</aside>

| VARIABLE | TYPE   |
| -------- | ------ |
| Username | String |
| Email    | String |
| Password | String |

```tsx

let body = {
	username: "username" // Must be unique!
	email: "email" // Must be unique!
	password: "password" // Must be strong!
}

const url = "*/account/create"

let res = await fetch(URL, {
	method: POST,
	body: JSON.stringify(body),
})
```

## /account/<userId>

<aside>
❓ returns the user data corresponding to userid

</aside>

| VARIABLE | TYPE   |
| -------- | ------ |
| UserId   | String |

```tsx
const url = "*/account/";
const uid = "someUserId";
let res = await fetch(URL + uid, {
  method: GET,
});
```

# Image related routes

## /images/all

|     |     |
| --- | --- |

```tsx
let res = await fetch(URL);
let data = await res.json();
```

|     |        |
| --- | ------ |
| id  | number |

## /images/:id

```tsx
let res = await fetch(URL);
let data = await res.json();
```

## /images/:id

```tsx
let res = await fetch(URL);
let data = await res.json();
```

## /images/save
