export enum routes {
  PUBLIC_IMAGES = '/',
  USER_IMAGES = 'images-control/',
  UPLOAD_IMAGE = 'new-image/',
  UPDATE_IMAGE = 'update-image/',
  REGISTER = 'register/',
  LOGIN = 'login/',
}

export enum errorsTexts {
  AUTH_ERROR = 'Authorisation Error. Re-login needed.',
  DIFFERENT_PASSWORDS = 'Passwords are different.',
  IMG_LINK_ERROR = 'Image link is broken.',
}

export enum testValues {
  NULL = '',

  // eslint-disable-next-line max-len
  TOKEN_1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsImxvZ2luIjoicSIsImlhdCI6MTY0MzcyMDI2MywiZXhwIjoxNjQzNzM0NjYzfQ.dLUtDimhiSzrRaJvP10O6Dr-1V0TiGV5ddx6my-1lcY',

  LINK_1 = 'https://source.unsplash.com/user/c_v_r/1900x800',
  LINK_2 = 'https://source.unsplash.com/user/c_v_r/1900x800',
  LINK_3 = 'https://source.unsplash.com/user/c_v_r/1900x800',
  LINK_4 = 'https://source.unsplash.com/user/c_v_r/1900x800',
  LINK_5 = 'https://source.unsplash.com/user/c_v_r/1900x800',

  EMAIL_1 = 'email_for_test@1',
  EMAIL_2 = 'email_for_test@2',
  EMAIL_3 = 'email_for_test@3',
  EMAIL_4 = 'email_for_test@4',
  EMAIL_5 = 'email_for_test@5',

  STRING_1 = 'string_for_test_1',
  STRING_2 = 'string_for_test_2',
  STRING_3 = 'string_for_test_3',
  STRING_4 = 'string_for_test_4',
  STRING_5 = 'string_for_test_5',
  STRING_6 = 'string_for_test_6',
  STRING_7 = 'string_for_test_7',
  STRING_8 = 'string_for_test_8',
  STRING_9 = 'string_for_test_9',
  STRING_10 = 'string_for_test_10',
}
