import React, { useState } from 'react';
import iconEye from '../../../assets/icons/eye.png'; // Cập nhật đúng đường dẫn icon eye của bạn

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isPassword?: boolean; // Nếu là true sẽ có nút toggle ẩn/hiện mật khẩu
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  isPassword = false,
  type = 'text',
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Xác định kiểu input thực tế (dựa vào prop isPassword & state showPassword)
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col space-y-2 relative">
      <label className="text-[15px] font-bold text-[#0d1b3e]">
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          className={`w-full px-5 py-3.5 rounded-xl border border-gray-100 transition placeholder:text-gray-300 focus:outline-none ${
            isPassword
              ? 'bg-blue-50/40 focus:border-blue-400 focus:bg-blue-50/50 pr-12'
              : 'bg-gray-50/30 focus:border-blue-500'
          } ${className}`}
          {...props}
        />

        {/* Nút bật/tắt hiển thị mật khẩu nếu là field Password */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-4 flex items-center justify-center transition active:scale-95 select-none"
          >
            <img
              src={iconEye}
              alt="Toggle Password"
              className={`w-5 h-5 object-contain transition-opacity ${
                showPassword ? 'opacity-40' : 'opacity-80 hover:opacity-100'
              }`}
            />
          </button>
        )}
      </div>
    </div>
  );
};
