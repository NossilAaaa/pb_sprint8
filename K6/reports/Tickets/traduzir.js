const fs = require('fs');

// Carregar o arquivo HTML gerado pelo k6
fs.readFile('../reports/Tickets/relatorio.html', 'utf8', (err, data) => {
  if (err) throw err;

  // Substituir os títulos das colunas
  let result = data
    .replace(/Count/g, 'Contagem')
    .replace(/Rate/g, 'Taxa')
    .replace(/Average/g, 'Média')
    .replace(/Maximum/g, 'Máximo')
    .replace(/Median/g, 'Mediana')
    .replace(/Minimum/g, 'Mínimo')
    .replace(/90th Percentile/g, 'Percentil 90')
    .replace(/95th Percentile/g, 'Percentil 95')

    // Substituir as métricas de dados
    .replace(/http_req_duration/g, 'Duração da Requisição HTTP')
    .replace(/http_req_waiting/g, 'Tempo de Espera da Requisição HTTP')
    .replace(/http_req_connecting/g, 'Tempo de Conexão HTTP')
    .replace(/http_req_tls_handshaking/g, 'Handshake TLS da Requisição HTTP')
    .replace(/http_req_sending/g, 'Tempo de Envio da Requisição HTTP')
    .replace(/http_req_receiving/g, 'Tempo de Recebimento da Requisição HTTP')
    .replace(/http_req_blocked/g, 'Tempo de Bloqueio da Requisição HTTP')
    .replace(/iteration_duration/g, 'Duração da Iteração')

    // Traduzir os novos dados
    .replace(/Total Requests/g, 'Total de Requisições')
    .replace(/Failed Requests/g, 'Requisições Falhadas')
    .replace(/Breached Thresholds/g, 'Limites Ultrapassados')
    .replace(/Failed Checks/g, 'Verificações Falhadas')

    .replace(/Request Metrics/g, 'Métricas de Requisição')
    .replace(/Other Stats/g, 'Outras Estatísticas')
    .replace(/Checks/g, 'Verificações')
    .replace(/Passed/g, 'Aprovadas')
    .replace(/Failed/g, 'Falhadas')
    .replace(/Iterations/g, 'Iterações')
    .replace(/Total/g, 'Total')
    .replace(/Taxa/g, 'Taxa')
    .replace(/Virtual Users/g, 'Usuários Virtuais')
    .replace(/Min/g, 'Mín')
    .replace(/Max/g, 'Máx')
    .replace(/Requests/g, 'Requisições')
    .replace(/Data Received/g, 'Dados Recebidos')
    .replace(/Data Sent/g, 'Dados Enviados')
    .replace(/Custom Metrics/g, 'Metricas Costumizadas')
    .replace(/Note. All times are in milli-seconds/g, 'Nota. Todos os tempos estão em milissegundos')
    .replace(/Other/g, 'Outras')
    .replace(/Groups/g, 'Grupos')
    .replace(/Passes/g, 'Passou')
    .replace(/Failures/g, 'Falhas')


    // Traduzir os valores de 'MB' e 'mB' (se necessário)
    .replace(/MB/g, 'MB')
    .replace(/mB/g, 'mB');

  // Salvar o arquivo HTML com as colunas e métricas traduzidas
  fs.writeFile('../reports/Tickets/relatorio_traduzido.html', result, 'utf8', (err) => {
    if (err) throw err;
    console.log('Relatório traduzido gerado com sucesso!');
  });
});
