import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';

import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { HttpRequests } from '../requests.service';
import { Student } from '../shared-folder/student.module';
import { StudentService } from './studentService.service';

@Component({
  selector: 'app-my-form',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudent implements OnInit {
  form: FormGroup;
  i: any;
  pattern = /^[a-zA-Z ]+$/;
  student: any;
  isEdit = false;

  constructor(
    private httpRequest: HttpRequests,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddStudent>,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    this.initForm();
    if (this.studentService.showStudentEdit()) {
      this.isEdit = true;
      const id = this.studentService.showStudentEdit();
      this.httpRequest.get().subscribe((data) => {
        const student = data.find((item) => item.id === id);
        if (student) {
          const nameedit = student.name;
          this.form.patchValue({
            name:nameedit
          })
        }
      });

    }
  }

  initForm() {
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(this.pattern),
        ],
      ],
      sport: this.fb.array([this.addFormGroup()]),
      science: this.fb.array([this.addFormGroup()]),
      math: this.fb.array([this.addFormGroup()]),
      history: this.fb.array([this.addFormGroup()]),
      music: this.fb.array([this.addFormGroup()]),
    });
  }

  addInput(type: string) {
    (<FormArray>this.form.get(type)).push(this.addFormGroup());
  }
  onSubmit() {
    if (this.isEdit == false) {
      if (this.form.invalid) {
        return;
      } else {
        const newStudent: Student = this.form.getRawValue();
        this.studentService.addStudent(newStudent);

        this.dialogRef.close();
      }
    } else {
    }
  }

  addFormGroup(): FormGroup {
    return this.fb.group({
      grades: ['', [Validators.min(1), Validators.max(10)]],
      date: ['', [Validators.pattern(/^\d{2}\/\d{2}\/\d{4}$/)]],
    });
  }

  deteleInput(type: string, index: number) {
    (<FormArray>this.form.get(type)).removeAt(index);
  }
}
