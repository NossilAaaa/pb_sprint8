const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:3000';

test.describe('Remoção de Ticket', () => {
  let apiContext;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      baseURL: BASE_URL,
    });
  });

  test('Deve listar os tickets, selecionar um e removê-lo', async () => {
    // 1. Listar todos os tickets
    const listResponse = await apiContext.get('/tickets');
    expect(listResponse.ok()).toBeTruthy(); // Garantir que a requisição foi bem-sucedida

    const tickets = await listResponse.json();
    expect(tickets).toBeInstanceOf(Array); // Garantir que recebemos uma lista
    expect(tickets.length).toBeGreaterThan(0); // Certificar que há tickets disponíveis

    console.log('Tickets disponíveis:', tickets);

    // 2. Selecionar um ticket aleatoriamente
    const randomIndex = Math.floor(Math.random() * tickets.length);
    const ticketToDelete = tickets[randomIndex];
    expect(ticketToDelete).toHaveProperty('_id'); // Certificar que o ticket possui um _id

    console.log('Ticket selecionado para remoção:', ticketToDelete);

    // 3. Remover o ticket selecionado
    const deleteResponse = await apiContext.delete(`/tickets/${ticketToDelete._id}`);
    expect(deleteResponse.ok()).toBeTruthy(); // Verificar que a remoção foi bem-sucedida

    console.log('Ticket removido com sucesso:', ticketToDelete._id);

    // 4. Validar que o ticket foi removido
    const validateResponse = await apiContext.get(`/tickets/${ticketToDelete._id}`);
    expect(validateResponse.status()).toBe(404); // O ticket não deve mais existir
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });
});
