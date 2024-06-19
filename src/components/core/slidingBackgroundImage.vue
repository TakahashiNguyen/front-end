<template>
	<img
		ref="myImg"
		class="fixed -z-40 full scale-[1.4] animate-slide touch-none object-cover blur-sm lg:scale-[1.1] lg:animate-none lg:object-contain lg:blur"
		crossorigin="anonymous"
		@load="changeTextColor"
	/>

	<div class="relative">
		<SpotifyCurrentSong />
		<ViewCounter />
		<GithubButton ref="ghBtn" />
		<MainText ref="mTxt" :hash-tag="hashTag" />
		<ContentAvisory />
	</div>
</template>

<script lang="ts">
	import { fade } from '../../ts/core/Animation';
	import {
		fetchDataUrl,
		getRandomInt,
		hexToRgb,
		rgbToHex,
		sleep,
	} from '../../ts/core/utils';
	import { htmlStylesStore } from '../../stores/htmlStyles';
	import { variablesStore } from '../../stores/variables';
	import GithubButton from '../utils/githubButton.vue';
	import SpotifyCurrentSong from '../utils/spotifyCurrentSong.vue';
	import ViewCounter from '../utils/viewCounter.vue';
	import MainText from '../utils/mainText.vue';
	import ContentAvisory from '../utils/contentAdvisory.vue';
	import { ref } from 'vue';
	//@ts-ignore
	import { webpFiles } from '../../ts/assets/webpFiles';

	const randomImageDuration = 23;

	export default {
		setup() {
			const mTxt = ref<typeof MainText>(),
				ghBtn = ref<typeof GithubButton>();

			let images: string[] = [];

			return { mTxt, ghBtn, images };
		},
		components: {
			GithubButton,
			SpotifyCurrentSong,
			ViewCounter,
			MainText,
			ContentAvisory,
		},
		mounted() {
			const imagesUrl = webpFiles.filter((i: string) => i.includes('wallpaper'));
			this.images.length = imagesUrl.length;
			imagesUrl.map(async (v: string, i: number) =>
				fetchDataUrl(v).then((o: string) => (this.images[i] = o)),
			);
			this.randomImage(randomImageDuration, true);
		},
		props: {
			hashTag: {
				type: String,
				required: true,
			},
		},
		methods: {
			getAverageRGB(
				img: HTMLImageElement,
			): { r: number; g: number; b: number; colorSum: number } | null {
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

				return {
					r: averageRed,
					g: averageGreen,
					b: averageBlue,
					colorSum: colorSum / (canvas.width * canvas.height),
				};
			},
			updateTextDecoration(imgBackgroudBrightness: number) {
				const htmlStyles = htmlStylesStore(),
					textSqrWidth = this.mTxt!.$refs.textSqr.clientWidth,
					updateColor = (imgBackgroudBrightness > 128 ? 1 : -1) * 74,
					color = rgbToHex(
						hexToRgb(htmlStyles.textNameColor, updateColor, updateColor, updateColor),
					),
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
					textDiv = this.mTxt!.$refs.textDiv,
					textDivSub = this.mTxt!.$refs.textDivSub,
					githubSpin = this.ghBtn!.$refs.githubSpin,
					variables = variablesStore(),
					images = this.images;

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
