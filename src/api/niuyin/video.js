import request from '@/utils/request'

// 查询视频列表
export function listVideo(query) {
  return request({
    url: '/niuyin/video/list',
    method: 'get',
    params: query
  })
}

// 查询视频详细
export function getVideo(videoId) {
  return request({
    url: '/niuyin/video/' + videoId,
    method: 'get'
  })
}

// 新增视频
export function addVideo(data) {
  return request({
    url: '/niuyin/video',
    method: 'post',
    data: data
  })
}

// 修改视频
export function updateVideo(data) {
  return request({
    url: '/niuyin/video',
    method: 'put',
    data: data
  })
}

// 删除视频
export function delVideo(videoId) {
  return request({
    url: '/niuyin/video/' + videoId,
    method: 'delete'
  })
}
