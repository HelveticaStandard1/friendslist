import {Component, OnInit, ViewChild} from '@angular/core';
import {PeopleService} from '../shared/people/people.service';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {
  people: Array<any>;
  columnsToDisplay = ['name'];
  dataSource;

  constructor(private peopleService: PeopleService) {
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.peopleService.getPeople().subscribe(res => {
      console.log(res);
      this.people = res;
      this.dataSource = new MatTableDataSource(this.people);
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    });
  }

}
