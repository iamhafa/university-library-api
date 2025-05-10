export enum RESPONSE_RESULT {
  NG = '0', // lỗi
  OK = '1', // thành công
}

export enum STATUS_CODE {
  NG = 200,
  OK = 200,
}

export enum BORROWING_STATUS {
  BORROWING = 'borrowing', // đang mượn
  RETURNED = 'returned', // đã trả sách
  OVERDUE = 'overdue', // quá hạn
}

export enum MEMBER_TYPE {
  LECTURER = 'lecturer', // giảng viên
  UNDERGRADUATE_STUDENT = 'undergraduate_student', // sinh viên đang còn học
  GRADUATE_STUDENT = 'graduate_student', // sinh viên đã tốt nghiệp
}

export enum JOB_NAME {
  FINE = 'job-fine',
  BOOK_BORROWING = 'job-book_borrowing',
  BOOK_BORROWING_ITEMS = 'job-book_borrowing_items',
}

export enum ROLE {
  ADMIN = 'admin',
  MODERATOR = 'morderator',
  USER = 'user',
}
