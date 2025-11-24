// cypress/e2e/login_flow.cy.ts
const INICIO_PATH = "/"; // Ou '/dashboard', ou o path para onde o usuário vai após o login
const LOGIN_PATH = "/login";

import {
  SCHEDULE_PAGE_PATH,
  HOME_PAGE_PATH,
  API_LOGIN_ROUTE,
  API_GET_USER_ROUTE,
  API_GET_SERVICES_ROUTE,
  API_GET_BARBERS_ROUTE,
  API_GET_CLIENT_ROUTE,
  API_GET_AVAILABILITY_ROUTE,
  API_CREATE_SERVICE_ROUTE,
} from "../support/paths";

describe("Fluxo de Login do Usuário", () => {
  beforeEach(() => {
    cy.visit(`${LOGIN_PATH}`);
    // Limpa quaisquer cookies/localStorage de sessões anteriores para garantir um estado limpo
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  // CENÁRIO 1: LOGIN REALIZADO COM SUCESSO
  it("deve permitir que um usuário existente faça login com credenciais válidas e redirecione", () => {
    const userEmail = "valid@test.com";
    const userPassword = "Password@123";

    cy.get("#email").type(userEmail);
    cy.get("#password").type(userPassword);

    cy.intercept("POST", API_LOGIN_ROUTE).as("loginApiRequest");
   
    cy.intercept("GET", "/user/me", {
      statusCode: 200,
    }).as("getMeApiRequest");

    cy.get("button[type=submit]").click();

    cy.wait("@loginApiRequest").then((interception) => {
      if (!interception.response) {
        throw new Error("No response received for loginApiRequest");
      }

      expect(interception.response.statusCode).to.eq(201);

      const realAccessToken = interception.response.body.accessToken;

      expect(realAccessToken).to.be.a("string").and.not.be.empty;

      cy.location("pathname").should("eq", INICIO_PATH);

      cy.getCookie("token").should("exist");
      cy.getCookie("token").should("have.property", "value", realAccessToken);
    });

    
    cy.wait("@getMeApiRequest").its("response.statusCode").should("eq", 200);
  });

  // CENÁRIO 2: CREDENCIAIS INVÁLIDAS
  it("deve exibir uma mensagem de erro para credenciais inválidas", () => {
    const invalidEmail = "invalid@test.com";
    const invalidPassword = "wrongpassword";

    cy.intercept("POST", API_LOGIN_ROUTE, {
      statusCode: 401,
      body: { statusCode: 401, message: "Unauthorized", error: "Unauthorized" },
    }).as("loginApiRequest");

    cy.get("#email").type(invalidEmail);
    cy.get("#password").type(invalidPassword);
    cy.get(".submit-button-login").click();
   
    cy.wait("@loginApiRequest").its("response.statusCode").should("eq", 401);

    cy.get(".server-error-message").should("be.visible").and("contain", "E-mail ou senha inválidos."); 

    cy.location("pathname").should("eq", LOGIN_PATH);

    cy.getCookie("token").should("not.exist");
  });

  // CENÁRIO 3: CAMPOS OBRIGATÓRIOS VAZIOS (VALIDAÇÃO DO FRONTEND)
  it("deve exibir erros de validação para campos obrigatórios vazios", () => {
    let apiRequestMade = false;
    cy.intercept("POST", API_LOGIN_ROUTE, (req) => {
      apiRequestMade = true;

      req.continue();
    }).as("loginApiRequest");

    cy.get(".submit-button-login").click();

    cy.get("#email").next(".validation-error-message").should("contain", "O e-mail é obrigatório.");
    cy.get("#email").should("have.class", "input-error");

    cy.get("#password").next(".validation-error-message").should("contain", "A senha é obrigatória.");
    cy.get("#password").should("have.class", "input-error");

    cy.wait(50).then(() => {
      expect(apiRequestMade, "API request should not have been made").to.be.false;
    });
    cy.location("pathname").should("eq", LOGIN_PATH);
  });

  // CENÁRIO 5: Email pré-preenchido vindo do registro
  it("deve pré-preencher o campo de e-mail se vier da página de registro com e-mail", () => {
    const uniqueEmail = `registered-${Date.now()}@test.com`; // E-mail único para o registro
    const userName = `Registered User ${Date.now()}`;
    const userPhone = `429${Math.floor(10000000 + Math.random() * 90000000)}`;
    const userPassword = "Password@123";

    cy.intercept("POST", "**/auth/register", {
      statusCode: 201,
    }).as("registerApiRequest");

    cy.intercept("POST", "**/auth/login").as("loginApiRequest");
    cy.intercept("GET", "**/users/me").as("getMeApiRequest");

    cy.visit(`/register`);

    // 2. Preenche o formulário de registro
    cy.get("#name").type(userName);
    cy.get("#phone").type(userPhone);
    cy.get("#email").type(uniqueEmail);
    cy.get("#password").type(userPassword);
    cy.get("#confirmPassword").type(userPassword);

    // 3. Clica no botão de registro
    cy.get("button[type=submit]").click();

    // 4. Espera a requisição de registro e o redirecionamento para a página de login
    cy.wait("@registerApiRequest").its("response.statusCode").should("eq", 201);
    cy.location("pathname").should("eq", LOGIN_PATH); // Verifica se foi redirecionado para a página de login

    cy.get("#email").should("have.value", uniqueEmail);
    cy.get("#password").should("have.value", ""); // A senha deve estar vazia
  });
});
