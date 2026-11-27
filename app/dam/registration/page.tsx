import RegistrationForm from "@/components/dam/registrationForm";
import Button from "@/components/custom/button";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { DAM_REGISTRATION_OPEN } from "@/lib/dam";

export const metadata: Metadata = pageMetadata({
	title: "Street Battle Registration",
	description: "Register for the DAM Street Battle — a discovery of new talent in dance, art and music. Sign up solo or as a team.",
	path: "/dam/registration",
	noIndex: !DAM_REGISTRATION_OPEN,
});

export default function Page() {
  if (!DAM_REGISTRATION_OPEN) {
    return (
      <section className="min-h-screen bg-white px-4 py-32 md:px-8 font-mono">
        <div className="mx-auto max-w-4xl flex flex-col gap-6">
          <span className="text-sm font-bold uppercase text-red-700">[ Registration closed ]</span>
          <h1 className="text-4xl font-bold uppercase tracking-[-0.05em] text-black md:text-6xl">
            Thanks for an amazing show.
          </h1>
          <p className="text-base lg:text-lg font-medium text-gray-700 max-w-2xl">
            The DAM Talent Show took place on November 21, 2026, and registration is
            now closed. Registration will open again when the next DAM event is
            announced.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              title="See the gallery"
              href="/dam/gallery"
              className="bg-linear-to-r from-red-700 to-black text-lg text-white font-bold py-4 px-8 max-md:py-3 max-md:px-5 max-md:text-sm rounded-lg hover:from-black hover:to-red-700 transition-all duration-300 ease-out"
            />
            <Button
              title="Back to DAM"
              href="/dam"
              className="border-2 border-black text-lg font-bold py-4 px-8 max-md:py-3 max-md:px-5 max-md:text-sm rounded-lg hover:bg-black hover:text-white transition-all duration-300 ease-out"
            />
          </div>
        </div>
      </section>
    );
  }

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
