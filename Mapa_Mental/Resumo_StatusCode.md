### **/tickets**

### **GET /tickets**

- **200 (OK):** Lista de tickets retornada com sucesso.
- **500 (Internal Server Error):** Erro inesperado no servidor ao buscar os tickets.

### **GET /tickets/{id}**

- **200 (OK):** Dados do ticket com o ID fornecido foram retornados com sucesso.
- **400 (Bad Request):** Parâmetros inválidos na requisição (ex.: ID malformado).
- **404 (Not Found):** Ticket com o ID fornecido não foi encontrado.
- **500 (Internal Server Error):** Erro interno no servidor ao buscar o ticket.

### **POST /tickets**

- **201 (Created):** Ticket criado com sucesso.
- **400 (Bad Request):** Dados inválidos enviados para criar o ticket (ex.: campos ausentes ou formato incorreto).
- **409 (Conflict):** Conflito ao criar o ticket (ex.: ticket duplicado).
- **500 (Internal Server Error):** Erro interno ao tentar criar o ticket.

### **PUT /tickets/{id}**

- **200 (OK):** Ticket atualizado com sucesso.
- **400 (Bad Request):** Dados inválidos enviados para atualizar o ticket.
- **404 (Not Found):** Ticket com o ID fornecido não foi encontrado.
- **500 (Internal Server Error):** Erro interno no servidor ao tentar atualizar o ticket.

### **DELETE /tickets/{id}**

- **204 (No Content):** Ticket excluído com sucesso.
- **400 (Bad Request):** Requisição inválida para exclusão do ticket.
- **404 (Not Found):** Ticket com o ID fornecido não foi encontrado.
- **500 (Internal Server Error):** Erro interno ao tentar excluir o ticket.

---

### **/movies**

### **GET /movies**

- **200 (OK):** Lista de filmes retornada com sucesso.
- **500 (Internal Server Error):** Erro inesperado no servidor ao buscar os filmes.

### **GET /movies/{id}**

- **200 (OK):** Dados do filme com o ID fornecido foram retornados com sucesso.
- **400 (Bad Request):** Parâmetros inválidos na requisição (ex.: ID malformado).
- **404 (Not Found):** Filme com o ID fornecido não foi encontrado.
- **500 (Internal Server Error):** Erro interno no servidor ao buscar o filme.

### **POST /movies**

- **201 (Created):** Filme criado com sucesso.
- **400 (Bad Request):** Dados inválidos enviados para criar o filme (ex.: campos ausentes ou formato incorreto).
- **409 (Conflict):** Conflito ao criar o filme (ex.: filme já existente).
- **500 (Internal Server Error):** Erro interno ao tentar criar o filme.

### **PUT /movies/{id}**

- **200 (OK):** Filme atualizado com sucesso.
- **400 (Bad Request):** Dados inválidos enviados para atualizar o filme.
- **404 (Not Found):** Filme com o ID fornecido não foi encontrado.
- **500 (Internal Server Error):** Erro interno no servidor ao tentar atualizar o filme.

### **DELETE /movies/{id}**

- **204 (No Content):** Filme excluído com sucesso.
- **400 (Bad Request):** Requisição inválida para exclusão do filme.
- **404 (Not Found):** Filme com o ID fornecido não foi encontrado.
- **500 (Internal Server Error):** Erro interno ao tentar excluir o filme.