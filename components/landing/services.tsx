export default function Services() {
  const servicesData = [
    {
      id: 1,
      label: "Talent Management",
      content:
        "As an organization, we specialize in the systematic attraction, identification, development, engagement, retention, and deployment of talented individuals. We also advise the artist on which gigs to take and which decisions would help them achieve their long-term goals. They also provide training opportunities to help the artists develop skills that would help them perform better on stage.",
      image: "",
    },
    {
      id: 2,
      label: "Television and Film Production",
      content:
        "At Inistic Media, we create original content for all media platforms ranging from web series, short films, TV shows, soap operas, telenovelas, and docu-dramas to feature films. Our seasoned and versatile team is capable of delivering your project to meet the international standard.",
      image: "",
    },
    {
      id: 3,
      label: "Stage and Musical Production",
      content:
        "With over 12 years of theatre practice, we enjoy every process and stage required in converting a dramatic text into a theatrical performance.  We also provide support in a diverse range of art forms from acting, direction, production, lighting, stage props, costume designing, music, backstage support, etc.",
      image: "",
    },
    {
      id: 4,
      label: "Theatre Education and Consultancy",
      content:
        "With 13 years of consistent practice, our award-winning approach and curriculum ensure our students acquire invaluable life skills. Join us on a journey where creativity meets education, making a lasting impact on your child's developmental milestones. Helping your child to build their confidence and self-esteem.",
      image: "",
    },
  ];

  return (
    <div className="flex flex-col max-md:w-full items-center px-12 py-20 max-md:px-5 max-md:py-10 font-mono bg-linear">
      <span className="text-sm max-md:text-xs text-gray-400 font-bold tracking-[-0.03em] text-blackuppercase">
        [ WHAT WE DO ]
      </span>
      <div className="w-2/6 max-md:w-1/2 max-md:flex max-md:justify-center max-md:items-center flex flex-col justify-start items-start py-2">
        <h1 className="text-8xl max-md:text-6xl text-center tracking-[-0.05em] font-bold text-red-700 mb-4">
          OUR SERVICES
        </h1>
      </div>
      <div className="grid grid-cols-4 max-md:grid-cols-1 max-md:pt-5 max-md:pb-5 gap-4 pt-20 pb-10">
        {servicesData.map((service) => {
          return (
            <div
              key={service.id}
              className="flex w-full flex-col group rounded-[15px] max-md:rounded-lg justify-between px-3 min-h-140 max-md:min-h-100 bg-gray-100 pt-12 max-md:pt-5 pb-5 text-left transition-all duration-300 md:hover:bg-red-700 max-md:bg-red-700"
            >
              <h2 className="text-3xl max-md:text-lg tracking-[-0.03em] uppercase font-bold transition-all duration-300 md:group-hover:text-opacity-80 md:group-hover:text-white">
                {service.label}
              </h2>
              <p className="text-base max-md:text-sm font-medium text-black overflow-hidden transition-all duration-500 ease-in-out md:max-h-0 md:opacity-0 md:group-hover:max-h-96 md:group-hover:opacity-100 md:group-hover:text-white max-md:max-h-none max-md:opacity-100 max-md:mt-3 max-md:text-white">
                {service.content}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
