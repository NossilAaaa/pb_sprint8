const { test, expect } = require('@playwright/test');
const { generateRandomMovie } = require('../../../data/CriaFilme');
const exp = require('constants');

const url = "http://localhost:3000";

test.describe('Movies API - DEL', () => {
    test('Deleta um filme pelo ID existente', async ({ request }) => {
        const movieId = await generateRandomMovie();


        const response = await request.delete(`http://localhost:3000/movies/${movieId}`, {});

        // Valida o código de status da resposta
        expect(response.status()).toBe(200);

        const response2 = await request.get(`http://localhost:3000/movies/${movieId}`);

        const responseBody = await response2.json();
        expect(response2.status()).toBe(404);
        expect(responseBody).toHaveProperty('error');
        expect(responseBody.error).toContain('Not Found');
    });

});