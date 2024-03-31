import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { GetTodosArgs, CreateTodoInput, UpdateTodoInput } from './dto';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Piedra del alma', done: false },
    { id: 2, description: 'Piedra del espacio', done: false },
    { id: 3, description: 'Piedra del poder', done: true },
  ];

  get totalTodos(): number {
    return this.todos.length;
  }

  get completedTodos(): number {
    return this.todos.filter((todo) => todo.done === true).length;
  }

  get pendingTodos(): number {
    return this.todos.filter((todo) => todo.done === false).length;
  }

  findAll(args: GetTodosArgs): Todo[] {
    const { status } = args;
    if (status !== undefined)
      return this.todos.filter((todo) => todo.done === status);
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);
    return todo;
  }

  create(createTodoInput: CreateTodoInput): Todo {
    const todo = new Todo();
    todo.description = createTodoInput.description;
    todo.done = false;
    todo.id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;

    this.todos.push(todo);
    return todo;
  }

  update(updateTodoInput: UpdateTodoInput): Todo {
    const { id, description, done } = updateTodoInput;
    const todoToUpdate = this.findOne(id);

    if (description) todoToUpdate.description = description;
    if (done !== undefined) todoToUpdate.done = true;

    this.todos = this.todos.map((todo) => {
      return todo.id === id ? todoToUpdate : todo;
    });
    return todoToUpdate;
  }

  delete(id: number) {
    const todo = this.findOne(id);

    this.todos = this.todos.filter((todo) => todo.id !== id);
    return 'succed';
  }

  //todo falta generalizar
  findByParam(param: number) {
    const todo = this.todos.filter((todo) => todo.id === param);
    return todo;
  }
}
