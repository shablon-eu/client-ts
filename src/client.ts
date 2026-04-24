import {
  AddressError,
  EnvironmentError,
  IdempotentError,
  NotFoundError,
  TemplateError,
  UnexpectedError,
  ValidationError,
} from "./errors.js";
import type { Email, Outgoing, OutgoingStatus, Status } from "./types.js";

export class Client {
  private baseUrl: string = "https://api.shablon.eu";
  private apiKey: string;
  private environment?: string;
  private from?: string;

  constructor(options: {
    apiKey: string;
    environment?: string;
    from?: string;
  }) {
    this.apiKey = options.apiKey;
    this.environment = options?.environment;
    this.from = options?.from;
  }

  public setEnvironment(environment: string): void {
    this.environment = environment;
  }

  public async send(data: Email): Promise<Outgoing> {
    const url = new URL("/v1/send", this.baseUrl);

    if (!data.from) {
      data.from = this.from;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        environment: this.environment,
      }),
    });

    if (!response.ok) {
      if (response.status === 400) {
        // validation fail
        const content = (await response.json()) as {
          status: string;
          reason: string;
          issues?: unknown;
        };

        switch (content.reason) {
          case "validation failed":
            throw new ValidationError(content.issues);

          case "invalid sender domain, must be verified":
            throw new AddressError(content.reason);

          case "cannot determine environment":
            throw new EnvironmentError(content.reason);

          case "message already received with provided key":
            throw new IdempotentError(content.reason);

          case "cannot determine template":
          case "cannot determine template through discriminator":
            throw new TemplateError(content.reason);
        }
      }

      throw new UnexpectedError();
    }

    return (await response.json()) as { status: Status, id: string};
  }

  public async status(id: string): Promise<OutgoingStatus> {
    const url = new URL(`/v1/outgoing/status/${id}`);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new NotFoundError();
      }

      throw new UnexpectedError();
    }

    const data = (await response.json()) as {
      status: Status;
      opened: false | string;
    };

    return {
      status: data.status,
      opened: data.opened === false ? false : new Date(data.opened),
    };
  }
}
