// ticketGenerator.js
const { faker } = require('@faker-js/faker');

/**
 * Gera um ticket aleatório para um filme
 * @returns {Object} Ticket com movieId, seatNumber, price e showtime
 */
function generateRandomTicket() {
  const movieId = faker.string.uuid(); // Gera um ID único fictício
  const seatNumber = faker.number.int({ min: 1, max: 99 }); // Número do assento entre 1 e 99
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
