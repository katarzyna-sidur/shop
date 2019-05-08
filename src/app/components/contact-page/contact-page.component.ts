import { Component, OnInit } from '@angular/core';
import { MapOptions, latLng, tileLayer, Layer, marker, icon } from 'leaflet';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {

    pageTitle = 'Contact';
    categoryTitle = 'Contact us';

    osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    esriOrto = '<a href="leaflet-extras.github.io/leaflet-providers/preview/#filter=Esri.WorldImagery">Esri and the GIS User Community</a>';

  constructor() { }

  options: MapOptions = {
        layers: [
            tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution:
                    '&copy; ' + this.osmLink + ' Contributors'
            })
        ],
        zoom: 16,
        center: latLng(50.052215, 19.927782)
    };

    layersControl = {
        baseLayers: {
            'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution:
                    '&copy; ' + this.osmLink + ' Contributors'
            }),
            'OrtofotoMap': tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png',
                {
                    maxZoom: 18,
                    attribution: '&copy; ' + this.esriOrto
                })
        }
    };
    layers: Layer[] = [
        marker([50.052215, 19.927782], {
            icon: icon({
                iconSize: [25, 41],
                iconAnchor: [13, 41],
                iconUrl: '/assets/images/loc.png',
            })
        })
    ];

  ngOnInit() {
  }

}
