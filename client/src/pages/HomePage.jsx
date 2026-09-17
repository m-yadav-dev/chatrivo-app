import ChatContainer from "@/components/chat/ChatContainer";
import Header from "@/components/layout/Header";
import NoChatSelected from "@/components/chat/NoChatSelected";
import Sidebar from "@/components/layout/Sidebar";
import { useChatStore } from "@/store/useChatStore";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-[100dvh] overflow-hidden bg-[radial-gradient(circle_at_top_left,#f8fafc,#f4f4f5_45%,#e4e4e7)]">
      <Header />
      <main className="mx-auto flex h-[calc(100dvh-72px)] w-full max-w-[1800px] flex-col overflow-hidden md:flex-row md:px-3 lg:px-4">
        <div
          className={`h-full w-full shrink-0 md:w-[22rem] lg:w-[24rem] xl:w-[26rem] 2xl:w-[28rem] ${selectedUser ? "hidden md:block" : "block"}`}
        >
          <Sidebar />
        </div>
        <div
          className={`min-h-0 min-w-0 flex-1 md:rounded-r-2xl md:border md:border-zinc-200/70 md:bg-white/50 md:shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)] ${selectedUser ? "flex" : "hidden md:flex"}`}
        >
          {selectedUser ? (
            <ChatContainer />
          ) : (
            <div className="flex h-full w-full items-center justify-center px-4 py-10">
              <NoChatSelected />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
