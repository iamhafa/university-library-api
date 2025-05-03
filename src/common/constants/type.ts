import { ROLE } from './enum';

export type TUser = {
  user: {
    [key: string]: string | number;
    role: ROLE;
  };
};

export type TPagination<T> = {
  data: T;
  current_page: number;
  limit: number;
  total_items: number;
  total_pages: number;
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
