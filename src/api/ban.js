import ajax from './ajax'
export const getAll = () => ajax('/bans')
export const trendById = trendid => ajax('/trendById', trendid)
export const deleteTrends = data => ajax('/ban/delete', data, 'post')