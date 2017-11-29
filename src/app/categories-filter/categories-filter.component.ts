import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';


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
  filterStrings = '';
  categories = {};

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => this.categories = data, error => console.log(error));
  }

  public getJSON(): Observable<any> {
    return this.http.get('assets/categories_array.1.json');
  }

  ngOnInit() {}

}
