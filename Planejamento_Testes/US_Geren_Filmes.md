### **User Story: Gerenciamento de Filmes na API**

**Descrição:**

Como um administrador da API de filmes,

Gostaria de gerenciar o cadastro de filmes,

Para garantir que os usuários possam consultar e manter atualizados os filmes no sistema.

---

### **Definition of Ready (DoR):**

1. Banco de dados e infraestrutura configurados para suportar operações de criação, leitura, atualização e exclusão de filmes.
2. Endpoint da API documentado e acessível para testes.
3. Campos obrigatórios e estrutura do filme definidos:
    - **title** (string)
    - **description** (string)
    - **launchdate** (date)
    - **showtimes** (date)
    - **_id** (string, gerado automaticamente pelo sistema).
4. Ambiente de testes disponibilizado.
5. Especificações de autenticação e autorização implementadas, diferenciando usuários comuns e administradores.

---

### **Definition of Done (DoD):**

1. CRUD de gerenciamento de filmes (criar, atualizar, listar e excluir) implementado.
2. Validações de entrada e unicidade do título implementadas e testadas.
3. Testes manuais realizados para verificar as funcionalidades básicas e cenários de exceção.
4. Testes automatizados abrangendo todos os verbos HTTP executados, com evidências coletadas.
5. Logs gerados para operações de criação, atualização e exclusão.
6. Matriz de rastreabilidade atualizada com base nos testes executados.
7. Automação de testes integrada ao pipeline de CI/CD, cobrindo cenários descritos na documentação Swagger.
8. Performance validada contra requisitos não funcionais.

---

### **Critérios de Aceitação (Acceptance Criteria):**

1. O filme deve conter os seguintes campos:
    - **title**: obrigatório, único, no máximo 100 caracteres.
    - **description**: opcional, no máximo 500 caracteres.
    - **launchdate**: obrigatório, no formato **YYYY-MM-DD**.
    - **showtimes**: obrigatório, no formato **YYYY-MM-DD**, deve ser igual ou posterior ao `launchdate`.
    - **_id**: gerado automaticamente pelo sistema.
2. **Restrições:**
    - Não deverá ser possível criar um filme com um título já existente.
    - Não deverá ser possível criar ou atualizar um filme sem preencher os campos obrigatórios.
    - Não deverá ser possível criar ou atualizar um filme com uma `launchdate` no passado.
    - Não deverá ser possível cadastrar ou atualizar filmes com `showtimes` antes de `launchdate`.
    - Não deverá ser possível excluir ou atualizar filmes inexistentes.
    - A API deve retornar respostas claras e apropriadas:
        - Status **201 Created** para criação bem-sucedida.
        - Status **200 OK** para atualização ou consulta bem-sucedida.
        - Status **204 No Content** para exclusão bem-sucedida.
        - Status **400 Bad Request** para validações que falharam.
        - Status **404 Not Found** para operações em filmes inexistentes.
3. **Testes:**
    - Testes devem cobrir cenários básicos e alternativos:
        - Criar, listar, atualizar e excluir filmes.
        - Validação de dados incorretos, como `title` duplicado ou `launchdate` no passado.
        - Consultas com filtros e paginação.
    - Testes devem incluir evidências e logs de execução.
    - Cobertura baseada no Swagger e expandida para cenários críticos.

---

### **Exemplo de Teste Automatizado**

### **Cenário: Criar Filme com Campos Obrigatórios Preenchidos**

```gherkin
gherkin
Copiar código
Scenario: Criar um novo filme com sucesso
  Given que o administrador da API está autenticado
  When enviar uma solicitação POST para /movies com os seguintes dados:
    | campo        | valor                       |
    | title        | A outra banana             |
    | description  | Uma outra banana que se formou em artes |
    | launchdate   | 2024-11-19                 |
    | showtimes    | 2024-11-30                 |
  Then o sistema valida os campos obrigatórios e a unicidade do título
  And cria o filme com um ID único
  And retorna status 201 Created e os detalhes do filme criado

```

---

