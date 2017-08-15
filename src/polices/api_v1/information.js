import { CODE, ErrorInfo, CustomError } from '../../error'



export const create = (auth, req, res, next) => {
  const { title, desc, content } = req.body
  const data = { title, desc, content }
  return next(data)
}

export const edit = (auth, req, res, next) => {
  const { title, desc, content } = req.body
  const data = { 
    title, 
    desc, 
    content,
    id: req.params.id 
  }
  return next(data)
}

export const remove = (auth, req, res, next) => {
  const { id } = req.body
  const data = {
    id
  }
  if (!data.id || data.id.length !== 24) {
    return res.api(null, CODE.ERROR_INFORMATION_MARKUP)
  }
  return next(data)
}

export const counts = (auth, req, res, next) => {
  const { id } = req.body
  const data = {
    id
  }
  if (!data.id || data.id.length !== 24) {
    return res.api(null, CODE.ERROR_INFORMATION_MARKUP)
  }
  return next(data)
}