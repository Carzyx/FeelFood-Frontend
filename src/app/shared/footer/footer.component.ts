import { Component } from '@angular/core';


@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent {
    contactInfo = new Contact();
    
}


class Contact {
    name: string = 'FeelFood Company'
    phone: string = '+32 000 000 000'
    email: string = 'info@feelfood.es'
    github: string = 'https://github.com/FeelFood'
    twitter: string;
    country: string = 'Spain'
    city: string = 'Barcelona'
    legalInfo: string = 'This is a private project created by EA students in EETAC.'    
}