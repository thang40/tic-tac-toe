export const pipe = (...fns) => (args) => fns.reduce((v, f) => f(v), args);
