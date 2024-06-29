import { Component, Input, Output } from '@angular/core';
import {
  FormArray,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MyJSON } from './element.json';
import { DictionaryElementComponent } from './dictionary.element.component';
import { HttpService } from './http.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'elements-group',
  standalone: true,
  templateUrl: 'elements.group.component.html',
  imports: [FormsModule, DictionaryElementComponent, ReactiveFormsModule],
  providers: [HttpService],
})
export class ElementsGroupComponent {
  // статус загрузки заполненного  элемента
  status: 'initial' | 'uploading' | 'success' | 'fail' = 'initial';

  // получаем набор свойст от родительского компонента и толкаем их дальше в дочерний
  @Input()
  propertiesArray: string[] = [];

  // мапа с заполненными данными
  filledElements: MyJSON[] = [];

  // массив полей
  formElements: string[] = [];

  // форма, на которой расположена группа полей (набор свойств)
  myForm: FormGroup;

  eventHandler(event: MyJSON) {
    let element = event;
    this.filledElements.push(element);
  }

  constructor(private httpService: HttpService) {
    this.myForm = new FormGroup({
      formElements: new FormArray([new FormGroup(Validators.required)]),
    });
  }

  getFormsControls(): FormArray {
    return this.myForm.controls['formElements'] as FormArray;
  }

  addElement() {
    (<FormArray>this.myForm.controls['formElements']).push(
      new FormGroup(Validators.required)
    );
  }

  hideHandler(event: any) {
    let a = event;
    (<FormArray>this.myForm.controls['formElements']).clear();
  }

  submit() {
    console.log('submit');
  }

  sendElements() {
    if (this.filledElements) {
      // преобразуем мапу свойство кастомного объекта JSON в объект
    let propertiesArray: any[] = [];
      this.filledElements.forEach(obj => {
        let mapToJsonObject: any = {};
        obj.getProperties().forEach((value, key) => {
            mapToJsonObject[key] = value;
        });
        propertiesArray.push(mapToJsonObject);
      });

      let upload = this.httpService.sendDataElements('/processingElements', {
        properties: propertiesArray,
      });
      upload.pipe(first()).subscribe({
        next: (response: any) => {
          console.log(response);
          this.status = 'success';
        },
        error: (error: any) => {
          console.log('error');
          this.status = 'fail';
        },
      });
    }
  }
}
