import request from '@/utils/request'

// 查询列表
export function listIcon(query) {
  return request({
    url: '/app/lessonIcon/list',
    method: 'get',
    params: query
  })
}

// 查询详细
export function getIcon(iconId) {
  return request({
    url: '/app/lessonIcon/' + iconId,
    method: 'get'
  })
}

// 新增
export function addIcon(data) {
  return request({
    url: '/app/lessonIcon',
    method: 'post',
    data: data
  })
}

// 修改
export function updateIcon(data) {
  return request({
    url: '/app/lessonIcon',
    method: 'put',
    data: data
  })
}

// 删除
export function delIcon(iconId) {
  return request({
    url: '/app/lessonIcon/' + iconId,
    method: 'delete'
  })
}
