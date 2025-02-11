export enum RESPONSE_RESULT {
  NG = '0', // lỗi
  OK = '1', // thành công
}

export enum STATUS_CODE {
  NG = 200,
  OK = 200,
}

export enum BORROWING_STATUS {
  BORROWING, // đang mượn
  RETURNED, // đã trả sách
  OVERDUE, // quá hạn
}

export enum MEMBER_TYPE {
  LECTURER, // giảng viên
  UNDERGRADUATE_STUDENT, // sinh viên đang còn học
  GRADUATE_STUDENT, // sinh viên đã tốt nghiệp
}

export enum JOB_NAME {
  FINE = 'fine',
  BOOK_BORROWING = 'book_borrowing',
  BOOK_BORROWING_ITEMS = 'book_borrowing_items',
}
