import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DateWiseService {
  tableData = [];

  constructor(private http: HttpClient) { }
  private env = environment;
  private URL = this.env.server_url;

  dateSearch(params) {
    return this.http.get(this.URL + '/getDateWiseStudentData', { params })
      .pipe(
        tap(() => console.log('getDateWiseStudentData'))
      )
  }
  fetchTableData() {
    this.tableData = [
      {
        "id": "623c5cedee2aa25c14e32645",
        "index": 0,
        "name": "Martina Callahan",
        "time": "+1 (871) 465-3866"
      },
      {
        "id": "623c5ced9afca004ffdc1876",
        "index": 1,
        "name": "Deborah Morrow",
        "time": "+1 (869) 403-3187"
      },
      {
        "id": "623c5ced1d837a8849c894d0",
        "index": 2,
        "name": "Dunn Savage",
        "time": "+1 (930) 431-2697"
      },
      {
        "id": "623c5ced096d35ad704b334b",
        "index": 3,
        "name": "Goff Alston",
        "time": "+1 (878) 444-2957"
      },
      {
        "id": "623c5ced1b92604831dbb9c6",
        "index": 4,
        "name": "Holt Suarez",
        "time": "+1 (932) 451-3541"
      },
      {
        "id": "623c5ced7ee4ab814942245a",
        "index": 5,
        "name": "Ernestine Holland",
        "time": "+1 (962) 533-2918"
      },
      {
        "id": "623c5ced8b5916101d6699dd",
        "index": 6,
        "name": "Annie Sargent",
        "time": "+1 (809) 591-2792"
      },
      {
        "id": "623c5ced833adc8e70b901d4",
        "index": 7,
        "name": "Meghan Simmons",
        "time": "+1 (968) 428-2622"
      },
      {
        "id": "623c5cedde704b209d7bc371",
        "index": 8,
        "name": "Rowena Colon",
        "time": "+1 (891) 518-2449"
      },
      {
        "id": "623c5ceda7e4d1b8905f4837",
        "index": 9,
        "name": "Celia Shelton",
        "time": "+1 (898) 523-2749"
      },
      {
        "id": "623c5ced02fe44842d5d56d7",
        "index": 10,
        "name": "Juliette Maxwell",
        "time": "+1 (810) 435-3879"
      },
      {
        "id": "623c5ced4ef3053fd553bfd8",
        "index": 11,
        "name": "Ratliff Moon",
        "time": "+1 (942) 571-3203"
      },
      {
        "id": "623c5ced7072ce1300934956",
        "index": 12,
        "name": "Isabella Cannon",
        "time": "+1 (818) 501-2324"
      },
      {
        "id": "623c5ced83a463100f53d9be",
        "index": 13,
        "name": "Dona Wagner",
        "time": "+1 (996) 465-2811"
      },
      {
        "id": "623c5ced73284b8d665be275",
        "index": 14,
        "name": "Young Branch",
        "time": "+1 (873) 404-3721"
      }
    ];
    return this.tableData;
  }
}

