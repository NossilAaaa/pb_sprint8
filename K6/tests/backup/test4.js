import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export const options = {
    scenarios: {
        create_movies: {
            executor: 'constant-vus',
            vus: 50,
            duration: '30s',
            exec: 'testCreateMovies',
        },
        list_movies: {
            executor: 'constant-vus',
            vus: 50,
            duration: '30s',
            exec: 'testListMovies',
        },
        get_movie_details: {
            executor: 'constant-vus',
            vus: 50,
            duration: '30s',
            exec: 'testGetMovieDetails',
        },
        update_movies: {
            executor: 'constant-vus',
            vus: 50,
            duration: '30s',
            exec: 'testUpdateMovies',
        },
        delete_movies: {
            executor: 'constant-vus',
            vus: 50,
            duration: '30s',
            exec: 'testDeleteMovies',
        },
    },
};


export default function () {
    // testCreateMovies();
}

// Função para gerar o payload do filme
function generateMoviePayload(id) {
    return JSON.stringify({
        title: `filme-${id}`,
        description: 'Filme de teste',
        launchdate: new Date().toISOString(),
        showtimes: [new Date().toISOString()],
        _id: `ID-${id}`,
    });
}

// Função para criar filmes
export function testCreateMovies() {
    const movieId = uuidv4();
    const payload = generateMoviePayload(movieId);
    const headers = { 'Content-Type': 'application/json' };
    const res = http.post('http://localhost:3000/movies', payload, { headers });

    check(res, {
        'status é 201': (r) => r.status === 201,
        'tempo de resposta < 200ms': (r) => r.timings.duration < 200,
    });

    sleep(1);  // Sleep entre as requisições para não sobrecarregar a API
}

// Função para listar filmes
export function testListMovies() {
    const res = http.get('http://localhost:3000/movies');

    check(res, {
        'status é 200': (r) => r.status === 200,
        'tempo de resposta < 100ms': (r) => r.timings.duration < 100,
    });

    sleep(1);
}

// Função para obter detalhes de um filme
export function testGetMovieDetails() {
    const movieId = uuidv4();
    const payload = generateMoviePayload(movieId);
    const headers = { 'Content-Type': 'application/json' };

    let res = http.post('http://localhost:3000/movies', payload, { headers });

    res = http.get(`http://localhost:3000/movies/${movieId}`);
    check(res, {
        'status é 200': (r) => r.status === 200,
        'tempo de resposta < 50ms': (r) => r.timings.duration < 50,
    });

    sleep(1);
}

// Função para atualizar filmes
export function testUpdateMovies() {
    const movieId = uuidv4();
    const payload = generateMoviePayload(movieId);
    const headers = { 'Content-Type': 'application/json' };

    let res = http.post('http://localhost:3000/movies', payload, { headers });

    res = http.put(`http://localhost:3000/movies/${movieId}`, payload, { headers });

    check(res, {
        'status é 200': (r) => r.status === 200,
        'tempo de resposta < 300ms': (r) => r.timings.duration < 300,
    });

    sleep(1);
}

// Função para excluir filmes
export function testDeleteMovies() {
    const movieId = uuidv4();
    const payload = generateMoviePayload(movieId);
    const headers = { 'Content-Type': 'application/json' };

    let res = http.post('http://localhost:3000/movies', payload, { headers });

    res = http.del(`http://localhost:3000/movies/${movieId}`);
    check(res, {
        'status é 204': (r) => r.status === 204,
        'tempo de resposta < 400ms': (r) => r.timings.duration < 400,
    });

    sleep(1);
}

// Função para gerar o relatório
export function handleSummary(data) {
    console.log(JSON.stringify(data, null, 2)); // Exibe os dados no console
    return {
        '../reports/relatorio.html': htmlReport(data),
    };
}
