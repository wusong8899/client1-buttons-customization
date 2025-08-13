import Modal, { IInternalModalAttrs } from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import ButtonsCustomization from '../../forum/model/ButtonsCustomization';
import app from 'flarum/admin/app';
import type Mithril from 'mithril';

// Import Mithril from Flarum's compatibility layer
const m = (window as any).flarum?.core?.compat?.mithril || (window as any).m;

interface ButtonsCustomizationDeleteModalAttrs extends IInternalModalAttrs {
  ButtonsCustomizationItemData: ButtonsCustomization;
}

export default class ButtonsCustomizationDeleteModal extends Modal<ButtonsCustomizationDeleteModalAttrs> {
  static isDismissible = false;

  ButtonsCustomizationItemData!: ButtonsCustomization;
  loading!: boolean;

  oninit(vnode: Mithril.Vnode<ButtonsCustomizationDeleteModalAttrs>) {
    super.oninit(vnode);
    this.ButtonsCustomizationItemData = this.attrs.ButtonsCustomizationItemData;
    this.loading = false;
  }

  className(): string {
    return 'Modal--small';
  }

  title(): Mithril.Children {
    return app.translator.trans('client1-buttons-customization.admin.settings.item-delete-confirmation');
  }

  content(): Mithril.Children {
    return m('div', { className: 'Modal-body' }, [
      m('div', { className: 'Form-group', style: 'text-align: center;' }, [
        m(Button, { className: 'Button Button--primary', type: 'submit', loading: this.loading },
          app.translator.trans('client1-buttons-customization.admin.confirm')
        ),
        ' ',
        m(Button, { className: 'Button guagualeButton--gray', loading: this.loading, onclick: () => this.hide() },
          app.translator.trans('client1-buttons-customization.admin.cancel')
        ),
      ]),
    ]);
  }

  onsubmit(e: Event): void {
    e.preventDefault();

    this.loading = true;

    this.ButtonsCustomizationItemData.delete()
      .then(() => {
        location.reload();
      });
  }
}
