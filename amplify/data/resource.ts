import { type ClientSchema, a, defineData } from '@aws-amplify/backend';


const schema = a.schema({
  Product: a.model({
    title: a.string().required(),
    image: a.url(),
    price: a.float(),
    cartItems: a.hasMany('CartItem', 'productId')
      .authorization((allow) => [
        allow.group('ADMINS').to(['read']),
      ])
  })
  .authorization((allow) => [
    allow.publicApiKey().to(['read']),
  ]),

  CartItem: a.model({
    product: a.belongsTo('Product', 'productId'),
    cart: a.belongsTo('Cart', 'cartId'),
    productId: a.id().required(),
    cartId: a.id().required(),
    quantity: a.integer().default(1),
  })
  .authorization((allow) => [
    allow.owner()
  ]),

  Cart: a.model({
    cartItems: a.hasMany('CartItem', 'cartId'),
  })
  .authorization((allow) => [
    allow.owner()
  ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 }
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
