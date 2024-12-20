import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private accountServce = inject(AccountService);
  private toastr = inject(ToastrService);
  usersFromHomComponent = input.required<any>()
  cancelRegisterMode = output<boolean>()
  model : any = {}

  register(){
    this.accountServce.Register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error => { 
        this.toastr.error(error.error)
      }
    })
  }

  cancel(){
    this.cancelRegisterMode.emit(false)
    
  }
}
