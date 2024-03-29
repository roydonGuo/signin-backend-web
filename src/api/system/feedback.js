import request from '@/utils/request'

// 查询系统反馈列表
export function listFeedback(query) {
  return request({
    url: '/system/feedback/list',
    method: 'get',
    params: query
  })
}

// 查询系统反馈详细
export function getFeedback(feedbackId) {
  return request({
    url: '/system/feedback/' + feedbackId,
    method: 'get'
  })
}

// 新增系统反馈
export function addFeedback(data) {
  return request({
    url: '/system/feedback',
    method: 'post',
    data: data
  })
}

// 修改系统反馈
export function updateFeedback(data) {
  return request({
    url: '/system/feedback',
    method: 'put',
    data: data
  })
}

// 删除系统反馈
export function delFeedback(feedbackId) {
  return request({
    url: '/system/feedback/' + feedbackId,
    method: 'delete'
  })
}
