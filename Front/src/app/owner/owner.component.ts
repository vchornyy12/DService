import {Component, OnInit} from '@angular/core';
import {Owner} from './owner';
import {OwnerService} from "./owner.service";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit{

  public owners: Owner[] = [];
  closeResult: string | undefined;
  editForm!: FormGroup;
  public ownerId: number | undefined;
  sortedData: Owner[];
  ownersUrl = 'http://localhost:8080/owners/';

  constructor(private ownerService: OwnerService, private modalService: NgbModal,
              private fb: FormBuilder, private httpClient: HttpClient) {
    this.sortedData = this.owners.slice();
  }

  ngOnInit(): void {
    this.getAllOwners();
    this.editForm = this.fb.group({
      id: [''],
      firstName: [''],
      lastName: ['']
    })
  }
  public getValidation(): void {
    this.editForm = this.fb.group(
      {
        firstName: [
          '',
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20)
          ]
        ]
      }
    );
  }

  public getAllOwners() {
    this.ownerService.getAllOwners().subscribe(data => {
        this.owners = data;
      }
    )
  }

 public open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  public getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public onSubmit(f: NgForm) {
    this.ownerService.createOwner(f.value)
      .subscribe((result) => {
        this.ngOnInit();
      });
    this.modalService.dismissAll();
  }

  public openEdit(targetModal: any, owner: Owner) {
    this.ownerId = owner.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue({
      id: owner.id,
      firstName: owner.firstName,
      lastName: owner.lastName
    });
  }

 public onSave() {
    const editURL = this.ownersUrl + this.ownerId;
    this.httpClient.put(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
      });
    this.modalService.dismissAll();
    this.ngOnInit();
  }

  public openDelete(targetModal: any, owner: Owner) {
    this.ownerId = owner.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

 public onDelete() {
    const deleteURL = this.ownersUrl + this.ownerId;
    this.httpClient.delete(deleteURL)
      .subscribe((results) => {
        this.owners = this.owners.filter(obj => obj.id !== this.ownerId);
      });
    this.modalService.dismissAll();
  }
}
