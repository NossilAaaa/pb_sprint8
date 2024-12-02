const { faker } = require('@faker-js/faker');
const axios = require('axios');

async function generateRandomMovie() {
    const movie = {
        title: faker.lorem.words(2), // Gera um título aleatório com 2 palavras
        description: faker.lorem.sentences(1), // Gera uma descrição aleatória de 1 frase
        launchdate: faker.date.past().toISOString(), // Data de lançamento aleatória
        showtimes: [
            faker.date.future().toISOString(), // Gera uma data futura aleatória para o horário do filme
        ],
        _id: faker.string.uuid(), // Gera um ID único fictício
    };

    try {
        const response = await axios.post('http://localhost:3000/movies', movie);
        //console.log('Filme gerado com sucesso:', movie); // Log para verificar o filme gerado
        return movie._id;
    } catch (error) {
        console.error('Erro na requisição:', error.message);
    }
}

module.exports = { generateRandomMovie };
