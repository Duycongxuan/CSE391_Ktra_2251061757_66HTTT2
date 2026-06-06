import { CheckCircle } from 'lucide-react';

const Toast = ({type, message}) => {
  return (
    <div 
      className={`flex items-center gap-10 p-4 m-6 rounded-lg w-full max-w-64 text-white bg-green-600 transition-width duration-200
        ${type === 'add' ? `bg-green-600` : type === 'edit' ? 'bg-yellow-600' : 'bg-red-600'}`}
    >
        {/* Icon kiểm tra (CheckCircle) */}
        <div>
          <CheckCircle size={20} strokeWidth={2.5} />
        </div>
        
        {/* Nội dung tin nhắn */}
        <p>
          {message}
        </p>
    </div>
  )
}

export default Toast;