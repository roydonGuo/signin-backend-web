import request from '@/utils/request'

// 查询列表
export function listLesson(query) {
  return request({
    url: '/app/lesson/list',
    method: 'get',
    params: query
  })
}

// 查询详细
export function getLesson(lessonId) {
  return request({
    url: '/app/lesson/' + lessonId,
    method: 'get'
  })
}

// 新增
export function addLesson(data) {
  return request({
    url: '/app/lesson',
    method: 'post',
    data: data
  })
}

// 修改
export function updateLesson(data) {
  return request({
    url: '/app/lesson',
    method: 'put',
    data: data
  })
}

// 删除
export function delLesson(lessonId) {
  return request({
    url: '/app/lesson/' + lessonId,
    method: 'delete'
  })
}
