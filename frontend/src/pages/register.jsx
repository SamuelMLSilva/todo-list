import React, { useState } from "react";
import { Eye, EyeOff, SquareArrowLeft, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/useAuth.js";

function Register() {
  const { userRegister } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({});

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [messageError, setMessageError] = useState({
    ativo: false,
    message: "",
  });

  const onSubmit = async (data) => {
    if (data.password != data.confirm_password) {
      return setMessageError({
        ativo: true,
        message: "As senhas estão divergentes.",
      });
    }
    setMessageError({ ativo: false, message: "" });
    try {
      await userRegister(data);

      reset();
      setShowSuccessModal(true);
    } catch (err) {
      // mostra erro na tela
      console.error(err);
      setMessageError({ ativo: true, message: err.message });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 p-4">
      <div className="relative w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900/70 p-8 shadow-xl backdrop-blur-md">
        {/* Botão Voltar */}
        <button
          type="button"
          className="absolute left-6 top-6 cursor-pointer text-white transition hover:opacity-80"
          onClick={() => navigate("/")}
          aria-label="Voltar para a página inicial"
        >
          <SquareArrowLeft className="h-7 w-7" />
        </button>

        {/* Cabeçalho */}
        <div className="mb-6 mt-4 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Crie sua conta
          </h1>
          <p className="mt-1 text-sm text-neutral-400">
            Preencha os campos para se cadastrar
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Campo Nome */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name-register"
              className="text-sm font-medium text-neutral-200"
            >
              Nome completo
            </label>
            <input
              type="text"
              id="name-register"
              name="name_register"
              required
              placeholder="Seu nome completo"
              className="h-12 w-full rounded-lg border border-neutral-700 bg-neutral-800/60 px-4 text-base text-white placeholder-neutral-500 shadow-sm backdrop-blur-sm transition duration-200 focus:border-indigo-500 focus:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              {...register("nome")}
            />
          </div>

          {/* Campo Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email-register"
              className="text-sm font-medium text-neutral-200"
            >
              Email
            </label>
            <input
              type="email"
              id="email-register"
              name="email_register"
              placeholder="exemplo@email.com"
              className="h-12 w-full rounded-lg border border-neutral-700 bg-neutral-800/60 px-4 text-base text-white placeholder-neutral-500 shadow-sm backdrop-blur-sm transition duration-200 focus:border-indigo-500 focus:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              {...register("email")}
            />
          </div>

          {/* Campo Senha */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password-register"
              className="text-sm font-medium text-neutral-200"
            >
              Senha
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password-register"
                name="password_register"
                placeholder="Mínimo 8 caracteres"
                className="h-12 w-full rounded-lg border border-neutral-700 bg-neutral-800/60 pl-4 pr-12 text-base text-white placeholder-neutral-500 shadow-sm backdrop-blur-sm transition duration-200 focus:border-indigo-500 focus:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 cursor-pointer p-1.5 text-neutral-400 transition hover:text-neutral-200 focus:outline-none"
                aria-label={showPassword ? "Ocultar senha" : "Ver senha"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 pointer-events-none" />
                ) : (
                  <Eye className="h-5 w-5 pointer-events-none" />
                )}
              </button>
            </div>
          </div>

          {/* Campo Confirmar Senha */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirm-password-register"
              className="text-sm font-medium text-neutral-200"
            >
              Confirmar senha
            </label>
            <div className="relative flex items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password-register"
                name="confirm_password_register"
                placeholder="Repita sua senha"
                className="h-12 w-full rounded-lg border border-neutral-700 bg-neutral-800/60 pl-4 pr-12 text-base text-white placeholder-neutral-500 shadow-sm backdrop-blur-sm transition duration-200 focus:border-indigo-500 focus:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                {...register("confirm_password")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 cursor-pointer p-1.5 text-neutral-400 transition hover:text-neutral-200 focus:outline-none"
                aria-label={
                  showConfirmPassword
                    ? "Ocultar confirmação de senha"
                    : "Ver confirmação de senha"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 pointer-events-none" />
                ) : (
                  <Eye className="h-5 w-5 pointer-events-none" />
                )}
              </button>
            </div>
          </div>
          {messageError.ativo && (
            <p className="text-red-600 font-semibold">{messageError.message}</p>
          )}
          {/* Botão Cadastrar */}
          <button
            type="submit"
            className="mt-3 h-12 w-full rounded-lg bg-indigo-600 text-base font-semibold text-white shadow-md shadow-indigo-600/20 transition-all duration-200 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 active:scale-[0.98] cursor-pointer"
          >
            Criar conta
          </button>

          {/* Link para Login */}
          <p className="mt-2 text-center text-sm text-neutral-400">
            Já tem uma conta?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-medium text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer"
            >
              Faça login
            </button>
          </p>
        </form>
      </div>
      <div>
        {/* SEU FORMULÁRIO EXISTENTE AQUI */}

        {/* POPUP DE SUCESSO */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-zinc-900 border border-zinc-800 text-white rounded-2xl p-6 max-w-sm w-full shadow-2xl flex flex-col items-center text-center">
              <div className="bg-emerald-500/10 p-3 rounded-full mb-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>

              <h3 className="text-xl font-bold mb-2">
                Conta criada com sucesso!
              </h3>
              <p className="text-zinc-400 text-sm mb-6">
                Seu cadastro foi concluído. Agora você já pode acessar a
                plataforma.
              </p>

              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate("/login"); // redireciona após fechar
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 px-4 rounded-xl transition duration-200 cursor-pointer"
              >
                Ir para o Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
