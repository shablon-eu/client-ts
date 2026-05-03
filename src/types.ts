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

type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>;
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

export type Email = RequireOnlyOne<EmailData, "to" | "bcc" | "cc">;

export interface Outgoing {
  id: string;
  status: Status;
}

export interface OutgoingStatus {
  status: Status;
  opened: false | Date;
}
