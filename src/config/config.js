import { v4 as uuidv4 } from "uuid";

const getDeviceUpdate = (updateData) => {
  // console.log(updateData);
  return [
    {
      id: uuidv4(),
      name: "deviceId",
      component: "a-form-item",
      label: "设备ID",
      children: [
        {
          id: uuidv4(),
          component: "a-input",
          data: updateData.value.id,
          props: {
            disabled: "disabled",
          },
        },
      ],
    },
    {
      id: uuidv4(),
      name: "deviceName",
      component: "a-form-item",
      label: "设备名称",
      children: [
        {
          id: uuidv4(),
          component: "a-input",
          data: updateData.value.deviceName,
          props: {},
        },
      ],
    },
    {
      id: uuidv4(),
      name: "deviceStatus",
      component: "a-form-item",
      label: "设备状态",
      children: [
        {
          id: uuidv4(),
          component: "a-select",
          data: updateData.value.deviceStatus,
          props: {
            options: [
              { label: "设备正常", value: "设备正常" },
              { label: "设备异常", value: "设备异常" },
            ],
          },
        },
      ],
    },
    {
      id: uuidv4(),
      name: "deviceMaintenanceStatus",
      component: "a-form-item",
      label: "设备检修状态",
      children: [
        {
          id: uuidv4(),
          component: "a-select",
          data: updateData.value.deviceMaintenanceStatus,
          props: {
            options: [
              { label: "设备未检修", value: "设备未检修" },
              { label: "设备正在检修", value: "设备正在检修" },
              { label: "设备检修完毕", value: "设备检修完毕" },
            ],
          },
        },
      ],
    },
  ];
};

export { getDeviceUpdate };
