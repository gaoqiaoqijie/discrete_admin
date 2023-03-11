import request from '@/utils/request'

const api_name = '/ucenter/user'
const api_teacher = '/ucenter/admin'

export default {

  // 获取所有教师信息
  getAllTeacher() {
    return request({
      url: `${api_name}/all/teacher`,
      method: 'get'
    })
  },
  // 分页查询所有用户
  getPageUserList(page, limit, userQuery) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'post',
      data: userQuery
    })
  },
  // 获取所有用户数据
  getAllUser() {
    return request({
      url: `${api_name}/all`,
      method: 'get'
    })
  },
  // 根据id禁用用户
  deleteById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'delete'
    })
  },
  // 添加用户
  adduser(user) {
    return request({
      url: `${api_name}/add`,
      method: 'post',
      data: user
    })
  },
  //添加教师
  addTeacher(teacher){
    return request({
      url: `${api_teacher}/add`,
      method: 'post',
      data: teacher
    })
  },
  // 根据id获取用户信息
  getuserById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'get'
    })
  },
  // 根据id更新用户信息
  updateById(id, user) {
    return request({
      url: `${api_name}/${id}`,
      method: 'post',
      data: user
    })
  },
  // 重置用户密码
  resetPassword(id) {
    return request({
      url: `${api_name}/resetpwd/${id}`,
      method: 'put'
    })
  },

}
