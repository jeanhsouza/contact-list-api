import { z } from "zod";
import { loginRequestSchema } from "../schemas/login.schema";

export type iLogin = z.infer<typeof loginRequestSchema>;
