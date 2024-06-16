<template>
	<img
		class="fixed -z-40 full scale-[1.4] animate-slide touch-none object-cover blur-sm lg:scale-[1.1] lg:animate-none lg:object-contain lg:blur"
		ref="myImg"
		crossorigin="anonymous" />

	<GithubButton ref="githubButton" />
	<MainText ref="mainText" />
</template>

<script lang="ts">
	import { jpgFiles } from '../../ts/assets/jpgFiles';
	import { fade } from '../../ts/core/Animation';
	import { abs, fetchDataUrl, getRandomInt, hexToRgb, randomImageDelayLeft, rgbToHex, sleep } from '../../ts/core/utils';
	import GithubButton from './githubButton.vue';
	import MainText from './mainText.vue';
	import { htmlStylesStore } from '../../stores/htmlStyles';

	let imageBackgroundBrightness: number,
		textSquareSize = 0;

	const randomImageDuration = 23;

	export default {
		setup() {},
		components: {
			GithubButton,
			MainText,
		},
		mounted() {
			this.randomImage(randomImageDuration, true);
		},
		methods: {
			dataURLToArray(dataURL: string): Uint8Array | null {
				if (!dataURL) return null;

				const parts = dataURL.split(',');
				if (parts.length < 2) return null;

				const contentType = parts[0].split(':')[1].split(';')[0],
					base64Data = parts[1];

				if (contentType !== 'image/png' && contentType !== 'image/jpeg') {
					console.warn(`Unsupported image format: ${contentType}`);
					return null; // Handle unsupported image format
				}

				const binaryData = atob(base64Data),
					buffer = new ArrayBuffer(binaryData.length),
					array = new Uint8Array(buffer);

				for (let i = 0; i < binaryData.length; i++) array[i] = binaryData.charCodeAt(i);

				return array;
			},
			getAverageRGB(
				data: Uint8Array,
				width: number,
				height: number,
				x: number,
				y: number,
				rectWidth: number,
				rectHeight: number,
			): { r: number; g: number; b: number; colorSum: number } | null {
				if (
					!data ||
					data.length === 0 ||
					x < 0 ||
					y < 0 ||
					rectWidth <= 0 ||
					rectHeight <= 0 ||
					x + rectWidth > width ||
					y + rectHeight > height
				)
					return null;

				let redSum = 0,
					greenSum = 0,
					blueSum = 0,
					avg,
					colorSum = 0;
				const pixelCount = rectWidth * rectHeight;

				for (let i = y; i < y + rectHeight; i++) {
					for (let j = x; j < x + rectWidth; j++) {
						const index = (i * width + j) * 4;
						redSum += data[index];
						greenSum += data[index + 1];
						blueSum += data[index + 2];
						avg = Math.floor((data[i] + data[i + 1] + data[i + 2]) / 3);
						colorSum += avg;
					}
				}

				const averageRed = Math.round(redSum / pixelCount);
				const averageGreen = Math.round(greenSum / pixelCount);
				const averageBlue = Math.round(blueSum / pixelCount);

				return { r: averageRed, g: averageGreen, b: averageBlue, colorSum: colorSum };
			},
			updateTextDecoration() {
				const htmlStyles = htmlStylesStore(),
					updateColor = (imageBackgroundBrightness > 128 ? 1 : -1) * 74,
					color = rgbToHex(hexToRgb(htmlStyles.textNameColor, updateColor, updateColor, updateColor)),
					siz = (e: number) => (textSquareSize / (1941 * 2)) * e;
				htmlStyles.outlineColor = htmlStyles.textNameColor;
				htmlStyles.textNameShadow = `
								${-siz(1)}px ${siz(1)}px ${siz(1)}px ${color},
								${-siz(3)}px ${siz(3)}px ${siz(3)}px ${color},
								${-siz(6)}px ${siz(6)}px ${siz(6)}px ${color},
								${-siz(10)}px ${siz(10)}px ${siz(10)}px ${color},
								${-siz(15)}px ${siz(15)}px ${siz(15)}px ${color}
							`;
			},
			changeTextColor() {
				const htmlStyles = htmlStylesStore(),
					myImg = this.$refs.myImg as HTMLImageElement,
					canvaSize = Math.min(myImg.width, myImg.height) / 14,
					width = canvaSize * 11,
					height = canvaSize * 4,
					x = (myImg.width - width) / 2,
					y = (myImg.height - height) / 2;

				//				context.drawImage(myImg, -x, -y, myImg.width, myImg.height);

				// new average color
				const data = this.dataURLToArray(myImg.src);
				const ou = this.getAverageRGB(data!, myImg.width, myImg.height, x.round(), y.round(), canvaSize * 11, canvaSize * 4)!;

				const brightness = Math.floor(ou.colorSum / (height * width)),
					pixelCount = data!.length / 4,
					averageR = abs((brightness < 128 ? 270 : 180) - Math.floor(ou.r / pixelCount)),
					averageG = abs((brightness < 128 ? 270 : 180) - Math.floor(ou.g / pixelCount)),
					averageB = abs((brightness < 128 ? 270 : 180) - Math.floor(ou.b / pixelCount));
				imageBackgroundBrightness = brightness;
				htmlStyles.textNameColor = rgbToHex([averageR, averageG, averageB]);
				this.updateTextDecoration();
			},
			async randomImage(dur: number, loop = false) {
				const myImg = this.$refs.myImg as HTMLImageElement,
					textDivSub = (this.$refs.mainText as InstanceType<typeof MainText>).$refs.textDivSub as HTMLElement,
					textDiv = (this.$refs.mainText as InstanceType<typeof MainText>).$refs.textDiv as HTMLElement,
					imagesUrl = jpgFiles.filter((i: string) => i.includes('wallpaper')),
					githubSpin = (this.$refs.githubButton as InstanceType<typeof GithubButton>).$refs.githubSpin as HTMLElement;
				let images: string[] = [];
				images.length = imagesUrl.length;
				imagesUrl.map(async (v, i) => fetchDataUrl(v).then((o: string) => (images[i] = o)));

				var currentIndex = images.indexOf(myImg.src);
				randomImageDelayLeft.setValue(100);
				do {
					var newIndex = getRandomInt(images.length);
					await sleep(100);
				} while (newIndex == currentIndex || !images[newIndex]);
				var data = images[newIndex];

				if (data) {
					await Promise.all([
						fade(myImg, (dur * 7) / 100, 1, 0),
						fade(textDivSub, (dur * 3) / 100, 0, 1),

						fade(textDiv, (dur * 5) / 100, 1, 0),
						fade(githubSpin, (dur * 2) / 100, 1, 0),
					]);

					myImg.setAttribute('src', data);
					this.changeTextColor();
					try {
						'mySpotify'.getElement().src += '';
					} catch (error) {}

					await Promise.all([
						fade(myImg, (dur * 7) / 100, 0, 1),
						fade(textDivSub, (dur * 3) / 100, 1, 0),

						fade(textDiv, (dur * 5) / 100, 0, 1),
						fade(githubSpin, (dur * 2) / 100, 0, 1),
					]);
				}
				if (data) {
					do {
						randomImageDelayLeft.decrement();
						await sleep(dur * 7.4);
					} while (randomImageDelayLeft.getValue() > 0);
				} else await sleep(100);

				if (loop) this.randomImage(dur, true);
			},
		},
	};
</script>
