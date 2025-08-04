interface IResourcePropertie {
  resourcekey: string;
  value: string;
}

export default function ResourcePropertie({
  resourcekey,
  value,
}: IResourcePropertie) {
  return (
    <div className={`flex ${value.length >= 100 && "flex-col"} wrap-normal`}>
      <h3 className="font-semibold">{resourcekey}</h3>
      <p className="indent-4 italic">{value}</p>
    </div>
  );
}
