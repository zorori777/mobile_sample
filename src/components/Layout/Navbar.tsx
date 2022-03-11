import {TabBar} from "antd-mobile";
import {
  HomeFilled,
  BarsOutlined,
  SettingFilled,
  CarryOutFilled,
} from "@ant-design/icons";
import {useNavigate, useLocation} from "react-router-dom";
import {useMemo} from "react";

const tabs = [
  {
    key: "/home",
    title: "ホーム",
    icon: <HomeFilled />,
  },
  {
    key: "/product",
    title: "機器一覧",
    icon: <BarsOutlined />,
  },
  {
    key: "/inspect",
    title: "ラウンド点検",
    icon: <CarryOutFilled />,
  },
  {
    key: "/setting",
    title: "設定",
    icon: <SettingFilled />,
  },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const findTabKey = useMemo(() => {
    return tabs.find((tab) => pathname.startsWith(tab.key))?.key || "/home";
  }, [pathname]);

  return (
    <TabBar activeKey={findTabKey} onChange={(value) => navigate(value)}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};
