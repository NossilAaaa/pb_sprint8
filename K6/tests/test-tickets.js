import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export const options = {
    scenarios: {
        createTickets: {
            executor: 'constant-arrival-rate',
            rate: 100, // 100 solicitações por segundo
            timeUnit: '1s',
            duration: '5s',
            preAllocatedVUs: 20,
            maxVUs: 40,
            exec: 'testCreateTickets',
        },
        listTickets: {
            executor: 'constant-arrival-rate',
            rate: 100,
            startTime: '8s',
            timeUnit: '1s',
            duration: '5s',
            preAllocatedVUs: 15,
            maxVUs: 30,
            exec: 'testListTickets',
        },
        getTicketDetails: {
            executor: 'constant-arrival-rate',
            rate: 100,
            startTime: '15s',
            timeUnit: '1s',
            duration: '5s',
            preAllocatedVUs: 15,
            maxVUs: 30,
            exec: 'testGetTicketDetails',
        },
        updateTickets: {
            executor: 'constant-arrival-rate',
            rate: 50,
            timeUnit: '1s',
            startTime: '21s',
            duration: '5s',
            preAllocatedVUs: 20,
            maxVUs: 40,
            exec: 'testUpdateTickets',
        },
        deleteTickets: {
            executor: 'constant-arrival-rate',
            rate: 30,
            timeUnit: '1s',
            startTime: '29s',
            duration: '5s',
            preAllocatedVUs: 15,
            maxVUs: 30,
            exec: 'testDeleteTickets',
        },
    },
};

function generateTicketPayload(id) {
    return JSON.stringify({
        movieId: `ticket-${__ITER}`,
        userId: 'Ticket de teste',
        seatNumber: 0,
        price: 0,
        showtime: new Date().toISOString(),
        _id: id,
    });
}

export function testCreateTickets() {
    const ticketId = uuidv4();
    const payload = generateTicketPayload(ticketId);
    const headers = { 'Content-Type': 'application/json' };
    const res = http.post('http://localhost:3000/tickets', payload, { headers });

    check(res, {
        'CRIAR TICKET - Status igual a 201': (r) => r.status === 201,
        'CRIAR TICKET - tempo de resposta menor que 200ms': (r) => r.timings.duration < 200,
    });

    sleep(1);
}

export function testListTickets() {
    const res = http.get('http://localhost:3000/tickets');

    check(res, {
        'LISTAR TICKETS - Status é igual a 200': (r) => r.status === 200,
        'LISTAR TICKETS - Tempo de resposta menor que 100ms': (r) => r.timings.duration < 100,
    });

    sleep(1);
}

export function testGetTicketDetails() {
    const ticketId = uuidv4();
    const payload = generateTicketPayload(ticketId);
    const headers = { 'Content-Type': 'application/json' };

    // Criar o ticket primeiro
    let res = http.post('http://localhost:3000/tickets', payload, { headers });

    // Obter detalhes do ticket
    res = http.get(`http://localhost:3000/tickets/${ticketId}`);
    check(res, {
        'GET TICKET - Status igual a 200': (r) => r.status === 200,
        'GET TICKET - Tempo de resposta menor que 50ms': (r) => r.timings.duration < 50,
    });

    sleep(1);
}

export function testUpdateTickets() {
    const ticketId = uuidv4();
    const payload = generateTicketPayload(ticketId);
    const headers = { 'Content-Type': 'application/json' };

    // Criar o ticket primeiro
    let res = http.post('http://localhost:3000/tickets', payload, { headers });

    // Atualizar o ticket
    // payload.seatNumber = 1; // Alterando o número do assento para exemplificar a atualização
    res = http.put(`http://localhost:3000/tickets/${ticketId}`, payload, { headers });

    check(res, {
        'ATUALIZAR TICKET - Status igual a 200': (r) => r.status === 200,
        'ATUALIZAR TICKET - Tempo de resposta menor que 300ms': (r) => r.timings.duration < 300,
    });

    sleep(1);
}

export function testDeleteTickets() {
    const ticketId = uuidv4();
    const payload = generateTicketPayload(ticketId);
    const headers = { 'Content-Type': 'application/json' };

    // Criar o ticket primeiro
    let res = http.post('http://localhost:3000/tickets', payload, { headers });

    // Deletar o ticket
    res = http.del(`http://localhost:3000/tickets/${ticketId}`);

    check(res, {
        'DELETAR TICKET - Status igual a 200': (r) => r.status === 200,
        'DELETAR TICKET - Tempo de resposta menor que 300ms': (r) => r.timings.duration < 300,
    });

    sleep(1);
}

export function handleSummary(data) {
    return {
        '../reports/Tickets/relatorio.html': htmlReport(data),
    };
}