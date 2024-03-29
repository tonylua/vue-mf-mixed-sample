// vue 3 component
import { defineComponent, computed } from "vue";

const Sty = `
    border: 1px solid var(--vue3-color, #336699);
    border-radius: 10px;
    width: 300px;
    box-sizing: border-box;
    padding: 20px;
`;

export const WeatherConsumer = import("app_host/hDemi").then((h) =>
  defineComponent({
    props: {
      city: {
        type: String,
        default: "unknown",
      },
      temperature: Number,
    },
    setup(props, { emit }) {
      const centigrade = computed(() => `${props.temperature || "--"}℃`);

      const onClick = () => {
        console.log("onClick", props.city);
        emit("msg", props.city);
      };

      if ("default" in h) h = h.default;
      return () =>
        h(
          "div",
          {
            class: "consumer",
            style: Sty,
            on: {
              click: onClick,
            },
          },
          [
            h("h1", {
              style: "color: #336699",
              domProps: {
                innerHTML: "&lt;vue3-weather-consumer/&gt;",
              },
            }),
            `${props.city}: ${centigrade.value}`,
            h("hr"),
            h(
              "div",
              {
                class: "el-foo-bar custom-style",
              },
              `i am from app2@vue3+webpack5`
            ),
          ]
        );
    },
  })
);
