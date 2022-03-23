import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateWiseService {
  tableData = [];

  constructor() { }

  dateSearch(date) {
    console.log('date search :', date);
  }
  fetchTableData() {
    this.tableData = [
      {
        id: 1,
        name: 'test',
        time: '123',
      },
      {
        id: 2,
        name: 'test',
        time: '123',
      },
      {
        id: 3,
        name: 'test',
        time: '123',
      },
      {
        id: 4,
        name: 'test',
        time: '123',
      },
      {
        id: 5,
        name: 'test',
        time: '123',
      },
      {
        id: 6,
        name: 'test',
        time: '123',
      },
      {
        id: 7,
        name: 'test',
        time: '123',
      },
      {
        id: 8,
        name: 'test',
        time: '123',
      },
      {
        id: 9,
        name: 'test',
        time: '123',
      },
      {
        id: 10,
        name: 'test',
        time: '123',
      },
      {
        id: 11,
        name: 'test',
        time: '123',
      },
      {
        id: 12,
        name: 'test',
        time: '123',
      },
      {
        id: 13,
        name: 'test',
        time: '123',
      },
      {
        id: 14,
        name: 'test',
        time: '123',
      },
      {
        id: 15,
        name: 'test',
        time: '123',
      },
    ];
    return this.tableData;
  }
}

