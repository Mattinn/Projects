import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss'
})
export class EditPopupComponent {
  @Input() display: boolean = false;
  @Output() confirm = new EventEmitter<Product>();

  @Input() product: Product = {
    name: '',
    image: '',
    price: '',
    rating: 0
  };

  onConfirm = () => this.confirm.emit(this.product);
  onCancel = () => this.display = false;
}
