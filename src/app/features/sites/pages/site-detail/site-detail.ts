import { Component,HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { SiteService } from '../../services/site.service';
import { Site } from 'src/app/core/models/site/Site';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-site-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './site-detail.html',
  styleUrl: './site-detail.scss'
})
export class SiteDetailComponent {
  private siteService = inject(SiteService);

  private route = inject(ActivatedRoute);

  
  private location = inject(Location);

  imageUrl=
  environment.apiUrl.replace('/api','');

 selectedPhotos: any[] = [];

selectedIndex = signal(0);

selectedPhoto: string | null = null;

selectedDate = '';

selectedNom = '';

zoom = signal(1);
  site = signal<Site | null>(null);

  error = signal('');

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.loadSite(id);
  }

 ouvrirPhoto(photo: any): void {

  const photos =
    this.site()?.photos ?? [];

  this.selectedPhotos = photos;


  const index =
    photos.findIndex(
      p => p.id === photo.id
    );


  this.selectedIndex.set(index);


  this.afficherPhoto(index);
}

afficherPhoto(index:number):void
{

  if(
    !this.selectedPhotos ||
    this.selectedPhotos.length === 0
  )
    return;


  const photo =
    this.selectedPhotos[index];


  this.selectedPhoto =
      this.imageUrl + photo.chemin;


  this.selectedDate =
      photo.dateCapture;


  this.selectedNom =
      photo.nomFichier;

}

photoSuivante():void
{

  let index =
      this.selectedIndex();


  index++;


  if(index >= this.selectedPhotos.length)
  {
    index = 0;
  }


  this.selectedIndex.set(index);


  this.afficherPhoto(index);

}

photoPrecedente():void
{

  let index =
      this.selectedIndex();


  index--;


  if(index < 0)
  {
    index =
    this.selectedPhotos.length - 1;
  }


  this.selectedIndex.set(index);


  this.afficherPhoto(index);

}
@HostListener('document:keydown.escape')
fermerAvecEscape()
{
  this.fermerPhoto();
}
@HostListener('document:keydown.arrowright')
droite()
{
  if(this.selectedPhoto)
  {
    this.photoSuivante();
  }
}



@HostListener('document:keydown.arrowleft')
gauche()
{
  if(this.selectedPhoto)
  {
    this.photoPrecedente();
  }
}


fermerPhoto(): void {

  this.selectedPhoto = null;

}

  retour(): void {
  this.location.back();
}

  loadSite(id: number): void {
    this.siteService.getById(id).subscribe({
      next: (data) => {
        console.log('SITE DETAIL :', data);

        this.site.set(data);
      },

      error: (err) => {
        console.error(err);

        this.error.set('Impossible de charger le site');
      }
    });
  }
}