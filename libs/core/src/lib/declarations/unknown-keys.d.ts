export type UnknownKeys<T> = { [K in keyof T]: string extends K ? K : number extends K ? K : never } extends {
  [_ in keyof T]: infer U
}
  ? U
  : never;
