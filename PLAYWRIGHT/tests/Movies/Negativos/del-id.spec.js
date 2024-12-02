const { test, expect } = require('@playwright/test');
const { generateRandomMovie } = require('../../../data/CriaFilme');

const url = "http://localhost:3000";

test.describe('Movies API - DEL', () => {
    test('Deleta um filme pelo ID inexistente', async ({ request }) => {
        const response = await request.put(url + '/movies/IDqualquer', {
        });

        // Valida o código de status da resposta
        expect(response.status()).toBe(404);

        const responseBody = await response.json();
        //console.log(responseBody);
        expect(responseBody).toHaveProperty('error');
        expect(responseBody.error).toContain('Not Found');
    });

});