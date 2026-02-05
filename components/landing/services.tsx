export default function Services() {
  const servicesData = [
    {
      id: 1,
      label: "Talent Management",
      content: "",
      image: "",
    },
    {
      id: 2,
      label: "Television and Film Production",
      content: "",
      image: "",
    },
    {
      id: 3,
      label: "Stage and Musical Production",
      content: "",
      image: "",
    },
    {
      id: 4,
      label: "Theatre Education and Consultancy",
      content: "",
      image: "",
    },
  ];

  return (
    <div className="flex flex-col items-start px-12 py-20 font-mono bg-linear">
      <span className="text-sm font-bold tracking-[-0.03em] text-black mb-3 uppercase">
        [ SERVICES: Redefining the Landscape ]
      </span>
      <div className="grid grid-cols-4 gap-5"></div>
    </div>
  );
}
