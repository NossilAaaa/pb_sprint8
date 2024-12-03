import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { uuid } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';


export const options = {
    scenarios: {
        create_movies: {
            executor: 'constant-arrival-rate',
            rate: 100, // 100 requisições por segundo
            timeUnit: '1s',
            duration: '1m',
            preAllocatedVUs: 50,
            maxVUs: 100,
            exec: 'testCreateMovies',
        },
        list_movies: {
            executor: 'constant-arrival-rate',
            rate: 100, // 100 requisições por segundo
            timeUnit: '1s',
            duration: '1m',
            preAllocatedVUs: 50,
            maxVUs: 100,
            exec: 'testListMovies',
        },
        get_movie_details: {
            executor: 'constant-arrival-rate',
            rate: 100, // 100 requisições por segundo
            timeUnit: '1s',
            duration: '1m',
            preAllocatedVUs: 50,
            maxVUs: 100,
            exec: 'testGetMovieDetails',
        },
        update_movies: {
            executor: 'constant-arrival-rate',
            rate: 50, // 50 requisições por segundo
            timeUnit: '1s',
            duration: '1m',
            preAllocatedVUs: 30,
            maxVUs: 50,
            exec: 'testUpdateMovies',
        },
        delete_movies: {
            executor: 'constant-arrival-rate',
            rate: 30, // 30 requisições por segundo
            timeUnit: '1s',
            duration: '1m',
            preAllocatedVUs: 20,
            maxVUs: 30,
            exec: 'testDeleteMovies',
        },
    },
    thresholds: {
        'http_req_duration{scenario:create_movies}': ['avg<200'], // Tempo médio < 200ms
        'http_req_duration{scenario:list_movies}': ['avg<100'], // Tempo médio < 100ms
        'http_req_duration{scenario:get_movie_details}': ['avg<50'], // Tempo médio < 50ms
        'http_req_duration{scenario:update_movies}': ['avg<300'], // Tempo médio < 300ms
        'http_req_duration{scenario:delete_movies}': ['avg<400'], // Tempo médio < 400ms
        'http_req_failed': ['rate<0.01'], // Taxa de falha < 1%
    },
};

function generateMoviePayload(id) {
    return JSON.stringify({
        title: `filme-${__ITER}`,
        description: 'Filme de teste',
        launchdate: new Date().toISOString(),
        showtimes: [new Date().toISOString()],
        _id: `ID-${id}`,
    });
}

// Função para criar filmes
export function testCreateMovies() {
    const movieId = uuid();
    const payload = generateMoviePayload(movieId)
    const headers = { 'Content-Type': 'application/json' };
    const res = http.post('http://localhost:3000/movies', payload, { headers });

    check(res, {
        'Status igual a 201': (r) => r.status === 201,
        'tempo de resposta menor que 200ms': (r) => r.timings.duration < 200,
    });
    sleep(1);
}

// Função para listar filmes
export function testListMovies() {

    const res = http.get('http://localhost:3000/movies');
    check(res, {
        'Status é igual a 200': (r) => r.status === 200,
        'Tempo de resposta menor que 100ms': (r) => r.timings.duration < 100,
    });
    sleep(1);
}

// Função para obter detalhes de um filme
export function testGetMovieDetails() {
    const movieId = uuid();
    const payload = generateMoviePayload(movieId);
    const headers = { 'Content-Type': 'application/json' };
    let res = http.post(`http://localhost:3000/movies/${movieId}`)

    res = http.get(`http://localhost:3000/movies/${movieId}`);
    check(res, {
        'Status igual a 200': (r) => r.status === 200,
        'Tempo de resposta menor que 50ms': (r) => r.timings.duration < 50,
    });
    sleep(1);
}

// Função para atualizar filmes
export function testUpdateMovies() {
    const movieId = uuid();
    const payload = generateMoviePayload(movieId);
    const headers = { 'Content-Type': 'application/json' };
    let res = http.post(`http://localhost:3000/movies/${movieId}`)

    res = http.put(`http://localhost:3000/movies/${movieId}`, payload, { headers });

    check(res, {
        'Status igual a 200': (r) => r.status === 200,
        'Tempo de resposta menor que 300ms': (r) => r.timings.duration < 300,
    });
    sleep(1);
}

// Função para excluir filmes
export function testDeleteMovies() {
    const movieId = uuid();
    const payload = generateMoviePayload(movieId);
    const headers = { 'Content-Type': 'application/json' };
    let res = http.post(`http://localhost:3000/movies/${movieId}`)

    res = http.del(`http://localhost:3000/movies/${movieId}`);
    check(res, {
        'Status igual a 200': (r) => r.status === 200,
        'Tempo de resposta menor que 300ms': (r) => r.timings.duration < 300,
    });
    sleep(1);
}
