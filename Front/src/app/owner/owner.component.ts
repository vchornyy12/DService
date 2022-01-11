import {Component, OnInit} from '@angular/core';
import {Owner} from './owner'
import {OwnerService} from "./owner.service";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {
  public owners: Owner[] = [];
  closeResult: string | undefined;
  editForm!: FormGroup;
  private ownerId: number | undefined;

  constructor(private ownerService: OwnerService, private modalService: NgbModal,
              private fb: FormBuilder, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.getAllOwners();
    this.editForm = this.fb.group({
      id: [''],
      firstName: [''],
      lastName: ['']
    })
  }

  private getAllOwners() {
    this.ownerService.getAllOwners().subscribe(data => {
        this.owners = data;
      }
    )
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(f: NgForm) {
    this.ownerService.createOwner(f.value)
      .subscribe((result) => {
        this.ngOnInit();
      });
    this.modalService.dismissAll();
  }

  openEdit(targetModal: any, owner: Owner) {
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

  onSave() {
    const editURL = 'http://localhost:8080/owners/' + this.ownerId;
    this.httpClient.put(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
      });
    this.modalService.dismissAll();
    this.ngOnInit();
  }

  openDelete(targetModal: any, owner: Owner) {
    this.ownerId = owner.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = 'http://localhost:8080/owners/' + this.ownerId;
    this.httpClient.delete(deleteURL)
      .subscribe((results) => {
        this.owners = this.owners.filter(obj => obj.id !== this.ownerId);
      });
    this.modalService.dismissAll();
  }
}
