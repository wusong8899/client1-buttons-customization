import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import ButtonsCustomizationAddModal from './ButtonsCustomizationAddModal';
import ButtonsCustomizationDeleteModal from './ButtonsCustomizationDeleteModal';
import ButtonsCustomization from '../../forum/model/ButtonsCustomization';
import app from 'flarum/admin/app';

// Import Mithril from Flarum's compatibility layer
const m = (window as any).flarum?.core?.compat?.mithril || (window as any).m;

interface ButtonsCustomizationListItemAttrs {
  ButtonsCustomizationItemData: ButtonsCustomization;
}

export default class ButtonsCustomizationListItem extends Component<ButtonsCustomizationListItemAttrs> {
  view(): m.Children {
    const { ButtonsCustomizationItemData } = this.attrs;
    const buttonsCustomizationID = ButtonsCustomizationItemData.id();
    const buttonsCustomizationName = ButtonsCustomizationItemData.name();
    const buttonsCustomizationUrl = ButtonsCustomizationItemData.url();
    const buttonsCustomizationIcon = ButtonsCustomizationItemData.icon();

    return m('div', { style: 'border: 1px dotted var(--control-color);padding: 10px;border-radius: 4px;' }, [
      m('div', [
        m('div', { style: 'padding-top: 5px;' }, [
          m(Button, { className: 'Button Button--primary', onclick: () => this.editItem(ButtonsCustomizationItemData) },
            app.translator.trans('client1-buttons-customization.admin.settings.item-edit')
          ),
          ' ',
          m(Button, { className: 'Button Button--danger', style: 'font-weight:bold;width:66px;', onclick: () => this.deleteItem(ButtonsCustomizationItemData) },
            app.translator.trans('client1-buttons-customization.admin.settings.item-delete')
          ),
          ' ',
          m('b', app.translator.trans('client1-buttons-customization.admin.settings.item-id') + ': '),
          buttonsCustomizationID,
          ' | ',
          m('i', { className: buttonsCustomizationIcon }),
          ' ',
          m('b', app.translator.trans('client1-buttons-customization.admin.settings.item-name') + ': '),
          buttonsCustomizationName,
          ' | ',
          m('b', app.translator.trans('client1-buttons-customization.admin.settings.item-url') + ': '),
          buttonsCustomizationUrl,
          ' ',
        ]),
      ]),
    ]);
  }

  editItem(ButtonsCustomizationItemData: ButtonsCustomization): void {
    app.modal.show(ButtonsCustomizationAddModal, { ButtonsCustomizationItemData });
  }

  deleteItem(ButtonsCustomizationItemData: ButtonsCustomization): void {
    app.modal.show(ButtonsCustomizationDeleteModal, { ButtonsCustomizationItemData });
  }
}
