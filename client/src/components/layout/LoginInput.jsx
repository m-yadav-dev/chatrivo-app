import { useAuthStore } from "@/store/useAuthStore";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useState } from "react";
import { Eye, EyeOff, LoaderCircle, LogIn, Lock, Mail, User, LoaderCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";

const LoginInput = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  // const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const { logIn, isUserLoggedIn, guestLogin, isGuestLoggingIn } =
    useAuthStore();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!formData.password.trim()) {
      nextErrors.password = "Password is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmitLogInData = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    await logIn(formData);
  };


  return (
    <>
      <form onSubmit={onSubmitLogInData} className="w-full space-y-5">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-[30px]">
            Welcome back
          </h1>
          <p className="text-sm text-slate-600">
            Sign in to continue to your workspace.
          </p>
        </header>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-slate-700"
            >
              Email address
            </Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="you@company.com"
                className="h-11 rounded-xl border-slate-300 bg-slate-50/50 pl-10 text-sm shadow-none transition focus-visible:border-indigo-300 focus-visible:ring-2 focus-visible:ring-indigo-100"
                type="email"
                onChange={(event) => {
                  setFormData((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }));
                  if (errors.email) {
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }
                }}
                name="email"
                value={formData.email}
                id="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-rose-600" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-slate-700"
            >
              Password
            </Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Enter your password"
                className="h-11 rounded-xl border-slate-300 bg-slate-50/50 pl-10 pr-10 text-sm shadow-none transition focus-visible:border-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-100"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={(event) => {
                  setFormData((prev) => ({
                    ...prev,
                    password: event.target.value,
                  }));
                  if (errors.password) {
                    setErrors((prev) => ({ ...prev, password: "" }));
                  }
                }}
                value={formData.password}
                id="password"
                autoComplete="current-password"
                aria-invalid={Boolean(errors.password)}
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-rose-600" role="alert">
                {errors.password}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 text-sm">
            <label className="inline-flex items-center gap-2 text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                className="size-4 rounded border-slate-300 accent-indigo-600"
              />
              Remember me
            </label>
            <button
              type="button"
              className="font-medium text-indigo-600 transition hover:text-indigo-700"
              // onClick={() => setIsResetDialogOpen(true)}
            >
              Forgot password?
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="h-11 w-full cursor-pointer rounded-xl bg-slate-900 text-sm font-medium text-white transition hover:bg-slate-800"
          disabled={isUserLoggedIn}
        >
          {isUserLoggedIn ? (
            <>
              <LoaderCircle className="mr-2 size-4 animate-spin" />
              Logging in...
            </>
          ) : (
            <>
              <LogIn className="mr-2 size-4" />
              Log in
            </>
          )}
        </Button>

        <hr className="border-slate-200 w-full max-w-[28rem] m-auto mb-4 h-px" />
        {/* Guest Login Button */}
        <Button
          type="button"
          className="h-11 w-full cursor-pointer rounded-xl bg-indigo-500 text-sm font-medium text-white transition hover:bg-indigo-700"
          onClick={guestLogin}
        >
          {isGuestLoggingIn ? (
            <>
              <LoaderCircleIcon className="mr-2 size-4 animate-spin" />
              Logging in as guest...
            </>
          ) : (
            <>
              <User className="mr-2 size-4" />
              Guest Login
            </>
          )}
        </Button>
        <p className="text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-indigo-600 transition hover:text-indigo-700"
          >
            Create account
          </Link>
        </p>
      </form>
    </>
  );
};

export default LoginInput;
