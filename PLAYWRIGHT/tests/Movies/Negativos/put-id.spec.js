const { test, expect } = require('@playwright/test');
const { generateRandomMovie } = require('../../../data/CriaFilme');

const url = "http://localhost:3000";

test.describe('Movies API - PUT', () => {
    test('Atualiza um filme com ID inexistente', async ({ request }) => {
        const response = await request.put(url + '/movies/IDqualquer', {
            data: {
                title: "Maca",
                description: "Uma maçã dourada que voa",
                launchdate: "2024-12-01T18:57:01.495Z",
                showtimes: [],
            },
        });

        // Valida o código de status da resposta
        expect(response.status()).toBe(404);

        const responseBody = await response.json();
        //console.log(responseBody);
        expect(responseBody).toHaveProperty('error');
        expect(responseBody.error).toContain('Not Found');
    });

    test('Atualiza um filme com ID existente, mas tenta alterar ID', async ({ request }) => {
        const movieId = await generateRandomMovie();


        const response = await request.put(`http://localhost:3000/movies/${movieId}`, {
            data: {
                title: "chuva",
                description: "Quebrou o guarda chuva",
                launchdate: "2024-12-01T18:57:01.495Z",
                showtimes: [],
                _id: "qualquer"  // Tentativa de alteração do ID
            },
        });

        expect(response.status()).toBe(500);

        const responseBody = await response.json();
        //expect(responseBody).toHaveProperty('error');
        expect(responseBody.message).toContain('Internal server error');
    });

    test('Atualiza um filme com ID existente, mas com campos vazios', async ({ request }) => {
        const movieId = await generateRandomMovie();


        const response = await request.put(`http://localhost:3000/movies/${movieId}`, {
            data: {
                title: "",
                description: "",
                launchdate: "",
                showtimes: [],
            },
        });

        expect(response.status()).toBe(404);

        const responseBody = await response.json();
        expect(responseBody.message).toContain('Internal server error');
    });
});
