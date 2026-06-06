import { useState, useEffect, useMemo, useCallback } from "react";
import DataItem from "./DataItem";
import Pagination from "./Pagination";

const DataTable = ({ data, onEditClick, onDeleteClick }) => {
  // --- STATE: PHÂN TRANG ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Hiển thị 5 đăng ký/trang

  // --- EFFECT: Reset về trang 1 khi dữ liệu thay đổi (filter/search) ---
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  /**
   * Tính toán dữ liệu phân trang
   * Được cache với useMemo để tránh tính toán lại nếu data/currentPage không thay đổi
   */
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    return {
      totalPages,
      indexOfFirstItem,
      indexOfLastItem,
      currentItems,
    };
  }, [data, currentPage, itemsPerPage]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }, [currentPage]);

  const handleNextPage = useCallback(() => {
    if (currentPage < paginationData.totalPages)
      setCurrentPage(currentPage + 1);
  }, [currentPage, paginationData.totalPages]);

  const handlePageClick = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  return (
    <section className="bg-white rounded-md shadow-sm overflow-hidden">
      {/* BẢNG: Có scroll ngang trên mobile */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          {/* HEADER: Các cột bảng */}
          <thead className="bg-gray-100 text-sm font-semibold text-gray-700">
            <tr className="border-b border-gray-300">
              <th className="p-3">NGƯỜI ĐĂNG KÝ</th>
              <th className="p-3">LIÊN HỆ</th>
              <th className="p-3">THÔNG TIN HỘI THẢO</th>
              <th className="p-3">THANH TOÁN</th>
              <th className="p-3">GHI CHÚ</th>
              <th className="p-3 text-center">THAO TÁC</th>
            </tr>
          </thead>

          {/* BODY: Danh sách dòng dữ liệu */}
          <tbody>
            {paginationData.currentItems.length > 0 ? (
              paginationData.currentItems.map((item) => (
                <DataItem
                  key={item.id}
                  data={item}
                  onEditClick={onEditClick}
                  onDeleteClick={onDeleteClick}
                />
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  Không tìm thấy dữ liệu nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <Pagination
        currentPage={currentPage}
        totalPages={paginationData.totalPages}
        totalItems={data.length}
        indexOfFirstItem={paginationData.indexOfFirstItem}
        indexOfLastItem={paginationData.indexOfLastItem}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        onPageClick={handlePageClick}
        variant="table"
      />
    </section>
  );
};

export default DataTable;