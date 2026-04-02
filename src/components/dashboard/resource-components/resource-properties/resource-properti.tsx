import Link from "next/link";

interface IResourcePropertie {
  resourcekey: string;
  value: string;
  link?: {
    enabled: boolean;
    to: string;
  };
}

export default function ResourcePropertie({
  resourcekey,
  value,
  link
}: IResourcePropertie) {
  const hasLink = link?.enabled && link.to;

  return (
    <div className={`flex flex-col sm:flex-row  wrap-normal`}>
      <h3 className="font-semibold">{resourcekey}</h3>

      {hasLink ? (
        <Link
          href={link.to}
          className="text-blue-600 underline ml-2 italic max-w-lg wrap-anywhere"
        >
          {value}
        </Link>
      ) : (
        <p className="max-w-lg wrap-anywhere indent-4 italic">{value}</p>
      )}
    </div>
  );
}
