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
    // Dados inválidos para o teste: campo 'seatNumber' em branco
    const invalidTicket = {
      movieId: '', // movieId vazio, o que provavelmente é inválido
      seatNumber: '', // Assento vazio
      price: -10, // Preço negativo, inválido
      showtime: '', // showtime vazio
    };

    // 1. Enviar requisição POST com dados inválidos
    const createResponse = await apiContext.post('/tickets', {
      data: invalidTicket,
    });

    console.log(`Status da requisição: ${createResponse.status()}`);
    console.log(`Mensagem de erro: ${await createResponse.text()}`);

    // 2. Verificar que a requisição retornou um erro
    expect(createResponse.status()).toBe(400); // Espera-se um erro de Bad Request (400)

    // 3. Verificar a mensagem de erro (se disponível)
    const createResponseBody = await createResponse.json();
    expect(createResponseBody).toHaveProperty('error'); // Verificar se há uma chave de erro
    console.log('Mensagem de erro retornada:', createResponseBody.error);
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });
});
