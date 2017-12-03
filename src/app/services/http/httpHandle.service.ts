
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class HttpHandle {

    options: any;

    constructor(private http: HttpClient) {
    }

    createPostHeaders() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    post(url: string, body: any) {

        this.options = this.createPostHeaders()
        body = JSON.parse(body)
        return this.http.post(url, body, this.options);
    }

    get(url:string, body:any, params:any)
    {
        this.http.get(url);        
    }
}