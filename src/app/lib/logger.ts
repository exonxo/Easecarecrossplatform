/**
 * Logger — silent in production, verbose in development.
 *
 * Replace direct `console.log` / `console.warn` calls with `logger.info` / `logger.warn`
 * so production builds don't leak debug output to end users.
 *
 * `logger.error` always logs (errors are important even in prod) and can be
 * wired to an error-tracking service (Sentry, LogRocket, etc.) later.
 */

const isDev = import.meta.env.DEV;

const noop = () => {};

export const logger = {
  info:  isDev ? (...args: unknown[]) => console.log(...args)  : noop,
  warn:  isDev ? (...args: unknown[]) => console.warn(...args) : noop,
  debug: isDev ? (...args: unknown[]) => console.debug(...args): noop,

  // Errors are always logged — wire this to Sentry / error tracker in production
  error: (...args: unknown[]) => {
    if (isDev) console.error(...args);
    // TODO(prod): forward to error-tracking service
    // captureException(args[0]);
  },
};
