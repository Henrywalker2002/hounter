export const cities = ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Chọn Tỉnh/Thành phố"];

// Danh sách quận/huyện cho mỗi thành phố
export const districts = {
  "Chọn Tỉnh/Thành phố": ["Chọn Quận/Huyện"],
  "Hà Nội": [
    "Chọn Quận/Huyện",
    "Ba Đình",
    "Hoàn Kiếm",
    "Hai Bà Trưng",
    "Đống Đa",
  ],
  "Hồ Chí Minh": ["Chọn Quận/Huyện", "Quận 1", "Quận 2", "Quận 3", "Quận 4"],
  "Đà Nẵng": [
    "Chọn Quận/Huyện",
    "Quận Hải Châu",
    "Quận Thanh Khê",
    "Quận Sơn Trà",
  ],
};

// Danh sách phường/xã cho mỗi quận/huyện
export const subDistricts = {
  "Chọn Quận/Huyện": ["Chọn Phường/Xã"],
  "Ba Đình": ["Phường 1", "Phường 2", "Phường 3"],
  "Hoàn Kiếm": ["Phường 4", "Phường 5", "Phường 6"],
  "Hai Bà Trưng": ["Phường 7", "Phường 8", "Phường 9"],
  "Đống Đa": ["Phường 10", "Phường 11", "Phường 12"],
  "Quận 1": ["Phường 10", "Phường 11", "Phường 12","Tân Định"],
  "Quận 2": ["Phường 10", "Phường 11", "Phường 12"],
  "Quận 3": ["Phường 10", "Phường 11", "Phường 12"],
  "Quận 4": ["Phường 10", "Phường 11", "Phường 12"],
  "Quận Hải Châu": ["Phường 1", "Phường 2", "Phường 3"],
  "Quận Thanh Khê": ["Phường 1", "Phường 2", "Phường 3"],
  "Quận Sơn Trà": ["Phường 1", "Phường 2", "Phường 3"],
  // Thêm danh sách phường/xã cho các quận/huyện khác
};