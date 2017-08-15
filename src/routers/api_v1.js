import path from 'path'
import express from 'express'
import { mounts } from 'kenote-mount'
import * as auth from '../middlewares/auth'

const router = express.Router()
const { 
  userPolice,
  groupPolice,
  informationPolice
} = mounts(path.resolve(__dirname, '../polices/api_v1'), 'police')
const { 
  userApi,
  groupApi,
  informationApi
} = mounts(path.resolve(__dirname, '../api/v1'), 'api')

router.post ( '/login',                          userPolice.login,         userApi.login              )
router.post ( '/accesstoken',                    auth.accessToken,         userApi.accessToken        )

router.get  ( '/admins/group',                   auth.accessToken,         groupApi.getList                                  )
router.post ( '/admins/group/edit/:id',          auth.accessToken,         groupPolice.edit,         groupApi.edit           )
router.post ( '/admins/group/create',            auth.accessToken,         groupPolice.create,       groupApi.create         )
router.post ( '/admins/group/remove',            auth.accessToken,         groupPolice.remove,       groupApi.remove         )

router.get  ( '/admins/user',                    auth.accessToken,         userApi.getList                                   )
router.post ( '/admins/user/edit/:uid',          auth.accessToken,         userPolice.edit,          userApi.edit            )
router.post ( '/admins/user/create',             auth.accessToken,         userPolice.create,        userApi.create          )
router.post ( '/admins/user/remove',             auth.accessToken,         userPolice.remove,        userApi.remove          )

router.post ( '/passport/editpwd',               auth.accessToken,         userPolice.editpwd,       userApi.editpwd         )

router.get  ( '/information',                    auth.accessToken,         informationApi.getList                            )
router.post ( '/information/create',             auth.accessToken,         informationPolice.create, informationApi.create   )
router.post ( '/information/edit/:id',           auth.accessToken,         informationPolice.edit,   informationApi.edit     )
router.post ( '/information/remove',             auth.accessToken,         informationPolice.remove, informationApi.remove   )
router.post ( '/information/counts',         auth.accessToken,         informationPolice.counts, informationApi.counts   )

export default router