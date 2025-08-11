import ExtensionPage from 'flarum/components/ExtensionPage';
import LoadingIndicator from 'flarum/components/LoadingIndicator';
import Button from 'flarum/components/Button';
import ButtonsCustomizationAddModal from './ButtonsCustomizationAddModal';
import ButtonsCustomizationListItem from './ButtonsCustomizationListItem';

import Sortable from 'sortablejs';

export default class SettingsPage extends ExtensionPage {
  oninit(attrs) {
    super.oninit(attrs);
    this.loading = false;
    this.buttonsCustomizationList = [];
    this.loadResults();
  }

  initSort(){
    let el = document.getElementById('buttonsCustomizationSortableItems');
    let sortable = Sortable.create(el,{
          animation: 150,
          swapThreshold: 0.65,
          onEnd: (e) => this.updateSort(e),
        });
  }

  content() {
    return (
      <div className="ExtensionPage-settings FlarumBadgesPage">
        <div className="container">

          <div style="padding-bottom:10px">
            <Button className={'Button'} onclick={() => app.modal.show(ButtonsCustomizationAddModal)}>
              {app.translator.trans('client1-buttons-customization.admin.link-add')}
            </Button>
          </div>

          <ul id="buttonsCustomizationSortableItems" style="padding:0px;list-style-type: none;" oncreate={this.initSort.bind(this)}>
            {this.buttonsCustomizationList.map((ButtonsCustomizationItemData) => {
              return (
                <li itemID={ButtonsCustomizationItemData.id()} style="margin-top:5px;background: var(--body-bg);">
                  {ButtonsCustomizationListItem.component({ ButtonsCustomizationItemData })}
                </li>
              );
            })}
          </ul>

        </div>
      </div>
    );
  }

  updateSort(e){
    const newIndex = e.newIndex;
    const oldIndex = e.oldIndex;

    if(newIndex!==oldIndex){
      const children = e.from.children;
      const buttonsCustomizationOrder = {};

      for(let i=0;i<children.length;i++){
        const child = children[i];
        const itemID = $(child).attr("itemID");

        buttonsCustomizationOrder[itemID] = i;
      }

      app.request({
        url: `${app.forum.attribute('apiUrl')}/buttonsCustomizationList/order`,
        method: 'POST',
        body: { buttonsCustomizationOrder },
      });
    }
  }

  parseResults(results) {
    [].push.apply(this.buttonsCustomizationList, results);
    m.redraw();
    return results;
  }

  loadResults() {
    return app.store
      .find("buttonsCustomizationList")
      .catch(() => {})
      .then(this.parseResults.bind(this));
  }
}
