import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { $ } from 'protractor';
 
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  
  toDoLIst: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) { }

  getToDoList(){
    this.toDoLIst = this.firebasedb.list('titles');
    return this.toDoLIst;
  }
  
  addTitle(title: string){
    this.toDoLIst.push({
      title: title,
      isChecked: false
    });
  }

  checkOrUnCheckTitle($key: string, flag: boolean){
    this.toDoLIst.update($key, { isChecked: flag});
  }

  removeTitle($key: string){
    this.toDoLIst.remove($key);
  }

}
