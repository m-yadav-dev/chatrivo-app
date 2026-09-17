import SignIn from "@/components/layout/SignIn";
import { Sparkles } from "lucide-react";

const SignUpPage = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[radial-gradient(circle_at_top,#f1f5f9_0%,#e2e8f0_45%,#cbd5e1_100%)] px-3 py-6 sm:px-4 sm:py-8 md:px-6">
      <div className="w-full max-w-xs rounded-2xl border border-zinc-200/70 bg-white p-4 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.45)] sm:max-w-sm sm:p-6 md:max-w-md md:p-8">
        <div className="mb-4 flex items-start gap-2 sm:mb-6 sm:gap-3">
          <div className="flex size-9 flex-shrink-0 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 text-zinc-700 shadow-sm sm:size-11">
            <Sparkles className="size-4 sm:size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
              Sign Up
            </h1>
            <p className="mt-0.5 text-xs font-medium text-zinc-600 sm:mt-1 sm:text-sm">
              Create your account
            </p>
          </div>
        </div>
        <SignIn />
      </div>
    </div>
  );
};

export default SignUpPage;
