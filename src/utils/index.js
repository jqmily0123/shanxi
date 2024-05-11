const chooiceToUtil = {
  水量控制信息管理: "千吨",
  温度控制信息管理: "°C",
  压力控制信息管理: "Mpa",
  设备能耗信息管理: "KKwh",
};
const mapUtil = (name) => {
  return chooiceToUtil[name];
};

export { mapUtil };
