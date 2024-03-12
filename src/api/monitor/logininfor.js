import request from '@/utils/request'

// 查询登录日志列表
export function list(query) {
  return request({
    url: '/monitor/loginInfo/list',
    method: 'get',
    params: query
  })
}

// 删除登录日志
export function delLogininfor(infoId) {
  return request({
    url: '/monitor/loginInfo/' + infoId,
    method: 'delete'
  })
}

// 解锁用户登录状态
export function unlockLogininfor(userName) {
  return request({
    url: '/monitor/loginInfo/unlock/' + userName,
    method: 'get'
  })
}

// 清空登录日志
export function cleanLogininfor() {
  return request({
    url: '/monitor/loginInfo/clean',
    method: 'delete'
  })
}

// 系统总访问量
export function getLoginInfoSuccessAmount() {
  return request({
    url: '/monitor/loginInfo/total',
    method: 'get'
  })
}
