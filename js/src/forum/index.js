import app from 'flarum/forum/app';
import { extend } from 'flarum/extend';
import ButtonsCustomization from "./model/ButtonsCustomization";

app.initializers.add('client1-buttons-customization', () => {
  app.store.models.buttonsCustomizationList = ButtonsCustomization;
});