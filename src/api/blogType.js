import request from '@/utils/request'

/** 获取文章分类 */
export function getBlogType() {
  return request.get('/api/blogtype')
}

/** 添加文章分类 */
export function addBlogType(params) {
  return request({
    url: '/api/blogtype',
    method: 'post',
    data: params
  })
}

/** 删除文章分类 */
export function removeBlogType(id) {
  return request.delete(`/api/blogtype/${id}`)
}

/** 搜索文章分类 */
export function searchBlogType(id) {
  return request.get(`/api/blogtype/${id}`)
}

/** 更新文章分类 */
export function updateBlogType(params) {
  return request({
    url: `/api/blogtype/${params.id}`,
    method: 'put',
    data: params.data
  })
}
