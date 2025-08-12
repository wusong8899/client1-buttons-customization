import Model from "flarum/common/Model";

export default class ButtonsCustomization extends Model {
  id!: () => string | undefined;
  name!: () => string;
  icon!: () => string;
  color!: () => string;
  url!: () => string;
  sort!: () => number;
}

Object.assign(ButtonsCustomization.prototype, {
  id: Model.attribute<string>("id"),
  name: Model.attribute<string>("name"),
  icon: Model.attribute<string>("icon"),
  color: Model.attribute<string>("color"),
  url: Model.attribute<string>("url"),
  sort: Model.attribute<number>("sort"),
});
