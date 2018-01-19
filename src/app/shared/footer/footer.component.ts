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
    address: string = 'Esteve Terradas, 7'
    phone: string = '+34 123 123 123'
    email: string = 'info@feelfood.es'
    facebook: string = 'https://www.facebook.com/delegacio.eetac/'
    github: string = 'https://github.com/FeelFood'
    twitter: string = 'https://twitter.com/ea_eetac/status/911256516937834496'
    country: string = 'Spain'
    city: string = 'Barcelona'
    legalInfo: string = 'This is a private project created by EA students in EETAC. All rights are reserved by their developers.'
}
