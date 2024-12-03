# 🎟️ Teste de Carga para API de Cinema com JMeter

Este guia fornece as instruções para configurar e executar um teste de carga simples na API de Cinema utilizando o **Apache JMeter**.

---

## 📋 **Objetivo do Teste**

O objetivo do teste é verificar a capacidade da API de gerenciar múltiplas requisições simultâneas para a rota `/movies`, garantindo a estabilidade e o desempenho do sistema.

---

## 🛠️ **Ferramentas Utilizadas**

- **JMeter**: Ferramenta para simulação de carga e desempenho.
- **CSV Data Set Config**: Para alimentar o teste com dados dinâmicos de filmes.
- **API de Cinema**: Serviço backend para gerenciamento de filmes.

---

## 📂 **Estrutura de Arquivos**

Certifique-se de organizar os arquivos da seguinte forma:

```
plaintext
Copiar código
JMeter_Test/
│
├── apache-jmeter-5.6.3/            # Pasta do JMeter (extraída do .zip)
│   └── bin/
│
├── cinema.csv                      # Arquivo CSV com os dados dos filmes
└── TestPlan.jmx                    # Plano de teste do JMeter

```

### **Exemplo do `cinema.csv`**

```
csv
Copiar código
title,description,launchdate,showtimes
Movie Title 1,Description for movie 1.,2024-12-01T10:00:00Z,[10:00 AM]
Movie Title 2,Description for movie 2.,2024-12-02T14:00:00Z,[02:00 PM]
Movie Title 3,Description for movie 3.,2024-12-03T20:00:00Z,[08:00 PM]
...

```

---

## 🚀 **Passo a Passo para Configuração e Execução**

### **1. Configurar o JMeter**

1. **Download do JMeter**
    
    Baixe o Apache JMeter do site oficial: https://jmeter.apache.org/.
    
    Extraia o conteúdo do `.zip` em uma pasta de sua preferência.
    
2. **Iniciar o JMeter**
    
    Navegue até a pasta `apache-jmeter-5.6.3/bin` e execute o arquivo `jmeter.bat` no Windows (ou `jmeter` no Linux/Mac).
    

### **2. Criar o Plano de Teste**

1. **Adicionar um Thread Group**
    - Clique com o botão direito no *Test Plan* > Add > Threads (Users) > Thread Group.
    - Configure:
        - `Number of Threads (users)`: **30**
        - `Ramp-Up Period (seconds)`: **5**
        - `Loop Count`: **2**
2. **Adicionar uma Requisição HTTP**
    - Clique com o botão direito no *Thread Group* > Add > Sampler > HTTP Request.
    - Configure:
        - `Protocol`: **http**
        - `Server Name or IP`: **localhost**
        - `Port Number`: **3000**
        - `HTTP Method`: **POST**
        - `Path`: **/movies**
    - No campo *Body Data*, insira:
        
        ```json
        json
        Copiar código
        {
            "title": "${title}",
            "description": "${description}",
            "launchdate": "${launchdate}",
            "showtimes": [${showtimes}]
        }
        
        ```
        
3. **Adicionar o CSV Data Set Config**
    - Clique com o botão direito no *Thread Group* > Add > Config Element > CSV Data Set Config.
    - Configure:
        - `Filename`: Caminho completo do arquivo `cinema.csv`.
        - `Variable Names`: **title,description,launchdate,showtimes**
        - `Recycle on EOF`: **True**
        - `Stop thread on EOF`: **False**
4. **Adicionar o HTTP Header Manager**
    - Clique com o botão direito no *Thread Group* > Add > Config Element > HTTP Header Manager.
    - Adicione os seguintes cabeçalhos:
        - **Content-Type**: `application/json`
5. **Adicionar um Listener para os Resultados**
    - Clique com o botão direito no *Thread Group* > Add > Listener > View Results in Table.

---

## ▶️ **Executar o Teste**

1. Clique no botão de *Play* (▶️) no menu superior do JMeter.
2. Monitore os resultados no Listener **View Results in Table**.

---

## 📝 **Notas**

- **Análise de Resultados**: Use listeners como **Aggregate Report** ou **Summary Report** para obter estatísticas detalhadas de desempenho.
- **Ajustes Futuros**: Altere os valores de *Thread Group* (ex.: mais threads ou loops) para simular cenários mais complexos.

---

Se tiver dúvidas ou precisar de ajustes no plano de teste, entre em contato! 🚀

---

### 🖇️Anexos

[Leitura em lingua inglesa.pdf](https://prod-files-secure.s3.us-west-2.amazonaws.com/95dca7a3-3989-42d9-9dee-76cf7b8b5d8d/b3f3032a-5a55-48bb-a1fe-b4c24dfa7769/Leitura_em_lingua_inglesa.pdf)
