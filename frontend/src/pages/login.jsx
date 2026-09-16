import React from "react";
import { useState } from "react";
import { Eye, EyeOff, SquareArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/useAuth.js";

function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [messageError, setMessageError] = useState({
    ativo: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({});

  const onSubmit = async (data) => {
    if (!data.email || !data.password) {
      return alert("Preencha todos os campos.");
    }
    setMessageError({ ativo: false, message: "" });
    try {
      await login(data);

      navigate("/dashboard");
    } catch (err) {
      // mostra erro na tela
      console.error(err);
      setMessageError({ ativo: true, message: err.message });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 p-4">
      <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900/70 p-8 shadow-xl backdrop-blur-md">
        <button
          type="button"
          className="absolute left-8 top-10 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <SquareArrowLeft className="h-7 w-7" color="#ffffff" />
        </button>
        {/* Cabeçalho */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Acesse sua conta
          </h1>
          <p className="mt-1 text-sm text-neutral-400">
            Digite seus dados para continuar
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Campo Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email-login"
              className="text-sm font-medium text-neutral-200"
            >
              Email
            </label>
            <input
              type="email"
              id="email-login"
              name="email_login"
              placeholder="exemplo@email.com"
              className="h-12 w-full rounded-lg border border-neutral-700 bg-neutral-800/60 px-4 text-base text-white placeholder-neutral-500 shadow-sm backdrop-blur-sm transition duration-200 focus:border-indigo-500 focus:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              {...register("email")}
            />
          </div>

          {/* Campo Senha com botão de alternância */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password-login"
                className="text-sm font-medium text-neutral-200"
              >
                Senha
              </label>
              <a
                href="#"
                className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline transition duration-150"
              >
                Esqueceu a senha?
              </a>
            </div>

            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password-login"
                name="password_login"
                placeholder="••••••••"
                className="h-12 w-full rounded-lg border border-neutral-700 bg-neutral-800/60 pl-4 pr-12 text-base text-white placeholder-neutral-500 shadow-sm backdrop-blur-sm transition duration-200 focus:border-indigo-500 focus:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                {...register("password")}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 p-1.5 text-neutral-400 transition hover:text-neutral-200 focus:outline-none cursor-pointer"
                aria-label={showPassword ? "Ocultar senha" : "Ver senha"}
              >
                {showPassword ? (
                  /* Ícone Olho Fechado / Riscado */
                  <EyeOff className="h-5 w-5" />
                ) : (
                  /* Ícone Olho Aberto */
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          {messageError.ativo && (
            <p className="text-red-600 font-semibold">{messageError.message}</p>
          )}

          {/* Botão Entrar */}
          <button
            type="submit"
            className="mt-2 h-12 w-full rounded-lg bg-indigo-600 text-base font-semibold text-white shadow-md shadow-indigo-600/20 transition-all duration-200 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 active:scale-[0.98]"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
