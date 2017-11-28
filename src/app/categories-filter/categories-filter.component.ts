import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient } from '@angular/common/http';


@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  public transform(values: any[], filter: string): any[] {
    if (!values || !values.length) {
       return [];
    }
    if (!filter) {
      return values;
    }
    return values.filter(v => v.indexOf(filter) >= 0);
  }
}

@Component({
  selector: 'app-categories-filter',
  templateUrl: './categories-filter.component.html',
  styleUrls: ['./categories-filter.component.css']
})
export class CategoriesFilterComponent implements OnInit {
  filterString = '';
  categories_object = {};

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => this.categories_object = data, error => console.log(error));
  }

  public getJSON(): Observable<any> {
    return this.http.get('assets/categories.json')
    .map((res: Response) => {
      if (res) {
          if (res.status === 201) {
              return [{ status: res.status, json: res }];
          } else if (res.status === 200) {
              return [{ status: res.status, json: res }];
          }
      }
    }).catch((error: any) => {
        if (error.status === 500) {
            return Observable.throw(new Error(error.status));
        } else if (error.status === 400) {
            return Observable.throw(new Error(error.status));
        } else if (error.status === 409) {
            return Observable.throw(new Error(error.status));
        } else if (error.status === 406) {
            return Observable.throw(new Error(error.status));
        }
    });

  }

  ngOnInit() {}

}
