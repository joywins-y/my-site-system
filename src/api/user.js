import request from '@/utils/request'

/** 登录 */
export function login(data) {
  return request({
    url: '/api/admin/login',
    method: 'post',
    data
  })
}

/** 恢复登录状态 */
export function getInfo() {
  return request({
    url: '/api/admin/whoami',
    method: 'get'
  })
}
