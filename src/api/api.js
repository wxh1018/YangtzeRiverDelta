import * as Api from './index'

// 路测设备添加兼边缘主机提交
export const sub = (params) => Api.Post('/cloud/addCarTest', params)