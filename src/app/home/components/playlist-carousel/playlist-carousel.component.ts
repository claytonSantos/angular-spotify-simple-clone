import { AppService } from './../../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../../auth/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-playlist-carousel',
  templateUrl: './playlist-carousel.component.html',
  styleUrls: ['./playlist-carousel.component.scss']
})
export class PlaylistCarouselComponent implements OnInit {

  token = '';
  obj: any;
  sub: Subscription;
  user: any;
  isLoading: boolean = false;
  images: any = []
  @Input() categorie: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService
  ) { }


  getAlbuns(categorie: string) {
    const token = this.authService.token;
    this.isLoading = true;
    this.appService.getAlbuns(token, categorie)
      .subscribe((result: any) => {
        const items = result.playlists.items;
        this.images = items.map((item: any) => {
          return { path: item.images[0].url, idPlaylist: item.id }
        })
        this.isLoading = false;
      })
  }

  clicked(idPlaylist: string) {
    this.router.navigate(['/playlist-details', idPlaylist])
  }

  ngOnInit() {
    this.getAlbuns(this.categorie);
  }

}
