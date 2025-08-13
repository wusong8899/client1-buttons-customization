import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Button from 'flarum/common/components/Button';
import ButtonsCustomizationAddModal from './ButtonsCustomizationAddModal';
import ButtonsCustomizationListItem from './ButtonsCustomizationListItem';
import ButtonsCustomization from '../../forum/model/ButtonsCustomization';
import app from 'flarum/admin/app';

import Sortable, { SortableEvent } from 'sortablejs';
import m from 'mithril';
import type Mithril from 'mithril';

export default class SettingsPage extends ExtensionPage {
  loading!: boolean;
  buttonsCustomizationList!: ButtonsCustomization[];

  oninit(vnode: Mithril.Vnode) {
    super.oninit(vnode);
    this.loading = false;
    this.buttonsCustomizationList = [];
    this.loadResults();
  }

  initSort(): void {
    const el = document.getElementById('buttonsCustomizationSortableItems');
    if (el) {
      Sortable.create(el, {
        animation: 150,
        swapThreshold: 0.65,
        onEnd: (e: SortableEvent) => this.updateSort(e),
      });
    }
  }

  content(_vnode: Mithril.VnodeDOM): Mithril.Children {
    // Ensure m is available, use fallback if needed
    const mithril = m || (app as any).m || (window as any).m;

    if (!mithril) {
      console.error('Mithril is not available');
      return 'Error: Mithril not loaded';
    }

    return mithril('div', { className: 'ExtensionPage-settings FlarumBadgesPage' }, [
      mithril('div', { className: 'container' }, [
        mithril('div', { style: 'padding-bottom:10px' }, [
          mithril(Button, {
            className: 'Button',
            onclick: () => app.modal.show(ButtonsCustomizationAddModal)
          }, app.translator.trans('client1-buttons-customization.admin.link-add')),
        ]),
        mithril(
          'ul',
          {
            id: 'buttonsCustomizationSortableItems',
            style: 'padding:0px;list-style-type: none;',
            oncreate: this.initSort.bind(this)
          },
          this.buttonsCustomizationList.map((ButtonsCustomizationItemData: ButtonsCustomization) =>
            mithril(
              'li',
              {
                'data-item-id': ButtonsCustomizationItemData.id(),
                style: 'margin-top:5px;background: var(--body-bg);'
              },
              mithril(ButtonsCustomizationListItem, { ButtonsCustomizationItemData })
            )
          )
        ),
      ]),
    ]);
  }

  updateSort(e: SortableEvent): void {
    const newIndex = e.newIndex;
    const oldIndex = e.oldIndex;

    if (newIndex !== oldIndex) {
      const children = e.from?.children;
      const buttonsCustomizationOrder: Record<string, number> = {};

      if (children) {
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          const itemID = (child as HTMLElement).getAttribute("data-item-id");

          if (itemID) {
            buttonsCustomizationOrder[itemID] = i;
          }
        }

        app.request({
          url: `${app.forum.attribute('apiUrl')}/buttonsCustomizationList/order`,
          method: 'POST',
          body: { buttonsCustomizationOrder },
        });
      }
    }
  }

  parseResults(results: any): any {
    this.buttonsCustomizationList.push(...(results as ButtonsCustomization[]));
    // Use app.m if available, otherwise fall back to m
    if (app && (app as any).m && (app as any).m.redraw) {
      (app as any).m.redraw();
    } else if (m && m.redraw) {
      m.redraw();
    }
    return results;
  }

  loadResults(): Promise<any> {
    return app.store
      .find("buttonsCustomizationList")
      .catch(() => [])
      .then(this.parseResults.bind(this));
  }
}
