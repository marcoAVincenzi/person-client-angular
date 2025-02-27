import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastrConstants } from '../../constants/toastr.constants';
import { Person } from '../../shared/person.model';
import { PersonService } from './../../shared/person.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styles: ``,
  standalone: false,
})
export class PersonFormComponent {
  submitted: boolean = false;

  constructor(
    public personService: PersonService,
    private toastrService: ToastrService
  ) {}

  onSubmit() {
    this.submitted = true;

    if (this.personService.personForm.valid) {
      if (this.personService.personForm.get('_id')?.value == '') {
        this.create();
        return;
      }

      this.edit();
    }
  }

  private edit() {
    this.personService.putPerson().subscribe((res) => {
      this.resetForm();
      this.personService.fetchPersonList();
      this.toastrService.success(ToastrConstants.UPDATE);
    });
  }

  private create() {
    this.personService.postPerson().subscribe((res) => {
      this.resetForm();
      this.personService.fetchPersonList();
      this.toastrService.success(ToastrConstants.CREATE);
    });
  }

  private resetForm() {
    this.personService.personForm.reset(new Person());
    this.submitted = false;
  }
}
