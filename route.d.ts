/**
 * A list of routes and their parameters and bindings.
 *
 * Extended and filled by the route list generated automatically by Ziggy.
 */
export interface RouteList {}

/**
 * A route name registered with Ziggy.
 */
type KnownRouteName = keyof RouteList;

/**
 * A route name, or any string.
 */
type RouteName = KnownRouteName | (string & {});
// `(string & {})` prevents TypeScript from reducing this type to just `string`,
// which would prevent intellisense from autocompleting known route names.
// See https://stackoverflow.com/a/61048124/6484459.

/**
 * Information about a single route parameter.
 */
type ParameterInfo = { name: string, binding?: string };

/**
 * A primitive route parameter value, as it would appear in a URL.
 */
type RawParameterValue = string | number;
// TODO: Technically booleans work too, does it make sense to add them here? What would that look like?

/**
 * An object parameter value containing the 'default' binding key `id`, e.g. representing an Eloquent model.
 */
type ModelParameterValue = { id: number } & Record<keyof any, any>;

/**
 * A route parameter value.
 */
type ParameterValue = RawParameterValue | ModelParameterValue;

/**
 * A parseable route parameter, either plain or nested inside an object under its binding key.
 */
type ValueOrBoundValue<I extends ParameterInfo> = I extends { binding: string }
    ? { [K in I['binding']]: RawParameterValue } | RawParameterValue
    : ParameterValue;

// Uncomment to test:
// type A = ValueOrBoundValue<{ name: 'foo', binding: 'bar' }>;
// = ParameterValue | { bar: RawParameterValue }

/**
 * An object containing a special '_query' key to target the query string of a URL.
 */
type HasQueryParam = { _query?: Record<string, any> };
/**
 * An object of parameters for an unspecified route.
 */
type GenericRouteParamsObject = Record<keyof any, any> & HasQueryParam;
// `keyof any` essentially makes it function as a plain `Record`
/**
 * An object of parameters for a specific named route.
 */
type KnownRouteParamsObject<I extends readonly ParameterInfo[]> = { [T in I[number] as T['name']]?: ValueOrBoundValue<T> } & GenericRouteParamsObject;
// `readonly` allows TypeScript to determine the actual values of all the
// parameter names inside the array, instead of just seeing `string`.
// See https://github.com/tighten/ziggy/pull/664#discussion_r1329978447.
// TODO: The keys here could be non-optional (or more detailed) if we can determine which params are required/not.
/**
 * An object of route parameters.
 */
type RouteParamsObject<N extends RouteName> = N extends KnownRouteName ? KnownRouteParamsObject<RouteList[N]> : GenericRouteParamsObject;

/**
 * An array of parameters for an unspecified route.
 */
type GenericRouteParamsArray = ValueOrBoundValue<ParameterInfo>[];
/**
 * An array of parameters for a specific named route.
 */
type KnownRouteParamsArray<I extends readonly ParameterInfo[]> = { [K in keyof I]: ValueOrBoundValue<I[K]> };
// Because `K in keyof I` for a `readonly` array is always a number, even though
// this looks like `{ 0: T, 1: U, 2: V }` TypeScript generates `[T, U, V]`.
// See https://github.com/tighten/ziggy/pull/664#discussion_r1330002370.

// Uncomment to test:
// type B = KnownRouteParamsArray<[{ name: 'post', binding: 'uuid' }]>;
// = [ParameterValue | { uuid: RawParameterValue }]

/**
 * TODO
 * For `KnownRouteParamsArray`, we need a more accurate type—one that behaves the same for the
 * first n items in the array of parameters, where n is the number of required parameters, but
 * allows *additional* array elements, because you can actually pass Ziggy an array containing
 * whatever extra stuff you want. This type is closer but not completely correct:
 * `{ [K in keyof I as number]: K extends keyof I ? ValueOrBoundValue<I[K]> : Record<keyof any, any> }`.
 * It allows additional array elements but insists that they all be `ValueOrBoundValue`,
 * so `as number` seems to be working but `Record<keyof any, any>` doesn't?
 */

/**
 * An array of route parameters.
 */
type RouteParamsArray<N extends RouteName> = N extends KnownRouteName ? KnownRouteParamsArray<RouteList[N]> : GenericRouteParamsArray;

/**
 * All possible parameter argument shapes for a route.
 */
type RouteParams<N extends RouteName> = ParameterValue
    | RouteParamsObject<N>
    | RouteParamsArray<N>;

interface Config {}

type Router = {
    current(): RouteName | undefined;
    current<T extends RouteName>(name: T, params?: RouteParams<T>): boolean;
    get params(): Record<string, any>;
    has<T extends RouteName>(name: T): boolean;
};

// type X = RouteParams<'postComments.show'>;
// type Y = KnownRouteParamsArray<RouteList['postComments.show']>;

/**
 * Ziggy's route helper.
 */
export default function route(): Router;
export default function route<T extends RouteName>(
    name: T,
    params?: RouteParams<T> | undefined,
    absolute?: boolean,
    config?: Config,
): string;
export default function route(
    name: undefined,
    params: undefined,
    absolute?: boolean,
    config?: Config,
): Router;