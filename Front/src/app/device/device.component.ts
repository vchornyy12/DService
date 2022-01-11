import { Component, OnInit } from '@angular/core';
import {Device} from './device';
import {DeviceService} from "./device.service";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient} from "@angular/common/http";
import {Owner} from "../owner/owner";

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  public devices: Device[] = [];
  closeResult: string | undefined;
  editForm!: FormGroup;
  public deviceId: number | undefined;
  owner!: Owner;
  private readonly deviceUrl = 'http://localhost:8080/devices/';

  constructor(private deviceService: DeviceService, private modalService: NgbModal,
              private fb: FormBuilder, private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    this.getAllDevices();
    this.editForm = this.fb.group({
      id: [''],
      deviceType: [''],
      model: [''],
      code: [''],
      status: [''],
      owner: ['']
    })
  }

  private getAllDevices() {
    this.deviceService.getAllDevices().subscribe(result => {
        this.devices = result;
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
    this.deviceService.createDevice(f.value)
      .subscribe((result) => {
        this.ngOnInit();
      });
    this.modalService.dismissAll();
  }

  openEdit(targetModal: any, device: Device) {
    this.deviceId = device.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue({
      id: device.id,
      deviceType: device.deviceType,
      model: device.model,
      code: device.code,
      status: device.status
    });

  }

  onSave() {
    const editURL = this.deviceUrl + this.deviceId;
    this.httpClient.put(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
      });
    this.modalService.dismissAll();
    this.ngOnInit(); console.log(this.owner.id)
  }

  openDelete(targetModal: any, device: Device) {
    this.deviceId = device.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = this.deviceUrl + this.deviceId;
    this.httpClient.delete(deleteURL)
      .subscribe((results) => {
        this.devices = this.devices.filter(obj => obj.id !== this.deviceId);
      });
    this.modalService.dismissAll();
  }

}
