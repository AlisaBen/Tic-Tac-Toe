# Tic-Tac-Toe

基于react框架搭建的井字棋游戏

本程序是基于react官方教程所写的井字棋小游戏，作为react入门学习小程序

教程地址：http://www.css88.com/react/tutorial/tutorial.html

运行步骤：

1. clone本项目到本地后，cmd环境进入到项目目录，执行 ```npm install```
2. 再执行 ```npm start```启动程序
3. 在浏览器页面输入localhost:3000回车



本项目搭建过程：

1. 进入到一个存储项目文件的目录下执行 ```npm install -g create-react-app111
2. ```creact-react-app Tic-Tac-Toe``` 执行此步的时候出现了报错：
```npm ERR! Unexpected end of JSON input while parsing near '...wrap":false,"director'错误。```
解决方法：```npm cache clean --force``` 然后再执行上述命令。
3. ```cd Tic-Tac-Toe```   ```rm -f src/*``` 删除src目录下所有文件
4. 新建index.js和index.css文件。


