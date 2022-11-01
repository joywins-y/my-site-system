import request from '@/utils/request'

/** 获取文章列表 */
export function getBlogList(page = 1, limit = 10) {
  return request({
    url: '/api/blog',
    method: 'get',
    params: {
      page,
      limit
    }
  })
}

/** 编辑文章 */
export function updateBlog(params) {
  return request({
    url: `/api/blog/${params.id}`,
    method: 'put',
    data: params.data
  })
}

/** 删除文章 */
export function removeBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: 'delete'
  })
}

/** 新增文章 */
export function addBlog(params) {
  return request({
    url: `/api/blog`,
    method: 'post',
    data: params
  })
}
