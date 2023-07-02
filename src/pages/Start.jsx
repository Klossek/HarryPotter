import { useEffect, useState } from "react";
import Tabs from "../components/start/Tabs";
import LoginForm from "../components/start/LoginForm";
import RegisterForm from "../components/start/RegisterForm";
import { useNavigate } from "react-router-dom";


export default function Start() {
  const [tab, setTab] = useState("signup");
  const [ready, setReady] = useState(false);
  const router = useNavigate();

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (router?.query?.tab) {
      setTab(router?.query?.tab);
    }
  }, [router]);
  return (
    ready && (
      <div className="flex h-full flex-col w-full items-center justify-center ">
        <div className="bg-white h-full w-full md:w-[400px] md:mt-10 md:border-2 ">
          <Tabs props={{ tab, setTab }} />
          <div className="py-4">
            {tab === "login" && <LoginForm />}
            {ready && tab === "signup" && <RegisterForm />}
          </div>
        </div>
      </div>
    )
  );
}
