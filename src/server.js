const express = require("express");
const server = express();
const routes = require('./routes');
const path = require("path");

//usar o template engine e procura na pasta raiz a pasta views, senão tiver na raiz, seguir proximo passo
server.set('view engine', 'ejs');


//Por padrão o view engine entende que o arquivo ejs está numa pasta denominada views
server.set('views', path.join(__dirname, 'views')); //esse comando indica que a pasta views não está na raiz

//habilitar arquivos statics
server.use(express.static("public"));

//usar o req.body
server.use(express.urlencoded({ extended: true }));

//rotas
server.use(routes);

server.listen(3000, () => console.log('rodando'));