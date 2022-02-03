import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Device} from './device';
import {DeviceService} from "./device.service";
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators
} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Owner} from "../owner/owner";
import {OwnerService} from "../owner/owner.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";


export function uniqueValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return control.value.hasError('notUnique') ? {notUnique: true} : null;
    }
}

@Component({
    selector: 'app-device',
    templateUrl: './device.component.html',
    styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit, AfterViewInit {

    public devices: Device[] = [];
    public Statuses: string[] = [];
    public DeviceTypes: string[] = [];
    public Owners: Owner[] = [];
    closeResult!: string;
    deviceForm!: FormGroup;
    public deviceId!: number;
    owner = new FormControl('', [Validators.required]);
    code: any = new FormControl('', [Validators.required, Validators.maxLength(16), uniqueValidator]);
    private readonly deviceUrl = 'http://localhost:8080/devices/';

    status: any = new FormControl('', [Validators.required]);
    deviceType: any = new FormControl('', [Validators.required]);

    displayedColumns: string[] = ['deviceType', 'model', 'code', 'status', 'owner.firstName', 'action'];
    dataSource = new MatTableDataSource<Device>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


    constructor(private deviceService: DeviceService, private modalService: NgbModal,
                private fb: FormBuilder, private httpClient: HttpClient, private ownerService: OwnerService, private _liveAnnouncer: LiveAnnouncer) {

    }

   public ngOnInit(): void {
        this.getAllDevices();
        this.getDeviceTypes();
        this.getDeviceStatuses();
        this.getAllOwners();
        this.deviceForm = this.fb.group({
            id: [''],
            deviceType: this.deviceType,
            model: ['', [Validators.required]],
            code: this.code,
            status: this.status,
            owner: this.owner
        })
    }

   public ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

   public applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

   public announceSortChange(sortState: Sort): void {

        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }

    public validateControl = (controlName: string) => {
        return this.deviceForm.controls[controlName].invalid && this.deviceForm.controls[controlName].touched;
    }

    public hasError = (controlName: string, errorName: string) => {
        return this.deviceForm.controls[controlName].hasError(errorName);
    }


    public getAllOwners(): void {
        this.ownerService.getAllOwners().subscribe(response =>
            this.Owners = response);
    }

    public getDeviceTypes(): void {
        this.deviceService.getDeviceTypes().subscribe(response =>
            this.DeviceTypes = response);
    }

    public getDeviceStatuses(): void {
        this.deviceService.getDeviceStatuses().subscribe(response =>
            this.Statuses = response);
    }

    private getAllDevices(): void {
        this.deviceService.getAllDevices().subscribe(result => {
                this.devices = result;
                this.dataSource.data = result;
            }
        )
    }

    public getDeviceCodeErrorMessage(): any {
        if (this.code.hasError('required')) {
            return 'Device code can not be empty';
        }
        if (this.code.hasError('maxlength')) {
            return 'Device code can not be more then 16 symbols long';
        }
        if (this.code.hasError('notUnique')) {
            return 'Device with such code already exists';
        }
    }

    public open(content: unknown): void {
        this.deviceForm.reset();
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: unknown): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    public onSubmit(): void {
        this.deviceService.createDevice(this.deviceForm.value)
            .subscribe({
                next: (response) => {
                    this.devices.push(response);
                    this.deviceForm.reset();
                    this.modalService.dismissAll();
                    this.dataSource.data = [...this.devices];
                },
                error: (err: HttpErrorResponse) => {
                    if (err.status == 409) {
                        this.code.setErrors({'notUnique': true})
                    }
                }

            });

    }

    public openEdit(targetModal: unknown, device: Device): void {
        this.deviceId = device.id;
        this.modalService.open(targetModal, {
            backdrop: 'static',
            size: 'lg'
        });
        this.deviceForm.patchValue({
            id: device.id,
            deviceType: device.deviceType,
            model: device.model,
            code: device.code,
            status: device.status,
            owner: device.owner
        });

    }

    public onSave(): void {
        this.httpClient.put(this.deviceUrl + this.deviceId, this.deviceForm.value)
            .subscribe({
                next: () => {
                    this.getAllDevices();
                    this.deviceForm.reset();
                    this.modalService.dismissAll();
                    this.dataSource.data = [...this.dataSource.data];
                },

                error: (err: HttpErrorResponse) => {
                    if (err.status == 409) {
                        this.code.setErrors({'notUnique': true})
                    }
                }

            });

    }

    public openDelete(targetModal: unknown, device: Device): void {
        this.deviceId = device.id;
        this.modalService.open(targetModal, {
            backdrop: 'static',
            size: 'lg'
        });
    }

    public onDelete(): void {
        this.httpClient.delete(this.deviceUrl + this.deviceId)
            .subscribe(() => {
                this.devices = this.devices.filter(obj => obj.id !== this.deviceId);
                this.dataSource.data = [...this.devices];
            });
        this.modalService.dismissAll();
    }

}
