import {extend, override} from 'flarum/extend';
import SettingsPage from './components/SettingsPage';
import ButtonsCustomization from "../forum/model/ButtonsCustomization";

app.initializers.add('wusong8899-buttons-customization', () => {
  app.store.models.buttonsCustomizationList = ButtonsCustomization;
  app.extensionData.for('wusong8899-client1-buttons-customization').registerPage(SettingsPage);
});
