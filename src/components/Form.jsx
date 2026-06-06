import { X } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { validate } from "../libs/validattions"; 

const Form = ({ setOpenForm, onSubmitData, isEditing, editData }) => {
  
  // --- STATE: KHỞI TẠO DỮ LIỆU FORM ---
  const [formData, setFormData] = useState(() => {
    if (isEditing && editData) {
      let formattedDate = editData.date;
      if (formattedDate && formattedDate.includes('/')) {
        const [day, month, year] = formattedDate.split('/');
        formattedDate = `${year}-${month}-${day}`;
      }
      return { ...editData, date: formattedDate };
    }
    
    return {
      id: "",
      fullName: "",
      email: "",
      phone: "",
      topic: "",
      attendanceType: "Offline", 
      date: "",
      session: "Sáng",           
      paymentStatus: "Chưa thanh toán", 
      fee: "",
      note: ""
    };
  });

  const [errors, setErrors] = useState({});

  // --- HANDLER: BẮT SỰ KIỆN NHẬP LIỆU ---
  const handleChange = useCallback((e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  }, []);

  // --- HANDLER: SUBMIT FORM ---
  const handleSubmitForm = useCallback((e) => {
    e.preventDefault();

    // LẤY DATA TỪ LOCALSTORAGE ĐỂ CHECK TRÙNG MÃ ĐĂNG KÝ
    const currentData = JSON.parse(localStorage.getItem("data") || "[]");
    const originalId = isEditing ? editData.id : null;

    // GỌI HÀM VALIDATE VỚI ĐẦY ĐỦ 4 THAM SỐ
    const newErrors = validate(formData, currentData, isEditing, originalId);
    setErrors(newErrors);

    // Nếu không có lỗi thì submit
    if (Object.keys(newErrors).length === 0) {
      onSubmitData(formData);
      setOpenForm(false);
    }
  }, [formData, onSubmitData, setOpenForm, isEditing, editData]);

  // --- EFFECT: Xóa lỗi khi toggle trạng thái ---
  useEffect(() => {
    if (!isEditing) {
      setErrors({});
    }
  }, [isEditing]);

  return (
    <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <h1 className="font-bold text-xl text-gray-800">
          {isEditing ? "Sửa thông tin đăng ký" : "Thêm đăng ký hội thảo"}
        </h1>
        <button
          type="button"
          className="text-gray-400 hover:text-red-600 hover:rotate-90 duration-300 transition-transform cursor-pointer"
          onClick={() => setOpenForm(false)}
        >
          <X size={20} strokeWidth={2.5} />
        </button>
      </div>

      <div className="overflow-y-auto p-6">
        <form id="registration-form" role="form" onSubmit={handleSubmitForm}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* ĐÃ SỬA: INPUT MÃ ĐĂNG KÝ (Mở khóa khi thêm mới, báo lỗi nếu sai) */}
            <div className="flex flex-col">
              <label htmlFor="id" className="mb-1.5 text-sm font-medium text-gray-700">
                Mã đăng ký <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="id"
                id="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="VD: WR-ABC-123"
                disabled={isEditing} // Đang sửa thì khóa lại không cho đổi mã, Thêm mới thì mở ra
                className={`p-2.5 border rounded-md focus:outline-none focus:ring-2 transition-shadow ${
                  isEditing ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white"
                } ${errors.id ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500"}`}
              />
              {errors.id && <span className="text-red-500 text-xs mt-1 font-medium">{errors.id}</span>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="fullName" className="mb-1.5 text-sm font-medium text-gray-700">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="VD: Nguyễn Văn A"
                className={`p-2.5 border rounded-md focus:outline-none focus:ring-2 transition-shadow ${
                  errors.fullName ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.fullName && <span className="text-red-500 text-xs mt-1 font-medium">{errors.fullName}</span>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1.5 text-sm font-medium text-gray-700">
                Email sinh viên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="sinhvien@student.haui.edu.vn"
                className={`p-2.5 border rounded-md focus:outline-none focus:ring-2 transition-shadow ${
                  errors.email ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.email && <span className="text-red-500 text-xs mt-1 font-medium">{errors.email}</span>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="phone" className="mb-1.5 text-sm font-medium text-gray-700">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0987654321"
                className={`p-2.5 border rounded-md focus:outline-none focus:ring-2 transition-shadow ${
                  errors.phone ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.phone && <span className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</span>}
            </div>

            {/* ĐÃ SỬA: OPTIONS PHẢI KHỚP VỚI ĐIỀU KIỆN VALIDATE */}
            <div className="flex flex-col">
              <label htmlFor="topic" className="mb-1.5 text-sm font-medium text-gray-700">
                Chủ đề hội thảo <span className="text-red-500">*</span>
              </label>
              <select
                name="topic"
                id="topic"
                value={formData.topic}
                onChange={handleChange}
                className={`p-2.5 border rounded-md focus:outline-none focus:ring-2 bg-white transition-shadow ${
                  errors.topic ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500"
                }`}
              >
                <option value="">-- Chọn chủ đề --</option>
                <option value="Trí tuệ nhân tạo (AI) cơ bản">AI</option>
                <option value="Ứng dụng ReactJS thực chiến">Ứng dụng ReactJS thực chiến</option>
                <option value="Digital Marketing cho người mới">Digital Marketing cho người mới</option>
                <option value="Kỹ năng viết CV và Phỏng vấn Data Science">Kỹ năng viết CV và Phỏng vấn Data Science</option>
              </select>
              {errors.topic && <span className="text-red-500 text-xs mt-1 font-medium">{errors.topic}</span>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="session" className="mb-1.5 text-sm font-medium text-gray-700">
                Ca tham gia <span className="text-red-500">*</span>
              </label>
              <select
                name="session"
                id="session"
                value={formData.session}
                onChange={handleChange}
                className="p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Sáng">Sáng</option>
                <option value="Chiều">Chiều</option>
                <option value="Tối">Tối</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="date" className="mb-1.5 text-sm font-medium text-gray-700">
                Ngày tham gia <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                className={`p-2.5 border rounded-md focus:outline-none focus:ring-2 transition-shadow ${
                  errors.date ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.date && <span className="text-red-500 text-xs mt-1 font-medium">{errors.date}</span>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="fee" className="mb-1.5 text-sm font-medium text-gray-700">
                Phí tham dự (VNĐ) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="fee"
                id="fee"
                value={formData.fee}
                onChange={handleChange}
                placeholder="50000"
                min="0"
                className={`p-2.5 border rounded-md focus:outline-none focus:ring-2 transition-shadow ${
                  errors.fee ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.fee && <span className="text-red-500 text-xs mt-1 font-medium">{errors.fee}</span>}
            </div>

            <fieldset className="flex flex-col">
              <legend className="mb-2 text-sm font-medium text-gray-700">Hình thức tham gia</legend>
              <div className="flex items-center gap-6 mt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="attendanceType"
                    value="Offline"
                    checked={formData.attendanceType === "Offline"}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">Offline</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="attendanceType"
                    value="Online"
                    checked={formData.attendanceType === "Online"}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">Online</span>
                </label>
              </div>
            </fieldset>

            <fieldset className="flex flex-col">
              <legend className="mb-2 text-sm font-medium text-gray-700">Trạng thái thanh toán</legend>
              <div className="flex items-center gap-6 mt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentStatus"
                    value="Chưa thanh toán"
                    checked={formData.paymentStatus === "Chưa thanh toán"}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">Chưa thanh toán</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentStatus"
                    value="Đã thanh toán"
                    checked={formData.paymentStatus === "Đã thanh toán"}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">Đã thanh toán</span>
                </label>
              </div>
            </fieldset>

            {/* ĐÃ SỬA: Thêm hiển thị lỗi cho Ghi chú */}
            <div className="flex flex-col md:col-span-2">
              <label htmlFor="note" className="mb-1.5 text-sm font-medium text-gray-700">
                Ghi chú thêm
              </label>
              <textarea
                name="note"
                id="note"
                rows="3"
                value={formData.note}
                onChange={handleChange}
                placeholder="Tối đa 150 ký tự..."
                className={`p-2.5 border rounded-md focus:outline-none focus:ring-2 transition-shadow resize-none ${
                  errors.note ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500"
                }`}
              ></textarea>
              {errors.note && <span className="text-red-500 text-xs mt-1 font-medium">{errors.note}</span>}
            </div>

          </div>
        </form>
      </div>

      <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200 bg-gray-50 mt-auto">
        <button
          type="button"
          onClick={() => setOpenForm(false)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
        >
          Hủy bỏ
        </button>
        <button
          type="submit"
          form="registration-form" 
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
        >
          {isEditing ? "Lưu thay đổi" : "Tạo đăng ký"}
        </button>
      </div>
    </div>
  );
};

export default Form;