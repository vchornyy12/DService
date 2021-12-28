import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Owner} from 'src/app/owner/owner'
import {OwnerService} from "../owner.service";

@Component({
  selector: 'app-owner-create',
  templateUrl: './owner-create.component.html',
  styleUrls: ['./owner-create.component.css']
})
export class OwnerCreateComponent {

  owner: Owner

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ownerService: OwnerService) {
    this.owner = new Owner();
  }

  onSubmit() {
    this.ownerService.create(this.owner).subscribe(()=>{
      this.router.navigate(['/owners']);
    })
  }


}

