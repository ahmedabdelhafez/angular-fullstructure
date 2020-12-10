import { AbstractControl } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import {
  required,
  numeric,
  alpha,
  compare,
  NumericValueType,
  email,
  password,
  propObject,
  prop,
  contains,
  range,
  minLength,
  propArray,
  date,
  maxDate,
  greaterThan,
  lessThan,
  elementClass,
  minNumber,
  error,
  disable,
  alphaNumeric,
  json,
  requiredTrue,
} from "@rxweb/reactive-form-validators";

/// address model

export class AddressForm {
  @prop()
  @required({ message: "this field is required" })
  @alpha()
  city: string;

  @prop()
  @required({ message: "this field is required" })
  zipcode: number;
}

export class Courses {
  @required()
  @prop()
  courseId: number;
  @required()
  @prop()
  @alpha()
  courseName: string;
}

export class UsersForm {
  constructor() {}

  @required({ message: "this field is required" })
  @numeric()
  @prop()
  empid: number;

  // @error({
  //   conditionalExpression: function (control: AbstractControl) {
  //     return this.username === "ahmed";
  //   },
  // })
  @alpha({
    message: "this field must be string",
  })
  @minLength({ value: 3 })
  @required({
    conditionalExpression: (ele) => {
      return ele.empid == 10;
    },
  })
  @disable({
    conditionalExpression: function (control: AbstractControl) {
      return this.empid > 50;
    },
  })
  // @prop()
  username: string;

  @required()
  @prop()
  countryName: string;

  @required()
  @numeric({
    allowDecimal: true,
    acceptValue: NumericValueType.PositiveNumber,
    message: "enter a valida slary",
  })
  @prop()
  @minNumber({
    conditionalExpression: function (control: AbstractControl) {
      return this.username === "ahmed";
    },
    value: 5000,
  })
  salary: number;

  @prop()
  @requiredTrue()
  isActive: boolean;

  @required()
  @range({
    minimumNumber: 18,
    maximumNumber: 40,
    disableExpression: (ele) => {
      ele.salary > 5000;
    },
  })
  age: number;

  @email({
    disableExpression: (ele) => {
      ele.salary > 2000;
    },
  })
  @prop()
  @required({ messageKey: "email", isAddMessageKey: true })
  email: string;

  @prop()
  // @numeric()
  @required()
  mobileNumber: string;

  @required({ message: "pleae enter a valid password" })
  @password({
    message: "not a valid password",
    validation: {
      maxLength: 10,
      minLength: 8,
      alphabet: true,
      specialCharacter: true,
    },
  })
  @prop()
  password: string;

  @prop()
  @compare({ fieldName: "password" })
  confirmPassword: string;

  // @required()
  // @date()
  // @lessThan({ fieldName: "endDate" })
  // startDate: Date;

  // @required()
  // @date()
  // @greaterThan({ fieldName: "startDate" })
  // endDate: Date;

  @propObject(AddressForm)
  address: AddressForm;

  @propArray(Courses)
  courses: Array<Courses>;

  ///////////// << getter & setter >> ///////////////
  get getEmpId() {
    return this.empid;
  }

  get getUsername() {
    return this.username;
  }

  get getEmail() {
    return this.email;
  }

  get getMobileNumber() {
    return this.mobileNumber;
  }

  set setMobileNumber(phoneNumber: any) {
    this.mobileNumber = phoneNumber;
  }
}
