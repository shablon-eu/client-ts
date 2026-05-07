export type Status =
  | "sandbox"
  | "queued"
  | "error"
  | "sent"
  | "rejected"
  | "returned";

type Variable =
  | string
  | boolean
  | number
  | Variable[]
  | { [key: string]: Variable };

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

interface EmailData {
  to?: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  from?: string;
  template: string;
  parameters?: { [key: string]: Variable };
  idempotencyKey?: string;
  attachments?: {
    filename: string;
    content: string;
    encoding: "base64";
    disposition?: string;
    content_id?: string;
  }[];
}

export type Email = RequireAtLeastOne<EmailData, "to" | "bcc" | "cc">;

export interface Outgoing {
  id: string;
  status: Status;
}

export interface OutgoingStatus {
  status: Status;
  opened: false | Date;
}
