import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  received_events_url: string;
  type: string;
  score: number;
}

export interface Users {
  total_count: number;
  incomplete_results: boolean;
  items: User[];
}

@Injectable()
export class SearchUserService {

  constructor(private http: HttpClient) { }

  checkUser(login: string): Observable<Users> {
    return this.http.get<Users>('https://api.github.com/search/users', {
      params: new HttpParams().set('q', 'user:' + login)
    });
  }
}
