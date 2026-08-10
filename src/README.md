# Thư mục `src`

Mã nguồn ứng dụng được tổ chức theo vai trò và domain:

- `assets`: hình ảnh được import trong React.
- `components`: UI dùng chung và component theo tính năng.
- `constants`: hằng số toàn ứng dụng.
- `context`: React context/provider cho auth và theme.
- `hooks`: logic React tái sử dụng.
- `pages`: component cấp route.
- `routes/guards`: kiểm soát quyền truy cập route.
- `services`: Axios client và hàm gọi API.
- `styles`: stylesheet toàn cục và Tailwind layers.
- `test`: cấu hình test dùng chung.
- `types`: model/interface TypeScript.
- `utils`: hàm thuần dùng lại ở nhiều nơi.

Luồng phụ thuộc nên đi theo hướng `pages/components → hooks/services → types/utils`. Không import page vào component dùng chung và không đặt logic UI trong service.

Xem tài liệu đầy đủ tại [Kiến trúc project](../docs/ARCHITECTURE.md).
