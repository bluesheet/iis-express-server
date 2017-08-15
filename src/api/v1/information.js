import { mounts } from 'kenote-mount'
import path from 'path'
import { CustomError } from '../../error'

const { 
  informationProxy
} = mounts(path.resolve(__dirname, '../../proxys'), 'Proxy')

export const create = (data, req, res, next) => {
  informationProxy.create(data)
    .then( ret => res.api(ret) )
    .catch(CustomError, err => res.api(null, err.code) )
    .catch( err => next(err) )
}

export const getList = (data, req, res, next) => {
  informationProxy.getListSync()
    .then( ret => res.api(ret.data || ret) )
    .catch(CustomError, err => res.api(null, err.code) )
    .catch( err => next(err) )
}

export const edit = (data, req, res, next) => {
  const { id, title, desc, content } = data
  informationProxy.update(id, { title, desc, content })
    .then( ret => res.api(ret.data || ret) )
    .catch(CustomError, err => res.api(null, err.code) )
    .catch( err => next(err) )
}

export const remove = (data, req, res, next) => {
  const { id } = data
  informationProxy.removeSync(id)
    .then( ret => res.api(ret.data || ret) )
    .catch(CustomError, err => res.api(null, err.code) )
    .catch( err => next(err) )
}

export const counts = (data, req, res, next) => {
  const { id } = data
  informationProxy.counts(id)
    .then( ret => res.api(ret.data || ret) )
    .catch(CustomError, err => res.api(null, err.code) )
    .catch( err => next(err) )
}