import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Owner} from './owner';
import {OwnerService} from "./owner.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";


@Component({
    selector: 'owner',
    templateUrl: './owner.component.html',
    styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit, AfterViewInit {

    public owners: Owner[] = [];
    closeResult: string | undefined;
    ownerForm!: FormGroup;
    public ownerId: number | undefined;
    ownersUrl = 'http://localhost:8080/owners/';
    displayedColumns: string[] = ['firstName', 'lastName', 'actions'];
    dataSource = new MatTableDataSource<Owner>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private ownerService: OwnerService, private modalService: NgbModal,
                private fb: FormBuilder, private httpClient: HttpClient, private _liveAnnouncer: LiveAnnouncer) {
    }

    ngOnInit(): void {
        this.getAllOwners();
        this.ownerForm = this.fb.group({
            id: [''],
            firstName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
            lastName: new FormControl('', [Validators.required, Validators.maxLength(30)])
        })
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    announceSortChange(sortState: Sort): void {

        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }

    public getAllOwners(): void {
        this.ownerService.getAllOwners().subscribe(data => {
                this.owners = data;
                this.dataSource.data = data;
            }
        )
    }

    public validateControl = (controlName: string) => {
        return this.ownerForm.controls[controlName].invalid && this.ownerForm.controls[controlName].touched;
    }

    public hasError = (controlName: string, errorName: string) => {
        return this.ownerForm.controls[controlName].hasError(errorName);
    }


    public open(content: any): void {
        this.ownerForm.reset();
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

        });
    }

    public getDismissReason(reason: unknown): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    public onSubmit(): void {
        this.ownerService.createOwner(this.ownerForm.value)
            .subscribe((result) => {
                this.owners.push(result);
                this.ownerForm.reset();
                this.dataSource.data = [...this.owners];
            });
        this.modalService.dismissAll();
    }

    public openModal(targetModal: any, owner: Owner): void {
        this.ownerId = owner.id;
        this.modalService.open(targetModal, {
            backdrop: 'static',
            size: 'lg'
        });
    }

    public openEdit(targetModal: any, owner: Owner): void {
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

    public onSave(): void {
        const editURL = this.ownersUrl + this.ownerId;
        this.httpClient.put(editURL, this.ownerForm.value)
            .subscribe(() => {
                this.getAllOwners();
                this.ownerForm.reset();
                this.dataSource.data = [...this.dataSource.data];
            });
        this.modalService.dismissAll();
    }

    public openDelete(targetModal: any, owner: Owner): void {
        this.ownerId = owner.id;
        this.modalService.open(targetModal, {
            backdrop: 'static',
            size: 'lg'
        });
    }

    public onDelete(): void {
        const deleteURL = this.ownersUrl + this.ownerId;
        this.httpClient.delete(deleteURL)
            .subscribe(() => {
                this.owners = this.owners.filter(obj => obj.id !== this.ownerId);
                this.dataSource.data = [...this.owners];
            });
        this.modalService.dismissAll();
    }
}
