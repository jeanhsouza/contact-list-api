import { z } from "zod";

export const loginRequestSchema = z.object({
	email: z.string().email().min(10).max(45),
	password: z.string().min(4).max(20),
});

