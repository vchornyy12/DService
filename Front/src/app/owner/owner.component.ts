import { Component, OnInit } from '@angular/core';
import {Owner} from './owner'
import {OwnerService} from "./owner.service";

@Component({
  selector: 'owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {
  public owners: Owner[]=[];

  constructor(private ownerService: OwnerService) { }

  ngOnInit(): void {
    this.ownerService.getAll().subscribe(data => {
        this.owners = data;
      }
    )
  }

}
