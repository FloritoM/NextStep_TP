"use client";

import { useState } from "react";
import { UserRole } from "@/types/auth";
import { registerWithEmail, isAdult } from "@/lib/auth";
import { EyeIcon, EyeOffIcon } from '@/app/ui/passwordIcons'

interface RegisterFormProps {
  role: UserRole;
  onSuccess: () => void;
  onBack: () => void;
}

interface FormState {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  birth_date: string;
}

interface FormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  birth_date?: string;
  general?: string;
}

const roleLabels: Record<UserRole, string> = {
  applicant: "Candidato",
  recruiter: "Reclutador",
};

export default function RegisterForm({ role, onSuccess, onBack }: RegisterFormProps) {
  const [form, setForm] = useState<FormState>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    birth_date: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!form.first_name.trim()) {
      newErrors.first_name = "El nombre es requerido";
    } else if (form.first_name.trim().length < 2) {
      newErrors.first_name = "El nombre debe tener al menos 2 caracteres";
    } else if (form.first_name.trim().length > 50) {
      newErrors.first_name = "El nombre es demasiado largo";
    }

    if (!form.last_name.trim()) {
      newErrors.last_name = "El apellido es requerido";
    } else if (form.last_name.trim().length < 2) {
      newErrors.last_name = "El apellido debe tener al menos 2 caracteres";
    } else if (form.last_name.trim().length > 50) {
      newErrors.last_name = "El apellido es demasiado largo";
    }

    if (!form.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "El email no es válido";
    }else if (form.email.length > 50) {        // ← acá
      newErrors.email = "El email es demasiado largo";
    }

    if (!form.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (form.password.length < 8) {
      newErrors.password = "Mínimo 8 caracteres";
    }

    if (!form.birth_date) {
      newErrors.birth_date = "La fecha de nacimiento es requerida";
    } else if (!isAdult(form.birth_date)) {
      newErrors.birth_date = "Debés ser mayor de 18 años para registrarte";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrors({});

    try {
      await registerWithEmail({
        role,
        firstName: form.first_name.trim(),
        lastName: form.last_name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        birthDate: form.birth_date,
      });
      onSuccess();
    } catch (err) {
      setErrors({
        general: err instanceof Error ? err.message : "Ocurrió un error. Intentá de nuevo.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f1f30] border border-[#1e2d3d] text-[#3b9ede] text-xs font-medium mb-4">
          {roleLabels[role]}
        </div>
        <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">
          Creá tu cuenta
        </h1>
        <p className="text-[#8899aa] text-sm">
          Completá tus datos para comenzar
        </p>
      </div>

      {errors.general && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Nombre"
            name="first_name"
            type="text"
            value={form.first_name}
            onChange={handleChange}
            error={errors.first_name}
            placeholder="Juan"
            autoComplete="given-name"
          />
          <Field
            label="Apellido"
            name="last_name"
            type="text"
            value={form.last_name}
            onChange={handleChange}
            error={errors.last_name}
            placeholder="Pérez"
            autoComplete="family-name"
          />
        </div>

        <Field
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="juan@email.com"
          autoComplete="email"
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#b0c4d8]">
            Contraseña
          </label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder="Mínimo 8 caracteres"
              autoComplete="new-password"
              className={`w-full bg-[#0d1824] border rounded-xl px-4 py-3 pr-11 text-white placeholder-[#4a5a6a] text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#3b9ede]/40 focus:border-[#3b9ede]/60 ${
                errors.password
                  ? "border-red-500/60 bg-red-500/5"
                  : "border-[#1e2d3d] hover:border-[#2a3d52]"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a5a6a] hover:text-[#8899aa] transition-colors focus:outline-none"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-400 text-xs mt-0.5">{errors.password}</p>
          )}
        </div>

        <Field
          label="Fecha de nacimiento"
          name="birth_date"
          type="date"
          value={form.birth_date}
          onChange={handleChange}
          error={errors.birth_date}
          hint="Debés ser mayor de 18 años"
          autoComplete="bday"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 w-full rounded-xl bg-[#3b9ede] hover:bg-[#2d8fcf] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm py-3.5 transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Creando cuenta...
            </>
          ) : (
            "Crear cuenta"
          )}
        </button>
      </form>

      <button
        onClick={onBack}
        className="mt-4 w-full flex items-center justify-center gap-2 text-[#6a7f94] hover:text-white text-sm transition-colors duration-200 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b9ede] rounded-lg"
      >
        Volver
      </button>
    </div>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  hint?: string;
  autoComplete?: string;
}

function Field({ label, name, type, value, onChange, error, placeholder, hint, autoComplete }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-[#b0c4d8]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full bg-[#0d1824] border rounded-xl px-4 py-3 text-white placeholder-[#4a5a6a] text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#3b9ede]/40 focus:border-[#3b9ede]/60 ${
          error ? "border-red-500/60 bg-red-500/5" : "border-[#1e2d3d] hover:border-[#2a3d52]"
        }`}
      />
      {hint && !error && (
        <p className="text-[#4a5a6a] text-xs">{hint}</p>
      )}
      {error && (
        <p className="text-red-400 text-xs">{error}</p>
      )}
    </div>
  );
}
