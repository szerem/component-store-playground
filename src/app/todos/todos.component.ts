import { Component } from '@angular/core'
import { tap } from 'rxjs/operators'
import { Todo } from '../data-access/todos/todo'
import { TodosDataAccessService } from '../data-access/todos/todos-data-access.service'

@Component({
  template: `
    <div class="bg-gray-100">
      <div class="flex items-start lg:items-center justify-center">
        <div class="container mx-auto px-4 h-full md:flex">
          <div class="md:w-3/12">
            <div class=" p-4 bg-grey-lighter py-8">
              <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                <div class="sm:flex sm:items-center px-2 py-4">
                  <div class="flex-grow">
                    <h3 class="font-normal px-2 py-3 leading-tight">Add Todo</h3>
                    <input
                      #task
                      [readOnly]="saving"
                      type="text"
                      required="required"
                      placeholder="Task"
                      (keydown.enter)="addTodo(task)"
                      class="my-2 w-full text-sm bg-gray-100 text-grey-darkest rounded h-10 p-3 focus:outline-none"
                    />
                    <div class="sm:flex bg-grey-light sm:items-center px-2 py-4">
                      <div class="flex-grow text-right">
                        <button
                          class="bg-green-400 hover:bg-blue-dark text-white py-2 px-4 rounded"
                          (click)="addTodo(task)"
                        >
                          Add Todo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="md:w-9/12">
            <div class=" p-4 bg-grey-lighter py-8">
              <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                <div class="sm:flex sm:items-center px-2 py-4">
                  <div class="flex-grow">
                    <h3 class="font-normal px-2 py-3 leading-tight">Todos</h3>
                    <div class="w-full">
                      <div
                        class="flex items-center justify-center p-16 bg-gray-100 min-w-screen rounded"
                        *ngIf="loading"
                      >
                        <div class="flex space-x-2 animate-pulse">
                          <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
                          <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
                          <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
                        </div>
                      </div>

                      <ng-container *ngIf="todos$ | async as todos">
                        <ng-container *ngIf="!todos.length">
                          <div
                            class="flex items-center justify-center bg-gray-100  text-sm font-bold  p-16  rounded"
                            role="alert"
                          >
                            <p>There are no todos.</p>
                          </div>
                        </ng-container>
                        <ng-container *ngFor="let todo of todos">
                          <div class="flex cursor-pointer my-1 hover:bg-blue-lightest rounded">
                            <div class="py-3">
                              <button class="text-red-600" (click)="deleteTodo(todo)">
                                <i class="fa fa-trash"></i>
                              </button>
                            </div>
                            <div class="h-10 py-3 px-1">
                              <p
                                class="hover:text-blue-dark"
                                [class]="{ 'line-through': todo.done }"
                                (click)="toggleTodo(todo)"
                              >
                                {{ todo.task }}
                              </p>
                            </div>
                          </div>
                        </ng-container>
                      </ng-container>
                      <div
                        class="flex cursor-pointer p-1 bg-gray-100 hover:bg-blue-lightest animate-pulse rounded"
                        *ngIf="saving"
                      >
                        Saving...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TodosComponent {
  todos$ = this.service.todos$.pipe(tap(() => (this.loading = false)))
  saving = false
  loading = true
  constructor(private readonly service: TodosDataAccessService) {
    // this.service.addTodo({ email: 'beeman@beeman.nl', name: 'beeman' })
  }

  public addTodo(task: HTMLInputElement): void {
    this.saving = true
    this.service.addTodo({ task: task.value }).subscribe(() => {
      task.value = ''
      this.saving = false
    })
  }

  public deleteTodo(todo: Todo): void {
    this.service.deleteTodo(todo).subscribe()
  }

  public toggleTodo(todo: Todo): void {
    this.service.toggleTodo(todo).subscribe()
  }
}