import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class AppHeaderComponent implements OnInit {
    @Input() title: string
    constructor() { }

    ngOnInit() { }
}