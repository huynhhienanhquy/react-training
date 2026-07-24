// Interface định nghĩa dữ liệu trả về từ DummyJSON khi login thành công
export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string; // Token dùng cho các request cần xác thực sau này
  refreshToken: string;
}

export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 30, // Thời gian hết hạn token (tùy chọn, mặc định 60 phút)
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed!');
  }

  const data: LoginResponse = await response.json();
  return data;
};
