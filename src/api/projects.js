import request from "@/utils/request";

/** 新增项目 */
export function addProject(params) {
  return request({
    url: "/api/project",
    method: "post",
    data: params,
  });
}

/** 获取项目 */
export function getProject() {
  return request.get("/api/project");
}

/** 修改项目 */
export function updateProject(id, params) {
  return request({
    url: `/api/project/${id}`,
    method: "put",
    data: params,
  });
}

/** 删除项目 */
export function removeProject(id) {
  return request({
    url: `/api/project/${id}`,
    method: "DELETE",
  });
}
