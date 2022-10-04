import { abstractError } from "../common/errors/abstractError";

export class TokenInterface {
  public_fields: string[];

  constructor() {
    if (this.constructor === TokenInterface) {
      abstractError();
    }
    this.public_fields = [];
  }

  getInfo(): any {
    abstractError();
  }

  transfer(): any {
    abstractError();
  }

  mint(): any {
    abstractError();
  }
}
