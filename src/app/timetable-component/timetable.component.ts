import { Component, OnInit } from '@angular/core';


import 'jspdf-autotable';
import { timeTableService } from './timetable.service';
import {  Router } from '@angular/router';
import { schoolSubjectService } from '../school subject/schoolsubject.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
})
export class TimeTable implements OnInit {
  discExample;
  test;
  constructor(
    private disciplines: timeTableService,
    private router: Router,
    private getData: schoolSubjectService
  ) {}

  ngOnInit() {
    this.disciplines.getTimeTableInfo().subscribe((data) => {
      this.discExample = data;

    });
  }
  goToDisciplines($event, abc) {
if(abc =="Sport" || abc=="Science" || abc=="Math" || abc=="History" || abc=="Economics") {
    this.router.navigate(['/school-subjects'],{fragment: abc });
    this.getData.takeSchoolSubject(abc);
}
else {
  return;
}
  }
}
