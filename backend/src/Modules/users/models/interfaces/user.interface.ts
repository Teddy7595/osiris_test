import { _files } from "../schemas/userSchema";

export interface userInterface
{
    photo           ?: _files;
    name            ?: string;
    last_name       ?: string;
    dir_domicilio   ?: string;
    email           ?: string;
    pass            ?: string;
    updatedAt       ?: string[];
}