const { test, expect } = require('@playwright/test');

const url = "http://localhost:3000";

test.describe('Movies API - POST', () => {
    test('Criar um novo filme', async ({ request }) => {
        const response = await request.post(url + '/movies', {
            data: {
                title: "filme 1",
                description: "filme 1",
                launchdate: "2024-12-01T18:57:01.495Z",
                showtimes: ["string"],
            },
        });

        // Valida o código de status da resposta
        expect(response.status()).toBe(201);

    });

});
