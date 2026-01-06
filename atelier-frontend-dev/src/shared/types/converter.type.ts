export interface Converter<F, T> {
  convert(from: F): Promise<T> | T;
}
