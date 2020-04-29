export function createJsDir(
  fn: (conf: string) => void,
  name: string,
) {
  try {
    fn(name);
  } catch (err) {
    throw err;
  }
}
