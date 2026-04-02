import { IGeneralResources } from "@/types/resources/general-resources";
import ResourceDatesRegisters from "../resource-dates-register/resource-dates-register";

export default function ResourceNameDate({
  resource,
}: {
  resource: IGeneralResources;
}) {
  return (
    <>
      <h1 className="text-2xl font-bold capitalize mb-0">{resource.name}</h1>
      <ResourceDatesRegisters resource={resource} />
    </>
  );
}
