import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getCookieToken() {
  return Cookies.get(TokenKey)
}

export function setCookieToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeCookieToken() {
  return Cookies.remove(TokenKey)
}

const token = 'adminToken'

export function getToken() {
  return localStorage.getItem(token)
}

export function setToken(value) {
  return localStorage.setItem(token, value)
}

export function removeToken() {
  return localStorage.removeItem(token)
}
