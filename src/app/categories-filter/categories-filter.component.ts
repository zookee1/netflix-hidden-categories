import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient } from '@angular/common/http';


@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  public transform(values: any[], filter: string): any[] {
    if (!values) {
       return [];
    }

    if(values.categories) {
      return Object.keys(values.categories);
    } else {
      values = [];
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
  categories_object = {};

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => this.categories_object = data, error => console.log(error));
  }

  public getJSON(): Observable<any> {
    return this.http.get('assets/categories.json');
  }

  ngOnInit() {}

}
