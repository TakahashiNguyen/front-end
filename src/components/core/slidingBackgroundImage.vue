<template>
	<img
		ref="myImg"
		class="fixed -z-40 full scale-[1.4] animate-slide touch-none object-cover blur-sm lg:scale-[1.1] lg:animate-none lg:object-contain lg:blur"
		crossorigin="anonymous"
		@load="changeTextColor" />

	<GithubButton ref="githubButton" />
	<MainText ref="mainText" />
</template>

<script lang="ts">
	import { jpgFiles } from '../../ts/assets/jpgFiles';
	import { fade } from '../../ts/core/Animation';
	import { fetchDataUrl, getRandomInt, hexToRgb, rgbToHex, sleep } from '../../ts/core/utils';
	import MainText from './mainText.vue';
	import { htmlStylesStore } from '../../stores/htmlStyles';
	import { variablesStore } from '../../stores/variables';
	import GithubButton from './githubButton.vue';

	// const randomImageDuration = 23;
	const randomImageDuration = 10;

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
			getAverageRGB(img: HTMLImageElement): { r: number; g: number; b: number; colorSum: number } | null {
				const canvas = document.createElement('canvas'),
					context = canvas.getContext('2d')!,
					canvaSize = Math.min(img.width, img.height) / 14;
				(canvas.width = canvaSize * 11), (canvas.height = canvaSize * 4);
				var x = (img.width - canvas.width) / 2,
					y = (img.height - canvas.height) / 2;

				context.drawImage(img, -x, -y, img.width, img.height);
				const data = context.getImageData(0, 0, canvas.width, canvas.height).data!;

				let redSum = 0,
					greenSum = 0,
					blueSum = 0,
					avg,
					colorSum = 0;
				const pixelCount = data.length / 4;

				for (let i = 0; i < data.length; i += 4) {
					(redSum += data[i]), (greenSum += data[i + 1]), (blueSum += data[i + 2]);
					avg = ((data[i] + data[i + 1] + data[i + 2]) / 3).f();
					colorSum += avg;
				}

				const averageRed = (redSum / pixelCount).r();
				const averageGreen = Math.round(greenSum / pixelCount);
				const averageBlue = Math.round(blueSum / pixelCount);

				return { r: averageRed, g: averageGreen, b: averageBlue, colorSum: colorSum / (canvas.width * canvas.height) };
			},
			updateTextDecoration(imgBackgroudBrightness: number) {
				const htmlStyles = htmlStylesStore(),
					//@ts-ignore
					textSqrWidth = this.$refs.mainText.$refs.textSqr.clientWidth,
					updateColor = (imgBackgroudBrightness > 128 ? 1 : -1) * 74,
					color = rgbToHex(hexToRgb(htmlStyles.textNameColor, updateColor, updateColor, updateColor)),
					siz = (e: number) => (textSqrWidth / (1941 * 2)) * e;
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
					{ r, g, b, colorSum } = this.getAverageRGB(myImg)!,
					bri = colorSum.f(),
					averageR = ((bri < 128 ? 270 : 180) - r.f()).a(),
					averageG = ((bri < 128 ? 270 : 180) - g.f()).a(),
					averageB = ((bri < 128 ? 270 : 180) - b.f()).a();
				htmlStyles.textNameColor = rgbToHex([averageR, averageG, averageB]);
				this.updateTextDecoration(bri);
			},
			async randomImage(dur: number, loop = false) {
				const myImg = this.$refs.myImg as HTMLImageElement,
					//@ts-ignore
					textDiv = this.$refs.mainText.$refs.textDiv,
					//@ts-ignore
					textDivSub = this.$refs.mainText.$refs.textDivSub,
					//@ts-ignore
					githubSpin = this.$refs.githubButton.$refs.githubSpin,
					imagesUrl = jpgFiles.filter((i: string) => i.includes('wallpaper')),
					variables = variablesStore();
				let images: string[] = [];
				images.length = imagesUrl.length;
				imagesUrl.map(async (v, i) => fetchDataUrl(v).then((o: string) => (images[i] = o)));

				var currentIndex = images.indexOf(myImg.src);
				variables.randomImageDelayLeft = 100;
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
						variables.randomImageDelayLeft -= 1;
						await sleep(dur * 7.4);
					} while (variables.randomImageDelayLeft > 0);
				} else await sleep(100);

				if (loop) this.randomImage(dur, true);
			},
		},
	};
</script>
