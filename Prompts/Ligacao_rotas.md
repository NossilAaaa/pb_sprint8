## Prompt Utilizado: 
Mais uma sugestão de melhoria: A rota de movies não tem nenhuma ligação com a rota de tickets. Por exemplo é possível criar um ingresso para um filme inexistente. Da mesma forma que o ingresso, só vai ter relação com o filme, se digitar o id correto. Mas poderia ter alguma relação entre o id do movie para o ticket. Não tem nenhuma verifição pra ver se a data do ticket se enquando na data do movie...

## Resposta Gerada:
### Descrição:
Atualmente, as rotas /movies e /tickets não possuem qualquer relacionamento. Isso permite criar ingressos para filmes inexistentes ou sem verificar se os dados do ingresso (como data e horário) estão alinhados com as informações do filme. Essa ausência de validação pode levar a inconsistências nos dados, impactando diretamente a lógica do sistema e a experiência do usuário.

Garantir a integridade dos dados no sistema.
Facilitar a manutenção e a implementação de novas funcionalidades.
Melhorar a experiência do consumidor da API, evitando inconsistências no fluxo de uso.

Cenário Atual
É possível criar um ingresso (/tickets) para um filme inexistente em /movies.

Exemplo de criação válida, mesmo sem um filme correspondente:

{
    "movieId": "Filme que não existe",
    "seatNumber": 89,
    "price": 30.0,
    "showtime": "20/12/2015"
}
A única relação entre um ticket e um filme depende de informar manualmente o id correto no campo movieId.

Não há verificação para garantir que o 'showtime' do ticket estejam dentro do intervalo de exibição do filme especificado.

Proposta de Melhoria
Relacionar tickets aos filmes por ID:

Durante a criação de um ticket, validar se o movieId existe na base de dados.
Exemplo de requisição corrigida:

{
    "movieId": "abc123",
    "seatNumber": 89,
    "price": 30.0,
    "showtime": "20/12/2015"
}
Exemplo de resposta em caso de filme inexistente:

{
    "error": "O filme associado a este ticket não existe.",
    "status": 400
}
Validar as datas e horários dos tickets:

Garantir que o "showtime" de um ticket estejam dentro do intervalo definido pelo campo launchdate do filme e, se aplicável, pelos horários (showtimes) fornecidos no modelo de filme.
Exemplo de validação:
Filme:

{
    "id": "abc123",
    "title": "Filme Exemplo",
    "launchdate": "2024-12-01",
    "showtimes": ["18:00", "20:00"]
}
Ticket inválido:

{
    "movieId": "abc123",
    "date": "2024-11-30",  // Antes da data de lançamento
    "time": "22:00",       // Horário não compatível
    "price": 30.0
}
Respostas claras ao validar relações:

Em caso de erro, retornar mensagens detalhadas, como:

{
    "error": "A data ou horário do ticket não corresponde à exibição do filme.",
    "status": 400
}

---

# Generate Ticktes
## Prompt:
Seguinte vamos fazer uma função que gera um ticket nessa estrutura: { "movieId": " ", 
  "seatNumber": = 0, 
  "price": 0, 
  "showtime": " "}; Porém em vez de deixar os campos 0 ou " ", bote para criar de forma aleatória ou como se fosse criando pegando a data do dia atual e tals. E com isso exportamos essa função para usar em outros códigos.

## O ChatGPT disse:
Podemos criar uma função em JavaScript para gerar tickets aleatórios. Essa função pode utilizar pacotes como faker-js para dados fictícios e o objeto Date para manipulação de datas. Além disso, a função será exportada para reutilização.

Segue o código:

Função Geradora de Tickets Aleatórios
javascript
Copiar código
// ticketGenerator.js
const { faker } = require('@faker-js/faker');


 Gera um ticket aleatório para um filme
 @returns {Object} Ticket com movieId, seatNumber, price e showtime
 
function generateRandomTicket() {
  const movieId = faker.string.uuid(); // Gera um ID único fictício
  const seatNumber = faker.number.int({ min: 1, max: 200 }); // Número do assento entre 1 e 200
  const price = faker.number.float({ min: 10, max: 50, precision: 0.01 }); // Preço entre 10 e 50 reais
  const currentDateTime = new Date(); // Data atual
  const hours = faker.number.int({ min: 10, max: 23 }); // Horário fictício entre 10h e 23h
  const showtime = new Date(
    currentDateTime.getFullYear(),
    currentDateTime.getMonth(),
    currentDateTime.getDate(),
    hours,
    0,
    0
  ).toISOString(); // Converte para string no formato ISO

  return {
    movieId,
    seatNumber,
    price: parseFloat(price.toFixed(2)), // Formata o preço para duas casas decimais
    showtime,
  };
}

module.exports = { generateRandomTicket };