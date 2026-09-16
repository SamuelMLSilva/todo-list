import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import {
  CheckCircle2,
  LogOut,
  ShieldCheck,
  KeyRound,
  Clock,
} from "lucide-react";
import { useAuth } from "../contexts/useAuth.js";

function Dashboard() {
  const { user, logout } = useAuth();
  // Dados fictícios para demonstração no portfólio

  const usuario = {
    name: user?.nome || "Nome não encontrado",
    email: user?.email || "Email não econtrado",
    role: "Administrador",
    lastLogin: new Date().toLocaleString("pt-BR"),
  };
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    } finally {
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 sm:p-8 text-center shadow-xl backdrop-blur-md">
        {/* Badge / Ícone de Sucesso */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-inner">
          <CheckCircle2 className="h-6 w-6" />
        </div>

        {/* Título & Status */}
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Acesso Autorizado!
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Autenticação realizada com sucesso. Você está logado no painel
          administrativo.
        </p>

        {/* Card com Informações da Sessão */}
        <div className="mt-6 rounded-xl border border-neutral-800 bg-neutral-950/60 p-4 text-left">
          <div className="flex items-center gap-3 border-b border-neutral-800 pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400">
              <a href="">{usuario.name.substring(0, 1)}</a>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{usuario.name}</p>
              <p className="text-xs text-neutral-400">{usuario.email}</p>
            </div>
            <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-medium text-indigo-400">
              <ShieldCheck className="h-3 w-3" />
              {usuario.role}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-neutral-400">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-neutral-500" />
              <span>Sessão: {usuario.lastLogin}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <KeyRound className="h-3.5 w-3.5 text-neutral-500" />
              <span>Token: JWT Ativo</span>
            </div>
          </div>
        </div>

        {/* Ações pós-login */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            to="/profile"
            className="flex h-11 flex-1 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800/60 text-sm font-medium text-neutral-200 transition-all duration-200 hover:border-neutral-600 hover:bg-neutral-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-neutral-600/40 active:scale-[0.98]"
          >
            Editar Perfil
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 text-sm font-medium text-red-400 transition-all duration-200 hover:bg-red-500/20 hover:border-red-500/30 focus:outline-none focus:ring-2 focus:ring-red-500/40 active:scale-[0.98]"
          >
            <LogOut className="h-4 w-4" />
            Encerrar Sessão
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
