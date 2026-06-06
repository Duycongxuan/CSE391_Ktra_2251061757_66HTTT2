export const validate = (formData, currentData = [], isEditing = false, originalId = null) => {
  let errors = {};

  // 1. Mã đăng ký
  if (!formData.id || !formData.id.trim()) {
    errors.id = "Vui lòng nhập mã đăng ký.";
  } else {
    // Định dạng: WR-XXX-999 (X: chữ in hoa, 9: chữ số)
    const idRegex = /^WR-[A-Z]{3}-\d{3}$/;
    if (!idRegex.test(formData.id.trim())) {
      errors.id = "Mã sai định dạng. Yêu cầu: WR-XXX-999 (VD: WR-ABC-123).";
    } else {
      // Kiểm tra trùng lặp ID
      const isDuplicate = currentData.some(item => item.id === formData.id.trim());
      if (isEditing) {
        // Nếu đang sửa: Báo lỗi nếu ID mới trùng với 1 ID khác (không tính ID cũ của chính nó)
        if (formData.id.trim() !== originalId && isDuplicate) {
          errors.id = "Mã đăng ký này đã tồn tại.";
        }
      } else {
        // Nếu thêm mới: Báo lỗi nếu ID đã tồn tại
        if (isDuplicate) {
          errors.id = "Mã đăng ký này đã tồn tại.";
        }
      }
    }
  }

  // 2. Họ và tên
  if (!formData.fullName || !formData.fullName.trim()) {
    errors.fullName = "Vui lòng nhập họ và tên.";
  } else {
    const fullNameStr = formData.fullName.trim();
    // Regex lấy chữ cái tiếng Việt và khoảng trắng, không lấy số/kí tự đặc biệt
    const nameRegex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
    
    if (fullNameStr.length < 2 || fullNameStr.length > 50) {
      errors.fullName = "Họ và tên phải có từ 2 đến 50 ký tự.";
    } else if (!nameRegex.test(fullNameStr)) {
      errors.fullName = "Họ và tên không được chứa số hoặc ký tự đặc biệt.";
    }
  }

  // 3. Email sinh viên
  if (!formData.email || !formData.email.trim()) {
    errors.email = "Vui lòng nhập email.";
  } else {
    const emailStr = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(emailStr)) {
      errors.email = "Email không đúng định dạng.";
    } else if (!emailStr.endsWith("@student.haui.edu.vn")) {
      errors.email = "Email phải kết thúc bằng @student.haui.edu.vn";
    }
  }

  // 4. Số điện thoại
  if (!formData.phone || !formData.phone.trim()) {
    errors.phone = "Vui lòng nhập số điện thoại.";
  } else {
    // Chỉ gồm 10 chữ số, bắt đầu bằng 0
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      errors.phone = "Số điện thoại phải gồm 10 chữ số và bắt đầu bằng số 0.";
    }
  }

  // 5. Chủ đề hội thảo
  const validTopics = ["Trí tuệ nhân tạo (AI) cơ bản", "Ứng dụng ReactJS thực chiến", "Digital Marketing cho người mới", "Kỹ năng viết CV và Phỏng vấnData Science"];
  if (!formData.topic || !validTopics.includes(formData.topic)) {
    errors.topic = "Vui lòng chọn 1 chủ đề hội thảo hợp lệ.";
  }

  // 6. Hình thức tham gia
  if (!["Online", "Offline"].includes(formData.attendanceType)) {
    errors.attendanceType = "Hình thức tham gia không hợp lệ.";
  }

  // 7. Ngày tham gia
  if (!formData.date || !formData.date.trim()) {
    errors.date = "Vui lòng chọn ngày tham gia.";
  } else {
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    
    if (!dateRegex.test(formData.date.trim())) {
      errors.date = "Ngày không hợp lệ.";
    } else {
      const [year, month, day] = formData.date.trim().split('-');
      const inputDate = new Date(year, month - 1, day);
      
      if (inputDate.getFullYear() == year && inputDate.getMonth() == month - 1 && inputDate.getDate() == day) {
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const maxDate = new Date(today);
        maxDate.setDate(today.getDate() + 60);

        // ĐÃ SỬA Ở ĐÂY: Thêm !isEditing
        // Chỉ bắt lỗi ngày quá khứ nếu ĐANG THÊM MỚI. Đang sửa thì cho phép qua.
        if (!isEditing && inputDate < today) {
          errors.date = "Ngày tham gia phải là ngày hiện hành hoặc tương lai.";
        } else if (inputDate > maxDate) {
          errors.date = "Ngày tham gia không được quá 60 ngày kể từ hôm nay.";
        }
      } else {
        errors.date = "Ngày không tồn tại trên lịch.";
      }
    }
  }

  // 8. Ca tham gia
  if (!["Sáng", "Chiều", "Tối"].includes(formData.session)) {
    errors.session = "Ca tham gia không hợp lệ.";
  }

  // 9. Trạng thái thanh toán
  if (!["Chưa thanh toán", "Đã thanh toán"].includes(formData.paymentStatus)) {
    errors.paymentStatus = "Trạng thái thanh toán không hợp lệ.";
  }

  // 10. Phí tham dự
  if (formData.fee === "" || formData.fee === null || formData.fee === undefined) {
    errors.fee = "Vui lòng nhập phí tham dự.";
  } else {
    const feeNum = Number(formData.fee);
    if (!Number.isInteger(feeNum) || feeNum < 0) {
      errors.fee = "Phí tham dự phải là số nguyên dương.";
    } else if (feeNum < 50000 || feeNum > 500000) {
      errors.fee = "Phí tham dự phải nằm trong khoảng từ 50.000 đến 500.000 VNĐ.";
    }
  }

  // 11. Ghi chú thêm (Optional)
  if (formData.note && formData.note.trim()) {
    if (formData.note.trim().length > 150) {
      errors.note = "Ghi chú không được vượt quá 150 ký tự.";
    }
    // Kiểm tra từ khóa nhạy cảm (không phân biệt hoa thường)
    const sensitiveWords = /hack|spam|test123/i;
    if (sensitiveWords.test(formData.note)) {
      errors.note = "Ghi chú không được chứa các từ nhạy cảm (hack, spam, test123).";
    }
  }

  return errors;
};