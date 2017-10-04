/**
 * Created by Comfort Mawkga on 2017/10/04.
 */
export class Alert {
  type: AlertType;
  message: string;
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning
}
