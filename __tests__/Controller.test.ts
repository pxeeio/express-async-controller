import Controller from '../src/Controller';
import {test} from './utils';

test('no errors', () => {
    Controller<{
        index: {
            body: {
                email: string;
                password: string;
            };
            query: {
                time?: string;
            };
            params: {
                id: string;
            };
        },
        read: {
            body: {
                name: string;
                age: number;
            };
            params: {
                id: string;
            };
        },
        list: undefined,
    }>({
        index: async (_request, _response) => {},
        read: async (_request, _response, _next) => {},
        list: async (_request, _response) => {},
    });
});

test('throws TS error if type definitions are not provided', async () => {
    Controller({
        // @ts-expect-error
        index: async (request, response) => {
            console.log(request);
            console.log(response);
        },
    });
});
