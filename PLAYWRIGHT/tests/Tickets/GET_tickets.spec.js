const { test, expect, request } = require('@playwright/test');

const BASE_URL = 'http://localhost:3000';

test.describe('Teste de busca de todos os tickets com GET', () => {
  let apiContext;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await request.newContext({
      baseURL: BASE_URL,
    });
  });

  test('Deve retornar todos os tickets e status 200', async () => {
    // Realiza a requisição GET para buscar todos os tickets
    const response = await apiContext.get('/tickets');

    // Verifica se o status da resposta é 200 OK
    expect(response.status()).toBe(200);

    // Obtém o corpo da resposta
    const responseBody = await response.json();

    // Verifica se o corpo da resposta é um array (ou qualquer outra validação que você precise)
    expect(Array.isArray(responseBody)).toBeTruthy();

    // Verifica se pelo menos um ticket foi retornado
    expect(responseBody.length).toBeGreaterThan(0);

    // Verifica se os tickets têm os campos necessários
    expect(responseBody[0]).toHaveProperty('movieId');
    expect(responseBody[0]).toHaveProperty('seatNumber');
    expect(responseBody[0]).toHaveProperty('price');
    expect(responseBody[0]).toHaveProperty('showtime');
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });
});
