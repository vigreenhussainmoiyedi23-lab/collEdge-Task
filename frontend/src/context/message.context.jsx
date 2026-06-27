import { createContext, useState } from "react";

export const MessageContext = createContext();

const MessageContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [allMessages, setAllMessages] = useState([]);
  return (
    <MessageContext.Provider
      value={{
        loading,
        setLoading,
        allMessages,
        setAllMessages,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContextProvider;
