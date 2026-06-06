import { Pencil, Trash2 } from 'lucide-react';

const DataItem = ({ data, onEditClick, onDeleteClick }) => {
  // Format hiển thị tiền VNĐ (Ví dụ: 100.000 ₫)
  const formattedFee = new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }).format(data.fee);

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      
      {/* CỘT 1: Người đăng ký (Họ tên + ID) */}
      <td className='p-3'>
        <p className='text-sm font-bold text-gray-800'>{data.fullName}</p>
        <p className='text-xs text-gray-500'>Mã ĐK: {data.id}</p>
      </td>
      
      {/* CỘT 2: Liên hệ (Email + SĐT) */}
      <td className='p-3'>
        <p className='text-sm text-gray-800'>{data.email}</p>
        <p className='text-xs text-gray-500'>{data.phone}</p>
      </td>
      
      {/* CỘT 3: Thông tin hội thảo (Chủ đề + Ngày + Ca + Hình thức) */}
      <td className='p-3'>
        <p className='text-sm font-medium text-gray-800 max-w-56 truncate' title={data.topic}>
          {data.topic}
        </p>
        <p className='text-xs text-gray-500 mt-0.5'>
          {data.date} • Ca {data.session} • {data.attendanceType}
        </p>
      </td>
      
      {/* CỘT 4: Trạng thái Thanh toán (Badge + Số tiền) */}
      <td className='p-3'>
        <div className="flex flex-col items-start gap-1">
          <span 
            className={`px-2.5 py-1 inline-flex text-xs leading-none font-semibold rounded-full ${
              data.paymentStatus === 'Đã thanh toán' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-orange-100 text-orange-700'
            }`}
          >
            {data.paymentStatus}
          </span>
          <span className="text-xs font-medium text-gray-600 ml-1">
            {data.fee === 0 ? 'Miễn phí' : formattedFee}
          </span>
        </div>
      </td>

      {/* CỘT 5: Ghi chú */}
      <td className='p-3'>
        <p className='text-sm text-gray-700 max-w-14 truncate' title={data.note}>
          {data.note || '-'}
        </p>
      </td>
      
      {/* CỘT 6: Nút hành động (Sửa, Xóa) */}
      <td className='p-3'>
        <div className='flex items-center justify-center gap-3'>
          <button 
            title="Sửa đăng ký"
            className='p-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors cursor-pointer'
            onClick={() => onEditClick(data)}
          >
            <Pencil size={18} strokeWidth={2} />
          </button>
          
          <button 
            title="Xóa đăng ký"
            className='p-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors cursor-pointer'
            onClick={() => onDeleteClick(data.id)}
          >
            <Trash2 size={18} strokeWidth={2} />  
          </button>
        </div>
      </td>
      
    </tr>
  )
}

export default DataItem;