const cityMap = {
  xianshi: "西安市",
  baojishi: "宝鸡市",
  xianyangshi: "咸阳市",
  tongchuanshi: "铜川市",
  weinanshi: "渭南市",
  yananshi: "延安市",
  yulinshi: "榆林市",
  ankangshi: "安康市",
  hanzhongshi: "汉中市",
  shangluoshi: "商洛市",
};

const getChineseByPinyin = (pinyin) => {
  return cityMap[pinyin];
};

export { getChineseByPinyin };
