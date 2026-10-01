export const workerSource = `
const entries = [];
const activeTimers = new Set();
const timerTokens = new Map();
const activeFetches = new Set();
const counts = new Map();
const timers = new Map();
const groups = [];
const originalSetTimeout = setTimeout;
const originalClearTimeout = clearTimeout;
const originalSetInterval = setInterval;
const originalClearInterval = clearInterval;
const originalFetch = typeof fetch === 'function' ? fetch.bind(self) : undefined;

const serialize = (value, seen = new WeakSet()) => {
  if (typeof value === 'undefined') return 'undefined';
  if (typeof value === 'bigint') return value.toString() + 'n';
  if (typeof value === 'symbol') return value.toString();

  if (typeof value === 'function') {
    return '[Function ' + (value.name || 'anonymous') + ']';
  }

  if (value instanceof Error) {
    return value.name + ': ' + value.message;
  }

  if (typeof value === 'number' && Number.isNaN(value)) {
    return 'NaN';
  }

  if (value === Infinity) return 'Infinity';
  if (value === -Infinity) return '-Infinity';

  if (typeof value === 'string') {
    return value;
  }

  if (value === null) {
    return 'null';
  }

  if (typeof value === 'object') {
    if (seen.has(value)) {
      return '[Circular]';
    }

    seen.add(value);

    if (Array.isArray(value)) {
      return '[' + value.map((item) => serialize(item, seen)).join(', ') + ']';
    }

    try {
      return JSON.stringify(
        value,
        (_, item) =>
          typeof item === 'bigint'
            ? item.toString() + 'n'
            : item,
        2
      );
    } catch {
      return String(value);
    }
  }

  return String(value);
};

const write = (level, values) => {
  entries.push({
    level,
    text: values.map((value) => serialize(value)).join(' ')
  });
};

const labelFor = (label) => String(label ?? 'default');

const fakeConsole = {
  log: (...values) => write('log', values),
  info: (...values) => write('info', values),
  warn: (...values) => write('warn', values),
  error: (...values) => write('error', values),
  debug: (...values) => write('debug', values),
  dir: (...values) => write('log', values),
  table: (...values) => write('log', values),

  assert: (condition, ...values) => {
    if (!condition) {
      write(
        'error',
        values.length ? values : ['Assertion failed']
      );
    }
  },

  count: (label = 'default') => {
    const key = labelFor(label);
    const value = (counts.get(key) || 0) + 1;

    counts.set(key, value);

    write('log', [key + ': ' + value]);
  },

  countReset: (label = 'default') => {
    counts.delete(labelFor(label));
  },

  time: (label = 'default') => {
    timers.set(labelFor(label), performance.now());
  },

  timeLog: (label = 'default', ...values) => {
    const key = labelFor(label);
    const started = timers.get(key);

    if (started === undefined) {
      write('warn', ['Timer ' + key + ' does not exist']);
      return;
    }

    write('log', [
      key + ': ' + Math.round(performance.now() - started) + 'ms',
      ...values
    ]);
  },

  timeEnd: (label = 'default') => {
    const key = labelFor(label);
    const started = timers.get(key);

    if (started === undefined) {
      write('warn', ['Timer ' + key + ' does not exist']);
      return;
    }

    write('log', [
      key + ': ' + Math.round(performance.now() - started) + 'ms'
    ]);

    timers.delete(key);
  },

  group: (...values) => {
    groups.push(
      values.map((value) => serialize(value)).join(' ')
    );

    write('log', [
      '▼ ' + groups[groups.length - 1]
    ]);
  },

  groupCollapsed: (...values) => {
    groups.push(
      values.map((value) => serialize(value)).join(' ')
    );

    write('log', [
      '▶ ' + groups[groups.length - 1]
    ]);
  },

  groupEnd: () => {
    if (groups.length) {
      groups.pop();
    }
  },

  trace: (...values) => {
    write(
      'debug',
      values.length ? values : ['Trace']
    );
  },

  clear: () => {
    entries.length = 0;
  }
};

const trackedSetTimeout = (callback, delay, ...args) => {
  const token = {};
  let handle;

  activeTimers.add(token);

  handle = originalSetTimeout(() => {
    try {
      callback(...args);
    } finally {
      activeTimers.delete(token);
      timerTokens.delete(handle);
    }
  }, Math.max(0, Number(delay) || 0));

  timerTokens.set(handle, token);

  return handle;
};

const trackedClearTimeout = (handle) => {
  const token = timerTokens.get(handle);

  if (token) {
    activeTimers.delete(token);
    timerTokens.delete(handle);
  }

  originalClearTimeout(handle);
};

const trackedFetch = (...args) => {
  if (!originalFetch) {
    throw new Error(
      'fetch is not available in this execution environment.'
    );
  }

  const token = {};

  activeFetches.add(token);

  const promise = originalFetch(...args);

  promise.then(
    () => activeFetches.delete(token),
    () => activeFetches.delete(token)
  );

  return promise;
};

const waitForAsyncActivity = async () => {
  let idlePasses = 0;

  while (idlePasses < 4) {
    if (
      activeTimers.size === 0 &&
      activeFetches.size === 0
    ) {
      idlePasses += 1;
    } else {
      idlePasses = 0;
    }

    await new Promise((resolve) =>
      originalSetTimeout(resolve, 0)
    );
  }
};

self.onmessage = async (event) => {
  const { code } = event.data;

  try {
    const AsyncFunction = Object.getPrototypeOf(
      async function () {}
    ).constructor;

    const execute = new AsyncFunction(
      'console',
      'setTimeout',
      'setInterval',
      'clearTimeout',
      'clearInterval',
      'fetch',
      'queueMicrotask',
      code
    );

    await execute(
      fakeConsole,
      trackedSetTimeout,
      originalSetInterval,
      trackedClearTimeout,
      originalClearInterval,
      trackedFetch,
      queueMicrotask
    );

    await waitForAsyncActivity();

    self.postMessage({
      type: 'success',
      entries,
      output: entries.length
        ? entries.map((entry) => entry.text).join('\\n')
        : 'Code ran successfully. No console output was produced.'
    });
  } catch (error) {
    self.postMessage({
      type: 'error',
      kind:
        error instanceof SyntaxError
          ? 'Syntax error'
          : 'Runtime error',
      entries,
      message:
        error instanceof Error
          ? error.stack || error.message
          : String(error),
      output: entries.length
        ? entries.map((entry) => entry.text).join('\\n')
        : 'Execution failed.'
    });
  }
};
`;
