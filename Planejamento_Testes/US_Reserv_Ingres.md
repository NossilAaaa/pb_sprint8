### **User Story: Reservando Ingressos na API**

**Descrição:**

Como um usuário da API de ingressos,

Gostaria de reservar ingressos para assistir a um filme,

Para garantir meu lugar na exibição do filme desejado.

---

### **Definition of Ready (DoR):**

1. Banco de dados e infraestrutura configurados para suportar reservas de ingressos.
2. Endpoint da API documentado e acessível para testes.
3. Campos obrigatórios e estrutura do ingresso definidos:
    - **movieId** (string, obrigatório)
    - **userId** (string, obrigatório)
    - **seatNumber** (inteiro, obrigatório, entre 0 e 99)
    - **price** (decimal, obrigatório, entre 0 e 60)
    - **showtime** (datetime, obrigatório, no formato **YYYY-MM-DDTHH:mm:ss.sssZ**)
4. Ambiente de testes disponibilizado.
5. Sistema de autenticação configurado para garantir que o `userId` seja válido.
6. Regras de negócios e de validação bem definidas, incluindo verificações de intervalo de preço e número de assento.

---

### **Definition of Done (DoD):**

1. Endpoint **POST /tickets** implementado para criar reservas de ingressos.
2. Validações de entrada para campos obrigatórios, intervalos e unicidade do assento no horário implementadas.
3. Testes manuais realizados para validar cenários principais e alternativos.
4. Testes automatizados cobrindo verbos HTTP e cenários críticos executados, com evidências documentadas.
5. Logs gerados para operações de criação de ingressos.
6. Automação de testes integrada ao pipeline de CI/CD, incluindo cenários de carga para verificar requisitos não funcionais.
7. Matriz de rastreabilidade atualizada com base nos testes executados.
8. Performance validada contra requisitos não funcionais.

---

### **Critérios de Aceitação (Acceptance Criteria):**

1. **Campos obrigatórios para reservas de ingressos:**
    - **movieId**: obrigatório, deve referenciar um filme existente no sistema.
    - **userId**: obrigatório, deve referenciar um usuário válido.
    - **seatNumber**: obrigatório, deve ser um número inteiro entre 0 e 99.
    - **price**: obrigatório, deve ser um valor decimal entre 0 e 60.
    - **showtime**: obrigatório, deve ser uma data/hora futura, no formato **YYYY-MM-DDTHH:mm:ss.sssZ**.
2. **Validações e Restrições:**
    - Não deverá ser possível reservar um ingresso com `seatNumber` fora do intervalo de 0 a 99.
    - Não deverá ser possível reservar um ingresso com `price` fora do intervalo de 0 a 60.
    - Não deverá ser possível reservar um ingresso com um `showtime` no passado.
    - Não deverá ser possível reservar um ingresso para um `seatNumber` já reservado no mesmo `showtime`.
    - O sistema deve gerar um ID único para cada reserva de ingresso.
    - A API deve retornar respostas apropriadas:
        - Status **201 Created** para reservas bem-sucedidas.
        - Status **400 Bad Request** para validações que falharam.
        - Status **409 Conflict** para tentativa de reservar um assento já ocupado.
3. **Testes:**
    - Testes devem cobrir cenários básicos e alternativos:
        - Reservas válidas com diferentes combinações de campos.
        - Validação de dados incorretos, como assento fora do intervalo ou preço inválido.
        - Tentativas de reservar assentos já ocupados no mesmo horário.
    - Testes devem incluir evidências e logs de execução.
    - Cobertura baseada no Swagger e expandida para cenários críticos.

---

### **Exemplo de Teste Automatizado**

### **Cenário: Reservar Ingresso com Sucesso**

```gherkin
gherkin
Copiar código
Scenario: Reservar um ingresso com sucesso
  Given que o usuário está autenticado e deseja reservar um ingresso
  When enviar uma solicitação POST para /tickets com os seguintes dados:
    | campo       | valor                        |
    | movieId     | 642a4b82e4b0205ff99a7b6d     |
    | userId      | 123456789                    |
    | seatNumber  | 45                           |
    | price       | 30.50                        |
    | showtime    | 2024-11-30T19:00:00.000Z     |
  Then o sistema valida os campos obrigatórios
  And verifica se o `seatNumber` 45 está disponível para o horário 2024-11-30T19:00:00.000Z
  And cria a reserva com um ID único
  And retorna status 201 Created com os detalhes da reserva

```

### **Cenário: Tentativa de Reservar um Assento Já Ocupado**

```gherkin
gherkin
Copiar código
Scenario: Tentar reservar um assento já ocupado
  Given que o usuário está autenticado e deseja reservar um ingresso
  And o assento 45 já foi reservado para o horário 2024-11-30T19:00:00.000Z
  When enviar uma solicitação POST para /tickets com os seguintes dados:
    | campo       | valor                        |
    | movieId     | 642a4b82e4b0205ff99a7b6d     |
    | userId      | 987654321                    |
    | seatNumber  | 45                           |
    | price       | 30.50                        |
    | showtime    | 2024-11-30T19:00:00.000Z     |
  Then o sistema valida os campos obrigatórios
  And verifica que o `seatNumber` 45 já está ocupado para o horário 2024-11-30T19:00:00.000Z
  And retorna status 409 Conflict com uma mensagem de erro apropriada

```

---
