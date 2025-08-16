# 🛒 E-commerce API

API de e-commerce desenvolvida em **TypeScript** com **Node.js** e **MongoDB**, utilizando **Express** e **arquitetura em camadas** (Controllers, Services, Models, Middlewares).  
Permite cadastro e gerenciamento de usuários e produtos, com autenticação via **JWT** e controle de acesso por dono do recurso.

---

## 🚀 Tecnologias Utilizadas
- **Node.js** + **TypeScript**
- **Express**
- **MongoDB** + **Mongoose**
- **JWT** (JSON Web Token)
- **Bcrypt** (hash de senhas)
- **Arquitetura em camadas (MVC)**

---

## 📌 Funcionalidades Atuais
✅ Cadastro de usuários com senha criptografada (`bcrypt`)  
✅ Login com geração de token JWT  
✅ Cadastro de produtos vinculados ao usuário autenticado  
✅ Listagem de todos os produtos com dados do dono (população de usuário)  
✅ Listagem de produtos de um usuário específico (`/my-products/list`)  
✅ Edição e exclusão de produtos apenas pelo dono (`CheckProductOwner`)  
✅ Listagem de todos os usuários (apenas dados públicos, sem senha)  

---

## 🔗 Endpoints Principais

### **Auth**
- `POST /login` → Autenticação de usuário (JWT)

### **Users**
- `POST /users` → Criar usuário
- `GET /users/:id` → Buscar usuário por ID
- `GET /users` → Listar todos os usuários
- `PUT /users/:id` → Atualizar usuário
- `DELETE /users/:id` → Excluir usuário

### **Products**
- `POST /products` → Criar produto (requer login)
- `GET /products` → Listar todos os produtos
- `GET /products/:id` → Buscar produto por ID
- `GET /products/my-products/list` → Listar produtos do usuário autenticado
- `PUT /products/:id` → Atualizar produto (somente dono)
- `DELETE /products/:id` → Excluir produto (somente dono)

---

## 📊 Status do Projeto

| Funcionalidade                       | Status |
|--------------------------------------|--------|
| Cadastro de produtos                 | ✅ Implementado |
| Carrinho de compras                  | ✅ Implementado  |
| Pedidos e itens do pedido            | ✅ Implementado  |
| Relacionamento Usuário ↔ Produto     | ✅ Implementado |
| Relacionamento Pedido ↔ Itens        | ✅ Implementado  |
| Upload de imagem de produto          | ❌ Não implementado |
| Pagamento (Stripe / MercadoPago)     | ❌ Não implementado |
| Controle de permissões por papel     | ⚠ Parcial (somente dono do recurso) |

---

## 📅 Funcionalidades Futuras
- [ ] Integrar Stripe ou MercadoPago para checkout
- [ ] Adicionar paginação e filtros avançados para produtos

---

## 🔐 Autenticação
A API utiliza **JWT**.  
Para acessar rotas protegidas, envie o token no header:
Authorization: Bearer <seu_token>


---


---

## ⚡ Como Rodar o Projeto
```bash
# Clonar repositório
git clone https://github.com/DuduNeri/en-e-commerce

# Instalar dependências
npm install

# Configurar variáveis de ambiente (.env)
MONGO_URI=sua_string_mongodb
JWT_SECRET=sua_chave_secreta

# Rodar em modo desenvolvimento
npm run dev

# Rodar em produção
npm start
