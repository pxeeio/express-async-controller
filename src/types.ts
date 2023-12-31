import type {NextFunction, Request as ExpressRequest, Response as ExpressResponse} from 'express';

/**
 * Converts an async function type to a synchronous function type.
 */
export type SynchronizedFunction<TFunction> =
    TFunction extends (...args: infer Args) => infer Return
        ? (...args: Args) => Awaited<Return>
        : never;

export type SynchronizedFunctionDictionary<T extends object> = {
    [key in keyof T]: SynchronizedFunction<T[key]>;
};

export type BaseRequest = {
    body?: Record<string, unknown>;
    params?: ExpressRequest['params'];
    query?: ExpressRequest['query'];
};

export type BaseResponse = {
    body?: Record<string, unknown>;
    locals?: ExpressResponse['locals'];
};

/**
 * Adds any properties missing in `BaseRequest` and makes them required.
 * 
 * `body`, `params`, and `query` cannot be optional.
 *
 * If they aren't specified, its default type is attached to the Request.
 *
 * Additionally, it makes each property's object properties optional.
 */
export type Request<TRequest extends BaseRequest = BaseRequest> = Required<{
    [key in keyof TRequest]: Partial<TRequest[key]>;
}> & {
    [key in Exclude<keyof BaseRequest, keyof TRequest>]: key extends 'body'
        ? Partial<ExpressRequest['body']>
        : key extends 'params'
        ? Partial<ExpressRequest['params']>
        : Partial<ExpressRequest['query']>;
};

/**
 * Adds any properties missing in `BaseResponse` and makes them required.
 * 
 * `body` can be optional.
 * `locals` cannot be optional.
 * 
 * If they aren't specified, its default type is attached to the Response.
 *
 * Additionally, it makes each property's object properties optional.
 */
export type Response<TResponse extends BaseResponse = BaseResponse> = Required<TResponse> & {
    [key in Exclude<keyof BaseResponse, keyof TResponse>]: key extends 'body'
        ? BaseResponse['body']
        : Partial<ExpressResponse['locals']>;
};

type HTTPContext<TRequest extends Request, TResponse extends Response = Response> = {
    request: ExpressRequest<
        TRequest['params'],
        TResponse['body'],
        TRequest['body'],
        TRequest['query'],
        TResponse['locals']
    >;
    response: ExpressResponse<TResponse['body'], TResponse['locals']>;
};

export interface AsynchronousRequestHandler<
    TRequest extends Request = Request,
    TResponse extends Response = Response,
> {
    (
        request: HTTPContext<TRequest, TResponse>['request'],
        response: HTTPContext<TRequest, TResponse>['response'],
        next: NextFunction,
    ): void | Promise<void>;
}