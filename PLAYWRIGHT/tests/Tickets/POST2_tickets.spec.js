const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:3000';

test.describe('Criação de Ticket com Dados Inválidos', () => {
  let apiContext;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      baseURL: BASE_URL,
    });
  });

  test('Deve retornar erro ao tentar criar um ticket com dados inválidos', async () => {
    // Criando dados inválidos, mas com tipo correto
    const invalidTicket = {
      movieId: 'AQUI NÃO PODE SER STRING', // Esperado que seja um ID numérico ou válido de filme
      seatNumber: 10, // Número de assento não pode ser 0
      price: 10, // Preço negativo, inválido
      showtime: 'VALIDAÇÃO DE DATAS', // Esperado um formato de data válido, não uma string genérica
    };

    // 1. Enviar requisição POST com dados inválidos
    const createResponse = await apiContext.post('/tickets', {
      data: invalidTicket,
    });

    console.log(`Status da requisição: ${createResponse.status()}`);
    console.log(`Resposta: ${await createResponse.text()}`);

    // 2. Verificar que a requisição NÃO retornou 201, já que os dados são inválidos
    expect(createResponse.status()).not.toBe(201); // Espera-se um erro, então não deve ser 201

    // 3. Verificar que a resposta contém os dados enviados
    const createResponseBody = await createResponse.json();
    console.log('Dados retornados:', createResponseBody);

    // 4. Verificar que a resposta contém uma mensagem de erro (se a API estiver implementada corretamente)
    // Aqui, ajustamos para verificar se algum campo de erro está presente no corpo da resposta
    expect(createResponseBody).toHaveProperty('error'); // Verificar se a resposta contém um campo de erro
    console.log('Mensagem de erro retornada:', createResponseBody.error);
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });
});
