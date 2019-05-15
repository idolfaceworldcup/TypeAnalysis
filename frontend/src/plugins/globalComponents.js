import BaseInput from "../components/BaseInput";
import BaseCheckbox from "../components/BaseCheckbox";
import BaseButton from "../components/BaseButton";
import Card from "../components/Card";
import Icon from "../components/Icon";

export default {
  install(Vue) {
    Vue.component(BaseButton.name, BaseButton);
    Vue.component(BaseInput.name, BaseInput);
    Vue.component(BaseCheckbox.name, BaseCheckbox);
    Vue.component(Card.name, Card);
    Vue.component(Icon.name, Icon);
  }
};