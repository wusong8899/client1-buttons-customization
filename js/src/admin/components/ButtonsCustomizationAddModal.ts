import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Stream from 'flarum/common/utils/Stream';
import ButtonsCustomization from '../../forum/model/ButtonsCustomization';
import app from 'flarum/admin/app';
import type Mithril from 'mithril';

// Import Mithril from Flarum's compatibility layer
const m = (window as any).flarum?.core?.compat?.mithril || (window as any).m;

interface ButtonsCustomizationAddModalAttrs extends IInternalModalAttrs {
  ButtonsCustomizationItemData?: ButtonsCustomization;
}

export default class ButtonsCustomizationAddModal extends Modal<ButtonsCustomizationAddModalAttrs> {
  static isDismissible = false;

  ButtonsCustomizationItemData?: ButtonsCustomization;
  settingType!: 'add' | 'edit';
  itemName!: Stream<string>;
  itemUrl!: Stream<string>;
  itemIcon!: Stream<string>;
  itemColor!: Stream<string>;
  loading!: boolean;

  oninit(vnode: Mithril.Vnode<ButtonsCustomizationAddModalAttrs>) {
    super.oninit(vnode);
    this.ButtonsCustomizationItemData = this.attrs.ButtonsCustomizationItemData;
    this.settingType = 'add';
    this.loading = false;

    if (this.ButtonsCustomizationItemData) {
      this.settingType = 'edit';
      this.itemName = Stream(this.ButtonsCustomizationItemData.name());
      this.itemUrl = Stream(this.ButtonsCustomizationItemData.url());
      this.itemIcon = Stream(this.ButtonsCustomizationItemData.icon());
      this.itemColor = Stream(this.ButtonsCustomizationItemData.color());
    } else {
      this.itemName = Stream('');
      this.itemUrl = Stream('');
      this.itemIcon = Stream('');
      this.itemColor = Stream('');
    }
  }

  className(): string {
    return 'Modal--medium';
  }

  title(): Mithril.Children {
    return this.settingType === 'add'
      ? app.translator.trans('client1-buttons-customization.admin.settings.item-add')
      : app.translator.trans('client1-buttons-customization.admin.settings.item-edit');
  }

  content(): Mithril.Children {
    return m('div', { className: 'Modal-body' }, [
      m('div', { className: 'Form' }, [
        m('div', { className: 'Form-group', style: 'text-align: center;' }, [
          m('div', [
            m('div', { className: 'GuaGuaLeSettingsLabel' }, app.translator.trans('client1-buttons-customization.admin.settings.item-name')),
            m('input', {
              maxlength: 255,
              required: true,
              className: 'FormControl',
              value: this.itemName(),
              oninput: (e: InputEvent) => this.itemName((e.target as HTMLInputElement).value),
            }),
            m('div', { className: 'GuaGuaLeSettingsLabel' }, app.translator.trans('client1-buttons-customization.admin.settings.item-url')),
            m('input', {
              maxlength: 500,
              required: true,
              className: 'FormControl',
              value: this.itemUrl(),
              oninput: (e: InputEvent) => this.itemUrl((e.target as HTMLInputElement).value),
            }),
            m('div', { className: 'GuaGuaLeSettingsLabel' }, app.translator.trans('client1-buttons-customization.admin.settings.item-icon')),
            m('input', {
              maxlength: 50,
              required: true,
              className: 'FormControl',
              value: this.itemIcon(),
              oninput: (e: InputEvent) => this.itemIcon((e.target as HTMLInputElement).value),
            }),
          ]),
        ]),

        m('div', { className: 'Form-group', style: 'text-align: center;' }, [
          m(Button, { className: 'Button Button--primary', type: 'submit', loading: this.loading },
            app.translator.trans('client1-buttons-customization.admin.confirm')
          ),
          ' ',
          m(Button, { className: 'Button guagualeButton--gray', loading: this.loading, onclick: () => this.hide() },
            app.translator.trans('client1-buttons-customization.admin.cancel')
          ),
        ]),
      ]),
    ]);
  }

  onsubmit(e: Event): void {
    e.preventDefault();

    this.loading = true;

    if (this.settingType === 'edit' && this.ButtonsCustomizationItemData) {
      this.ButtonsCustomizationItemData.save({
        name: this.itemName(),
        url: this.itemUrl(),
        icon: this.itemIcon(),
        color: this.itemColor(),
      })
        .then(() => this.hide())
        .catch((response) => {
          this.loading = false;
          this.handleErrors(response);
        });
    } else {
      app.store
        .createRecord('buttonsCustomizationList')
        .save({
          name: this.itemName(),
          url: this.itemUrl(),
          icon: this.itemIcon(),
          color: this.itemColor(),
        })
        .then(() => {
          location.reload();
        })
        .catch((error) => {
          this.loading = false;
          this.handleErrors(error);
        });
    }
  }

  handleErrors(error: any): void {
    // Fallback error handling: show a generic alert using our translations
    console.error('ButtonsCustomizationAddModal error', error);
    app.alerts.show({ type: 'error' }, app.translator.trans('client1-buttons-customization.admin.save-error'));
  }
}
