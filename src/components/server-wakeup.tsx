"use client";
import { useEffect, useState } from "react";

type Status = "idle" | "waking" | "ready";

export default function ServerWakeUp() {
  const [status, setStatus] = useState<Status>("idle");
  const [wakingKey, setWakingKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const ping = async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/health`);
        if (!cancelled) {
          setStatus("ready");
          setTimeout(() => {
            if (!cancelled) setStatus("idle");
          }, 3000);
        }
      } catch {
        if (!cancelled) {
          setStatus("waking");
          setWakingKey((k) => k + 1);
          setTimeout(ping, 5000);
        }
      }
    };

    const slowTimer = setTimeout(() => {
      if (!cancelled) setStatus("waking");
    }, 2000);

    ping().then(() => clearTimeout(slowTimer));

    return () => {
      cancelled = true;
      clearTimeout(slowTimer);
    };
  }, []);

  if (status === "idle") return null;

  if (status === "ready")
    return (
      <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-5 py-4 mb-4 animate-fade-in">
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 7l4 4 6-6"
              stroke="#27500A"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-green-900">Servidor activo</p>
          <p className="text-xs text-green-700 mt-0.5">
            Conexión establecida. Cargando contenido...
          </p>
        </div>
      </div>
    );

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-5 mb-4 animate-fade-in">
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-full border-2 border-blue-200 border-t-blue-600 animate-spin shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <p className="text-sm font-medium text-blue-900">
              Iniciando servidor demo
            </p>
            <span className="text-xs bg-blue-100 text-blue-900 rounded px-2 py-0.5">
              Render free tier
            </span>
          </div>
          <p className="text-xs text-blue-700 mt-1.5 leading-relaxed">
            El servidor estuvo inactivo por inactividad. Render lo está
            levantando — esto puede tardar hasta 60 segundos. El contenido
            cargará automáticamente.
          </p>
          <div className="h-0.5 bg-blue-100 rounded-full mt-3 overflow-hidden">
            <div key={wakingKey} className="h-full bg-blue-500 rounded-full animate-progress" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-blue-200">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        <p className="text-xs text-blue-600">
          Verificando conexión con el backend para la DEMO...
        </p>
      </div>
    </div>
  );
}