import { Component, OnInit, inject } from '@angular/core';
import { Subscribers } from '../Subscribers';
import { SubscriberService } from '../subscribers.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-subscriber-list',
  templateUrl: './subscriber-list.component.html',
  styleUrls: ['./subscriber-list.component.css']

})
export class SubscriberListComponent implements OnInit {
  subscribers: Subscribers[] = []; // Initialize as an empty array
  formGroup!: FormGroup;
  formBuilder= inject(FormBuilder);

  stlLogo: string = "assets/images/super_tech_logo.jpg"

  constructor(private subscriberService: SubscriberService) {}


  ngOnInit() {

    this.getSubscribersList();
    this.formGroup = this.formBuilder.group({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      email: new FormControl(''),
      msisdn: new FormControl(''),
      customer_id_user: new FormControl(''),
      customer_id_owner: new FormControl(''),
      service_type: new FormControl('')

    })

    if (this.subscribers.length > 0) {
      this.fetchSubscriberData(this.subscribers[0].id);
    }
  }

  private getSubscribersList() {
    this.subscriberService.getSubscribersList().subscribe(data => {
      this.subscribers = data;
    });
  }

  // saveSubscriber() {
  //   this.subscriberService.addNewSubscriber(this.formGroup).subscribe(
  //       data => {
  //         console.log(data);
  //       },
  //       error => console.log("The error is", error)
  //   );
  // }

  confirmInsert(): void {
    const confirmation = window.confirm('Are you sure you want to Add this subscriber?');

    if (confirmation) {
      // User confirmed, proceed with deletion
      this.saveSubscriber();
    }
  }

  saveSubscriber() {
    const formData = this.formGroup.value; // Get the form values
    this.subscriberService.addNewSubscriber(formData).subscribe(
      data => {
        console.log(data);
      },
      error => console.log("The error is", error)
    );
  }

  confirmUpdate(id: number): void {
    const confirmation = window.confirm('Are you sure you want to Update this subscriber?');

    if (confirmation) {
      // User confirmed, proceed with deletion
      this.updateSubscriber(id);
    }
  }



  updateSubscriber(id: number){
    const formData = this.formGroup.value; // Get the form values
    // const id = formData.id; // Assuming you have an 'id' field in your form

    this.subscriberService.updateSubscriber(formData, id).subscribe(
    data => {
  console.log(data);
},
error => console.log("The error is", error)
);
}

  // onSubmit() {
  //   console.log(this.subscribers);
  //   this.saveSubscriber();
  // }

  confirmDelete(id: number): void {
    const confirmation = window.confirm('Are you sure you want to delete this subscriber?');

    if (confirmation) {
      // User confirmed, proceed with deletion
      this.deleteSubscriber(id);
    }
  }

  deleteSubscriber(id: number) {
    this.subscriberService.deleteSubscriber(id).subscribe(data => {
      console.log(data);
      this.getSubscribersList(); // Refresh the subscriber list after deletion
    });
  }


  // Add the fetchSubscriberData method to fetch data by ID
  fetchSubscriberData(id: number): void {
    if (id) {
      this.subscriberService.getSubscriberById(id).subscribe(
        (updatedData) => {
          console.log('DATA TO EDIT:', updatedData);

          // Update UI fields with the received data
          this.formGroup.patchValue({
            msisdn: updatedData.msisdn,
            customer_id_owner: updatedData.customer_id_owner,
            customer_id_user: updatedData.customer_id_user,
            service_type: updatedData.service_type,
            firstname: updatedData.firstname,
            lastname: updatedData.lastname,
            email: updatedData.email,
            // Add more fields if needed
          });

          // Optional: Trigger Angular change detection
          this.formGroup.updateValueAndValidity();
        },
        (error) => {
          console.error('FETCHING error:', error);
          // Handle errors if needed
        }
      );
    }
  }


}
