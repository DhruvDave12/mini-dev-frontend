"use client";
import React, { useContext, useState } from "react";
import { withPrivate } from "@/hooks/route";
import { IUserProps } from "@/types/user.type";
import { Sidebar } from "@/components/custom/sidebar";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { ChatContext } from "@/context/ChatContext";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"

interface IChatProps {
  auth: {
    user: IUserProps;
  };
}

const Chat = ({ auth }: IChatProps) => {
  const { user } = auth;
  const { history, previousChats, queryMiniDev, loading, queryLoading } = useContext(ChatContext);
  const [query, setQuery] = useState("");
  const TOP_QUERIES: any[] = [
    {
      id: 1,
      text: "How to create pure super token ?",
    },
    {
      id: 2,
      text: "What is the difference between pure and wrapped super token ?",
    },
  ];

  const handleQuerying = async () => {
    await queryMiniDev(query);
    setQuery("");
  }
  return (
    !loading || (loading && queryLoading) ? 
    <div style={{ height: "100vh", width: '100%'}}>
      <div className="grid lg:grid-cols-5" style={{ height: "100vh" }}>
        <Sidebar messages={history} user={user} className="hidden lg:block" onClickMessage={(msg: string) => {
          setQuery(msg)
        }}/>
        <div
          className={`col-span-3 lg:col-span-4 lg:border-l grid grid-cols-1 grid-rows-${previousChats.length > 0 ? "2": "4"} lg:grid-rows-3`}
          style={{ backgroundColor: "#303030", position: 'relative', height: '100vh'}}
        >
          {
            previousChats.length === 0 && (
              <div>
                <p
                  className="
                  text-sm
                  font-semibold
                  tracking-tight
                  text-white
                  text-center
                  lg:text-lg
                  lg:font-normal
                  lg:tracking-tighter
                  lg:leading-tight
                  mt-5
                "
                >
                  Version 1.0
                </p>
                <p
                  className="
                  font-semibold
                  tracking-tight
                  text-white
                  text-center
                  lg:text-lg
                  lg:font-normal
                  lg:tracking-tighter
                  lg:leading-tight
                  mt-2
                "
                  style={{ fontSize: 10 }}
                >
                  Currently supporting Superfluid, IPFS, Push Protocol
                </p>
              </div>
            )
          }
          {
            previousChats.length === 0 && (
              <div>
                <h1
                  className="
                  text-3xl
                  font-semibold
                  tracking-tight
                  text-white
                  text-center
                  lg:text-5xl
                  lg:font-bold
                  lg:tracking-tighter
                  lg:leading-tight
                "
                >
                  Mini Developer
                </h1>
                <p
                  className="
                  text-sm
                  font-semibold
                  tracking-tight
                  text-white
                  text-center
                  lg:text-lg
                  lg:font-normal
                  lg:tracking-tighter
                  lg:leading-tight
                  "
                >
                  Your Online Software Development Helper
                </p>
              </div>
            )
          }
          {
            previousChats.length === 0 && (
          <div className="flex justify-center items-center w-full">
            <div className="w-1/2 grid grid-rows-2 grid-cols-2 gap-4">
              {TOP_QUERIES.map((message, i) => (
                <Card
                  key={i}
                  onClick={() => {
                    setQuery(message.text)
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <CardHeader>
                    <CardDescription className="text-center">
                      {message.text}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
            )
          }
          {
            previousChats.length > 0 && (
              <div className="
                flex
                flex-col
                h-full
                overflow-y-scroll
                scrollbar-hide
                pb-5
                ml-5
                mr-5
                mt-5  
              " style={{
                overflowY: 'scroll',
                height: '85vh',
              }}>
                {previousChats.map((message, i) => (
                  <div
                    key={i}
                    style={{
                    width: '100%',
                    display:'flex',
                    flexDirection: 'row',
                    justifyContent: message.isUser ? "flex-end" : "flex-start",
                    marginBottom: '5px',
                  }}
                  >
                    {
                      queryLoading && message.isUser === false && i === previousChats.length - 1 ? (
                        <Skeleton className="
                          w-1/4
                          h-10
                          rounded-md
                          animate-pulse
                          mb-5
                          ml-5
                          mr-5
                        "/>
                      ) : 
                      (
                        <Card
                          style={{
                            backgroundColor: message.isUser ? "#1A1A1A" : "#505050",
                            color: message.isUser ? "#fff" : "#fff",
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center'
                          }}
                        >
                          <CardHeader>
                            <CardDescription
                              
                                className={`text-center ${
                                  message.isUser ? "text-white" : "text-white"
                                } text-base`}
                              >
                                {message.message}
                              
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      )
                    }
                  </div>
                ))}
              </div>
            )
          }

          <div className="flex flex-row justify-center items-center"
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
          }}>
            <Input
              placeholder="Ask any query to mini developer"
              className="mb-5 py-7"
              style={{ width: "60%" }}
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
            <Button
              onClick={handleQuerying}
              className="mb-5 py-2 ml-4"
              style={{ width: "10%" }}
            >
              Ask
            </Button>
          </div>
        </div>
      </div>
    </div>
    : <Loader />
  );
};

export default withPrivate(Chat);
