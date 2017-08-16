# express-iss-server
基于Express制作的服务端


## Installation

    yarn 或 npm i

## Usages

初始化数据

    npm run init

开发调试

    npm run dev

编译生产环境

1. 添加配置文件 `src/config.production.js`

```js
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
```

2. 启动服务并加入系统服务

```
npm run start
```

3. 停止服务并解除系统服务

```
npm run stop
```

4. 重启服务

```
npm run start
```

5. 服务器 `nginx` 配置

```
upstream iis-express-server
{
	server	127.0.0.1:4000;
}

server
{
	listen      80;
	server_name xxx.com;
	index index.html index.htm default.html default.htm;
	root  /path/to/iis-express-server/public;

	location / {
		proxy_pass http://iis-express-server;
		proxy_redirect off;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header Host $http_host;
		proxy_set_header X-NginX-Proxy ture;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "upgrade";
	}

	location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
	{
		expires      30d;
	}

	location ~ .*\.(js|css)?$
	{
		expires      12h;
	}

}
```