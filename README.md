# Projeto: Mural Condômino!


## Instrução para que tudo funcione:

### Frontend:
1) Crie o arquivo `.env`
    - Crie o `VITE_API_URL`
2) Faça o import do `import.meta.env.VITE_API_URL` na `baseURL` no arquivo `minhaSA.js`, que está dentro da pasta `service`
3) Rode no terminal `npm i` e depois `npm run dev`

### Backend:
1) Crie o arquivo `.env`
    - Crie:
        - DB_HOST
        - DB_PORT
        - DB_USER
        - DB_NAME
        - DB_PASSWORD
2) Faça o import no arquivo `db.js` e crie:
    export const pool = new Pool({
        host: 
        port: 
        user:
        database: 
        password:
    })
3) Crei o banco de dados conforme o arquivo: `A_minhaSA.sql` que está na raiz da pasta

---
---
## Histórico dos commites para consulta!
### Commits:
1. Testes de Sistemas - SA: Criação das pastas básicas para organização do que será construido e testado no Front e Back, além da pasta de docuementação com a documentação dos testes realizados.

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/bbe3dd0767d7f0015522c5e6db51dedad3ea265e

---
2. Testes de Sistemas - SA_Backend: Instalação e configuração as bibliotecas: express, jest, dotenv e pg. Além de configurar os arquivos: db.js e server.js.

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/6b1b8be96e79fac6bb1744ba62baef86b7f6f1ca

---
3. Testes de Sistemas - SA_Backend: Criação das pastas no modelo de arquitetura em camadas: Services, Controllers e Repository. Além do Banco de Dados no Prisma.
    
    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/5d61e277b49848cb3c866840575e9a7eae84db02

---
4. Testes de Sistemas - SA_Backend: Criação dos arquivos moradores, recados e auth no modelo de arquitetura em camadas.
    
    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/aa34ad743389bc37061ce41b09354ec383e2bded
---

5. Testes de Sistemas - SA_Backend: Criação dos arquivos de tests para testar o arquivo de auth.
    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/68c2f52006b199402b01191d2a3f5e11def5ea69
---

6. Testes de Sistemas - SA_Backend: Criação dos arquivos de tests para testar o arquivo de moradores

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/ec10f0df3245674dea1b02f8d200ea9c9faf5c49
---

7. Testes de Sistemas - SA_Backend: Criação dos arquivos de tests para testar o arquivo de recados.

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/a7a41a624d8dcc900d14f939ee634a01dc243960
---

8. Testes de Sistemas - SA_Backend: Criação dos arquivos de tests para testar os arquivos de auth, moradores e recados quanto a camada de Repository. Nos commites anteriores os arquivos de testes focaram apenas nas camadas de Controller e Services para cada arquivo criado.

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/a7ffeb12c1b3f83598d85ca9618310d7133176e5
---

9. Testes de Sistemas - SA_Frontend: Instalação e configuração as bibliotecas: axios, eslint, tailwind e playwright.

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/6c72fb8c96d4b7524215ed0f76199ff56c131b07
---

10. Testes de Sistemas - SA_Frontend: Criado as subpastas para criar a tela de login com os formulários de Cadastro e Login, ambas utilizando o localstorage para fazer o gerenciamento.

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/d49efc6ef2d7ef2c49b025d4e08aaed28260b7c2
---

11. Testes de Sistemas - SA_Frontend: Instalado a biblioteca react-router-dom, apenas criado a página de dashboard e ajustado a página home além do css do formulário de cadastro e a parte de formulário.

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/49aa8d7eb40482e93f0d5e044e18b7edeeef2007
---

12. Testes de Sistemas - SA_Frontend: Criado as subpastas e arquivos da tela após o login e mantido o localstorage apenas para verificar se o usuario está ativo na sessão, agora a criação do usuário e a de recados, são salvas em db.json

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/4f04ddfb4931440ea36f6b66f9ed1f88806ecdb6
---

13. Testes de Sistemas - SA_Frontend: Adicionado os botões de editar e excluir na parte do usuário, criado o card de Recados para ser utilizado nos recados do mural e do meus recados e ajustato o mural para que apareça os recados em ordem de criação.

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/dddec93630568642a6c4974d923ed58944d92d10
---

14. Testes de Sistemas - SA_Frontend: Ajustados alguns pontos para o funcionamento completo do crud e ajustado bastanbte parte do tailwind.

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/a7edbcf13fd11573c6b65adc5ae46ef999f3bb21
---

15. Testes de Sistemas - SA_Frontend: Criado o teste para cadastrar, fazer o login e outro para poder editar as informações do usuario cadastrado.

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/7a8273053ec6fb92bc98b77bf84c580d74fa3b52
---

16. Testes de Sistemas - SA_Frontend: Incluido regras de negócio no formulário de cadastro e ajustado o teste do mesmo

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/756b7b3356b0c89e6eb20114131604ac96afcd18
---

17. Testes de Sistemas - SA_Frontend: Ajustados as regras de negócio de forma geral, criado novos arquivos de testes e instalado a bibliteca Toast para mostrar as notificações.
    
    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/21122e30ccb6ababf561ae81c98209843592bec8
---

18. Testes de Sistemas - SA_Frontend: Ajustados os arquivos de cadastroForm, loginForm e BttnUsuario para a inclusão do Toast. Recriado os testes(de login) para incluir as regras de negócio e separado os testes em testes positivos e testes negativos para validar as mensagens de erros, e criado o teste positivo de alteração de dados do usuario.

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/a6b8b53558108ed7c97a6e061681ef91b3b706aa
---

19. Testes de Sistemas - SA_Frontend: Ajustados os componentes de BttnMeusRecados, BttnMural e CardRecado, para que os botões de editar e exluir ficassem no CardRecado e segmentado para aparecer apenas nos recados do Meus Recados. Criado os testes positivos de criação, edição e exclusão dos recados.

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/36a9ad70fa7ca0741664f8a2bf0e7fd3bcaa7c49
---

20. Testes de Sistemas - SA_Frontend: Ajustado o toast de cancelar edição do recado, no componente BttnMeusRecados, consequentemente, ajustado o teste positivo e criado o teste negativo para o mesmo componente.

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/59be96b60100e6510954bfcac5c135a9f3362dbf
---

21. Teste de Sistemas - SA_Back/Front: Criado o arquivo .env e ajustado o arquivo db.js, ajustado também o server, controllers e routes para que a integração com om Front funcione, além de ajustar a referência de nomes internas do código, isso no Back. No Front foi criado o arquivo .env também, ajustado o arquivo minhaSa para fazer a integração além de ajustes nos componente BttnMeusRecados, cadastrosForm e loginform para também fazer a integração com o banco de dados.

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/91421ffa4eeb288640c2ee5e55d0ee24aff8f4f8
---

22. Teste de Sistemas - SA_Back/Front: Ajustado o Sql para seja possivel cadastrar mais de um usuário por apartamento e ajustados os componentes do usuario e mural para que fosse possível editar as informações e para aparecer os recados.

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/6bc5a616058bb9f56e2ccf460128be631ead8ba6
---

23. Teste de Sistemas - SA_Back/Front: Refeito todo o layout do frontend para deixar melhor apresentavel e por conta disso, foi alterado a questão de senha nos arquivos Repositories e Services no Backend.

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/e54d78ed7bb27017c1dab4a7e68bc99627eb200b
---

24. Teste de Sistemas - SA_Frontend: Ajustes para que os recados fiquem amostra para todos no Mural e alterado a cor do texto quando vai editar o recado.

    ↪ http://github.com/FrederaFilipina/SENAIcursoTcDS/commit/2b6de83f67cea02718a31ea0662e4a13a2019969
---

25. Teste de Sistemas - SA_Frontend: Ajustes desnecessários!

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/12a8b1f644b588e9486372b84a3a8a914cd13f62
---

25. Teste de Sistemas - SA_Backend: Refeito PostegreSQL para incluir um ENUM referente aos tipos de recados. Realizado também uma revisão em todo o fluxo de autenticação, então os arquivos Repository, Service, Controller e Route foram modificados.

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/0a24ff426b044daa2ea9578f8ec52d038a30df32
---

26. Teste de Sistemas - SA_Backend: Realizado uma revisão em todo o fluxo sobre moradores, então os arquivos Repository, Service e Controller foram modificados.

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/91803f5f31fd412e6a79febe08b69143bf87a228
---

27. Teste de Sistemas - SA_Backend: Realizado uma revisão em todo o fluxo sobre moradores, então os arquivos Repository, Service, Controller e Route foram modificados.

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/b7ba5ea1cc5c5542ae0a26e6a508c33f87d15985
---

28. Teste de Sistemas - SA_Backend: Por conta de ter modificado os arquivos de Repository, Service, Controller e Route, os testes foram deletados para serem recriados e os primeiros testes feitos foram os positivos e negativos referente a autenticação.

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/0bb298e388259462139b179d738ba29604353331
---

29. Teste de Sistemas - SA_Backend: Agora os testes criados foram os positivos e negativos referente aos moradores.

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/208b0868382930db1cdec21c59d2f3a0945ede36
---

30. Teste de Sistemas - SA_Back/Front: Ajustes desnecessários!

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/2d831e3a8b7a58652d941b989e94ea028150d205
---

31. Teste de Sistemas - SA_Backend: Agora os testes criados foram os positivos e negativos referente aos recados.

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/986a2ef449960fccdb1f8f6ad9d3d177a7498195
---

32. Teste de Sistemas - SA_Frontend: Modificado o componente BttnUsuario para atender as alterações feitas no Backend. E por contada da restruturação do Backend, os testes serão refeitos.

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/cd88cd8ff44f4761228607883458d248026c1e5c
---

33. Teste de Sistemas - SA_Frontend: Recriado os testes positivos e negativos do frontend.

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/cdcdb4c7b777bebb408296c088b73f8d97230737
---

34. Teste de Sistemas - SA_Documents: Feito ajuste no arquivo 1.1authRepository_P.test.js e 1.2moradorRepository_N.js além de ter rodado os testes novamente. E preenchido a documentação dos testes tanto do front, quanto do back.

    ↪ https://github.com/FrederaFilipina/SENAIcursoTcDS/commit/65edecec5c92f3b00633794b7ad72161ad50fba9
---

35. Teste de Sistemas - SA: Removido as partes desnecessárias do SQL. Renomeado o arquivo Notas para README e nesse arquivo encontra-se todo o histórico dos commites feitos até agora, juntamente com algumas intruções para que tanto o projeto como um todo funcione, quando os testes.