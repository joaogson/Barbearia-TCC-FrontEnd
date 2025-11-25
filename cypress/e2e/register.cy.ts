const FRONTEND_BASE_URL = "http://localhost:3001";

const REGISTER_PATH = "/register";

describe("Fluxo de registro do usuário", () => {
  beforeEach(() => {
    cy.visit(`${FRONTEND_BASE_URL}${REGISTER_PATH}`);
  });
  //CENARIO 1: CADASTRO REALIZADO COM SUCESSO
  it("deve permitir que um novo usuário se registre com credenciais válidas", () => {
    const uniqueEmail = `user${Date.now()}@test.com`;
    const userName = `Teste user ${Date.now()}`;
    const userPhone = `429${Math.floor(10000000 + Math.random() * 90000000)}`;

    cy.get("#name").type(userName);
    cy.get("#phone").type(userPhone);
    cy.get("#email").type(uniqueEmail);
    cy.get("#password").type("Senha@123");
    cy.get("#confirmPassword").type("Senha@123");

    cy.get("button[type=submit]").click();

    cy.url().should("include", "/login");

    cy.get("#email").should("have.value", uniqueEmail);
  });

  //CENARIO 2: EMAIL JA EXISTE
  it("deve exibir uma mensagem de erro ao tentar registrar com um e-mail já existente", () => {
    
    const existingEmail = `existing${Date.now()}@test.com`;
    const existingUserName = `Existing User ${Date.now()}`;
    const existingUserPhone = `119${Math.floor(10000000 + Math.random() * 90000000)}`;

    
    cy.get("#name").type(existingUserName);
    cy.get("#email").type(existingEmail);
    cy.get("#phone").type(existingUserPhone);
    cy.get("#password").type("Existente@123");
    cy.get("#confirmPassword").type("Existente@123");
    cy.get('button[type="submit"]').click();

   
    cy.url().should("include", "/login");

   
    cy.visit(`${FRONTEND_BASE_URL}${REGISTER_PATH}`); 
    cy.get("#name").type("Tentativa Duplicada");
    cy.get("#email").type(existingEmail); 
    cy.get("#phone").type(existingUserPhone);
    cy.get("#password").type("OutraSenha@123");
    cy.get("#confirmPassword").type("OutraSenha@123");
    cy.get('button[type="submit"]').click();

    
    cy.contains("E-mail ja cadastrado").should("be.visible"); 
    cy.url().should("include", REGISTER_PATH); 
  });

  //CENÁRIO 3: Tentativa de Registro com Senhas Incompatíveis
  it("deve exibir uma mensagem de erro se a senha e a confirmação de senha não coincidirem", () => {
    const uniqueEmail = `diffpass${Date.now()}@test.com`;
    const userName = `User Senha Diferente`;
    const userPhone = `119${Math.floor(10000000 + Math.random() * 90000000)}`;

    cy.get("#name").type(userName);
    cy.get("#email").type(uniqueEmail);
    cy.get("#phone").type(userPhone);
    cy.get("#password").type("Senha123");
    cy.get("#confirmPassword").type("SenhaErrada"); 

    cy.get('button[type="submit"]').click();

    cy.contains("As senhas não coincidem").should("be.visible"); 
    cy.url().should("include", REGISTER_PATH);
  });

  //CENÁRIO 4: Tentativa de Registro com Campos Vazios
  it("deve exibir erros de validação para campos obrigatórios vazios", () => {
    cy.get('button[type="submit"]').click();

    cy.contains("O nome é obrigatório").should("be.visible");
    cy.contains("O e-mail é obrigatório").should("be.visible");
    cy.contains("A senha é obrigatória").should("be.visible");
    cy.contains("O telefone é obrigatório").should("be.visible"); 

    cy.url().should("include", REGISTER_PATH);
  });
});
