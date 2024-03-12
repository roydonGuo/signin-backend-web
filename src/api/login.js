import request from '@/utils/request'

// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: '/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取登录验证码
export function sendSmsCode(telephone) {
  return request({
    url: '/sms/sendCode/' + telephone,
    headers: {
      isToken: false
    },
    method: 'GET'
  })
}

//手机短信登录
export function smsLogin(telephone, phoneCode) {
  return request({
    url: '/sms-login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: {
      telephone,
      phoneCode
    }
  })
}

// 注册方法
export function register(data) {
  return request({
    url: '/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}

// 扫码登陆=============================
// 获取登录二维码
export function getLoginQRCode() {
  return request({
    url: '/getLoginQRCode',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}
// 获取二维码状态
export function getLoginQrCodeStatus(uuid, currentStatus) {
  return request({
    url: '/getLoginQrCodeStatus',
    method: 'get',
    params: {
      uuid: uuid,
      currentStatus: currentStatus,
    }
  })
}
