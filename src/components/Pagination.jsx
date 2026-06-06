import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  indexOfFirstItem,
  indexOfLastItem,
  onPrevPage,
  onNextPage,
  onPageClick,
  variant = "default",
}) => {
  // Ẩn pagination nếu chỉ có 1 trang
  if (totalPages <= 1) return null;

  // --- CONST: Styling dựa trên variant (card vs table) ---
  const buttonSize = variant === "table" ? "p-1" : "p-2";
  const containerStyle =
    variant === "table"
      ? "border-t border-gray-200 bg-gray-50"
      : "bg-white rounded-lg shadow-sm";
  const spanStyle = variant === "table" ? "text-gray-500" : "text-gray-600";

  return (
    <div
      className={`p-4 flex items-center justify-between ${containerStyle} rounded-lg`}
    >
      {/* PHẦN 1: THÔNG TIN TRANG */}
      <span className={`text-sm ${spanStyle}`}>
        Đang xem{" "}
        <span className="font-semibold text-gray-800">
          {totalItems === 0 ? 0 : indexOfFirstItem + 1}
        </span>{" "}
        đến{" "}
        <span className="font-semibold text-gray-800">
          {Math.min(indexOfLastItem, totalItems)}
        </span>{" "}
        trong{" "}
        <span className="font-semibold text-gray-800">{totalItems}</span>{" "}
        nhân viên
      </span>

      {/* PHẦN 2: ĐIỀU KHIỂN PAGINATION */}
      <div className="flex items-center gap-1">
        {/* NÚT PREVIOUS: Chuyển sang trang trước */}
        <button
          onClick={onPrevPage}
          disabled={currentPage === 1}
          className={`${buttonSize} rounded border border-gray-300 bg-white text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors`}
        >
          <ChevronLeft size={20} />
        </button>

        {/* NUMBERLAND BUTTONS: Các nút số trang */}
        {Array.from(
          { length: totalPages },
          (_, index) => index + 1,
        ).map((page) => (
          <button
            key={page}
            onClick={() => onPageClick(page)}
            className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors ${
              currentPage === page
                ? "bg-blue-600 text-white border border-blue-600"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}

        {/* NÚT NEXT: Chuyển sang trang sau */}
        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className={`${buttonSize} rounded border border-gray-300 bg-white text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors`}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
