import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowUp, ChevronDown } from "lucide-react";
import { chatStarted } from "./chatsSlice";
import { messageSended } from "../messages/messagesSlice";
import { user as userDate } from "../../data/user";
import { getChatByParticipantsId } from "./chats";

export default function ChatFooter({
  contact,
  messagesEndRef = { messagesEndRef },
}) {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [messageInput, setMessageInput] = useState("");

  const user = userDate;

  const chats = useSelector((state) => state.chats);
  const chat = getChatByParticipantsId(chats, user.id, contact.id);

  const handleSendMessage = () => {
    if (!messageInput) return;
    inputRef.current.focus();
    dispatch(chatStarted(user.id, contact.id));
    dispatch(messageSended(chat.id, user.id, messageInput));
    setMessageInput("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="px-3 pb-3 animate-in slide-in-from-bottom-full duration-300 -mt-8 z-50 relative justify-center flex items-center">
      <input
        ref={inputRef}
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            handleSendMessage();
          }
        }}
        className="h-fit p-3 pr-11 shadow-2xl shadow-black bg-white/80 backdrop-blur-md outline-none rounded-full w-full"
        placeholder="Type message..."
      />
      <button
        onClick={handleSendMessage}
        className="absolute right-5 active:scale-95 transition-all bg-gradient-to-b from-indigo-400 to-blue-500 p-1 rounded-full text-white"
      >
        <ArrowUp />
      </button>
      {
        <button
          onClick={scrollToBottom}
          className="absolute active:scale-95 transition-all -top-12 bg-gradient-to-b bg-white/70 shadow-sm backdrop-blur-md p-1 rounded-full animate-in zoom-in-75"
        >
          <ChevronDown />
        </button>
      }
    </footer>
  );
}
