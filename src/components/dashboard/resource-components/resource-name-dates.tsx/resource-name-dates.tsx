import ResourceDatesRegisters from "../resource-dates-register/resource-dates-register";

interface IResourceNameDate {
  resource: any;
}

export default function ResourceNameDate({ resource }: IResourceNameDate) {
  return (
    <>
      <h1 className="text-2xl font-bold capitalize mb-0">{resource.name}</h1>
      <ResourceDatesRegisters resource={resource} />
    </>
  );
}
