<p align="center">
    <img alt="Logo" src="https://github.com/oscc-web/ysyx-website-resources/blob/main/images/logo/ysyx.png" width="200">
</p>

<h1>
    <p align="center">一生一芯计划Web后端</p>
</h1>

<p align="center">
    <a title="Project Version">
        <img alt="Project Version" src="https://img.shields.io/badge/version-1.0.0-brightgreen" />
    </a>
    <a title="Node Version" target="_blank" href="https://nodejs.org">
        <img alt="Node Version" src="https://img.shields.io/badge/Node-%3E%3D16.19.1-blue" />
    </a>
    <a title="License" target="_blank" href="https://github.com/oscc-web/ysyx-backend/blob/master/LICENSE">
        <img alt="License" src="https://img.shields.io/github/license/oscc-web/ysyx-backend.svg" />
    </a>
    <br/>
    <a title="GitHub Watchers" target="_blank" href="https://github.com/oscc-web/ysyx-backend/watchers">
        <img alt="GitHub Watchers" src="https://img.shields.io/github/watchers/oscc-web/ysyx-backend.svg?label=Watchers&style=social" />
    </a>
    <a title="GitHub Stars" target="_blank" href="https://github.com/oscc-web/ysyx-backend/stargazers">
        <img alt="GitHub Stars" src="https://img.shields.io/github/stars/oscc-web/ysyx-backend.svg?label=Stars&style=social" />
    </a>
    <a title="GitHub Forks" target="_blank" href="https://github.com/oscc-web/ysyx-backend/network/members">
        <img alt="GitHub Forks" src="https://img.shields.io/github/forks/oscc-web/ysyx-backend.svg?label=Forks&style=social" />
    </a>
</p>

<p align="center">中文简体 | <a title="English" href="README.md">English</a></p>

## 使用

### 下载仓库

```sh
$> cd your-workspaces
$> git clone git@github.com:oscc-web/ysyx-backend.git
```

### 更新依赖

运行以下命令生成数据库配置文件并自动安装/更新Node.js依赖包，其中数据库配置与OSCC-BACKEND保持一致，请联系管理员获取。
```sh
$> ./setup.sh
```

### 配置系统

根据本地开发机或远程服务器的端口占用情况，酌情修改`config/config.js`文件中`port`属性，确保与已启动服务端口不冲突即可。

### 运行系统

```sh
$> npm run test      // 测试后端服务各模块
$> npm run dev       // 开发环境下启动服务
$> npm run pro-start // 生产环境下启动服务（有问题）
$> npm run pro-stop  // 生产环境下停止服务
```

### 更新仓库

```sh
$> git pull
```
