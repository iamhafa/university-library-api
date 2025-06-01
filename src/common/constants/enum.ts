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
  /**
   * Giảng viên của trường, có quyền mượn sách và sử dụng các tài nguyên hỗ trợ giảng dạy.
   */
  LECTURER = 'LECTURER',

  /**
   * Sinh viên đại học đang theo học chính quy, có quyền mượn sách và tài liệu phục vụ học tập.
   */
  UNDERGRADUATE_STUDENT = 'UNDERGRADUATE_STUDENT',

  /**
   * Sinh viên đã tốt nghiệp, có thể vẫn được mượn sách (nếu thư viện cho phép),
   * hoặc sử dụng các tài liệu nghiên cứu.
   */
  GRADUATED_STUDENT = 'GRADUATED_STUDENT',

  /**
   * Sinh viên cao học (thạc sĩ, tiến sĩ) đang học tập và nghiên cứu.
   */
  POSTGRADUATE_STUDENT = 'POSTGRADUATE_STUDENT',

  /**
   * Nhân viên thư viện: quản lý, thủ thư, admin... Họ có quyền quản lý sách và tài khoản thành viên.
   */
  LIBRARY_STAFF = 'LIBRARY_STAFF',

  /**
   * Độc giả bên ngoài (cựu sinh viên, khách, hoặc người dùng đặc biệt được phép sử dụng thư viện).
   */
  GUEST_READER = 'GUEST_READER',
}

export enum JOB_NAME {
  SYNC_OVERDUE_BORROWING_STATUS = 'cron:sync-overdue-borrowing-status',
  GENERATE_FINE_OVERDUE_BORROWING = 'cron:generate-fine-overdue-borrowing',
  SYNC_BORROWING_STATUS_AFTER_FINE = 'cron:sync-borrowing-status-after-fine',
}

export enum ROLE {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  USER = 'USER',
}
