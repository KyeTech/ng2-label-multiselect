import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public model = [{
    id: 1,
    label: 'Testing'
  }];

  public items = [
    {
        id: 1,
        label: 'Testing'
    },
    {
      id: 2,
      label: 'Testing 2'
    },
    {
      id: 3,
      label: 'Testing Three'
    },
    {
      id: 4,
      label: 'Testing Fourrrrrrrrrr'
    },
    {
      id: 5,
      label: 'Testing Five'
    },
    {
      id: 6,
      label: 'Testing Six'
    },
    {
      id: 7,
      label: 'Testing Seven'
    },
    {
      id: 8,
      label: 'Testing 8'
    },
    {
      id: 9,
      label: 'Testing 9'
    },
    {
      id: 10,
      label: 'Testing Ten'
    }
  ];

  public disabled = false;

  public change(event: any) {
    console.log(event);
  }
}
