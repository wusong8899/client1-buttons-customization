import { ButtonsCustomizationDataLoader } from '../services/ButtonsCustomizationDataLoader';
import { DOMUtils } from '../utils/DOMUtils';
import { MobileDetection } from '../utils/MobileDetection';
import { ConfigManager } from '../../common/config/ConfigManager';

/**
 * ButtonsCustomizationUIManager - Manages buttons customization UI components and interactions
 * Migrated from client1-header-adv extension for independent operation
 */
export class ButtonsCustomizationUIManager {
    private dataLoader: ButtonsCustomizationDataLoader;
    private configManager: ConfigManager;
    private containerId: string;

    constructor() {
        this.dataLoader = ButtonsCustomizationDataLoader.getInstance();
        this.configManager = ConfigManager.getInstance();
        this.containerId = this.configManager.getContainerId('buttonsContainer');
    }

    /**
     * Initialize buttons customization UI components
     */
    async initialize(): Promise<void> {
        await this.addButtonsCustomization();
    }

    /**
     * Add buttons customization component
     */
    private async addButtonsCustomization(): Promise<void> {
        const buttonsList = await this.dataLoader.loadButtonsCustomizationList();

        if (DOMUtils.getElementById(this.containerId) || buttonsList.length === 0) {
            return;
        }

        const container = this.createButtonsContainer();
        const buttonsWrapper = this.createButtonsWrapper(container);

        this.populateButtons(buttonsWrapper, buttonsList);
        this.attachToDOM(container);
    }

    /**
     * Create buttons container
     */
    private createButtonsContainer(): HTMLElement {
        const container = DOMUtils.createElement('div', {
            id: this.containerId,
            className: 'buttonCustomizationContainer'
        });

        // Add container title or header if needed
        const header = DOMUtils.createElement('div', {
            className: 'buttons-customization-header'
        }, '自定义按钮');

        DOMUtils.appendChild(container, header);
        return container;
    }

    /**
     * Create buttons wrapper
     */
    private createButtonsWrapper(container: HTMLElement): HTMLElement {
        const wrapper = DOMUtils.createElement('div', {
            className: 'buttons-customization-wrapper'
        });

        DOMUtils.appendChild(container, wrapper);
        return wrapper;
    }

    /**
     * Populate buttons in the wrapper
     */
    private populateButtons(wrapper: HTMLElement, _buttonsList: any[]): void {
        // Sort buttons by sort order
        const sortedButtons = this.dataLoader.getSortedButtons();

        sortedButtons.forEach(buttonData => {
            const button = this.createButton(buttonData);
            DOMUtils.appendChild(wrapper, button);
        });
    }

    /**
     * Create individual button element
     */
    private createButton(buttonData: any): HTMLElement {
        const name = buttonData.name ? buttonData.name() : 'Button';
        const url = buttonData.url ? buttonData.url() : '#';
        const icon = buttonData.icon ? buttonData.icon() : '';
        const color = buttonData.color ? buttonData.color() : '';

        const button = DOMUtils.createElement('div', {
            className: 'custom-button-item'
        });

        // Create button content
        const buttonContent = this.createButtonContent(name, url, icon, color);
        button.innerHTML = buttonContent;

        // Add click event
        this.addButtonClickEvent(button, url);

        return button;
    }

    /**
     * Create button content HTML
     */
    private createButtonContent(name: string, url: string, icon: string, color: string): string {
        const iconHtml = icon ? `<i class="${icon}" style="margin-right: 8px;"></i>` : '';
        const colorStyle = color ? `color: ${color};` : '';

        return `
            <a href="${url}" target="_blank" class="custom-button-link" style="${colorStyle}">
                <div class="custom-button-content">
                    ${iconHtml}
                    <span class="custom-button-text">${name}</span>
                </div>
            </a>
        `;
    }

    /**
     * Add click event to button
     */
    private addButtonClickEvent(button: HTMLElement, url: string): void {
        DOMUtils.addEventListener(button, MobileDetection.getEventType(), (event) => {
            event.preventDefault();
            if (url && url !== '#') {
                window.open(url, '_blank');
            }
        });
    }

    /**
     * Attach container to DOM
     */
    private attachToDOM(container: HTMLElement): void {
        // Try to find a suitable parent container
        const targetContainer = this.findTargetContainer();

        if (targetContainer) {
            DOMUtils.appendChild(targetContainer, container);
            this.showContainer(container);
        }
    }

    /**
     * Find target container for buttons
     */
    private findTargetContainer(): HTMLElement | null {
        // Try multiple possible containers
        const possibleContainers = [
            '#swiperTagContainer',
            '.TagTiles',
            '.IndexPage-nav',
            '.App-content',
            'body'
        ];

        for (const selector of possibleContainers) {
            const container = DOMUtils.querySelector(selector);
            if (container) {
                return container as HTMLElement;
            }
        }

        return null;
    }

    /**
     * Show container with animation
     */
    private showContainer(container: HTMLElement): void {
        // Initially hide the container
        DOMUtils.setStyles(container, {
            'opacity': '0',
            'transform': 'translateY(-10px)',
            'transition': 'all 0.3s ease'
        });

        // Show with animation
        setTimeout(() => {
            DOMUtils.setStyles(container, {
                'opacity': '1',
                'transform': 'translateY(0)',
                'display': 'block'
            });
        }, 100);
    }

    /**
     * Refresh buttons display
     */
    async refreshButtons(): Promise<void> {
        const existingContainer = DOMUtils.getElementById(this.containerId);
        if (existingContainer) {
            DOMUtils.removeElement(existingContainer);
        }

        await this.dataLoader.refreshButtonsCustomizationList();
        await this.addButtonsCustomization();
    }

    /**
     * Hide buttons container
     */
    hideButtons(): void {
        const container = DOMUtils.getElementById(this.containerId);
        if (container) {
            DOMUtils.setStyles(container, { 'display': 'none' });
        }
    }

    /**
     * Show buttons container
     */
    showButtons(): void {
        const container = DOMUtils.getElementById(this.containerId);
        if (container) {
            DOMUtils.setStyles(container, { 'display': 'block' });
        }
    }

    /**
     * Check if buttons are currently visible
     */
    areButtonsVisible(): boolean {
        const container = DOMUtils.getElementById(this.containerId);
        return container !== null && container.style.display !== 'none';
    }
}
