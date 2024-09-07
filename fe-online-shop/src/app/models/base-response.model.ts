export interface BaseResponse<T> {
  total?: number;
  data?: T;
  message: string;
  statusCode: number;
  status: string;
}
