import { IsString } from "class-validator";

export class AuthCredintialDto {
  @IsString({ message: "you must provide email" })
  email: string

  @IsString({ message: "you must provide password" })
  password: string

  @IsString({ message: "you must provide a role" })
  role: string
}
