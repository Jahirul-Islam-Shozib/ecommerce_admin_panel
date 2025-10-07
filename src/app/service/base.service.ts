import { Injectable } from '@angular/core';
export interface UrlPathParameters {
  [parameterName: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor() {
  }

  protected create(url: string, parameters: UrlPathParameters) {
    const placeholders = url.match(/({[a-zA-Z]*})/g);
    if (placeholders) {

      placeholders.forEach((placeholder: string) => {
        const key = placeholder.substr(1, placeholder.length - 2);
        const value = parameters[key];

        if (!value?.toString()) {
          throw new Error(`Parameter ${key} was not provided`);
        }
        if (typeof value != 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
          throw new Error(`Value of Parameter ${key} should be either number or string or boolean`);
        }
        url = url.replace(placeholder, encodeURIComponent(value + ''));
      });
    } else {
      throw new Error(`No placeholders found in URL: ${url}`);
    }

    return url;
  }


  errorHandling(error: any): string {
    const {fieldErrors, globalErrors} = error?.error?.errors || {};
    let errorMessages: string[] = []

    if (!!fieldErrors) {
      errorMessages = Object.keys(fieldErrors)
        .flatMap((key: string) => Object.values(fieldErrors[key]))
    }

    if (!!globalErrors && !errorMessages.length) {
      errorMessages = Object.values(globalErrors)
    }

    if (!errorMessages.length) {
      errorMessages = ['Sorry, Something went wrong. please try again later.']
    }
    return errorMessages.join(' \n')
  }

}
