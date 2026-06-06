import { Filter } from "lucide-react";
import { useCallback } from "react";

const FilterItem = ({ setFilterItem, filterItem = {} }) => {
  const handleFilterChange = useCallback(
    (key, value) => {
      setFilterItem((prev) => ({
        ...prev,
        [key]: value === prev[key] ? 'all' : value,
      }));
    },
    [setFilterItem],
  );

  /**
   * Handler: Reset tất cả filter
   */
  const handleResetFilter = useCallback(() => {
    setFilterItem({});
    
  }, [setFilterItem]);

  // --- CONST: DỮ LIỆU TỐI ĐA (Hardcode option filter) ---
  const departmentOptions = [
    { label: "IT", value: "IT" },
    { label: "Marketing", value: "Marketing" },
    { label: "Sale", value: "Sale" },
  ];

  const statusOptions = [
    { label: "Đang làm việc", value: "Đang làm việc" },
    { label: "Nghỉ phép", value: "Nghỉ phép" },
  ];

  const renderFilterItem = (label, options, filterKey) => (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-gray-700 uppercase">
        {label}
      </label>

        {/* SELECT (dropdown) */}
        <div>
          <select
            value={filterItem[filterKey] || "all"}
            onChange={(e) => handleFilterChange(filterKey, e.target.value)}
            className="w-full px-3 py-2 rounded-md text-sm border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tất cả</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

      {/* BUTTONS */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleFilterChange(filterKey, "all")}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
            filterItem[filterKey] === "all" || !filterItem[filterKey]
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
          }`}
        >
          Tất cả
        </button>

        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleFilterChange(filterKey, option.value)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
              filterItem[filterKey] === option.value
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      {/* NHÓM FILTER: Phòng ban + Trạng thái */}
      <div className="space-y-4">
        {renderFilterItem(
          "Phòng ban",
          departmentOptions,
          "department",
        )}
        {renderFilterItem(
          "Trạng thái",
          statusOptions,
          "status",
        )}
      </div>

      {/* NÚT RESET: Xóa tất cả filter */}
      <button
        type="button"
        onClick={handleResetFilter}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium"
      >
        <Filter size={18} strokeWidth={2.5} />
        Xóa Tất Cả Lọc
      </button>
    </div>
  );
};

export default FilterItem;
