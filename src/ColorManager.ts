class ColorManagerClass {
    public randomRGBColor(): ColorTypeRGB {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
    
        return { r, g, b };
    }
    
    public parseRGB(rgb: ColorTypeRGB): string {
        let { r, g, b } = rgb;
        return `rgb(${r},${g},${b})`;
    }
    
    public getBrightness(rgb: ColorTypeRGB): number {
        let { r, g, b } = rgb;
        return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    }
    
    public rgbToHex(rgb: ColorTypeRGB): string {
        let { r, g, b } = rgb;
        const toHex = (x: any) => {
            const hex = Math.round(x).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
}

interface ColorTypeRGB {
    r: number;
    g: number;
    b: number;
}

export const Color = (() => new ColorManagerClass())();