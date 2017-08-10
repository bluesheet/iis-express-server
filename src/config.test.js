import pkg from '../package.json'

export default {
  name            : pkg.name,
  debug           : true,
  host            : 'localhost',
  port            : 14000,
  logger          : {
    path            : 'logger',
    filename        : 'access.log',
    maxlogsize      : 500,
    category        : 'ISS-SERVER',
    format          : ':method :url :status',
    level           : 'auto'
  },
}