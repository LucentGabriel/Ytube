import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-youtube-downloader',
  templateUrl: './youtube-downloader.html',
  styleUrl: './youtube-downloader.css',
  standalone: true,
  imports: []
})
export class YoutubeDownloader {
  youtubeUrl: string = '';
  info: any = null;
  selectedFormat: string = '';
  apiBase = 'https://ytube-90a5.onrender.com/api'; // Change if deploying elsewhere

  constructor(private http: HttpClient) {}

  fetchInfo() {
    if (!this.youtubeUrl) return;
    this.http.get(`${this.apiBase}/info`, { params: { url: this.youtubeUrl } })
      .subscribe(data => {
        this.info = data;
        if (this.info.formats && this.info.formats.length > 0) {
          this.selectedFormat = this.info.formats[0].format_id;
        }
      });
  }

  download() {
    if (!this.youtubeUrl || !this.selectedFormat) return;
    const url = `${this.apiBase}/download?url=${encodeURIComponent(this.youtubeUrl)}&format_id=${this.selectedFormat}`;
    window.open(url, '_blank');
  }
}
