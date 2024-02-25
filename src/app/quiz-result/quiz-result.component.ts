import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizServicesService } from '../services/quiz-services.service';
import {NgForm} from '@angular/forms';
import { questions } from '../../assets/questions';
import { QuizComponent } from '../quiz/quiz.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-result.component.html',
  styleUrl: './quiz-result.component.scss',
})
export class ResultComponent{
  questions: Array<any> = [];
  correctAnswers: Array<number> = [];
  answers: Array<any> = [];
  correct: number = 0;
  wrong: number = 0;
  unattempted: number = 0;

  constructor(quizService: QuizServicesService,private QuestionsListService: QuizServicesService, private _router:Router) {}
  ngOnInit() {
    this.questions = this.QuestionsListService.getQuestions();
    this.answers = this.QuestionsListService.getAnswers();

    this.questions.forEach((question, index) => {
      if (question.answer == this.answers[index]) {
        this.correct++;
      } else if (this.answers[index] == null) {
        this.unattempted++;
      } else {
        this.wrong++;
      }
    });
  }
  reload() {
    this._router.navigateByUrl("/quiz")
  }
  
  
}
