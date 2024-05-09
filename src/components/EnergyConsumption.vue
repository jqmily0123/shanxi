<template>
  <div class="energy-power">
    <div class="items">
      <div v-for="item in childData" :key="item.id" class="item">
        <div class="equipment">
          <div class="text">
            {{ item.equipment }}
          </div>
        </div>
        <div class="middle">
          <div class="m_top">
            <div class="m_top_left"></div>
            <div class="m_top_right">
              {{
                item.power > 25
                  ? "高能耗"
                  : item.power > 20
                    ? "中等能耗"
                    : "低能耗"
              }}
            </div>
          </div>
          <ProcessBar :progress="item" :color="item.color" />
        </div>
        <div class="right">{{ item.power }}千Kwh</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import ProcessBar from "@/components/ProcessBar.vue";
const { item } = defineProps({
  item: Object,
});
console.log(item);
const { childData } = item;
// console.log(childData);
</script>
<style scoped lang="less">
.energy-power {
  width: 400px;
  height: 180px;
  margin-top: 20px;
  margin-left: 20px;
  //background-color: pink;
  .items {
    display: flex;
    //width: 100%;
    height: 100%;
    flex-direction: column;
    font-size: 12px;
    color: #dddddd;
    .item {
      flex: 1;
      //background-color: green;
      display: flex;
      .equipment {
        text-align: right;
        flex: 1;
        display: flex;
        justify-content: end;
        margin-right: 10px;
        align-items: center;
        //-webkit-text-stroke: 1px black;
        //background-color: red;
        .text {
          border: 2px solid #707070;
          padding: 2px 10px;
          border-radius: 0 15px 15px 0;
        }
      }
      .middle {
        flex: 3;
        .m_top {
          display: flex;
          align-items: center;

          .m_top_left {
            width: 8px;
            height: 8px;
            background-color: #05aca6;
            margin-right: 8px;
          }
        }
      }
      .right {
        flex: 1;
        margin-top: 16px;
        margin-left: 16px;
      }
    }
  }
}
</style>
