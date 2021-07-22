export function setStorage (name, value) {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

export function getStorage (name) {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}
export function removeStorage (name) {
  window.localStorage.removeItem(name)
}
