import { SetMetadata } from "@nestjs/common";
import { ERole } from "src/Enum/ERole.enum";

export const KEY_ROLES = "roles";
export const Roles = (...roles : ERole[]) => SetMetadata(KEY_ROLES,roles)
