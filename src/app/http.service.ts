import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
     
@Injectable()
export class HttpService{
     
    private url = "http://localhost:8181";
    constructor(private http: HttpClient){ }
        
    // Отправка файла на сервер после загрузки
    sendFile(address: string, data: FormData) {
        const upload = this.http.post(this.url + address, data);
        return upload;
    }

    // Отправка заполненных элементов на сервер
    sendDataElements(address: string, data: any) {
        const upload = this.http.post(this.url + address, data);        
        return upload;
    }

}