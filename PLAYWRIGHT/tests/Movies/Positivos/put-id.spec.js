const { test, expect } = require('@playwright/test');
const { generateRandomMovie } = require('../../../data/CriaFilme');

const url = "http://localhost:3000";

test.describe('Movies API - PUT', () => {
    test('Atualiza um filme com ID existente', async ({ request }) => {
        const movieId = await generateRandomMovie();


        const response = await request.put(`http://localhost:3000/movies/${movieId}`, {
            data: {
                title: "Melancia",
                description: "Boa melancia vermelha",
                launchdate: "2024-12-01T18:57:01.495Z",
                showtimes: [],
            },
        });
        // Valida o código de status da resposta
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody._id).toBe(movieId);

    });

});