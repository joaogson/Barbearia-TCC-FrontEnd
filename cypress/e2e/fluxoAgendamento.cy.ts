import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import {
  SCHEDULE_PAGE_PATH,
  HOME_PAGE_PATH,
  LOGIN_PATH,
  API_LOGIN_ROUTE,
  API_GET_USER_ROUTE,
  API_GET_SERVICES_ROUTE,
  API_GET_BARBERS_ROUTE,
  API_GET_CLIENT_ROUTE,
  API_GET_AVAILABILITY_ROUTE,
  API_CREATE_SERVICE_ROUTE,
} from "../support/paths";

const FRONTEND_URL = Cypress.config("baseUrl");
const apiBaseUrl = Cypress.env("API_BASE_URL");

describe("Fluxo de Agendamento de Serviços", () => {
  const user = {
    name: "Teste login",
    email: "valid@test.com",
    password: "Password@123",
    id: 26,
    role: "CLIENT",
  };

  const Service = { id: 1, description: "corte de cabelo" };
  const expectedBarber = { id: 2, name: "João Sonalio" };

  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  nextMonth.setDate(24);
  const bookingDate = dayjs(nextMonth).format("YYYY-MM-DD");

  const preferredTime = "15:00";

  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearLocalStorage();

    const userEmail = "valid@test.com";
    const userPassword = "Password@123";
    cy.visit(`${LOGIN_PATH}`);

    cy.get("#email").type(userEmail);
    cy.get("#password").type(userPassword);

    cy.get("button[type=submit]").click();

    cy.intercept("GET", "**/users/me").as("getUser");
    cy.intercept("GET", "**/service").as("getServices");
    cy.intercept("GET", "**/barber").as("getBarbers");
    cy.intercept("GET", "**/client").as("getClient");

    cy.get("#agendeHorario").click();
  });

  // CENÁRIO 1: AGENDAMENTO BEM-SUCEDIDO
  it("deve completar o fluxo de agendamento com sucesso usando dados do backend real", () => {
    cy.intercept("GET", "**/availability*").as("getAvailability");
    cy.intercept("POST", "**/costumer-service").as("createService");
    cy.wait("@getServices");
    cy.get("#list-services").contains("corte de cabelo").click();
    cy.get("#list-services").contains("Barba").click();
    cy.get("#buttonNavigation").contains("Avançar").click();
    cy.wait("@getBarbers");
    cy.get("#list-barber").contains("João Sonalio").click();
    cy.get("#buttonNavigation").contains("Avançar").click();
    cy.contains("h2", "Selecione a Data e o horario").should("be.visible");
    cy.get('[aria-label="Proximo Mes"]').click();
    cy.get('[class*="day"]').not('[class*="empty"]').contains(/^24$/).click();

    cy.wait("@getAvailability").then((interception) => {
      if (!interception.response) {
        throw new Error();
      }
      expect(interception.request.query.date).to.include(bookingDate);
    });

    cy.contains("button", preferredTime).click();
    cy.contains(`Horário confirmado: ${preferredTime}`).should("be.visible");
    cy.contains("button", "Avançar").click();

    cy.contains("h2", "Detalhes do Agendamento").should("be.visible");
    cy.get(".detalhes-container").should("contain", Service.description);
    cy.get(".detalhes-container").should("contain", preferredTime);
    cy.get(".detalhes-container").should("contain", "24/");

    const alertStub = cy.stub().as("alertStub");
    cy.on("window:alert", alertStub);

    cy.contains("button", "Confirmar").click();

    cy.wait("@createService", { timeout: 9000 }).then((interception) => {
      if (!interception.response) {
        throw new Error("A requisição de criação de serviço falhou em retornar uma resposta.");
      }
      const body = interception.request.body;
      expect(interception.response.statusCode).to.eq(201);
      expect(body.barberId).to.eq(expectedBarber.id);
      expect(body.servicesIds).to.be.an("array").and.not.be.empty;
      expect(body.clientId).to.eq(user.id);
      const expectedTimeISO = dayjs(bookingDate + "T" + preferredTime).toISOString();
      expect(body.ServiceTime).to.eq(expectedTimeISO);
    });

    cy.get("@alertStub").should("have.been.calledWith", "Agendamento criado com sucesso!");
    cy.url().should("eq", `${FRONTEND_URL}${HOME_PAGE_PATH}`);
    cy.get("@alertStub").should("have.been.calledWith", "Agendamento criado com sucesso!");
    cy.url().should("eq", `${FRONTEND_URL}${HOME_PAGE_PATH}`);
  });

  // CENÁRIO 2: FALHA - NÃO FOI SELECIONADO UM BARBEIRO
  it("C2: deve FALHAR a confirmação se o Barbeiro não for selecionado", () => {
    cy.get("#list-services").contains("corte de cabelo").click();
    cy.get("#list-services").contains("Barba").click();
    cy.get("#buttonNavigation").contains("Avançar").click();

    cy.contains("h2", "Selecione o profissional").should("be.visible");

    cy.get("#buttonNavigation").contains("Avançar").click();

    cy.get('[aria-label="Proximo Mes"]').click();
    cy.get('[class*="day"]').not('[class*="empty"]').contains(/^15$/).click();

    cy.contains("button", "Avançar").click();

    cy.contains("h2", "Detalhes do Agendamento").should("be.visible");

    const alertStub = cy.stub().as("alertErrorStub");
    cy.on("window:alert", alertStub);

    cy.contains("button", "Confirmar").click();

    cy.get("@alertErrorStub").should("be.called");

    cy.url().should("not.eq", `${FRONTEND_URL}${HOME_PAGE_PATH}`);
  });

  // CENÁRIO 3: FALHA - NÃO FOI SELECIONADO AO MENOS UM SERVIÇO
  it("C3: deve FALHAR a confirmação se o Serviço não for selecionado", () => {
    cy.contains("h2", "Selecione o serviço").should("be.visible");

    cy.get("#buttonNavigation").contains("Avançar").click();

    cy.get("#list-barber").contains(expectedBarber.name).click();
    cy.get("#buttonNavigation").contains("Avançar").click();

    cy.get('[aria-label="Proximo Mes"]').click();
    cy.get('[class*="day"]').not('[class*="empty"]').contains(/^15$/).click();

    cy.contains("button", "Avançar").click();

    cy.contains("h2", "Detalhes do Agendamento").should("be.visible");

    const alertStub = cy.stub().as("alertErrorStub");
    cy.on("window:alert", alertStub);

    cy.contains("button", "Confirmar").click();

    cy.get("@alertErrorStub").should("be.called");

    cy.url().should("not.eq", `${FRONTEND_URL}${HOME_PAGE_PATH}`);
  });

  // CENÁRIO 4: FALHA - NÃO FOI SELECIONADO UM HORÁRIO
  it("C4: deve FALHAR a confirmação se o Horário não for selecionado", () => {
    cy.get("#list-services").contains("corte de cabelo").click();
    cy.get("#buttonNavigation").contains("Avançar").click();
    cy.get("#list-barber").contains(expectedBarber.name).click();
    cy.get("#buttonNavigation").contains("Avançar").click();

    cy.intercept("GET", "**/availability*").as("getAvailability");

    cy.get('[aria-label="Proximo Mes"]').click();
    cy.get('[class*="day"]').not('[class*="empty"]').contains(/^21$/).click();
    cy.wait("@getAvailability");

    cy.contains("button", "Avançar").click();

    cy.contains("h2", "Detalhes do Agendamento").should("be.visible");

    const alertStub = cy.stub().as("alertErrorStub");
    cy.on("window:alert", alertStub);

    cy.contains("button", "Confirmar").click();

    cy.get("@alertErrorStub").should("be.called");

    cy.url().should("not.eq", `${FRONTEND_URL}${HOME_PAGE_PATH}`);
  });

  // CENÁRIO 5: AGENDAMENTO INDISPONIVEL
  it("deve completar o fluxo de agendamento com sucesso usando dados do backend real", () => {
    cy.intercept("GET", "**/availability*").as("getAvailability");
    cy.intercept("POST", "**/costumer-service").as("createService");
    cy.wait("@getServices");
    cy.get("#list-services").contains("corte de cabelo").click();
    cy.get("#list-services").contains("Barba").click();
    cy.get("#buttonNavigation").contains("Avançar").click();
    cy.wait("@getBarbers");
    cy.get("#list-barber").contains("João Sonalio").click();
    cy.get("#buttonNavigation").contains("Avançar").click();
    cy.contains("h2", "Selecione a Data e o horario").should("be.visible");
    cy.get('[aria-label="Proximo Mes"]').click();
    cy.get('[class*="day"]').not('[class*="empty"]').contains(/^24$/).click();

    cy.wait("@getAvailability").then((interception) => {
      if (!interception.response) {
        throw new Error();
      }
      expect(interception.request.query.date).to.include(bookingDate);
    });

    cy.contains("button", preferredTime).should("not.exist");
    cy.contains(`Horário confirmado: ${preferredTime}`).should("not.exist");
    cy.contains("button", "Avançar").click();

    cy.contains("h2", "Detalhes do Agendamento").should("be.visible");
    cy.get(".detalhes-container").should("contain", Service.description);
    cy.get(".detalhes-container").should("not.contain", preferredTime);
    cy.get(".detalhes-container").should("contain", "24/");

    const alertStub = cy.stub().as("alertErrorStub");
    cy.on("window:alert", alertStub);

    cy.contains("button", "Confirmar").click();

    cy.contains("button", "Confirmar").click();

    cy.get("@alertErrorStub").should("be.called");

    cy.url().should("not.eq", `${FRONTEND_URL}${HOME_PAGE_PATH}`);
  });
});
