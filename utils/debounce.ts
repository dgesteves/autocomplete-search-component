export function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: NodeJS.Timeout | null;
  return function (this: any, ...args: any[]) {
    const context: any = this;
    clearTimeout(timeout as NodeJS.Timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}
