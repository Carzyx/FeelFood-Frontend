import {Component} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  public visible = false;
  private visibleAnimate = false;
  private blocked = false;

  constructor() {}

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.blocked = false;
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public block(): void {
    this.blocked = true;
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal') && !this.blocked) {
      this.hide();
    }
  }
}

