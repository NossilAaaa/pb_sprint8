const { test, expect } = require('@playwright/test');
const { generateRandomMovie } = require('../../../data/CriaFilme');

const url = "http://localhost:3000";

test.describe('Movies API - GET', () => {
    test('Listar todos os filmes', async ({ request }) => {


        const response = await request.get(`http://localhost:3000/movies/`,);

        // Valida o código de status da resposta
        expect(response.status()).toBe(200);

        const responseBody = await response.json();


    });

});