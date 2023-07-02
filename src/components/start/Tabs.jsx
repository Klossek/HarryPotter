import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";

const Tabs = ({ props }) => {
    const t = (v) => v;
    const { tab, setTab } = props;
    const [signupCss, setSignupCss] = useState("");
    const [loginCss, setLoginCss] = useState("");
    const width = 20;
    const activeBgColor = "border-b-4 border-primary text-gray-900";
    const liClassName = `cursor-pointer  flex flex-col items-center
        justify-center 
        w-full  p-1`;
    useEffect(() => {
        setSignupCss("text-gray-600");
        setLoginCss("text-gray-600");
        switch (tab) {
            case "signup":
                setSignupCss(activeBgColor);
                break;
            case "login":
                setLoginCss(activeBgColor);
                break;
            default:
                break;
        }
    }, [tab]);
    return <ul className="flex  justify-around 
    text-lg
    font-semibold
    w-full h-fit 
    min-h-[3rem]
    bg-gray-50
      ">
        <li className={`${liClassName} border-r-2 border-r-gray-200
            ${signupCss}
          `} onClick={() => { setTab("signup"); }}>
            <div className="">{t("signup")}</div>
        </li>
        <li className={`${liClassName} 
            ${loginCss}
          `} onClick={() => { setTab("login"); }}>
            <div className="flex justify-center items-center gap-2">
                {t("login")}
            </div>
        </li>
    </ul>;
};

export default Tabs;
