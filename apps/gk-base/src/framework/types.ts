// https://sourcegraph.com/github.com/skyunBoss/fsxy/-/blob/server/typings/app/service/index.d.ts?L5:1
export type AnyClass = new (...args: any[]) => any;
export type ofType<T> = new (...args: any[]) => T;
