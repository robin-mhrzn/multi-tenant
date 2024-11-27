export class ResponseDTO<T = object> {
  constructor(success: boolean, message: string, data: T) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
  success: boolean;
  message: string;
  data: T;
}
