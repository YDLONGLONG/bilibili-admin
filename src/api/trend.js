import ajax from './ajax'
export const getAll = () => ajax('/trends')
export const editTrend = data => ajax('/trend', data, 'post')
export const deleteTrend= _id => ajax('/trend/delete', {_id}, 'post')

