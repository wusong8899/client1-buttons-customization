/**
 * Mobile device detection utility for buttons customization
 * Migrated from client1-header-adv extension for independent operation
 */
export class MobileDetection {
    private static isMobile: boolean | null = null;

    /**
     * Check if the current device is mobile
     * @returns {boolean} True if mobile device
     */
    static isMobileDevice(): boolean {
        if (this.isMobile !== null) {
            return this.isMobile;
        }

        let check = false;
        const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
        
        // Mobile detection regex
        const mobileRegex = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;
        
        const mobileRegex2 = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i;

        if (mobileRegex.test(userAgent) || mobileRegex2.test(userAgent.substr(0, 4))) {
            check = true;
        }

        this.isMobile = check;
        return check;
    }

    /**
     * Get event type based on device
     * @returns {string} 'touchend' for mobile, 'click' for desktop
     */
    static getEventType(): string {
        return this.isMobileDevice() ? 'touchend' : 'click';
    }

    /**
     * Get responsive button configuration
     * @returns {object} Configuration object with mobile-specific settings
     */
    static getButtonConfig() {
        const isMobile = this.isMobileDevice();
        return {
            buttonSize: isMobile ? 'small' : 'medium',
            spacing: isMobile ? 8 : 12,
            fontSize: isMobile ? '14px' : '16px',
            padding: isMobile ? '8px 12px' : '10px 16px',
            maxButtonsPerRow: isMobile ? 2 : 4
        };
    }

    /**
     * Get responsive layout configuration
     * @returns {object} Layout configuration for different screen sizes
     */
    static getLayoutConfig() {
        const isMobile = this.isMobileDevice();
        return {
            containerWidth: isMobile ? '100%' : 'auto',
            containerPadding: isMobile ? '10px' : '15px',
            buttonMargin: isMobile ? '5px' : '8px',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'stretch' : 'center'
        };
    }

    /**
     * Check if device supports touch
     * @returns {boolean} True if touch is supported
     */
    static isTouchDevice(): boolean {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    /**
     * Get screen size category
     * @returns {string} Screen size category
     */
    static getScreenSize(): string {
        const width = window.innerWidth;
        
        if (width < 576) {
            return 'xs'; // Extra small
        } else if (width < 768) {
            return 'sm'; // Small
        } else if (width < 992) {
            return 'md'; // Medium
        } else if (width < 1200) {
            return 'lg'; // Large
        } else {
            return 'xl'; // Extra large
        }
    }

    /**
     * Get responsive breakpoint configuration
     * @returns {object} Breakpoint configuration
     */
    static getBreakpoints() {
        return {
            xs: { max: 575, buttonsPerRow: 1, fontSize: '12px' },
            sm: { min: 576, max: 767, buttonsPerRow: 2, fontSize: '13px' },
            md: { min: 768, max: 991, buttonsPerRow: 3, fontSize: '14px' },
            lg: { min: 992, max: 1199, buttonsPerRow: 4, fontSize: '15px' },
            xl: { min: 1200, buttonsPerRow: 5, fontSize: '16px' }
        };
    }

    /**
     * Get current breakpoint configuration
     * @returns {object} Current breakpoint settings
     */
    static getCurrentBreakpoint() {
        const screenSize = this.getScreenSize();
        const breakpoints = this.getBreakpoints();
        return breakpoints[screenSize as keyof typeof breakpoints];
    }
}
