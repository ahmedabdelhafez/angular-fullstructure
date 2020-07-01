import { Injectable, NgZone } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { baseProdUrl } from "../../assets/config/Config";
import { environment } from "../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class PostService {
  navState: BehaviorSubject<string> = new BehaviorSubject<string>("close");
  constructor(private http: HttpClient, private _zone: NgZone) {}

  getPosts() {
    console.log(`Test URL: ${environment.config.prodUrl}`);

    return this.http.get(`${baseProdUrl}/api/studentsubject/findall`);
  }

  getPost(postId) {
    return this.http.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
  }

  toggleNav(state?: string) {
    this.navState.next(state);
  }

  getCitys() {
    return this.http.get("http://localhost:3000/api/city/findall");
  }

  getState() {
    return this.navState.asObservable();
  }
  /////////////////////////////////////////////////////////////////

  getServerSentEvent(url): Observable<any> {
    return Observable.create((observer) => {
      const eventSource = this.getEventSource(url);
      eventSource.onmessage = (event) => {
        this._zone.run(() => {
          observer.next(event);
        });
      };
      
      eventSource.onerror = (error) => {
        this._zone.run(() => {
          observer.error(error);
        });
      };
    });
  }

  private getEventSource(url: string): EventSource {
    return new EventSource(url);
  }
}
