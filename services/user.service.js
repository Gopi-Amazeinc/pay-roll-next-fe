import { BehaviorSubject } from "rxjs";

import Router from "next/router";

const userSubject = new BehaviorSubject(

    // process.browser 
    typeof window !== 'undefined'
    && JSON.parse(sessionStorage.getItem("userID"))
  );
  export const userService = {
    user: userSubject.asObservable(),
    get userValue() {
      return userSubject.value;
    },
  };