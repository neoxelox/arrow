import { toasts } from "../stores";
import { ToastType } from "../types";

export class notifier {
  private static RANDOM_ENTROPY = 1000000;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  private static notify(type: ToastType, message: string, dismissible = true, timeout = 3000): void {
    const id = Math.floor(Math.random() * this.RANDOM_ENTROPY);

    toasts.update((values) => [
      {
        id: id,
        type: type,
        message: message,
        dismissible: dismissible,
        timeout: timeout,
      },
      ...values,
    ]);

    if (timeout) setTimeout(() => this.dismiss(id), timeout);
  }

  public static async success(message: string, dismissible = true, timeout = 3000): Promise<void> {
    this.notify(ToastType.SUCCESS, message, dismissible, timeout);
  }

  public static async info(message: string, dismissible = true, timeout = 3000): Promise<void> {
    this.notify(ToastType.INFO, message, dismissible, timeout);
  }

  public static async warning(message: string, dismissible = true, timeout = 4000): Promise<void> {
    this.notify(ToastType.WARNING, message, dismissible, timeout);
  }

  public static async error(message: string, dismissible = false, timeout = 5000): Promise<void> {
    this.notify(ToastType.ERROR, message, dismissible, timeout);
  }

  public static async dismiss(id: number): Promise<void> {
    toasts.update((values) => values.filter((value) => value.id !== id));
  }
}
