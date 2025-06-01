import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  price: number;
  selected: boolean;
  checked: boolean;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [
    { id: 1, name: 'Produit A', price: 100, selected: false, checked: false },
    { id: 2, name: 'Produit B', price: 150, selected: false, checked: false }
  ];

  newProduct: Product = {
    id: 0,
    name: '',
    price: 0,
    selected: false,
    checked: false
  };

  editingId: number | null = null;
  alertMessage: string = '';
  productToDeleteId: number | null = null;

  ngOnInit(): void {
    // rien à faire ici pour cette version
  }

  addProduct() {
    const id = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
    this.products.push({ ...this.newProduct, id });
    this.alertMessage = '✅ Produit ajouté avec succès.';
    this.resetForm();
  }

  editProduct(product: Product) {
    this.newProduct = { ...product };
    this.editingId = product.id;
  }

  updateProduct() {
    this.products = this.products.map(p =>
      p.id === this.editingId ? { ...this.newProduct } : p
    );
    this.alertMessage = '✅ Produit mis à jour.';
    this.resetForm();
  }

  deleteProduct(id: number) {
    this.productToDeleteId = id;
  }

  confirmDelete() {
    if (this.productToDeleteId !== null) {
      this.products = this.products.filter(p => p.id !== this.productToDeleteId);
      this.alertMessage = '🗑️ Produit supprimé.';
      this.productToDeleteId = null;
      setTimeout(() => (this.alertMessage = ''), 2500);
    }
  }

  cancelDelete() {
    this.productToDeleteId = null;
  }

  resetForm() {
    this.newProduct = {
      id: 0,
      name: '',
      price: 0,
      selected: false,
      checked: false
    };
    this.editingId = null;
    setTimeout(() => (this.alertMessage = ''), 2500);
  }
}
