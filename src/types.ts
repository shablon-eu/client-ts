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

export interface Email {
  to: string | string[];
  cc: string | string[];
  bcc: string | string[];
  from?: string;
  template: string;
  parameters?: { [key: string]: Variable };
  idempotencyKey?: string;
}

export interface Outgoing {
  id: string;
  status: Status;
}

export interface OutgoingStatus {
  status: Status;
  opened: false | Date;
}
