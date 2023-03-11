import request from '@/utils/request'

const api_name = '/learning/teacher'

export default {
  // 分页查询所有教师
  getPageTeacherList(page, limit, teacherQuery) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'post',
      data: teacherQuery
    })
  },
  // 获取所有教师数据
  getAllTeacher() {
    return request({
      url: `${api_name}/all`,
      method: 'get'
    })
  },
  // 根据id删除教师
  deleteById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'delete'
    })
  },
  // 添加教师
  addTeacher(teacher) {
    return request({
      url: `${api_name}/add`,
      method: 'post',
      data: teacher
    })
  },
  // 根据id获取教师信息
  getTeacherById(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'get'
    })
  },
  // 根据id更新教师信息
  updateById(id, teacher) {
    return request({
      url: `${api_name}/${id}`,
      method: 'post',
      data: teacher
    })
  },
  // 重置教师密码
  resetPassword(id) {
    return request({
      url: `${api_name}/${id}`,
      method: 'update'
    })
  }
}
