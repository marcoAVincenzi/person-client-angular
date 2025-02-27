import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MessageConstants } from '../constants/message.constants';
import { ToastrConstants } from '../constants/toastr.constants';
import { Person } from '../shared/person.model';
import { PersonService } from '../shared/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styles: ``,
  standalone: false,
})
export class PersonComponent implements OnInit {
  searchName: string = '';

  constructor(
    public personService: PersonService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.personService.fetchPersonList();
  }

  populateForm(person: Person) {
    this.personService.personForm.setValue({
      _id: person._id,
      fullName: person.fullName,
      location: person.location,
      salary: person.salary,
      age: person.age,
    });
  }

  onDelete(_id: String) {
    if (confirm(MessageConstants.ARE_YOU_SURE_TO_DELETE)) {
      this.personService.deletePerson(_id).subscribe((res) => {
        this.personService.fetchPersonList();
        this.toastrService.error(ToastrConstants.DELETE);
      });
    }
  }

  filterPerson() {
    if (this.searchName == '') {
      this.personService.fetchPersonList();

      return;
    }

    this.personService.listPerson = this.personService.listPerson.filter(
      (person) =>
        person.fullName.toLowerCase().includes(this.searchName.toLowerCase())
    );
  }
}
