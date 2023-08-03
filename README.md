# express-async-controller

`express-async-controller` is a TypeScript-focused package to help create fully-typed, async-capable Express controllers.

In this sense, a **Controller** is defined as an object whose keys are of type `string` and whose values are HTTP handler functions that take `Request`, `Response`, and
`NextFunction` as parameters and can be either synchronous or asynchronous.

## Features
- Easily define type-safe Express HTTP handlers.
- Supports `async` handlers through the `asyncHandler` function from [`express-async-handler`](https://www.npmjs.com/package/express-async-handler).
- Integrates well with type augmentation on the `Request` type (e.g. attaching properties to `request.session` from `express-session`).

## Installation

With `npm`:

`npm i @pxeeio/express-async-controller`

With `yarn`:

`yarn add @pxeeio/express-async-controller`

With `pnpm`:

`pnpm add @pxeeio/express-async-controller`

## Usage

You can directly pass in type definitions to the function:
```typescript
import Controller from '@pxeeio/express-async-controller';
import {Router} from 'express';

type CreatePostRequest = {
    body: {
        title: string;
    };
};

const postsController = Controller<{
    create: CreatePostRequest;
    list: undefined;
    read: {
        params: {
            id: string;
        };
    };
}>({
    list: async (request, response) => {
        // ...
    },
    read: async (request, response, next) => {
        // `id` is `string` | `undefined`
        const {id} = request.params;
    },
});

const router = Router();

router.get('/posts', postsController.list);
router.get('/posts/:id', postsController.read);
router.post('/posts', postsController.create);
```

or use the `AsynchronousRequestHandler` type to separate the function implementation from the object:
```typescript
import Controller, {type AsynchronousRequestHandler, type Request} from '@pxeeio/express-async-controller';
import {Router} from 'express';

// In `express-session.d.ts`:
declare module 'express-session' {
    interface SessionData {
        user?: {
            id: User['id'];
        };
    }
}

type LoginRequest = Request<{
    body: {
        email: string;
        password: number;
    };
}>;

const login: AsynchronousRequestHandler<LoginRequest> = async (request, response, next) => {
    const user = await User.findByEmail(email);

    if (await user?.isValid()) {
        request.session.user = {
            id: user.id,
        };
        response.status(200).json({
            success: true,
        });
    } else {
        next(new Error('Invalid credentials'));
    }
}

// The request type must still be passed in as a type definition.
const authController = Controller<{
    login: LoginRequest,
}>({
    login,
});

const router = Router();
router.post('/auth', authController.login);
```