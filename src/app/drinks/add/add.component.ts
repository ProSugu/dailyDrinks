import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  totalDrinks: any[] = [];
  drinksForm: FormGroup;
  drinkId = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute) {
    this.activateRoute.params.subscribe((response: any) => {
      if (response.order) {
        this.drinkId = response.order;
      } else {
        this.drinkId = null;
      }
    });
  }

  ngOnInit(): void {
    this.onPageLoad();
  }

  onPageLoad(): void {
    this.drinksForm = this.formBuilder.group({
      name: ['', [Validators.compose([Validators.required])]],
      price: ['', [Validators.compose([Validators.required])]],
      notes: ['', [Validators.compose([Validators.required])]]
    });
    if (localStorage.getItem('totalDrinks') !== null) {
      this.totalDrinks = JSON.parse(localStorage.getItem('totalDrinks'));
      if (this.totalDrinks.length > 0) {
        const order: any = this.totalDrinks.filter(element => element.orderId == this.drinkId);
        if (order.length) {
          this.drinksForm.patchValue({
            name: order[0].name,
            price: order[0].price,
            notes: order[0].notes
          });
        }
      }
    }
  }

  onSubmitDrink(): void {
    if (!this.drinksForm.valid) {
      this.drinksForm.markAllAsTouched();
    } else {
      const dataObj = {
        orderId: !this.drinkId ? Math.floor(1000 + Math.random() * 9000) : this.drinkId, //just added dynamic id randomly
        name: this.drinksForm.value.name,
        price: this.drinksForm.value.price,
        notes: this.drinksForm.value.notes
      }
      if (!this.drinkId) {
        this.totalDrinks.push(dataObj);
      } else {
        const index = this.totalDrinks.findIndex((obj => obj.orderId == this.drinkId));
        this.totalDrinks[index].name = dataObj.name;
        this.totalDrinks[index].price = dataObj.price;
        this.totalDrinks[index].notes = dataObj.notes;
      }
      localStorage.removeItem('totalDrinks');
      localStorage.setItem('totalDrinks', JSON.stringify(this.totalDrinks));
      this.drinksForm.reset();
      this.toast(this.drinkId ? true: false);
      this.router.navigate(['/drinks/list']);
    }
  }

  toast(isAdded: boolean){
    Swal.fire(
      'Success!',
      `Drink has been ${!isAdded ? 'added': 'updated'} successfully.`,
      'success'
    )
  }
}
