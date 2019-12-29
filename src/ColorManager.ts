class ColorManagerClass {
    public randomRGBColor(kata: string): ColorTypeRGB {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
    
        if(kata === 'gelap') return { r:0, g:0, b:0 };
        else if(kata === 'terang' || kata === 'silau') return { r:255, g:255, b:255 };
        else return { r, g, b };
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
