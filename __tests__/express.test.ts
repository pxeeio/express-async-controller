import {Router} from 'express';

import Controller from '../src/Controller';
import {test} from './utils';

test('can successfully attach to Express routers', () => {
    const controller = Controller<{
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
        list: undefined,
    }>({
        index: async (_request, _response) => {},
        list: async (_request, _response) => {},
    });

    const router = Router();

    router.get('/', controller.index);
    router.get('/list', controller.list);
});