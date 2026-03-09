# Order API

API desenvolvida em Node.js para gerenciamento de pedidos.

## Tecnologias utilizadas

- Node.js
- Express
- MySQL

## Instalação

Clone o repositório:

git clone https://github.com/CauaAmarall/order-api.git

Entre na pasta:

cd order-api

Instale as dependências:

npm install

Execute o projeto:

npm run dev

A API estará disponível em:

http://localhost:3000

## Endpoints

### Criar pedido

POST /order

### Buscar pedido

GET /order/:orderId

Exemplo:

http://localhost:3000/order/v10089015vdb

## Estrutura do banco

CREATE DATABASE orderdb;

CREATE TABLE Orders (
    orderId VARCHAR(50) PRIMARY KEY,
    value DECIMAL(10,2),
    creationDate DATETIME
);

CREATE TABLE Items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orderId VARCHAR(50),
    productId INT,
    quantity INT,
    price DECIMAL(10,2),
    FOREIGN KEY (orderId) REFERENCES Orders(orderId)
);