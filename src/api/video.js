import ajax from './ajax'
export const getAll = () => ajax('/videos')
export const editVideo = data => ajax('/video', data, 'post')
export const deleteVideo = _id => ajax('/video/delete', {_id}, 'post')
//根据_id通过审核
export const changeVideoById = _id => ajax(`/isAdoptbyId`, { _id },'post')
