import { Plus } from 'lucide-react';

const Header = ({ searchItem, setSearchItem, onOpenAddForm }) => {
  
  /**
   * Handler: Submit form search
   * (Hiện tại không làm gì, search được xử lý bởi onChange)
   */
  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className='bg-white flex items-center justify-between p-4 sticky top-0 left-0 z-10 border-b border-gray-300 shadow-sm'>
      <div className='flex items-center gap-20'>
        {/* TIÊU ĐỀ */}
        <h1 className='text-2xl font-bold text-gray-800'>
          Quản lý Hội thảo
        </h1>
        
        {/* SEARCH BAR */}
        <form 
          onSubmit={handleSearchSubmit} 
          role='search'
        >
          <input 
            type="search" 
            value={searchItem}
            placeholder="Tìm kiếm Hội thảo..."
            className='w-80 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow'
            onChange={(e) => setSearchItem(e.target.value)}
          />
        </form>
      </div>

      <div>
        {/* NÚT THÊM NHÂN VIÊN: Mở form modal thêm mới */}
        <button 
          className='flex gap-2 items-center bg-blue-500 text-white px-4 py-2.5 rounded-md cursor-pointer hover:bg-blue-600 transition-colors font-medium'
          onClick={onOpenAddForm}
        >
          <Plus size={18} strokeWidth={2.5} /> 
          Thêm
        </button>
      </div>
    </header>
  );
}

export default Header;