import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {

  toDoListArray: any[];
  constructor(private TodoService: TodoService) { }

  ngOnInit() {
    this.TodoService.getToDoList().snapshotChanges()
    .subscribe (item => {
      this.toDoListArray = [];
      item.forEach(element => {
        var x = element.payload.toJSON();
        x["$key"] = element.key;
        this.toDoListArray.push(x);
      })

      //sort array isChecked false -> true
      this.toDoListArray.sort((a,b) => {
        return a.isChecked - b.isChecked;
      })
    })
  }

  onAdd(itemTitle) {
    this.TodoService.addTitle(itemTitle.value);
    itemTitle.value=null;
  }

  alterCheck($key: string, isChecked){
    this.TodoService.checkOrUnCheckTitle($key,!isChecked);
  }

  onDelete($key: string){
    this.TodoService.removeTitle($key);
  }
}
