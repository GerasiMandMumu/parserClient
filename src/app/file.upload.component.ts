import { Component, EventEmitter, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from "@angular/common";
import { HttpService } from "./http.service";
import { first } from 'rxjs/operators';

@Component({
  selector: "file-upload",
  templateUrl: "file.upload.component.html",
  styles: "",
  standalone: true,
  imports: [NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgFor],
  providers: [HttpService]
})
export class FileUploadComponent {
  // статус загрузки
  status: "initial" | "uploading" | "success" | "fail" = "initial";
  file: File | null = null;

  @Output() filledElements: EventEmitter<string[][]> = new EventEmitter<string[][]>();  

  constructor(private http: HttpClient, private httpService: HttpService) {}

  ngOnInit(): void {}

  onChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.status = "initial";
      this.file = file;
    }
  }

  onUpload() {
    if (this.file) {
      let formData = new FormData();
      formData.append("file", this.file, this.file.name);
      this.status = "uploading";

      let upload = this.httpService.sendFile("/upload", formData);


      upload.pipe(first()).subscribe({
        next: (data: any) => {
          let propertiesArray = data;     
          console.log("получили от сервера");
          console.log(propertiesArray);
          this.filledElements.emit(propertiesArray);
          this.status = "success";                                                 
        },
        error: (error: any) => {
          this.status = "fail";          
        },}
      );
    }
  }

}