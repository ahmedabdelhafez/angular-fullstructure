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
} from "@rxweb/reactive-form-validators";

export class AddressForm {
  @prop()
  @required({ message: "this field is required" })
  @contains({value:'#@$%'})
  city: string;

  @prop()
  @required({ message: "this field is required" })
  zipcode: number;
}

export class UsersForm {
  constructor() {}

  @required({ message: "this field is required" })
  @prop()
  empid: number;

  @alpha({
    message: "this field must be string",
    disableExpression: (ele) => {
      ele.empid > 5;
    },
  })
  @prop()
  username: string;

  @required()
  @numeric({
    allowDecimal: true,
    acceptValue: NumericValueType.PositiveNumber,
    message: "enter a valida slary",
  })
  @prop()
  salary: string;

  @email({
    disableExpression: (ele) => {
      ele.salary > 2000;
    },
  })
  @prop()
  email: string;

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

  @propObject(AddressForm)
  address: AddressForm;
}

/// address model
