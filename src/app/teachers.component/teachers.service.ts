import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { teacherEx } from './mock-teachers';

@Injectable({ providedIn: 'root' })
export class teacherService {
  listName:any;
  teacher: any;
  teachName: any;
   dataName(data: any) {
    this.teachName = data;
    return this.teachName;
  }

  takeTeacher(data: any) {
    this.teacher = data;
    return this.teacher;
  }
  showTeacher(): Observable<{}> {
    return this.teacher;
  }
  showTeacherDescription(data) {
    const descriptionTeach = teacherEx.find((element) => element.id == data);
    return descriptionTeach;
  }
  listTeacher():Observable<{}>{
    this.listName=of(teacherEx);
    return this.listName;
  }
}


