import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../shared-folder/student.model';
import { HttpRequests } from '../httprequests.service';
@Injectable({ providedIn: 'root' })
export class StudentService {
  private students: Student[] = [];
  isEdit: boolean;
  data: any;
  item: any;
  id: Student['id'];
  studentsSubject = new BehaviorSubject<Student[]>([]);
  constructor(private http: HttpRequests) {}

  getStudents(): Observable<Student[]> {
    return this.studentsSubject;
  }

  addStudent(student: Student) {
    this.http.post(student).subscribe((data: Student) => {
      this.students.push(data);
      this.studentsSubject.next(this.students);
      this.fetchStudents();
    });
  }

  fetchStudents() {
    this.http.getRequest().subscribe((data: Student[]) => {
      this.students = data;
      this.studentsSubject.next(this.students);
    });
  }
  fetchEditStudent() {
    this.http.getRequest().subscribe((data: Student[]) => {
      this.students = data;
    });
  }
  takeStudentId(data: Student) {
    this.id = data;
    return this.id;
  }
  showStudentEdit(): Observable<{}> {
    return this.id;
  }
}
