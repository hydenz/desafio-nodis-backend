<h1 align="center">desafio-nodis-backend</h1>
<div align="center"><img src="./md/logo.png" width="50%"></img></div>

<br></br>

# Descrição

Este repo serve como resposta para o [desafio de backend](https://github.com/nodis-com-br/backend-test) da [Nodis](https://www.nodis.com.br/).

Apesar do desafio original ser em Python, resolvi construir o backend utilizando Node.js
com o \
framework Express por serem tecnologias que possuo mais experiência.

# 🐋 Iniciando o servidor

Você pode inicializar o servidor ou fazer testes com [Jest](https://jestjs.io/) utilizando [Docker](https://www.docker.com/)

```bash
# clonando o repositório
git clone https://github.com/hydenz/desafio-nodis-backend.git
# mudando de diretório
cd desafio-nodis-backend
# inicializando o container Docker no Powershell
$env:SCRIPT='start'; docker-compose up
# inicializando o container Docker no Bash
SCRIPT='start' docker-compose up
# Para testar com o Jest, basta substituir 'start' por 'test'
```

A API estará disponível para consumo em http://localhost:3001
