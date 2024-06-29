import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MyJSON } from "./element.json";

@Component({
    selector: "dictionary-element",
    standalone: true,
    templateUrl: "dictionary.element.component.html",       
    imports: [ReactiveFormsModule]
})
export class DictionaryElementComponent implements OnInit {    

    @Output() filledElements: EventEmitter<MyJSON> = new EventEmitter<MyJSON>();
    @Input() propertiesArray: string[] = [];
    formGroup : FormGroup;
    @Output() isCreated: EventEmitter<boolean> = new EventEmitter<boolean>();
    
    name: string = "";

    constructor(){
        this.formGroup = new FormGroup({
            "properties": new FormArray([])
        });    
        
    }
    ngOnInit() {              
        for (let index = 0; index < this.propertiesArray.length; index++) {
            (<FormArray>this.formGroup.controls["properties"]).push(new FormControl("", Validators.required));
        }
    }

    getFormsControls() {    
        return this.formGroup.controls["properties"] as FormArray;
    }

    addProperties(){        
        let values = this.formGroup.controls["properties"].value;   
        console.log(values);
        let map = new Map<string, string>();
        for (let index = 0; index < values.length; index++) {
            map.set(this.propertiesArray[index], values[index]);            
        }
        let json = new MyJSON(map);                
        this.filledElements.emit(json);
        this.isCreated.emit(true);
    }

    submit() {
        console.log("submit");        
    }
}