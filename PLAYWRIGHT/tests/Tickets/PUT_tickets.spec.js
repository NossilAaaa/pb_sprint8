const { test, expect, request } = require('@playwright/test');
const { generateRandomTicket } = require('../../data/generate.tickets');

const BASE_URL = 'http://localhost:3000';

test.describe('Teste de Atualização de Ticket com PUT', () => {
  let apiContext;
  let createdTicketId;

  // Antes de todos os testes, cria o contexto de requisição
  test.beforeAll(async ({ playwright }) => {
    apiContext = await request.newContext({
      baseURL: BASE_URL,
    });
  });

  // Depois de todos os testes, limpa o contexto
  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('Deve criar um ticket e atualizar o número do assento', async () => {
    const ticket = generateRandomTicket();

    // Etapa 1: Criar o ticket
    const createResponse = await apiContext.post('/tickets', {
      data: ticket,
    });

    console.log(`Status: ${createResponse.status()}`);
    console.log(`Body: ${await createResponse.text()}`);

    expect(createResponse.ok()).toBeTruthy();
    const createResponseBody = await createResponse.json();
    expect(createResponseBody).toHaveProperty('_id');
    createdTicketId = createResponseBody._id;

    // Etapa 2: Atualizar o número do assento
    const updatedData = {
      movieId: createResponseBody.movieId,
      seatNumber: 99, // Número atualizado para o teste
      price: createResponseBody.price,
      showtime: createResponseBody.showtime,
    };

    console.log('Dados enviados para atualização:', updatedData);

    const updateResponse = await apiContext.put(`/tickets/${createdTicketId}`, {
      data: updatedData,
    });

    console.log(`Status da atualização: ${updateResponse.status()}`);
    console.log(`Body da atualização: ${await updateResponse.text()}`);

    expect(updateResponse.ok()).toBeTruthy();
    const updateResponseBody = await updateResponse.json();
    console.log('Body da atualização recebido:', updateResponseBody);

    expect(updateResponseBody).toHaveProperty('seatNumber', 99);

    // Etapa 3: Validar a atualização
    const getResponse = await apiContext.get(`/tickets/${createdTicketId}`);
    expect(getResponse.ok()).toBeTruthy();
    const getResponseBody = await getResponse.json();
    expect(getResponseBody).toHaveProperty('seatNumber', 99);
  });
});
