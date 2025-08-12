import app from 'flarum/forum/app';
import ButtonsCustomization from "./model/ButtonsCustomization";

app.initializers.add('client1-buttons-customization', () => {
  app.store.models.buttonsCustomizationList = ButtonsCustomization;
});