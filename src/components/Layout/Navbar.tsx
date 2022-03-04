import {Badge, TabBar} from "antd-mobile";
import {
  HomeFilled,
  BarsOutlined,
  SettingFilled,
  CarryOutFilled,
} from "@ant-design/icons";

export const Navbar = () => {
  const tabs = [
    {
      key: "home",
      title: "ホーム",
      icon: <HomeFilled />,
      badge: Badge.dot,
    },
    {
      key: "product",
      title: "機器一覧",
      icon: <BarsOutlined />,
      badge: "5",
    },
    {
      key: "inspect",
      title: "ラウンド点検",
      icon: <CarryOutFilled />,
      badge: "99+",
    },
    {
      key: "setting",
      title: "設定",
      icon: <SettingFilled />,
    },
  ];

  return (
    <TabBar>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};
