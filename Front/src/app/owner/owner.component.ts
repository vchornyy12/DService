import {Component, OnInit} from '@angular/core';
import {Owner} from './owner';
import {OwnerService} from "./owner.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
    ownerForm!: FormGroup;
    public ownerId: number | undefined;
    sortedData: Owner[];
    ownersUrl = 'http://localhost:8080/owners/';

    constructor(private ownerService: OwnerService, private modalService: NgbModal,
                private fb: FormBuilder, private httpClient: HttpClient) {
        this.sortedData = this.owners.slice();
    }

    ngOnInit(): void {
        this.getAllOwners();
        this.ownerForm = this.fb.group({
            id: [''],
            firstName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
            lastName: new FormControl('', [Validators.required, Validators.maxLength(30)])
        })
    }

    public validateControl = (controlName: string) => {
        return this.ownerForm.controls[controlName].invalid && this.ownerForm.controls[controlName].touched;


    }

    public hasError = (controlName: string, errorName: string) => {
        return this.ownerForm.controls[controlName].hasError(errorName);


    }

    public getAllOwners() {
        this.ownerService.getAllOwners().subscribe(data => {
                this.owners = data;
            }
        )
    }

    public open(content: any) {
        this.ownerForm.reset();
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

    public onSubmit() {
        this.ownerService.createOwner(this.ownerForm.value)
            .subscribe((result) => {
                this.owners.push(result);
                this.ownerForm.reset();
            });
        this.modalService.dismissAll();
    }

    public openEdit(targetModal: any, owner: Owner) {
        this.ownerId = owner.id;
        this.modalService.open(targetModal, {
            backdrop: 'static',
            size: 'lg'
        });
        this.ownerForm.patchValue({
            id: owner.id,
            firstName: owner.firstName,
            lastName: owner.lastName
        });
    }

    public onSave() {
        const editURL = this.ownersUrl + this.ownerId;
        this.httpClient.put(editURL, this.ownerForm.value)
            .subscribe(() => {
                this.ngOnInit();
                this.ownerForm.reset();
            });
        this.modalService.dismissAll();
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
            .subscribe(() => {
                this.owners = this.owners.filter(obj => obj.id !== this.ownerId);
            });
        this.modalService.dismissAll();
    }
}
