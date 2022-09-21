import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, pluck } from 'rxjs';
import { Comments } from './comment';
import { CommentService } from './comment.service';

@Component({
  selector: 'hinv-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  comments$ : Observable<Comments[]> = this.commentService.getComments();

  comment$ = this.activatedRoute.data.pipe(pluck('comments'));


  constructor(private commentService: CommentService,
    private activatedRoute :  ActivatedRoute
    ) { 
  }

  ngOnInit(): void {
    // this.activatedRoute.data.subscribe(data => data['comments']);
  }

}
