import { Subject, Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.interface';

declare let firebase: any;

@Injectable()
export class AuthService {

    constructor(private router: Router) {}

    signupUser(user: User) {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .catch(function(error) {
            // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
              } else {
                alert(errorMessage);
              }
              console.log(error);
            });
    }

    signinUser(user: User) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .catch(function(error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        });
    }

    logoutUser() {
      firebase.auth().signOut();
      this.router.navigate(['/signin']);
    }

    isSigned(): Observable<boolean> {
      const subject = new Subject<boolean>();
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          subject.next(true);
        } else {
          subject.next(false);
        }
      });
      return subject.asObservable();
    }
}
