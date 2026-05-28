import LoginInput from "@/components/layout/LoginInput";

const LogInPage = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#f5f7fb] px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_16px_34px_-26px_rgba(15,23,42,0.45)] md:grid-cols-[0.42fr_0.58fr]">
        <div className="relative overflow-hidden  sm:px-8 sm:py-10 md:px-9 md:py-12">
          <img
            src="https://res.cloudinary.com/dyjo8b263/image/upload/v1779689972/Wavy_Tech-26_Single-08_oo70tz.jpg"
            alt="Chatrivo"
            className="h-full w-full "
          />
        </div>

        <div className="bg-white px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12">
          <LoginInput />
        </div>
      </section>
    </div>
  );
};

export default LogInPage;
