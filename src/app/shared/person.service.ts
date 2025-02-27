import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { API_PERSON_URL } from './../constants/endpoint.constant';
import { Person } from './person.model';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  personForm: FormGroup;

  listPerson: Person[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) {
    this.personForm = this.formBuilder.group({
      _id: [''],
      fullName: ['', Validators.required],
      location: ['', Validators.required],
      salary: ['', Validators.required],
      age: ['', Validators.required],
    });
  }

  fetchPersonList() {
    return this.httpClient
      .get(API_PERSON_URL)
      .pipe(catchError(this.handleError))
      .subscribe((data) => {
        this.listPerson = data as Person[];

        console.log(data);
      });
  }

  postPerson() {
    this.personForm.patchValue({
      _id: null,
    });

    return this.httpClient
      .post(API_PERSON_URL, this.personForm.value)
      .pipe(catchError(this.handleError));
  }

  putPerson() {
    return this.httpClient
      .put(
        API_PERSON_URL + this.personForm.get('_id')?.value,
        this.personForm.value
      )
      .pipe(catchError(this.handleError));
  }

  deletePerson(_id: String) {
    return this.httpClient
      .delete(API_PERSON_URL + _id)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }

    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
