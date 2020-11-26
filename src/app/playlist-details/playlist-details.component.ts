import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.scss']
})

export class PlaylistDetailsComponent implements OnInit {

  tracks: any;
  activeTrack: any;
  audio = new Audio();
  isPlaying: boolean = false;
  id: string;
  albumImg: any;
  isLoading: boolean = false;

  constructor(
    private appService: AppService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
  }

  handleAudioPlay() {
    if (this.activeTrack) {
      this.audio.play();
      this.isPlaying = true;
      return;
    }

    this.activeTrack = this.tracks[0];
    this.audio.src = this.activeTrack.track.preview_url;
    this.audio.play();
    this.isPlaying = true;
  }

  nextAudio() {
    const index = this.tracks.indexOf(this.activeTrack);
    const nextAudio = this.tracks[index + 1];
    this.activeTrack = nextAudio;
    this.audio.src = this.activeTrack.track.preview_url;
    this.audio.play();
    this.isPlaying = true;

  }

  previous() {
    const index = this.tracks.indexOf(this.activeTrack);
    const previousAudio = this.tracks[index - 1];
    this.activeTrack = previousAudio;
    this.audio.src = this.activeTrack.track.preview_url;
    this.audio.play();
    this.isPlaying = true;
  }

  setActiveTrack(track: any) {
    this.activeTrack = track;
    this.audio.src = this.activeTrack.track.preview_url;
  }

  stop() {
    this.audio.pause();
    this.isPlaying = false;
  }

  play(track: any) {
    this.setActiveTrack(track);
    this.audio.play();
    this.isPlaying = true;
  }

  ngOnInit() {
    this.isLoading = true;
    this.route.params.subscribe(
      (params: any) => {
        this.id = params.id;
      }
    )

    const token = this.authService.token;
    this.appService.fetchPlaylist(token, this.id)
      .subscribe((response: any) => {
        this.tracks = response.tracks.items;
        this.albumImg = response?.images[0]?.url;
        this.isLoading = false;
      })
  }


  OnDestroy() {
    this.isPlaying = false;
    this.audio.src = ''
  }

}
