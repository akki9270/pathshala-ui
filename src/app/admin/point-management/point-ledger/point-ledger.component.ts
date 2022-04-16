import { Component, OnInit } from '@angular/core';
import { PointLedgerService } from './point-ledger.service';

@Component({
  selector: 'app-point-ledger',
  templateUrl: './point-ledger.component.html',
  styleUrls: ['./point-ledger.component.scss'],
})
export class PointLedgerComponent implements OnInit {

  constructor(
    private pointLedgerService: PointLedgerService
  ) { }

  ngOnInit() { }

}
