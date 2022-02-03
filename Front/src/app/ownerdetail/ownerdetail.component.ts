import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Owner} from '../owner/owner';
import {ActivatedRoute} from "@angular/router";
import {OwnerService} from "../owner/owner.service";
import {MatTableDataSource} from "@angular/material/table";
import {Device} from "../device/device";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";


@Component({
    selector: 'app-ownerdetail',
    templateUrl: './ownerdetail.component.html',
    styleUrls: ['./ownerdetail.component.css']
})
export class OwnerdetailComponent implements OnInit, AfterViewInit {

    owner!: Owner;
    ownerId!: number;
    displayedColumns: string[] = ['deviceType', 'model', 'code', 'status'];
    dataSource = new MatTableDataSource<Device>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private router: ActivatedRoute, private ownerService: OwnerService, private _liveAnnouncer: LiveAnnouncer) {
    }

    ngOnInit(): void {
        this.router.paramMap
            .subscribe(params => {
                this.ownerId = Number(params.get('id'));
            });
        this.ownerService.getOwner(this.ownerId).subscribe(result => {
            this.owner = result;
            this.dataSource.data = this.owner.devices;
        })

    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    announceSortChange(sortState: Sort) {
        // This example uses English messages. If your application supports
        // multiple language, you would internationalize these strings.
        // Furthermore, you can customize the message to add additional
        // details about the values being sorted.
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }


    }
}
