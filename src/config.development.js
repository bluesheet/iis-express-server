import path from 'path'
import pkg from '../package.json'

const SERVER_HOST = '0.0.0.0'
const SERVER_PORT = 4000

export default {
  name            : pkg.name,
  sitename        : '信息管理系统',
  siteurl         : `http://${SERVER_HOST}:${SERVER_PORT}`,
  debug           : true,
  host            : SERVER_HOST,
  port            : SERVER_PORT,
  logger          : {
    path            : 'logger',
    filename        : 'access.log',
    maxlogsize      : 500,
    category        : 'ISS-SERVER',
    format          : ':method :url :status',
    level           : 'auto'
  },
  data            : path.resolve(process.cwd(), 'data')
}