import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, { description: 'hola mundo, retorno', name: 'hello' })
  helloWorld(): string {
    return 'Hola Mundo';
  }

  @Query(() => Float, { name: 'randoNumber' })
  getRandoNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    name: 'randomFromZeroTo',
    description: 'From zero to Argument',
  })
  getRandomFromZeroTo(
    @Args('to', { type: () => Int, defaultValue: 5, nullable: true })
    to: number,
  ): number {
    return Math.round(Math.random() * to);
  }
}
