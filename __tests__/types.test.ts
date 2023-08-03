import type {Request as ExpressRequest} from 'express';

import type {Request} from '../src/types';
import {type Equal, type Expect, test} from './utils';

test('successfully converts request definition with only `body` to correct type', () => {
    type MyRequest = Request<{
        body: {
            email: string;
        };
    }>;

    type Result = [Expect<
        Equal<MyRequest, Required<{
                body: {
                    email?: string;
                };
            }> & {
            query: Partial<ExpressRequest['query']>;
            params: Partial<ExpressRequest['params']>;
        }>
    >];
});

test('successfully converts request definition with only `query` to correct type', () => {
    type MyRequest = Request<{
        query: {
            email: string;
        };
    }>;

    type Result = [Expect<
        Equal<MyRequest, Required<{
                query: {
                    email?: string;
                };
            }> & {
            body: Partial<ExpressRequest['body']>;
            params: Partial<ExpressRequest['params']>;
        }>
    >];
});

test('successfully converts request definition with only `params` to correct type', () => {
    type MyRequest = Request<{
        params: {
            email?: string;
        };
    }>;

    type Result = [Expect<
        Equal<MyRequest, Required<{
                params: {
                    email?: string;
                };
            }> & {
            body: Partial<ExpressRequest['body']>;
            query: Partial<ExpressRequest['query']>;
        }>
    >];
});

test('successfully converts request definition with `body` and `params` to correct type', () => {
    type MyRequest = Request<{
        body: {
            email: string;
        };
        params: {
            email: string;
        };
    }>;

    type Result = [Expect<
        Equal<MyRequest, Required<{
                body: {
                    email?: string;
                };
                params: {
                    email?: string;
                };
            }> & {
            query: Partial<ExpressRequest['query']>;
        }>
    >];
});

test('successfully converts request definition with `body` and `query` to correct type', () => {
    type MyRequest = Request<{
        body: {
            email: string;
        };
        query: {
            email: string;
        };
    }>;

    type Result = [Expect<
        Equal<MyRequest, Required<{
                body: {
                    email?: string;
                };
                query: {
                    email?: string;
                };
            }> & {
            params: Partial<ExpressRequest['params']>;
        }>
    >];
});

test('successfully converts request definition with `query` and `params` to correct type', () => {
    type MyRequest = Request<{
        query: {
            email: string;
        };
        params: {
            email: string;
        };
    }>;

    type Result = [Expect<
        Equal<MyRequest, Required<{
                query: {
                    email?: string;
                };
                params: {
                    email?: string;
                };
            }> & {
            body: Partial<ExpressRequest['body']>;
        }>
    >];
});

test('successfully converts response definition with `body` and `params` to correct type', () => {
    type MyRequest = Request<{
        body: {
            email: string;
        };
        params: {
            email: string;
        };
    }>;

    type Result = [Expect<
        Equal<MyRequest, Required<{
                body: {
                    email?: string;
                };
                params: {
                    email?: string;
                };
            }> & {
            query: Partial<ExpressRequest['query']>;
        }>
    >];
});
