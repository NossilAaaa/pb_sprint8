### **User Story: Gerenciamento de Filmes na API**

**Descrição:**

Como desenvolvedor da API de filmes,

Gostaria de gerenciar o cadastro de filmes,

Para garantir que os clientes possam consultar e manter atualizados os filmes no sistema.

---

### **Definition of Ready (DoR):**

1. Banco de dados configurado para suportar operações de criação, leitura, atualização e exclusão de filmes.
2. Endpoint da API documentado e funcional para testes.
3. Estrutura do objeto **filme** definida:
    - **title** (string)
    - **description** (string)
    - **launchdate** (date)
    - **showtimes** (date)
    - **_id** (string, gerado automaticamente pelo sistema).
4. Ambiente de testes disponível e configurado.
5. Implementação básica de autenticação na API (se necessário).

---

### **Definition of Done (DoD):**

1. CRUD de filmes implementado e testado.
2. Validações de entrada para os campos obrigatórios realizadas.
3. Testes manuais cobrindo casos de sucesso e exceção realizados.
4. Testes automatizados abrangendo operações básicas do CRUD implementados.
5. Logs configurados para operações de criação, atualização e exclusão.
6. Documentação Swagger atualizada.
7. Validação de desempenho com cargas simples executada.

---

### **Critérios de Aceitação (Acceptance Criteria):**

1. O filme deve conter os seguintes campos:
    - **title**: obrigatório, único, até 100 caracteres.
    - **description**: opcional, até 500 caracteres.
    - **launchdate**: obrigatório, formato **YYYY-MM-DD**.
    - **showtimes**: obrigatório, formato **YYYY-MM-DD**, igual ou posterior ao `launchdate`.
    - **_id**: gerado automaticamente.
2. Restrições:
    - Não será possível criar um filme com `title` duplicado.
    - `launchdate` não pode ser no passado.
    - `showtimes` deve ser igual ou posterior a `launchdate`.
    - Não será possível excluir ou atualizar filmes inexistentes.
    - Respostas devem seguir os códigos de status adequados:
        - **201 Created** para criação bem-sucedida.
        - **200 OK** para atualização ou consulta.
        - **204 No Content** para exclusão.
        - **400 Bad Request** para dados inválidos.
        - **404 Not Found** para filmes inexistentes.

---

### **Plano de Testes**

### **Cenários de Teste Manual:**

1. **Criar Filme**:
    - Enviar todos os campos obrigatórios e verificar status **201 Created**.
    - Enviar `title` duplicado e verificar status **400 Bad Request**.
2. **Listar Filmes**:
    - Consultar filmes cadastrados e verificar o retorno.
3. **Atualizar Filme**:
    - Atualizar campos válidos e verificar status **200 OK**.
    - Enviar `launchdate` no passado e verificar status **400 Bad Request**.
4. **Excluir Filme**:
    - Excluir um filme existente e verificar status **204 No Content**.
    - Excluir um filme inexistente e verificar status **404 Not Found**.

### **Cenários de Teste Automatizado:**

1. **Cenário: Criar Filme com Sucesso**

```gherkin
gherkin
Copiar código
Scenario: Criar um novo filme com sucesso
  Given que a API está funcional
  When enviar uma solicitação POST para /movies com:
    | campo        | valor                       |
    | title        | Banana de Fogo             |
    | description  | Uma história épica         |
    | launchdate   | 2024-12-01                 |
    | showtimes    | 2024-12-05                 |
  Then o filme deve ser salvo no sistema
  And retorna status 201 Created
  And o sistema retorna o objeto criado com um ID único

```

1. **Cenário: Criar Filme com Campos Inválidos**

```gherkin
gherkin
Copiar código
Scenario: Criar um filme com `launchdate` no passado
  Given que a API está funcional
  When enviar uma solicitação POST para /movies com:
    | campo        | valor                       |
    | title        | Banana Antiga              |
    | description  | Uma história desatualizada |
    | launchdate   | 2023-01-01                 |
    | showtimes    | 2023-02-01                 |
  Then o sistema retorna status 400 Bad Request
  And exibe mensagem indicando erro no campo `launchdate`

```

1. **Cenário: Atualizar Filme Inexistente**

```gherkin
gherkin
Copiar código
Scenario: Atualizar um filme inexistente
  Given que a API está funcional
  When enviar uma solicitação PUT para /movies/{id_invalido} com:
    | campo        | valor                       |
    | title        | Banana Atualizada          |
  Then o sistema retorna status 404 Not Found

```

1. **Cenário: Excluir Filme com Sucesso**

```gherkin
gherkin
Copiar código
Scenario: Excluir um filme existente
  Given que a API está funcional
  And existe um filme com ID válido
  When enviar uma solicitação DELETE para /movies/{id_valido}
  Then o sistema retorna status 204 No Content
  And o filme é removido do sistema

```

---