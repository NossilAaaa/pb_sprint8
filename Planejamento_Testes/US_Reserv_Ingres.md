### **User Story: Reservando Ingressos na API**

**Descrição:**

Como um usuário da API de ingressos,

Gostaria de reservar ingressos para assistir a um filme,

Para garantir meu lugar na exibição do filme desejado.

---

### **Definition of Ready (DoR):**

1. Banco de dados e infraestrutura configurados para suportar reservas de ingressos.
2. Endpoint **POST /tickets** documentado e disponível para consumo.
3. Campos obrigatórios e estrutura do ingresso definidos:
    - **movieId** (string, obrigatório, referência válida a um filme no banco de dados).
    - **seatNumber** (inteiro, obrigatório, entre 0 e 99, único por `movieId` e `showtime`).
    - **price** (decimal, obrigatório, valor entre 0 e 60).
    - **showtime** (datetime, obrigatório, no formato **YYYY-MM-DDTHH:mm:ss.sssZ**, deve ser futuro).
4. Ambiente de testes preparado com exemplos de filmes e horários disponíveis.
5. Regras de validação e respostas de erro configuradas para:
    - Conflito de assentos.
    - Campos ausentes ou inválidos.
    - Horários passados.
6. Ferramentas de teste manual e automatizado configuradas.

---

### **Definition of Done (DoD):**

1. Endpoint **POST /tickets** funcional e validado.
2. Validações implementadas para garantir integridade dos dados:
    - Checagem de `movieId`, `seatNumber`, `price`, e `showtime`.
    - Unicidade do assento por filme e horário.
3. Testes manuais executados e cenários principais documentados.
4. Testes automatizados cobrindo cenários críticos, como:
    - Reserva de assento válido.
    - Tentativas de reserva para assento ocupado.
    - Dados inválidos ou ausentes.
5. Logs gerados para monitoramento das operações.
6. Cobertura de testes automatizados integrada ao pipeline de CI/CD.
7. Documentação atualizada no Swagger para refletir mudanças e critérios de validação.

---

### **Critérios de Aceitação (Acceptance Criteria):**

1. **Campos obrigatórios para reservas:**
    - **movieId**: obrigatório, deve referenciar um filme existente.
    - **seatNumber**: obrigatório, inteiro entre 0 e 99, único por filme e horário.
    - **price**: obrigatório, decimal entre 0 e 60.
    - **showtime**: obrigatório, datetime futuro no formato **YYYY-MM-DDTHH:mm:ss.sssZ**.
2. **Validações e Restrições:**
    - `seatNumber` deve ser único para um `movieId` e `showtime`.
    - `price` deve ser um número decimal entre 0 e 60.
    - `showtime` deve ser uma data futura.
    - Campos obrigatórios ausentes ou inválidos devem retornar **400 Bad Request**.
    - Assentos já reservados devem retornar **409 Conflict**.
3. **Respostas esperadas:**
    - **201 Created**: reserva bem-sucedida.
    - **400 Bad Request**: erros de validação.
    - **409 Conflict**: assento já ocupado.

---

### **Cenários de Teste**

### **Cenário: Reservar Ingresso com Sucesso**

```gherkin
gherkin
Copiar código
Scenario: Reservar um ingresso com sucesso
  Given um filme com ID válido "642a4b82e4b0205ff99a7b6d" está disponível
  And o assento 45 está disponível para o horário "2024-11-30T19:00:00.000Z"
  When enviar uma solicitação POST para /tickets com os seguintes dados:
    | campo       | valor                        |
    | movieId     | 642a4b82e4b0205ff99a7b6d     |
    | seatNumber  | 45                           |
    | price       | 30.50                        |
    | showtime    | 2024-11-30T19:00:00.000Z     |
  Then o sistema valida os dados fornecidos
  And cria uma reserva com um ID único
  And retorna status 201 Created com os detalhes da reserva

```

---

### **Cenário: Tentativa de Reservar um Assento Já Ocupado**

```gherkin
gherkin
Copiar código
Scenario: Tentar reservar um assento já ocupado
  Given um filme com ID válido "642a4b82e4b0205ff99a7b6d" está disponível
  And o assento 45 já está reservado para o horário "2024-11-30T19:00:00.000Z"
  When enviar uma solicitação POST para /tickets com os seguintes dados:
    | campo       | valor                        |
    | movieId     | 642a4b82e4b0205ff99a7b6d     |
    | seatNumber  | 45                           |
    | price       | 30.50                        |
    | showtime    | 2024-11-30T19:00:00.000Z     |
  Then o sistema valida os dados fornecidos
  And verifica que o assento 45 já está reservado para o horário
  And retorna status 409 Conflict com mensagem "Assento já ocupado"

```

.