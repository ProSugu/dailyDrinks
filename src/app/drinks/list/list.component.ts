import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  totalDrinks: any[] = [];
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('totalDrinks') !== null) {
      this.totalDrinks = JSON.parse(localStorage.getItem('totalDrinks'));
    }
  }
  
  onDelete(orderId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const index: number = this.totalDrinks.findIndex(x => x.orderId == orderId);
        if (index !== -1) {
            this.totalDrinks.splice(index, 1);
        }  
        localStorage.removeItem('totalDrinks');
        localStorage.setItem('totalDrinks', JSON.stringify(this.totalDrinks));
        Swal.fire(
          'Deleted!',
          'Your drink has been deleted.',
          'success'
        )
      }
    })
  }

  onEdit(orderId: number) {
    this.router.navigate(['drinks/edit/' + orderId]);
  }
}
