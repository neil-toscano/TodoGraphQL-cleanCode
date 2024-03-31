import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { GetTodosArgs, CreateTodoInput, UpdateTodoInput } from './dto';

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], {
    name: 'listTodo',
    description: 'Obtener lista de los Todos',
  })
  findAll(@Args({ nullable: true }) args: GetTodosArgs): Todo[] {
    console.log('pas');

    return this.todoService.findAll(args);
  }

  @Query(() => Todo, {
    // devuelve un objeto de tipo Todo
    name: 'findOneTodo',
    description: 'Encontrar por id',
  })
  findOne(
    @Args('id', { type: () => Int, defaultValue: 1, nullable: true })
    id: number,
  ): Todo {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo, {
    name: 'createTodo123',
    description: 'vamos a crear un Todo con mutations',
  })
  createTodo(
    @Args('createTodoInput', { type: () => CreateTodoInput })
    createTodoInput: CreateTodoInput,
  ) {
    return this.todoService.create(createTodoInput);
  }

  @Mutation(() => Todo, {
    name: 'Update123',
    description: 'Vamos actualizar los Todo',
  })
  updateTodo(
    @Args('updateTodoInput', {
      type: () => UpdateTodoInput,
    })
    updateTodoInput: UpdateTodoInput,
  ) {
    return this.todoService.update(updateTodoInput);
  }

  @Mutation(() => String, {
    name: 'DeleteById',
    description: 'Eliminar todo',
  })
  deleteTodo(
    @Args('id', {
      type: () => Int,
    })
    id: number,
  ): string {
    return this.todoService.delete(id);
  }

  @Query(() => Int, {
    name: 'totalTodos',
    description: 'all Todo',
  })
  totalTodos(): number {
    return this.todoService.totalTodos;
  }
  
  @Query(() => Int, {
    name: 'completedTodos',
    description: 'all completed Todo',
  })
  completedTodos(): number {
    return this.todoService.completedTodos;
  }

  @Query(() => Int, {
    name: 'pendingTodos',
    description: 'all pending Todos',
  })
  pendingTodos(): number {
    return this.todoService.pendingTodos;
  }
}
