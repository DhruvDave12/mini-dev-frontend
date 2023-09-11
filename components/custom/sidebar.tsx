import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "@/types/message.type";
import Image from "next/image";
import { IUserProps } from "@/types/user.type";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  messages: string[];
  user: IUserProps;
  onClickMessage: (msg: string) => void;
}

export function Sidebar({ className, messages, user, onClickMessage }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)} style={{ height: "100vh" }}>
      <div
        className="py-4 flex flex-col justify-between"
        style={{
          height: "100vh",
        }}
      >
        <div
          className="py-5"
          style={{ height: "85vh", borderBottom: "1px solid #505050" }}
        >
          <div
            className="flex flex-row justify-between items-center mb-5 pb-4"
            style={{ height: "5%", borderBottom: "1px solid #505050" }}
          >
            <h2 className="relative px-7 text-lg font-semibold tracking-tight">
              Previous Chats
            </h2>
          </div>
          {messages.length === 0 && (
            <h2 className="px-7 text-sm font-semibold tracking-tight text-center mt-5">
              Start asking any query to mini developer
            </h2>
          )}
          <ScrollArea className="px-1" style={{ height: "95%" }}>
            <div className="px-2">
              {messages?.map((message, i) => (
                <Button
                  key={`${message}-${i}`}
                  variant="ghost"
                  className={`w-full justify-center font-normal py-5 ${
                    i !== messages.length - 1 && "mb-4"
                  }`}
                  onClick={() => onClickMessage(message)}
                >
                  {message}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <Button
          onClick={() => {}}
          variant="ghost"
          className="h-full flex justify-between items-center"
          style={{height: '10vh'}}
        >
          <Image src={user.photoURL} width={50} height={50} alt="user-image" />
          <div className="pl-7 w-full flex justify-between items-center">
            <h2 className="text-md font-semibold tracking-tight">
              {user.displayName}
            </h2>
            <Image
              src={require("@/assets/show_more.svg")}
              width={20}
              height={20}
              alt="dots"
            />
          </div>
        </Button>
      </div>
    </div>
  );
}
