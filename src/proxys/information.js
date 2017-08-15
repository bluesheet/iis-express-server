import Promise from 'bluebird'
import objectid from 'objectid'
import path from 'path'
import fs from 'fs-extra'
import config from '../config'
import { CODE, ErrorInfo, CustomError } from '../error'

const dataDir = path.resolve(config.data, 'information.db')



export function getList () {
  return new Promise( (resolve, reject) => {
    try {
      const listData = fs.readJSONSync(dataDir)
      resolve(listData)
    } catch (error) {
      resolve([])
    }
  })
}

export function getListSync () {
  return getList()
    .then(async (ret) => {
      return ret
    })
}


export function create (info) {
  return new Promise(async (resolve, reject) => {
    try {
      const listData = await getList()
      let _id = objectid()
      listData.push({
        _id   : _id,
        ...info,
      })
      fs.writeJSONSync(dataDir, listData, { spaces: 2 })
      resolve(_.find(listData, { _id }))
    } catch (error) {
      reject(error)
    }
  })
}

export function update (_id, info) {
  return new Promise(async (resolve, reject) => {
    try {
      const listData = await getList()
      for (let e of listData) {
        if (e._id === _id) {
          e.title = info.title || e.title
          e.desc = info.desc || e.desc
          e.content = info.content || e.content
        }
      }
      fs.writeJSONSync(dataDir, listData, { spaces: 2 })
      resolve(_.find(listData, { _id }))
    } catch (error) {
      reject(error)
    }
  })
}

export function counts (_id) {
  return new Promise(async (resolve, reject) => {
    try {
      const listData = await getList()
      for (let e of listData) {
        if (e._id === _id) {
          e.counts ++
        }
      }
      fs.writeJSONSync(dataDir, listData, { spaces: 2 })
      resolve(_.find(listData, { _id }))
    } catch (error) {
      reject(error)
    }
  })
}

export function remove (ids) {
  ids = _.isString(ids) && [ids]
  return new Promise(async (resolve, reject) => {
    try {
      const listData = await getList()
      _.remove(listData, o => ids.indexOf(o._id) > -1)
      fs.writeJSONSync(dataDir, listData, { spaces: 2 })
      resolve(listData)
    } catch (error) {
      reject(error)
    }
  })
}

export function removeSync (ids) {
  return remove(ids)
    .then( ret => ret )
}

export function clear () {
  return new Promise(async (resolve, reject) => {
    try {
      fs.removeSync(dataDir)
      resolve(null)
    } catch (error) {
      reject(error)
    }
  })
}