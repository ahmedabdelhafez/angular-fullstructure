import {
  RxwebValidators,
  required,
  numeric,
  alpha,
  compare,
  NumericValueType,
  email,
  password,
} from "@rxweb/reactive-form-validators";

export class UsersForm {
  constructor() {}

  @required({ message: "this field is required" })
  empid: number;

  @alpha({ message: "this field must be string" })
  username: string;

  @numeric({
    allowDecimal: true,
    acceptValue: NumericValueType.PositiveNumber,
    message: "",
  })
  @required()
  salary: number;

  @email({
    disableExpression: (ele) => {
      ele.salary > 3000;
    },
  })
  email: string;

  @required()
  password: string;

  @compare({ fieldName: "password" })
  confirmPassword: string;
}
