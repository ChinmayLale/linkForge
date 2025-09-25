"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */

import AnalyticsHeader from "@/Components/Analytics/AnalyticsHeader";
// import LinkBuilder from '@/Components/Design/LinkBuilder'
// import LinkBuilder3 from '@/Components/Design/LinkBuilder3'
import LinkBuilder from "@/Components/Design/LinkBuilder";
import LinkPerformanceSection from "@/Components/Links_Section/LinkPerformance";
import TopLinks from "@/Components/Links_Section/SectionTwo";
import YourLinks from "@/Components/Links_Section/YourLinks";
import DashBoardUserProfile from "@/Components/Profile/DashBoardUserProfile";
import SettingsPage from "@/Components/Settings/Settings";
import { AppDispatch, RootState } from "@/store/store";
import { linksThunks } from "@/store/thunks/links";
import { themeThunks } from "@/store/thunks/theme";
import { ThemeSettings } from "@/types";
import { useSession } from "next-auth/react";
import React, { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  params: Promise<{ username: string }>;
};

const Tab = ({ username }: { username: string }) => {
  if (typeof window !== "undefined") {
    console.log(localStorage.getItem("token"));
  }
  switch (useSelector((state: RootState) => state.nav.tabName)) {
    case "Dashboard":
      return (
        <div className="w-full h-fit flex flex-col  justify-center gap-4  bg-[var(--primary-bg)]">
          <DashBoardUserProfile user={username} />
          <YourLinks />
          <TopLinks />
        </div>
      );
    case "Links":
      return (
        <div className="w-full h-fit flex flex-col  justify-center gap-4  bg-[var(--primary-bg)]">
          <DashBoardUserProfile user={username} />
          {/* <YourLinks /> */}
          <LinkPerformanceSection />
        </div>
      );
    case "Analytics":
      return (
        <div className="w-full h-fit flex flex-col  justify-center gap-4  bg-[var(--primary-bg)]">
          <DashBoardUserProfile user={username} />
          <AnalyticsHeader />
        </div>
      );
    case "Design":
      return (
        <div className="w-full h-fit flex flex-col  justify-center bg-[var(--primary-bg)]">
          <LinkBuilder />
        </div>
      );
    case "Settings":
      return (
        <div className="w-[100%] h-fit flex flex-col  justify-center bg-[var(--primary-bg)]">
          <SettingsPage />
        </div>
      );
    default:
      return "Dashboard";
  }
};

function Page({ params }: Props) {
  const { username } = React.use(params);
  const { data } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const [isThemeFetched, setIsThemeFetched] = React.useState(false);
  const [isLinksFetched, setIsLinksFetched] = React.useState(false);
  const links = useSelector((state: RootState) => state.link.links);

  const themes: ThemeSettings[] = useSelector(
    (state: RootState) => state.theme.theme
  );

  useEffect(() => {
    if (data?.customToken && !isLinksFetched) {
      dispatch(
        linksThunks.getAllUserLinkThunk({ token: data?.customToken || "" })
      );
      setIsLinksFetched(true);
    }
  }, [data, links]);

  useEffect(() => {
    if (data?.customToken && !isThemeFetched) {
      dispatch(
        themeThunks.getAllThemesThunk({ token: data?.customToken || "" })
      );
      setIsThemeFetched(true);
    }
  }, [data, themes]);

  // console.log({ themes });

  if (!username) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Please Login to view your dashboard
      </div>
    );
  }

  return (
    <div className="relative w-full h-fit flex flex-col overflow-y-auto  justify-center gap-4 p-4 bg-[var(--primary-bg)]">
      {/* <DashBoardUserProfile /> */}
      <Tab username={username} />
    </div>
  );
}

export default Page;
