import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TokenOutput {
  constructor(partial?: Partial<TokenOutput>) {
    Object.assign(this, partial);
  }

  @Field({ nullable: true })
  token: string;
}
