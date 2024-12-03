# ReadMe.md

![LOGO_COMPASS.png](Mapa_Mental/LOGO_COMPASS.png)


# 🎟️ API de **API de Cinema PBs**

Bem-vindo ao repositório da **Challenge Final(Sprint 8) - Scholarship**!

Essa API foi desenvolvida para gerenciar informações de filmes e permitir a reserva de ingressos de forma prática e eficiente.  

---

## 📋 **Objetivo**

O projeto visa atender dois principais objetivos:

1. Gerenciamento de filmes, verificando se a rota /movies cadastra, atualiza, lista e exclui filmes.
2. Reserva de ingressos, verificando se a rota /tickets pode selecionar assentos, preços e horários de exibição.

---

## 🛠️ **Ferramentas e Tecnologias Utilizadas**

- **Node.js**: Ambiente de execução JavaScript.
- **Playwright**: Framework para automação de testes de ponta a ponta, com suporte para múltiplos navegadores e testes em UI.
- **JMeter**: Ferramenta de teste de carga para medir o desempenho e a capacidade de escalabilidade de aplicativos e serviços.
- **K6**: Plataforma de teste de desempenho para APIs e sistemas distribuídos, focada em facilitar testes de carga e performance em ambientes de produção.
- **Swagger**: Documentação da API.

---

## 🚀 **Instalação**

### **Pré-requisitos**

Certifique-se de que você possui as seguintes ferramentas instaladas:

- [Node.js (v21+)](https://nodejs.org/) (https://nodejs.org/)
- [NPM ou Yarn](https://nodejs.org/) (https://nodejs.org/)

### **Clonando o Repositório**

Use o comando abaixo para clonar o projeto para o seu computador:

```bash
git clone <https://github.com/juniorschmitz/nestjs-cinema.git>

```
Após clonar o repositório, instale as dependências:
```bash
npm i

```
### Execução

Após instalar todas as dependências, para executar o testes abra um terminal dentro da pasta PLAYWRIGHT:
```bash
npx playwright test; (Esse executa todos os testes)
    ou
npx playwright test "nome_doTeste.spec.js; (Esse executa individualmente)

```
### Gerar a pipeline com o Allure:

Após executar o(s) teste(s) desejado(s), execute os seguintes comandos: 

```bash
allure generate ./allure-results -o ./allure-report

allure open ./allure-report
```
Obs: se precisar gerar novamente execute os testes novamentes e apague as pastas allure-results e allure-report, para serem geradas novamente.

## Sobre Mim
```markdown
Olá! Eu sou o Alisson, estudante de Ciência da Computação, atualmente focado na área de Quality AI. Neste repositório, compartilho um pouco do que estou aprendendo e desenvolvendo durante a Sprint 1 do projeto PB QualityAI.

    Experiências em:
    * C++;
    * JAVA;
    * Python;
    * React.JS;
    * Node.JS;
    * Javascript;
    * TypeScript;
    * SQL;
    * Git;  
```

.
