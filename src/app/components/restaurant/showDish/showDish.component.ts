
import { Component, Input } from '@angular/core';
import { Dish } from '../../../models/dish';


@Component({
    selector: 'app-showDish',
    templateUrl: './showDish.component.html',
    styleUrls: ['./showDish.component.css']
})

export class ShowDishComponent {

    @Input() myDish: Dish;

    private isSelected: boolean;

    constructor() {
        this.isSelected = false;
    }

    setSelected() {
        this.isSelected = !this.isSelected;

    }

}