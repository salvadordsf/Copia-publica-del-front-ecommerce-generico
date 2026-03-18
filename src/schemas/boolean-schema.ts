import { z } from "zod";

export const BooleanInQuery = z.boolean({
  message: "The value can only be true.",
});
