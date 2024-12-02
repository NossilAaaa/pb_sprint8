const { test, expect } = require('@playwright/test');
const { generateRandomMovie } = require('../../../data/CriaFilme');

const url = "http://localhost:3000";

let movieIdTest = "";
test.describe('Movies API - Fluxo Positivo', () => {
    test('Criar um novo filme e verificar se foi criado', async ({ request }) => {

        const movieId = await generateRandomMovie();

        const response = await request.get(`http://localhost:3000/movies/${movieId}`,);

        expect(response.status()).toBe(200);
        movieIdTest = movieId;

    });

    test('Atualiza o filme criado', async ({ request }) => {

        const response = await request.put(`http://localhost:3000/movies/${movieIdTest}`,
            {
                data: {
                    title: "Bezerro 2",
                    description: "A morte do bezerro",
                    launchdate: "2024-12-01T18:57:01.495Z",
                    showtimes: ["2024-12-01T18:57:01.495Z"],
                },
            }
        );

    })

    test('Deleta o filme', async ({ request }) => {
        const response = await request.put(`http://localhost:3000/movies/${movieIdTest}`);

        // Valida o código de status da resposta
        expect(response.status()).toBe(200);

    });

});
