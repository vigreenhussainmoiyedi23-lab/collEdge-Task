import React, { useEffect, useState } from "react";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router-dom";
import { Plus, LogOut, Pencil, Trash2, X } from "lucide-react";
import { useTask } from "../hook/useTask";
import KanbanBoard from "../components/KanbanBoard";

const Header = ({ logoutHandler }) => (
  <div className="flex items-center justify-between mb-8">
    <div>
      <h1 className="text-4xl font-bold text-slate-900">Task Kanban Board</h1>
      <p className="text-slate-500 mt-2">
        Create, manage and organize your daily tasks.
      </p>
    </div>

    <button
      onClick={logoutHandler}
      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl transition"
    >
      <LogOut size={18} />
      Logout
    </button>
  </div>
);

const AddTaskModal = ({
  open,
  close,
  formData,
  setFormData,
  submitHandler,
}) => {
  if (!open) return null;
  const { loading } = useTask();
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-5">
      <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Create Task</h2>

          <button onClick={close}>
            <X />
          </button>
        </div>

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="font-medium">Title</label>

            <input
              className="w-full mt-2 border rounded-xl p-3 outline-none"
              placeholder="Task title"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="font-medium">Description</label>

            <textarea
              rows="4"
              className="w-full mt-2 border rounded-xl p-3 outline-none resize-none"
              placeholder="Task description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="font-medium">Priority</label>

            <select
              className="w-full mt-2 border rounded-xl p-3"
              value={formData.priority}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  priority: e.target.value,
                })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={close}
              className="px-5 py-2 rounded-xl bg-gray-200"
            >
              Cancel
            </button>

            <button className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white">
              {loading ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};



const MainForm = () => {
  const navigate = useNavigate();
  const { createTask } = useTask();
  const { user, loading, logoutHandler } = useAuth();

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "low",
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await createTask(formData);
    setShowModal(false);

    setFormData({
      title: "",
      description: "",
      priority: "low",
    });
  };

  return (
    <section className="min-h-screen bg-[#F8F4EC] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <Header logoutHandler={logoutHandler} />

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl"
        >
          <Plus size={18} />
          Add Task
        </button>

        <AddTaskModal
          open={showModal}
          close={() => setShowModal(false)}
          formData={formData}
          setFormData={setFormData}
          submitHandler={submitHandler}
        />

        <KanbanBoard />
      </div>
    </section>
  );
};

export default MainForm;
