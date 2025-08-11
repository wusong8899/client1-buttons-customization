import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import Stream from 'flarum/utils/Stream';

export default class ButtonsCustomizationAddModal extends Modal {
  static isDismissible = false;

  oninit(vnode) {
    super.oninit(vnode);
    this.ButtonsCustomizationItemData = this.attrs.ButtonsCustomizationItemData;
    this.settingType = "add";

    if(this.ButtonsCustomizationItemData){
      this.settingType = "edit";
      this.itemName = Stream(this.ButtonsCustomizationItemData.name());
      this.itemUrl = Stream(this.ButtonsCustomizationItemData.url());
      this.itemIcon = Stream(this.ButtonsCustomizationItemData.icon());
      this.itemColor = Stream(this.ButtonsCustomizationItemData.color());
    }else{
      this.itemName = Stream("");
      this.itemUrl = Stream("");
      this.itemIcon = Stream("");
      this.itemColor = Stream("");
    }
  }

  className() {
    return 'Modal--Medium';
  }

  title() {
    return this.settingType==="add"?app.translator.trans('client1-buttons-customization.admin.settings.item-add'):app.translator.trans('client1-buttons-customization.admin.settings.item-edit');
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group" style="text-align: center;">
            <div>
              <div class="GuaGuaLeSettingsLabel">{app.translator.trans('client1-buttons-customization.admin.settings.item-name')}</div>
              <input maxlength="255" required className="FormControl" bidi={this.itemName} />
              <div class="GuaGuaLeSettingsLabel">{app.translator.trans('client1-buttons-customization.admin.settings.item-url')}</div>
              <input maxlength="500" required className="FormControl" bidi={this.itemUrl} />
              <div class="GuaGuaLeSettingsLabel">{app.translator.trans('client1-buttons-customization.admin.settings.item-icon')}</div>
              <input maxlength="50" required className="FormControl" bidi={this.itemIcon} />
            </div>
          </div>

          <div className="Form-group" style="text-align: center;">
            {Button.component(
              {
                className: 'Button Button--primary',
                type: 'submit',
                loading: this.loading,
              },
              this.settingType==="add"?app.translator.trans('wusong8899-guaguale.admin.guaguale-data-add'):app.translator.trans('wusong8899-guaguale.admin.guaguale-data-save')
            )}&nbsp;
            {Button.component(
              {
                className: 'Button guagualeButton--gray',
                loading: this.loading,
                onclick: () => {
                  this.hide();
                }
              },
              app.translator.trans('wusong8899-guaguale.admin.guaguale-data-cancel')
            )}
          </div>

        </div>
      </div>
    );
  }

  onsubmit(e) {
    e.preventDefault();

    this.loading = true;

    if(this.settingType==="edit"){
      this.ButtonsCustomizationItemData.save({
          name:this.itemName(),
          url:this.itemUrl(),
          icon:this.itemIcon(),
          color:this.itemColor(),
      })
      .then(
        () => this.hide(),
        (response) => {
          this.loading = false;
          this.handleErrors(response);
        }
      );
    }else{
      app.store
        .createRecord("buttonsCustomizationList")
        .save({
          name:this.itemName(),
          url:this.itemUrl(),
          icon:this.itemIcon(),
          color:this.itemColor(),
        })
        .then(
          (buttonsCustomizationList) => {
            location.reload();
          }
        )
        .catch((e) => {
          this.loading = false;
          this.handleErrors(buttonsCustomizationList);
        });
    }
  }
}
