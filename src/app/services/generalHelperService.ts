import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GeneralHelperService {

  static StringIsNumber = (value: any) => !isNaN(Number(value));

  public static ToArray(enumToConvert: any) {
    return Object.keys(enumToConvert)
      .filter(this.StringIsNumber)
      .map(key => enumToConvert[key]);
  }
}
