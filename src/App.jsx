import { useState, useCallback, useMemo } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import Alert from "./components/Alert";
import Toast from "./components/Toast";
import { mockData } from "./data/data";
import { Summary } from "./components/Summary";
import { useToast } from "./hooks/useToast";
import { useLocalStorage } from "./hooks/useLocalStorage";
import DataTable from "./components/DataTable";

const App = () => {
  // --- STATE QUẢN LÝ DỮ LIỆU (Với localStorage persistence) ---
  const [data, setData] = useLocalStorage("data", mockData || []);
  const [searchItem, setSearchItem] = useState("");
  const [filterItem, setFilterItem] = useState({});

  // --- STATE QUẢN LÝ FORM & DIALOG ---
  const [openForm, setOpenForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  // --- CUSTOM HOOK: TOAST MANAGEMENT ---
  const { openToast, typeToast, toastMessage, triggerToast } = useToast();

  // --- OPTIMIZED: Tính toán dữ liệu lọc với useMemo ---
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = item.fullName
        .toLocaleLowerCase()
        .includes(searchItem.toLocaleLowerCase());

      const matchesFilter = Object.keys(filterItem).every((key) => {
        if (
          !filterItem[key] ||
          filterItem[key] === "all" ||
          filterItem[key] === ""
        ) {
          return true;
        }
        return item[key] === filterItem[key];
      });

      return matchesSearch && matchesFilter;
    });
  }, [data, searchItem, filterItem]);

  // --- OPTIMIZED: Memoized handlers với useCallback ---
  const handleOpenAddForm = useCallback(() => {
    setIsEditing(false);
    setEditData(null);
    setOpenForm(true);
  }, []);

  const handleOpenEditForm = useCallback((data) => {
    setIsEditing(true);
    setEditData(data);
    setOpenForm(true);
  }, []);

  const handleSubmitData = useCallback(
    (formData) => {
      if (isEditing) {
        setData((prevData) =>
          prevData.map((item) => (item.id === formData.id ? formData : item)),
        );
        triggerToast("edit");
      } else {
        setData((prevData) => [formData, ...prevData]);
        triggerToast("add");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isEditing, triggerToast],
  );

  const handleConfirmDeleteData = useCallback((id) => {
    setDeleteId(id);
    setOpenAlert(true);
  }, []);

  const handleDeleteData = useCallback(() => {
    setData((prevData) => prevData.filter((item) => item.id !== deleteId));
    setDeleteId(null);
    setOpenAlert(false);
    triggerToast("delete");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteId, triggerToast]);

  const handleCloseForm = useCallback(() => {
    setOpenForm(false);
  }, []);

  const handleCloseAlert = useCallback(() => {
    setOpenAlert(false);
  }, []);

  const handleSetSearchItem = useCallback((value) => {
    setSearchItem(value);
  }, []);

  return (
    <div className="relative">
      {/* OVERLAY FORM (MODAL) */}
      {openForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Form
            key={isEditing && editData ? editData.id : "add-new"}
            setOpenForm={handleCloseForm}
            isEditing={isEditing}
            editData={editData}
            onSubmitData={handleSubmitData}
          />
        </div>
      )}

      {/* OVERLAY ALERT */}
      {openAlert && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Alert onDelete={handleDeleteData} onCancel={handleCloseAlert} />
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {openToast && (
        <div className="w-full h-full fixed top-0 left-0 flex items-end justify-end z-100 pointer-events-none p-6">
          <div className="pointer-events-auto">
            <Toast type={typeToast} message={toastMessage} />
          </div>
        </div>
      )}

      {/* HEADER */}
      <Header
        searchItem={searchItem}
        setSearchItem={handleSetSearchItem}
        onOpenAddForm={handleOpenAddForm}
      />

      {/* MAIN CONTENT */}
      <main className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-4">
          <Summary data={data} />
          {/* <FilterItem setFilterItem={handleSetFilterItem} filterItem={filterItem} /> */}


          {/* RENDER VIEW BASED ON viewType */}
            <DataTable
              data={filteredData}
              onEditClick={handleOpenEditForm}
              onDeleteClick={handleConfirmDeleteData}
            />
        </div>
      </main>
    </div>
  );
};

export default App;
