interface ISectionCard {
  section: any;
}

export const SectionCard = ({ section }: ISectionCard) => {
  return <div className="w-full border-1 border-black p-2 text-center pt-5 pb-5">{section.type}</div>;
};
