const { test, expect } = require('@playwright/test');

// URL base da API
const BASE_URL = 'http://localhost:3000';

test.describe('Validação de Requisição GET por ID', () => {
  let apiContext;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      baseURL: BASE_URL,
    });
  });

  test('Deve retornar erro para um ID inexistente', async () => {
    const nonExistentId = 'idInvalido123456';
    const response = await apiContext.get(`/tickets/${nonExistentId}`);

    console.log(`Status da requisição com ID inexistente: ${response.status()}`);
    const responseBody = await response.json();
    console.log('Resposta da API:', responseBody);

    // Verifica o status de erro esperado
    expect(response.status()).toBe(404); // Not Found ou código similar
    expect(responseBody).toHaveProperty('error', 'Not Found'); // Mensagem de erro esperada
  });

  test('Deve retornar erro para um ID vazio', async () => {
    const emptyId = '';
    const response = await apiContext.get(`/tickets/${emptyId}`);

    console.log(`Status da requisição com ID vazio: ${response.status()}`);
    const responseBody = await response.json();
    console.log('Resposta da API:', responseBody);

    // Verifica o status de erro esperado
    expect(response.status()).toBe(400); // Bad Request ou código similar
    expect(responseBody).toHaveProperty('error', 'ID inválido ou ausente'); // Mensagem de erro esperada
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });
});
