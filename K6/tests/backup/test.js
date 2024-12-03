import http from 'k6/http';
import { check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// Configuração do teste: até 200 requisições
export let options = {
  vus: 100, // 100 usuários virtuais simultâneos
  iterations: 200, // Total de 200 iterações (requisições)
  thresholds: {
    // Tempo médio de resposta deve ser menor que 200ms
    'http_req_duration{status:201}': ['avg<200'],
    // Pelo menos 95% das requisições devem ser bem-sucedidas
    'http_req_failed': ['rate<0.05'],
  },
};

export default function () {
  const url = 'http://localhost:3000/movies';

  const payload = JSON.stringify({
    title: `filme-${__ITER}`, // Nome único para cada filme
    description: 'Filme de teste',
    launchdate: new Date().toISOString(), // Data atual no formato ISO
    showtimes: [new Date().toISOString()],
  });

  const headers = { 'Content-Type': 'application/json' };

  const res = http.post(url, payload, { headers });

  // Validações
  check(res, {
    'status é 201': (r) => r.status === 201,
    'tempo de resposta < 200ms': (r) => r.timings.duration < 200,
  });


}
// Função para gerar o relatório HTML
export function handleSummary(data) {
  return {
    '../reports/relatorio.html': htmlReport(data),
  };
}