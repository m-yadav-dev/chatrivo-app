import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, UserRoundPlus } from "lucide-react";

const SignIn = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { signUp, isUserSignUp } = useAuthStore();

  const onSubmitFormData = async (event) => {
    event.preventDefault();

    const isValid = formData.fullName && formData.email && formData.password;

    if (!isValid) {
      toast.error("Please fill in all fields.");
      return;
    }
    const isSignUpSuccessful = await signUp(formData);

    if (isSignUpSuccessful) {
      navigate("/");
    }
  };
  return (
    <form onSubmit={onSubmitFormData} className="w-full space-y-3 sm:space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName" className="flex items-center gap-2 text-zinc-700">
          <UserRoundPlus className="size-4 text-zinc-500" />
          Full Name
        </Label>
        <div className="relative">
          <UserRoundPlus className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
          <Input
            placeholder="Enter your full name..."
            className="h-11 border-zinc-200 bg-zinc-50/40 pl-10"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, fullName: event.target.value }))
            }
            id="fullName"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center gap-2 text-zinc-700">
          Email
        </Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
          <Input
            placeholder="Enter your email..."
            className="h-11 border-zinc-200 bg-zinc-50/40 pl-10"
            type="email"
            name="email"
            value={formData.email}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, email: event.target.value }))
            }
            id="email"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="flex items-center gap-2 text-zinc-700">
          Password
        </Label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
          <Input
            placeholder="Enter your password..."
            className="h-11 border-zinc-200 bg-zinc-50/40 pl-10"
            type="password"
            value={formData.password}
            name="password"
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, password: event.target.value }))
            }
            id="password"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="h-10 w-full cursor-pointer text-sm sm:h-11"
        disabled={isUserSignUp}
      >
        <UserRoundPlus className="mr-2 size-4" />
        {isUserSignUp ? "Creating..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignIn;
