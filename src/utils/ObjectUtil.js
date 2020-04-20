export function deepClone2(obj) {
  const _obj = JSON.stringify(obj)
  return JSON.parse(_obj)
}
