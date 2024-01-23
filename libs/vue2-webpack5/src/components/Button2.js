import { defineComponent } from "vue-demi";

export const Button2 = import("app_host/hDemi").then((h) =>
  defineComponent({
    props: {
      city: {
        type: String,
        default: "button",
      },
    },
    setup(props, { emit }) {
      const click = (e) => {
        emit("btnClick", e);
        emit("onBtnClick", e);
      };

      if ("default" in h) h = h.default;
      return () =>
        h(
          "button",
          {
            on: {
              click,
            },
          },
          props.text
        );
    },
  })
);
