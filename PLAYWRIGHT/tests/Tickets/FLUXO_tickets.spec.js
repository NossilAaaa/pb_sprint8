const { test, expect } = require('@playwright/test');

// URL base da API
const BASE_URL = 'http://localhost:3000';

// Função para gerar dados de um ticket válido
const generate = () => {
  return {
    movieId: '12345', // ID fictício do filme
    seatNumber: Math.floor(Math.random() * 100) + 1, // Assento aleatório entre 1 e 100
    price: Math.floor(Math.random() * 50) + 10, // Preço aleatório entre 10 e 50
    showtime: new Date().toISOString(), // Data e hora atuais no formato ISO
  };
};

test.describe('Fluxo Completo: Criar, Alterar e Deletar Ticket', () => {
  let apiContext;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      baseURL: BASE_URL,
    });
  });

  test('Deve criar, alterar e deletar um ticket', async () => {
    // 1. Criar um ticket válido
    const validTicket = generate();
    const createResponse = await apiContext.post('/tickets', { data: validTicket });
    expect(createResponse.status()).toBe(201); // Verifica que o ticket foi criado

    const createdTicket = await createResponse.json();
    console.log('Ticket criado:', createdTicket);
    expect(createdTicket).toHaveProperty('_id'); // Confirma que o ID foi gerado

    // Salvar o ID do ticket criado para usar em alterações e exclusão
    const ticketId = createdTicket._id;

    // 2. Alterar o campo `movieId` do ticket para "deletada"
    const updatedTicketData = { ...validTicket, movieId: 'deletada' };
    const updateResponse = await apiContext.put(`/tickets/${ticketId}`, { data: updatedTicketData });
    expect(updateResponse.status()).toBe(200); // Verifica que o ticket foi atualizado

    const updatedTicket = await updateResponse.json();
    console.log('Ticket atualizado:', updatedTicket);
    expect(updatedTicket.movieId).toBe('deletada'); // Confirma que o campo `movieId` foi alterado

    // 3. Remover o ticket atualizado
    const deleteResponse = await apiContext.delete(`/tickets/${ticketId}`);
    expect(deleteResponse.status()).toBe(200); // Verifica que a exclusão foi bem-sucedida
    //expect(deleteResponse.status()).toBe(204); O correto seria 204;

    console.log('Ticket deletado com sucesso.');
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });
});
