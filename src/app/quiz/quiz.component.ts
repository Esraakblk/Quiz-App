import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QuizServicesService } from '../services/quiz-services.service';
import { NgForm } from '@angular/forms';
import { interval } from 'rxjs';
import { questions } from '../../assets/questions';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ResultComponent } from '../quiz-result/quiz-result.component';



@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, ResultComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {
  [x: string]: any;
  questions: Array<Object> = [];
  questionNo: number = 0;
  question: any;
  answers: Array<any> = new Array(10).fill(null);
  correct: number = 0;
  @Output('endQuiz') endQuiz: EventEmitter<any> = new EventEmitter();


  constructor(private quizService: QuizServicesService, private _router: Router,private _cdr:ChangeDetectorRef) { }
  shuffle(array: Array<Object>) {
    array.sort(() => Math.random() - 0.5);
  }
  ngOnInit(): void {
    this.questions = this.randomQuestions();
    this.question = this.questions[0];
    this.quizService.setQuestions(this.questions);
  }
  randomQuestions() {
    this.shuffle(questions);
    return questions.slice(0, 10);
  }
  setQuestion(queNo: number) {
    this.questionNo = queNo;
    this.question = this.questions[queNo];
  }
  setAnswer(index: number, answer: number) {
    this.answers[index] = answer;
    this.quizService.setAnswers(this.answers);
    const correctAnswerIndex = this.quizService.getQuestions()[index].answer;
    const options = document.querySelectorAll('.options li');
    options.forEach((option, i) => {
      if (i === correctAnswerIndex) {
        option.classList.remove('correct');
        option.classList.remove('incorrect');
      }

      if (i === answer) {
        if (answer === correctAnswerIndex) {
          option.classList.add('correct');
          this._cdr.detectChanges()
          console.log("1")
        } else {
          option.classList.add('incorrect');
          this._cdr.detectChanges()

          console.log("2",option)
        }
      }
    });

  }
  nextQue() {
    if (this.questionNo < 9) {
      this.questionNo += 1;
      this.setQuestion(this.questionNo);
    }
  }
  prevQue() {
    if (this.questionNo > 0) {
      this.questionNo -= 1;
      this.setQuestion(this.questionNo);
    }
  }
  clear() {
    this.answers[this.questionNo] = null;
  }
  submit() {
    this._router.navigateByUrl("/result")
  }
}
