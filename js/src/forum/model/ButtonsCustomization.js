import Model from "flarum/Model";

export default class ButtonsCustomization extends Model {}
Object.assign(ButtonsCustomization.prototype, {
  id: Model.attribute("id"),
  name: Model.attribute("name"),
  icon: Model.attribute("icon"),
  color: Model.attribute("color"),
  url: Model.attribute("url"),
  sort: Model.attribute("sort"),
});
