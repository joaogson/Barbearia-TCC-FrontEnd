import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  // Lista publicas
  const publicRoutes = ['/login', '/register', '/'];

  //Verifica se o caminho da requisição é uma publicRoute
  const isPublicRoute = publicRoutes.includes(pathname);

  // Se o usuário tenta acessar uma rota protegida sem token, redireciona para o login
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};