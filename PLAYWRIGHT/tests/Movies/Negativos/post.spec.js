const { test, expect } = require('@playwright/test');

const url = "http://localhost:3000";

test.describe('Movies API - POST', () => {
    test('Criar um novo filme sem titulo', async ({ request }) => {
        const response = await request.post(url + '/movies', {
            data: {
                title: "",
                description: "string",
                launchdate: "2024-12-01T18:57:01.495Z",
                showtimes: ["string"],
            },
        });

        // Valida o código de status da resposta
        expect(response.status()).toBe(400);

        const responseBody = await response.json();
        //console.log(responseBody);
        expect(responseBody).toHaveProperty('error');
        expect(responseBody.error).toContain('Bad Request');
    });

    test('Criar um novo filme sem descrição', async ({ request }) => {
        const response = await request.post(url + '/movies', {
            data: {
                title: "Maca",
                description: "",
                launchdate: "2024-12-01T18:57:01.495Z",
                showtimes: ["string"],
            },
        });

        expect(response.status()).toBe(400);

        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error');
        expect(responseBody.error).toContain('Bad Request');
    });

    test('Criar um novo filme com data de exibição inválida', async ({ request }) => {
        const response = await request.post(url + '/movies', {
            data: {
                title: "Maca",
                description: "Uma maçã dourada que voa",
                launchdate: "2024-12-01T18:57:01.495Z",
                showtimes: ["data invalida"],
            },
        });

        expect(response.status()).toBe(400);

        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error');
        expect(responseBody.error).toContain('Bad Request');
    });

    test('Criar um novo filme com data de exibição vazia', async ({ request }) => {
        const response = await request.post(url + '/movies', {
            data: {
                title: "Maca",
                description: "Uma maçã dourada que voa",
                launchdate: "2024-12-01T18:57:01.495Z",
                showtimes: [],
            },
        });

        expect(response.status()).toBe(400);

        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error');
        expect(responseBody.error).toContain('Bad Request');
    });

    test('Criar um novo filme com data de lançamento invalida', async ({ request }) => {
        const response = await request.post(url + '/movies', {
            data: {
                title: "Maca",
                description: "Uma maçã dourada que voa",
                launchdate: "data invalida",
                showtimes: ["2024-12-01T18:57:01.495Z"],
            },
        });

        expect(response.status()).toBe(400);

        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error');
        expect(responseBody.error).toContain('Bad Request');
    });

    test('Criar um novo filme com data de lançamento vazia', async ({ request }) => {
        const response = await request.post(url + '/movies', {
            data: {
                title: "Maca",
                description: "Uma maçã dourada que voa",
                launchdate: "",
                showtimes: ["2024-12-01T18:57:01.495Z"],
            },
        });

        expect(response.status()).toBe(400);

        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error');
        expect(responseBody.error).toContain('Bad Request');
    });


});
