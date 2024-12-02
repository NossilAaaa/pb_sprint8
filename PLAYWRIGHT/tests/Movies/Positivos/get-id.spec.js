const { test, expect } = require('@playwright/test');
const { generateRandomMovie } = require('../../../data/CriaFilme');

const url = "http://localhost:3000";

test.describe('Movies API - GET', () => {
    test('Lista um filme por um ID existente', async ({ request }) => {
        const movieId = await generateRandomMovie();


        const response = await request.get(`http://localhost:3000/movies/${movieId}`,);

        // Valida o código de status da resposta
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody._id).toBe(movieId);

    });

});