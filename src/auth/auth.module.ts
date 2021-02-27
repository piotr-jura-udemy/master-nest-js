import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "./local.strategy";
import { User } from "./user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule { }