export function getKey(key){
    const val = window.localStorage.getItem(key)
    return val ? JSON.parse(val) : null
}

export function setKey(key, val){
    window.localStorage.setItem(key, val)
}

export function deleteKey(key){
    window.localStorage.removeItem(key)
}