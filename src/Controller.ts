import asyncHandler from 'express-async-handler';

import type {
    AsynchronousRequestHandler,
    BaseRequest,
    Request,
    SynchronizedFunction,
    SynchronizedFunctionDictionary,
} from './types';

type ControllerDefinition = {
    [key: string]: BaseRequest | undefined;
};

type AsynchronousController<TController extends ControllerDefinition> = {
    [key in keyof TController]: TController[key] extends BaseRequest
        ? AsynchronousRequestHandler<Request<TController[key]>>
        : AsynchronousRequestHandler;
};

export default function Controller<TController extends ControllerDefinition>(
    definition: AsynchronousController<TController>,
): SynchronizedFunctionDictionary<AsynchronousController<TController>> {
    return Object.keys(definition).reduce(
        (
            controller,
            key: keyof SynchronizedFunctionDictionary<AsynchronousController<TController>>,
        ) => {
            const value = definition[key];
            if (value !== undefined) {
                controller[key] = asyncHandler(value) as SynchronizedFunction<typeof value>;
            }

            return controller;
        },
        {} as SynchronizedFunctionDictionary<AsynchronousController<TController>>,
    );
}
