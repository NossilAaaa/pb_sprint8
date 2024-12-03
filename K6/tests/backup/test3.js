import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';


export const options = {
    vus: 1,  // Usando 1 VU para garantir que só um teste seja executado de cada vez
    duration: '30s',  // Tempo total de execução
};

export default function () {
    // Teste de criação de filmes
    testCreateMovies();

    // Teste de listagem de filmes
    testListMovies();

    // Teste de obtenção de detalhes de filmes
    testGetMovieDetails();

    // Teste de atualização de filmes
    testUpdateMovies();

    // Teste de exclusão de filmes
    testDeleteMovies();
}

function generateMoviePayload(id) {
    return JSON.stringify({
        title: `filme-${__ITER}`,
        description: 'Filme de teste',
        launchdate: new Date().toISOString(),
        showtimes: [new Date().toISOString()],
        _id: id,
    });
}


// Função para criar filmes
export function testCreateMovies() {
    const movieId = uuidv4();
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
    const movieId = uuidv4();
    const payload = generateMoviePayload(movieId);
    const headers = { 'Content-Type': 'application/json' };

    let res = http.post('http://localhost:3000/movies', payload, { headers });

    res = http.get(`http://localhost:3000/movies/${movieId}`);
    check(res, {
        'Status igual a 200': (r) => r.status === 200,
        'Tempo de resposta menor que 50ms': (r) => r.timings.duration < 50,
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
        'Status igual a 200': (r) => r.status === 200,
        'Tempo de resposta menor que 300ms': (r) => r.timings.duration < 300,
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
        'Status igual a 200': (r) => r.status === 200,
        'Tempo de resposta menor que 300ms': (r) => r.timings.duration < 300,
    });

    sleep(1);
}

// Função para gerar relatório
export function handleSummary(data) {
    return {
        '../reports/relatorio.html': htmlReport(data),
    };
}
