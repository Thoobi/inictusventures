import RegistrationForm from "@/components/dam/registrationForm";

export default function Page() {
  return (
    <section className="min-h-screen bg-white px-4 py-32 md:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold lg:max-w-2xl text-start font-mono text-black md:text-5xl">
            DAM STREET BATTLE REGISTRATION FORM
          </h1>
          <p className="mt-2 text-sm lg:text-base lg:font-medium text-gray-700 md:text-base">
            Discovery of new talents in DANCE, ART, and MUSIC
          </p>
        </div>
        <RegistrationForm />
      </div>
    </section>
  );
}
