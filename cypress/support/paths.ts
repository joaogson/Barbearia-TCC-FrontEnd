// cypress/support/paths.ts
export const LOGIN_PATH = "/login"; // ✅ Rota de login para o CY.REQUEST (pode ser diferente do path do frontend)
export const REGISTER_PATH = "/register";
export const SCHEDULE_PAGE_PATH = "/AgendeSeuHorario"; // ✅ Path da página de agendamento do frontend
export const HOME_PAGE_PATH = "/";

// Rotas da API (backend) - Opcional, mas útil para cy.request e cy.intercept
export const API_LOGIN_ROUTE = "/auth/login"; // Rota de API para o login (cy.request)
export const API_GET_USER_ROUTE = "/users/me";
export const API_GET_SERVICES_ROUTE = "/services";
export const API_GET_BARBERS_ROUTE = "/barbers";
export const API_GET_CLIENT_ROUTE = "/client"; // Pode precisar de wildcard: "/client*"
export const API_GET_AVAILABILITY_ROUTE = "/availability"; // Pode precisar de wildcard: "/availability*"
export const API_CREATE_SERVICE_ROUTE = "/customer-service"; // ✅ Rota POST para criar agendamento
