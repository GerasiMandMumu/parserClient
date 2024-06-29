import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ElementsGroupComponent } from "./elements.group.component";
import { FileUploadComponent } from "./file.upload.component";
import { NgIf } from "@angular/common";

@Component({
    selector: "my-app",
    standalone: true,
    templateUrl: "app.component.html",   
    styleUrl: "app.component.scss",
    imports: [ElementsGroupComponent, FileUploadComponent, NgIf]
})
export class AppComponent {

    // массив со свойствами, которые будем заполнять
    propertiesArray: string[] = [];    

    // показывать свойства
    showProps: boolean = false;

    // показывать загрузчик файла
    showFileLoad: boolean = true;

    eventHandler(event: string[][]) {         
        this.propertiesArray = event[0];
        if (this.propertiesArray.length > 0) {
            this.showProps = true;
            this.showFileLoad = false;
        }        
    }
}