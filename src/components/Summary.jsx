import { Users, UserCheck, UserMinus } from "lucide-react";
import { useMemo } from "react";

export const Summary = ({ data }) => {

  const stats = useMemo(() => {
    const total = data?.length || 0;

    // Filter: Đang làm việc
    const working =
      data?.filter((item) => item.status ===  'Đang làm việc').length || 0;

    // Filter: Nghỉ phép
    const leave =
      data?.filter((item) => item.status === 'Nghỉ việc').length || 0;

    return {
      total,
      working,
      leave,
    };
  }, [data]);

  const items = useMemo(() => [
    {
      title: 'Tổng nhân sự',
      icon: Users,
      value: stats.total,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Đang làm việc',
      icon: UserCheck,
      value: stats.working,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Nghỉ phép',
      icon: UserMinus,
      value: stats.leave,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ], [stats]);

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
      {/* MAP: Render từng card thống kê */}
      {items.map((item, index) => {
        const IconComponent = item.icon;

        return (
          <div
            key={index}
            className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            {/* ICON: Hình tròn màu với icon */}
            <div className={`p-3 rounded-full ${item.bgColor} ${item.color}`}>
              <IconComponent size={24} strokeWidth={2} />
            </div>

            {/* TEXT: Tiêu đề + Số lượng */}
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-500">{item.title}</p>
              <h3 className="text-2xl font-bold text-gray-800 leading-tight">
                {item.value}
              </h3>
            </div>
          </div>
        );
      })}
    </section>
  );
};
