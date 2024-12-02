const { test, expect } = require('@playwright/test');

const url = "http://localhost:3000";

test.describe('Movies API - GET', () => {
    test('Listar um filme por um ID inexistente', async ({ request }) => {
        const response = await request.get(url + '/movies/IDqualquer');

        // Valida o código de status da resposta
        expect(response.status()).toBe(404);

        const responseBody = await response.json();
        //console.log(responseBody);
        expect(responseBody).toHaveProperty('error');
        expect(responseBody.error).toContain('Not Found');
    });

});