import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultComponent } from './quiz-result/quiz-result.component';

export const routes: Routes = [
    {path:"login", component:LoginComponent},
    {path:"", pathMatch:"full", redirectTo:"/login"},
    {path:"register", component:RegisterComponent},
    {path:"quiz", component:QuizComponent},
    {path:"result", component:ResultComponent}
];
