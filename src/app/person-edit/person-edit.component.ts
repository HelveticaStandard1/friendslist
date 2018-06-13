import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {PeopleService} from '../shared/people/people.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit, OnDestroy {
  person: any = {};
  sub: Subscription;
  friends = [
    {value: 'dailyHomies', viewValue: 'Daily Homies'},
    {value: 'fairWeather', viewValue: 'Fairweather Friends'},
    {value: 'flakyFriends', viewValue: 'Flaky Friendies'}
  ];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private peopleService: PeopleService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.peopleService.getPerson(id).subscribe((person: any) => {
          if (person) {
            this.person = person;
          } else {
            console.log(`Person with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/people-list']);
  }

  save(form: NgForm, id) {
    if (!id) {
      this.peopleService.postPerson(form).subscribe(res => {
        this.router.navigate(['/people-list']);
      }, (err) => {
        console.log(err);
      });
    } else {
      this.peopleService.updatePerson(form, id).subscribe(res => {
        this.router.navigate(['/people-list']);
      }, (err) => {
        console.log(err);
      });
    }
  }

  removePerson(id) {
    this.peopleService.deletePerson(id).subscribe(res => {
        this.router.navigate(['/people-list']);
      }, (err) => {
        console.log(err);
      }
    );
  }

}
