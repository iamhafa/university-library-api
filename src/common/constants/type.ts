export type TPagination<T> = {
  page: number;
  limit: number;
  total: number;
  data: T[];
};

export type TSentMessageInfo = {
  accepted: string[];
  rejected: string[];
  ehlo: string[];
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: {
    from: string;
    to: string[];
  };
  messageId: string;
};
