import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export const options = {
    scenarios: {
        createMovies: {
            executor: 'constant-arrival-rate',
            rate: 100, // 100 solicitações por segundo
            timeUnit: '1s', // Por segundo
            duration: '5s', // Execute por 1 minuto
            preAllocatedVUs: 10, // Alocar 10 usuários virtuais
            maxVUs: 20, // Limitar a 20 usuários virtuais
            exec: 'testCreateMovies',
        },
        listMovies: {
            executor: 'constant-arrival-rate',
            rate: 100, // 100 solicitações por segundo
            startTime: '6s',
            timeUnit: '1s',
            duration: '5s', // Execute por 30 segundos
            preAllocatedVUs: 5,
            maxVUs: 10,
            exec: 'testListMovies',
        },
        getMovieDetails: {
            executor: 'constant-arrival-rate',
            rate: 100, // 100 solicitações por segundo
            timeUnit: '1s',
            startTime: '12s',
            duration: '5s',
            preAllocatedVUs: 5,
            maxVUs: 10,
            exec: 'testGetMovieDetails',
        },
        updateMovies: {
            executor: 'constant-arrival-rate',
            rate: 50, // 50 solicitações por segundo
            timeUnit: '1s',
            startTime: '18s',
            duration: '5s',
            preAllocatedVUs: 10,
            maxVUs: 20,
            exec: 'testUpdateMovies',
        },
        deleteMovies: {
            executor: 'constant-arrival-rate',
            rate: 30, // 30 solicitações por segundo
            timeUnit: '1s',
            startTime: '26s',
            duration: '5s',
            preAllocatedVUs: 5,
            maxVUs: 10,
            exec: 'testDeleteMovies',
        },
    },
};
function generateMoviePayload(id) {
    return JSON.stringify({
        title: `filme-${__ITER}`,
        description: 'Filme de teste',
        launchdate: new Date().toISOString(),
        showtimes: [new Date().toISOString()],
        _id: id,
    });
}

export function testCreateMovies() {
    const movieId = uuidv4();
    const payload = generateMoviePayload(movieId);
    const headers = { 'Content-Type': 'application/json' };
    const res = http.post('http://localhost:3000/movies', payload, { headers });

    check(res, {
        'CRIAR FILME - Status igual a 201': (r) => r.status === 201,
        'CRIAR FILME - tempo de resposta menor que 200ms': (r) => r.timings.duration < 200,
    });

    sleep(1);
}

export function testListMovies() {
    const res = http.get('http://localhost:3000/movies');

    check(res, {
        'LISTAR FILMES - Status é igual a 200': (r) => r.status === 200,
        'LISTAR FILMES - Tempo de resposta menor que 100ms': (r) => r.timings.duration < 100,
    });

    sleep(1);
}

export function testGetMovieDetails() {
    const movieId = uuidv4();
    const payload = generateMoviePayload(movieId);
    const headers = { 'Content-Type': 'application/json' };

    let res = http.post('http://localhost:3000/movies', payload, { headers });

    res = http.get(`http://localhost:3000/movies/${movieId}`);
    check(res, {
        'LISTAR FILME POR ID - Status igual a 200': (r) => r.status === 200,
        'LISTAR FILME POR ID - Tempo de resposta menor que 50ms': (r) => r.timings.duration < 50,
    });

    sleep(1);
}

export function testUpdateMovies() {
    const movieId = uuidv4();
    const payload = generateMoviePayload(movieId);
    const headers = { 'Content-Type': 'application/json' };

    let res = http.post('http://localhost:3000/movies', payload, { headers });

    res = http.put(`http://localhost:3000/movies/${movieId}`, payload, { headers });

    check(res, {
        'ATUALIZAR FILME - Status igual a 200': (r) => r.status === 200,
        'ATUALIZAR FILME - Tempo de resposta menor que 300ms': (r) => r.timings.duration < 300,
    });

    sleep(1);
}

export function testDeleteMovies() {
    const movieId = uuidv4();
    const payload = generateMoviePayload(movieId);
    const headers = { 'Content-Type': 'application/json' };

    let res = http.post('http://localhost:3000/movies', payload, { headers });

    res = http.del(`http://localhost:3000/movies/${movieId}`);
    check(res, {
        'DELETAR FILME - Status igual a 200': (r) => r.status === 200,
        'DELETAR FILME - Tempo de resposta menor que 300ms': (r) => r.timings.duration < 300,
    });

    sleep(1);
}

export function handleSummary(data) {
    return {
        '../reports/Movies/relatorio.html': htmlReport(data),
    };
}
