"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Radio, Shield, ArrowRight, ArrowLeft } from "lucide-react";
import { login } from "@/actions/auth";

type PortalView = "selection" | "user" | "admin";

export default function LoginPage() {
  const [view, setView] = useState<PortalView>("selection");
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-[#FAF9F6]">
      {/* Formas difuminadas en el fondo */}
      <div className="absolute top-0 left-[-10%] w-96 h-96 bg-[#4A7856]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" />
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-orange-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-[-20%] left-[20%] w-[40rem] h-[40rem] bg-emerald-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-60" />

      <div className="w-full max-w-lg relative z-10 bg-white/60 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/60">
        <div className="p-8 sm:p-12">
          {view === "selection" && (
            <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-16 h-16 bg-[#4A7856]/10 text-[#4A7856] rounded-full flex items-center justify-center mx-auto mb-6">
                <Radio className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-slate-800">¡Hola!</h1>
                <p className="text-slate-600 text-lg">Qué gusto tenerte por aquí. Por favor, selecciona cómo deseas acceder.</p>
              </div>

              <div className="space-y-4 pt-4">
                <button
                  type="button"
                  onClick={() => setView("user")}
                  className="w-full group relative flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white hover:border-[#4A7856] hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-[#4A7856]/10 p-3 rounded-lg text-[#4A7856]">
                      <Radio className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-slate-800">Soy Oyente</div>
                      <div className="text-sm text-slate-500">Acceder a la comunidad</div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#4A7856] transition-colors" />
                </button>

                <button
                  type="button"
                  onClick={() => setView("admin")}
                  className="w-full group relative flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-800 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-100 p-3 rounded-lg text-slate-700">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-slate-800">Soy Administrador</div>
                      <div className="text-sm text-slate-500">Acceder al panel de control</div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-800 transition-colors" />
                </button>
              </div>
            </div>
          )}

          {view === "user" && (
            <div className="text-center space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="text-left">
                <button 
                  type="button"
                  onClick={() => setView("selection")}
                  className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Volver
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="w-20 h-20 bg-[#4A7856]/10 text-[#4A7856] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Radio className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-semibold text-slate-800">Bienvenido(a) a Frecuencia Consciente</h2>
                <p className="text-slate-600 leading-relaxed">
                  Sumérgete en un espacio diseñado para tu bienestar y crecimiento personal. Disfruta de nuestros programas, eventos y contenido exclusivo hoy.
                </p>
              </div>

              <div className="pt-4">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center w-full bg-[#4A7856] text-white font-medium py-3 px-6 rounded-xl hover:bg-[#3d6647] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  Ir a la Radio
                </Link>
              </div>
            </div>
          )}

          {view === "admin" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-500">
              <button 
                type="button"
                onClick={() => setView("selection")}
                className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Volver
              </button>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3 shadow-lg">
                  <Shield className="w-8 h-8 -rotate-3" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-800">Portal del Administrador</h2>
                <p className="text-slate-500 text-sm">Gestiona eventos, coaches y el contenido de la plataforma de forma segura.</p>
              </div>

              <form action={formAction} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700" htmlFor="username">Usuario</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                    placeholder="Ingresa tu usuario"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700" htmlFor="password">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>

                {state?.error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm font-medium text-center">
                    {state.error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-slate-900 text-white font-medium py-3 px-6 rounded-xl hover:bg-slate-800 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 mt-4 flex items-center justify-center cursor-pointer"
                >
                  {isPending ? "Iniciando sesión..." : "Entrar al Panel"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
