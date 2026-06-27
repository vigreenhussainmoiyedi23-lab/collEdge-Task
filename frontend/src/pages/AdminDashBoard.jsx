import React from "react";
import { useMessage } from "../hook/useMessage";

const AdminDashBoard = () => {
  const { allMessages } = useMessage();

  return (
    <section className="min-h-screen bg-[#F8F4EC] p-6 md:p-10">
      
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#0F172A]">
          Messages Dashboard
        </h1>

        <p className="text-gray-600 mt-2">
          View all messages submitted by users.
        </p>
      </div>

      {/* Messages List */}
      <div className="space-y-6">
        {allMessages?.length > 0 ? (
          allMessages.map((message) => (
            <div
              key={message._id}
              className="bg-[#0F172A] rounded-3xl p-6 shadow-xl border border-slate-800"
            >
              
              {/* Top Section */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                
                <div>
                  <h2 className="text-2xl font-semibold text-[#F8F4EC]">
                    {message.name}
                  </h2>

                  <p className="text-gray-400 text-sm mt-1">
                    {message.email}
                  </p>
                </div>

                <div className="bg-[#035A27] text-[#F8F4EC] px-4 py-2 rounded-xl text-sm font-medium w-fit">
                  User Message
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-[1px] bg-slate-700 my-5" />

              {/* Message Content */}
              <div>
                <p className="text-gray-200 leading-relaxed text-lg">
                  {message.message}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-6 flex justify-end">
                <span className="text-gray-500 text-sm">
                  ID: {message._id}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-3xl p-10 text-center shadow-md">
            <p className="text-gray-500 text-lg">
              No messages available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminDashBoard;