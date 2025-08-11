import Component from "flarum/Component";
import Button from 'flarum/components/Button';
import ButtonsCustomizationAddModal from './ButtonsCustomizationAddModal';
import ButtonsCustomizationDeleteModal from './ButtonsCustomizationDeleteModal';

export default class ButtonsCustomizationListItem extends Component {
  view() {
    const {ButtonsCustomizationItemData} = this.attrs;
    const buttonsCustomizationID = ButtonsCustomizationItemData.id();
    const buttonsCustomizationName = ButtonsCustomizationItemData.name();
    const buttonsCustomizationUrl = ButtonsCustomizationItemData.url();
    const buttonsCustomizationIcon = ButtonsCustomizationItemData.icon();
    const buttonsCustomizationColor = ButtonsCustomizationItemData.color();
    const buttonsCustomizationSort = ButtonsCustomizationItemData.sort();

    return (
      <div style="border: 1px dotted var(--control-color);padding: 10px;border-radius: 4px;">
        <div>
          <div style="padding-top: 5px;">
            <Button className={'Button Button--primary'} onclick={() => this.editItem(ButtonsCustomizationItemData)}>
              {app.translator.trans('client1-buttons-customization.admin.settings.item-edit')}
            </Button>
            &nbsp;
            <Button style="font-weight:bold;width:66px;" className={'Button Button--danger'} onclick={() => this.deleteItem(ButtonsCustomizationItemData)}>
              {app.translator.trans('client1-buttons-customization.admin.settings.item-delete')}
            </Button>&nbsp;&nbsp;

            <b>{app.translator.trans('client1-buttons-customization.admin.settings.item-id')}: </b>
            {buttonsCustomizationID}&nbsp;|&nbsp;
            <i class={buttonsCustomizationIcon}></i>&nbsp;
            <b>{app.translator.trans('client1-buttons-customization.admin.settings.item-name')}: </b>
            {buttonsCustomizationName}&nbsp;|&nbsp;
            <b>{app.translator.trans('client1-buttons-customization.admin.settings.item-url')}: </b>
            {buttonsCustomizationUrl}&nbsp;
          </div>
        </div>
      </div>
    );
  }

  editItem(ButtonsCustomizationItemData) {
    app.modal.show(ButtonsCustomizationAddModal, {ButtonsCustomizationItemData})
  }

  deleteItem(ButtonsCustomizationItemData) {
    app.modal.show(ButtonsCustomizationDeleteModal, {ButtonsCustomizationItemData})
  }
}
