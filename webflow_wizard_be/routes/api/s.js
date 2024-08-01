async function plus (...args) {
  return args.reduce( (s,v) => s+v, 0 );
}