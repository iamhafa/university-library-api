export enum RESPONSE_RESULT {
  NG = '0', // lỗi
  OK = '1', // thành công
}

export enum STATUS_CODE {
  NG = 200,
  OK = 200,
}

export enum BORROWING_STATUS {
  BORROWING = 'BORROWING', // đang mượn
  RETURNED = 'RETURNED', // đã trả sách
  OVERDUE = 'OVERDUE', // quá hạn
  CANCELLED = 'CANCELLED', // hủy lượt mượn sách
  PENDING = 'PENDING',
  LOST = 'LOST', // sách đã mất,
  COMPENSATED = 'COMPENSATED', // đã bồi thường do bị phạt do trả trễ sách
  PAID_FINE = 'PAID_FINE',
}

export enum FINE_TICKET_STATUS {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
}

export enum FINE_TICKET_PAYMENT_METHOD {
  CASH = 'CASH',
  BANKING = 'BANKING',
}

export enum MEMBER_TYPE {
  LECTURER = 'LECTURER', // giảng viên
  UNDERGRADUATE_STUDENT = 'UNDERGRADUATE_STUDENT', // sinh viên đang còn học
  GRADUATED_STUDENT = 'GRADUATED_STUDENT', // sinh viên đã tốt nghiệp
}

export enum JOB_NAME {
  FINE_TICKET = 'job-fine_ticket',
  BOOK_BORROWING = 'job-book_borrowing',
  BOOK_BORROWING_ITEMS = 'job-book_borrowing_items',
}

export enum ROLE {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  USER = 'USER',
}
