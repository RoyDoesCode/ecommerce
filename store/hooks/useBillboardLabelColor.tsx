import { useEffect, useState } from "react";

type Color = {
    r: number;
    g: number;
    b: number;
};

const useBillboardLabelColor = (imageUrl: string) => {
    const [averageColor, setAverageColor] = useState<Color>({
        r: 255,
        g: 255,
        b: 255,
    });

    useEffect(() => {
        const image = new Image();
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        image.crossOrigin = "Anonymous";

        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx!.drawImage(image, 0, 0, image.width, image.height);

            const imageData = ctx!.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
            ).data;
            const calculatedAverageColor = calculateAverageColor(imageData);
            setAverageColor(calculatedAverageColor);
        };

        image.src = imageUrl;

        return () => {
            canvas.remove();
        };
    }, [imageUrl]);

    const calculateAverageColor = (imageData: Uint8ClampedArray): Color => {
        let sumRed = 0,
            sumGreen = 0,
            sumBlue = 0,
            pixelCount = 0;

        for (let i = 0; i < imageData.length; i += 4) {
            sumRed += imageData[i];
            sumGreen += imageData[i + 1];
            sumBlue += imageData[i + 2];
            pixelCount++;
        }

        const averageRed = Math.round(sumRed / pixelCount);
        const averageGreen = Math.round(sumGreen / pixelCount);
        const averageBlue = Math.round(sumBlue / pixelCount);

        return { r: averageRed, g: averageGreen, b: averageBlue };
    };

    function getContrastColor(color: Color) {
        const { r, g, b } = color;
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        return luminance > 128 ? "black" : "white";
    }

    return getContrastColor(averageColor);
};

export default useBillboardLabelColor;
