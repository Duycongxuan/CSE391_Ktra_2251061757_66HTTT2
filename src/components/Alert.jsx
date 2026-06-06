import { AlertTriangle } from "lucide-react"

const Alert = ({onDelete}) => {
  return (
    <div className='w-full max-w-96 bg-white'>
      {/* HEADER: Biểu tượng cảnh báo và tiêu đề */}
      <div className="flex items-center gap-10 p-6">
        {/* Icon cảnh báo với nền đỏ nhạt */}
        <div className="bg-red-500/50 p-2 rounded-lg">
          {<AlertTriangle 
            size={40} 
            strokeWidth={2.5}
            className="text-red-500"
          />}
        </div>
        
        {/* Tiêu đề và mô tả */}
        <div>
          <p className="font-bold text-2xl leading-20">Xóa dữ liệu</p>
          <p className="text-md ">Bạn có muốn xóa dữ liệu này ra khỏi hệ thống không?</p>
        </div>
      </div>
      
      {/* FOOTER: Nút hành động (Xóa, Hủy) */}
      <div className="flex flex-row-reverse gap-8 bg-gray-300 p-6">
        {/* Nút XÓA: Gọi onDelete callback */}
        <button 
          type="button"
          className="text-white bg-red-500 p-3 rounded-md cursor-pointer hover:bg-red-700"
          onClick={onDelete}
        >
          Xóa
        </button>
        
        {/* Nút HỦY: Đóng dialog (xử lý ở component cha) */}
        <button type="button" className="p-3 rounded-md hover:bg-gray-500/50 cursor-pointer">
          Hủy
        </button>
      </div>
    </div>
  )
}

export default Alert